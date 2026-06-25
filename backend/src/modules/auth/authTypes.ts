import { Document, Types } from "mongoose";
import {
  AuthProvider,
  UserRole,
} from "../../common/constants/enums";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  role: UserRole;

  provider: AuthProvider;

  companyId?: Types.ObjectId;

  avatar?: string;

  isEmailVerified: boolean;

  isActive: boolean;

  lastLoginAt?: Date;

  deletedAt?: Date;

  comparePassword(
    password: string,
  ): Promise<boolean>;
}

export interface ICompany extends Document {
  companyName: string;

  industry: string;

  companyLogo?: string;

  companyEmail: string;

  subscriptionPlan: string;

  status: string;
}

export interface IVerificationToken
  extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}

export interface IPasswordResetToken
  extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}