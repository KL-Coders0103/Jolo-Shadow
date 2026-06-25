import { model, Schema } from "mongoose";
import { baseSchemaOptions } from "../common/constants/database";
import { IVerificationToken } from "../modules/auth/authTypes";

const verificationTokenSchema = new Schema<IVerificationToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  baseSchemaOptions,
);

verificationTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

export const VerificationToken = model<IVerificationToken>(
  "VerificationToken",
  verificationTokenSchema,
);