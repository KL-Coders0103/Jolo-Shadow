import { model, Schema } from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";
import { IInvitation } from "../modules/employee/employeeTypes";

const invitationSchema =
  new Schema<IInvitation>(
    {
      email: {
        type: String,
        required: true,
      },

      companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },

      invitedBy: {
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

      accepted: {
        type: Boolean,
        default: false,
      },
    },
    baseSchemaOptions,
  );

invitationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

export const Invitation = model<IInvitation>(
  "Invitation",
  invitationSchema,
);