import { AuditLog } from "../../models/auditLogModel";

interface CreateAuditLogPayload {
  userId?: string;
  companyId?: string;
  action: string;
  module: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

class AuditService {
  async createLog(
    payload: CreateAuditLogPayload,
  ) {
    return AuditLog.create(payload);
  }
}

export const auditService =
  new AuditService();