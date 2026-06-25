import { model, Schema } from "mongoose";
import { baseSchemaOptions } from "../common/constants/database";

const auditLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },

    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    description: String,

    ipAddress: String,

    userAgent: String,

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  baseSchemaOptions,
);

auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ companyId: 1 });
auditLogSchema.index({ module: 1 });

export const AuditLog = model(
  "AuditLog",
  auditLogSchema,
);