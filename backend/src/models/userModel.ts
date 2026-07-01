import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import {
  UserRole,
  AuthProvider,
} from "../common/constants/enums";

import { baseSchemaOptions } from "../common/constants/database";
import { IUser } from "../modules/auth/authTypes";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE,
    },

    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },

    avatar: String,

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: Date,

    deletedAt: Date,

    leaveBalance: {

      casual: {
        type: Number,
        default: 12,
      },

      sick: {
        type: Number,
        default: 10,
      },

      annual: {
        type: Number,
        default: 20,
      },
    },
  },
  baseSchemaOptions,
);

userSchema.index({ companyId: 1 });
userSchema.index({ role: 1 });

userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function () {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return;
  }

  user.password = await bcrypt.hash(
    user.password,
    12,
  );
});

userSchema.methods.comparePassword =
  async function (password: string) {
    return bcrypt.compare(
      password,
      this.password,
    );
  };

export const User = model<IUser>(
  "User",
  userSchema,
);