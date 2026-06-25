import { RefreshToken } from "../../models/refreshTokenModel";
import { User } from "../../models/userModel";
import { IUser } from "./authTypes";

export class AuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select("+password");
  }

  async createUser(data: Record<string, unknown>) {
    return User.create(data);
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId).select("+password");
  }

  async saveRefreshToken(data: Record<string, unknown>) {
    return RefreshToken.create(data);
  }

  async findRefreshToken(token: string) {
    return RefreshToken.findOne({
      token,
      isRevoked: false,
    });
  }

  async revokeRefreshToken(token: string) {
    return RefreshToken.findOneAndUpdate(
      { token },
      {
        isRevoked: true,
        revokedAt: new Date(),
      },
    );
  }

  async revokeAllUserTokens(userId: string) {
    return RefreshToken.updateMany(
      { userId },
      {
        isRevoked: true,
        revokedAt: new Date(),
      },
    );
  }

  async updateUser(
    userId: string,
    data: Record<string, unknown>,
  ) {
    return User.findByIdAndUpdate(
      userId,
      data,
      {
        new: true,
      },
    );
  }
}

export const authRepository = new AuthRepository();