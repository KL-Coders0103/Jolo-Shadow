import { Document, Types } from "mongoose";

export interface ISalaryStructure
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  basicSalary: number;

  hra: number;

  allowances: number;

  bonus: number;

  pf: number;

  professionalTax: number;

  incomeTax: number;

  otherDeductions: number;

  grossSalary: number;

  netSalary: number;

  effectiveFrom: Date;

  isActive: boolean;

  deletedAt?: Date;
}