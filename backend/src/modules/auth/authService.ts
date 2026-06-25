import { Company } from "../../models/companyModel";
import { VerificationToken } from "../../models/verificationTokenModel";

import { authRepository } from "./authRepository";

import { generateAccessToken, verifyRefreshToken } from "../../common/utils/jwtUtils";
import { generateRefreshToken } from "../../common/utils/jwtUtils";
import { generateRandomToken } from "../../common/utils/tokenUtils";

import { UserRole } from "../../common/constants/enums";
import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";
import { RefreshToken } from "../../models/refreshTokenModel";
import { PasswordResetToken } from "../../models/passwordResetTokenModel";
import { auditService } from "../../common/services/auditService";

class AuthService {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    industry: string;
  }) {
    const existingUser =
      await authRepository.findUserByEmail(
        data.email,
      );

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "User already exists",
      );
    }

    const company = await Company.create({
      companyName: data.companyName,
      industry: data.industry,
      companyEmail: data.email,
    });

    const user =
      await authRepository.createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,

        role: UserRole.COMPANY_ADMIN,

        companyId: company._id,
      });

    const verificationToken =
      generateRandomToken();

    await VerificationToken.create({
      userId: user._id,

      token: verificationToken,

      expiresAt: new Date(
        Date.now() + 15 * 60 * 1000,
      ),
    });

    const payload = {
      userId: String(user._id),
      companyId: String(company._id),
      role: user.role,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    await auditService.createLog({
      userId: String(user._id),
      companyId: String(company._id),
      action: "REGISTER",
      module: "AUTH",
      description: "Company admin registered successfully",
    });

    return {
      user,
      accessToken,
      refreshToken,
      verificationToken,
    };
  }

  async login(data: {
    email: string;
    password: string;
  }) {

    const user =
      await authRepository.findUserByEmail(
        data.email,
      );

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid credentials",
      );
    }
    
    const isPasswordValid =
      await user.comparePassword(
        data.password,
      );

    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid credentials",
      );
    }

    const payload = {
      userId: String(user._id),
      companyId: String(user.companyId),
      role: user.role,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() +
          7 * 24 * 60 * 60 * 1000,
      ),
    });

    await auditService.createLog({
      userId: String(user._id),
      companyId: String(user.companyId),
      action: "LOGIN",
      module: "AUTH",
      description: "User logged in successfully",
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const storedToken =
      await authRepository.findRefreshToken(
        token,
      );

    if (!storedToken) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid refresh token",
      );
    }

    const decoded =
      verifyRefreshToken(token);

    const payload = {
      userId: decoded.userId,
      companyId: decoded.companyId,
      role: decoded.role,
    };

    const accessToken =
      generateAccessToken(payload);

    return { accessToken };
  }

  async logout(token: string) {
    await authRepository.revokeRefreshToken(
      token,
    );

    await auditService.createLog({
      action: "LOGOUT",
      module: "AUTH",
      description: "User logged out",
    });
  }

  async logoutAll(userId: string) {
    await authRepository.revokeAllUserTokens(
      userId,
    );

    await auditService.createLog({
      userId,
      action: "LOGOUT_ALL",
      module: "AUTH",
      description:
        "User logged out from all devices",
    });
  }

  async verifyEmail(token: string) {
    const verificationToken =
      await VerificationToken.findOne({
        token,
      });

    if (!verificationToken) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid verification token",
      );
    }

    await authRepository.updateUser(
      String(verificationToken.userId),
      {
        isEmailVerified: true,
      },
    );

    await VerificationToken.deleteOne({
      _id: verificationToken._id,
    });
    
    await auditService.createLog({
      userId: String(verificationToken.userId),
      action: "VERIFY_EMAIL",
      module: "AUTH",
      description:
        "Email verified successfully",
    });
  }

  async forgotPassword(email: string) {
    const user =
      await authRepository.findUserByEmail(
        email,
      );

    if (!user) {
      return;
    }

    const token =
      generateRandomToken();

    await PasswordResetToken.create({ userId: user._id,

      token,

      expiresAt: new Date(
        Date.now() + 15 * 60 * 1000,
      ),
    });

  await auditService.createLog({
    userId: String(user._id),
    companyId: String(user.companyId),
    action: "FORGOT_PASSWORD",
    module: "AUTH",
    description:
      "Password reset requested",
  });

    return { token };
  }

  async resetPassword(data: {
    token: string;
    password: string;
  }) {
    const resetToken =
      await PasswordResetToken.findOne({
        token: data.token,
      });

    if (!resetToken) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid token",
      );
    }

    const user =
      await authRepository.findUserById(
        String(resetToken.userId),
      );

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found",
      );
    }

    user.password = data.password;

    await user.save();

    await PasswordResetToken.deleteOne({
      _id: resetToken._id,
    });

    await auditService.createLog({
      userId: String(user._id),
      companyId: String(user.companyId),
      action: "RESET_PASSWORD",
      module: "AUTH",
      description:
        "Password reset successfully",
    });
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user =
      await authRepository.findUserById(
        userId,
      );

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found",
      );
    }

    const isValid =
      await user.comparePassword(
        currentPassword,
      );

    if (!isValid) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Current password incorrect",
      );
    }

    user.password = newPassword;

    await user.save();

    await auditService.createLog({
      userId: String(user._id),
      companyId: String(user.companyId),
      action: "CHANGE_PASSWORD",
      module: "AUTH",
      description:
        "Password changed successfully",
    });
  }
}

export const authService = new AuthService();