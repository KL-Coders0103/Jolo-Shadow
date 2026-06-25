import { model, Schema } from "mongoose";
import { baseSchemaOptions } from "../common/constants/database";

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshTokenId: {
      type: Schema.Types.ObjectId,
      ref: "RefreshToken",
      required: true,
    },

    ipAddress: String,

    userAgent: String,

    deviceName: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  baseSchemaOptions,
);

sessionSchema.index({ userId: 1 });

export const Session = model(
  "Session",
  sessionSchema,
);