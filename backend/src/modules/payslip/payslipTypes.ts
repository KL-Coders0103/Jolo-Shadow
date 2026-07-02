import { Document, Types } from "mongoose";

export interface IPayslip extends Document {
  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  payrollId: Types.ObjectId;

  month: number;

  year: number;

  pdfUrl?: string;

  emailed: boolean;

  emailedAt?: Date;

  generatedAt: Date;

  downloadedAt?: Date;

  downloadCount: number;

  deletedAt?: Date;
}
