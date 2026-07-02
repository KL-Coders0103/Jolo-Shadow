import bcrypt from 'bcrypt';
import { prisma } from '../config/db';
import { generateTokens, verifyRefreshToken } from '../utils/jwtUtil';

export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: data.companyName,
          industry: data.industry,
        }
      });

      const user = await tx.user.create({
        data: {
          companyId: company.id,
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
          role: 'COMPANY_ADMIN', 
          status: 'ACTIVE' 
        }
      });

      return { company, user };
    });

    const tokens = generateTokens(result.user.id, result.company.id, result.user.role);

    await prisma.refreshToken.create({
      data: {
        userId: result.user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return {
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        companyId: result.company.id
      },
      tokens
    };
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    if (user.status !== 'ACTIVE') {
      throw new Error("User account is not active");
    }

    const tokens = generateTokens(user.id, user.companyId, user.role);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "USER_LOGIN",
        metadata: { message: "Successful login" }
      }
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      tokens
    };
  }

  static async refreshToken(data: { refreshToken: string }) {
    const { refreshToken } = data;

    let payload: any;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!storedToken || storedToken.isRevoked) {
      throw new Error("Invalid or revoked refresh token");
    }

    const tokens = generateTokens(payload.userId, payload.companyId, payload.role);

    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { isRevoked: true }
      }),
      prisma.refreshToken.create({
        data: {
          userId: payload.userId,
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      })
    ]);

    return tokens;
  }

  static async logout(data: { refreshToken: string }) {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: data.refreshToken }
    });

    if (storedToken) {
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { isRevoked: true }
      });
    }

    return { message: "Logged out successfully" };
  }

  static async logoutAll(userId: string) {
    await prisma.refreshToken.updateMany({
      where: { userId: userId, isRevoked: false },
      data: { isRevoked: true }
    });

    return { message: "Logged out from all devices successfully" };
  }
}