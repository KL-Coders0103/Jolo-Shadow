import {
  Document,
  Types,
} from "mongoose";

import {
  PayrollStatus,
} from "../../common/constants/enums";

export interface IPayroll
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  salaryStructureId: Types.ObjectId;

  month: number;

  year: number;

  workingDays: number;

  presentDays: number;

  absentDays: number;

  leaveDays: number;

  basicSalary: number;

  hra: number;

  allowances: number;

  bonus: number;

  grossSalary: number;

  pf: number;

  professionalTax: number;

  incomeTax: number;

  otherDeductions: number;

  netSalary: number;

  status: PayrollStatus;

  generatedAt: Date;

  paidAt?: Date;

  deletedAt?: Date;

  isLocked: boolean;

  lockedAt?: Date;

  lockedBy?: Types.ObjectId;
}