import { model, Schema } from "mongoose";
import { baseSchemaOptions } from "../common/constants/database";

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isRevoked: {
      type: Boolean,
      default: false,
    },

    revokedAt: Date,

    deviceInfo: {
      deviceName: String,
      browser: String,
      ipAddress: String,
      userAgent: String,
    },
  },
  baseSchemaOptions,
);

refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ token: 1 });

export const RefreshToken = model(
  "RefreshToken",
  refreshTokenSchema,
);