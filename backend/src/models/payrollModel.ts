import {
  Schema,
  model,
} from "mongoose";

import {
  PayrollStatus,
} from "../common/constants/enums";

import {
  baseSchemaOptions,
} from "../common/constants/database";

import {
  IPayroll,
} from "../modules/payroll/payrollTypes";

const payrollSchema =
  new Schema<IPayroll>(
    {

      employeeId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },

      salaryStructureId: {
        type: Schema.Types.ObjectId,
        ref: "SalaryStructure",
        required: true,
      },

      month: {
        type: Number,
        required: true,
      },

      year: {
        type: Number,
        required: true,
      },

      workingDays: {
        type: Number,
        required: true,
      },

      presentDays: {
        type: Number,
        default: 0,
      },

      absentDays: {
        type: Number,
        default: 0,
      },

      leaveDays: {
        type: Number,
        default: 0,
      },

      basicSalary: Number,

      hra: Number,

      allowances: Number,

      bonus: Number,

      grossSalary: Number,

      pf: Number,

      professionalTax: Number,

      incomeTax: Number,

      otherDeductions: Number,

      netSalary: Number,

      status: {
        type: String,
        enum: Object.values(
          PayrollStatus,
        ),
        default:
          PayrollStatus.GENERATED,
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },

      paidAt: Date,

      deletedAt: Date,

      isLocked: {
        type: Boolean,
        default: false,
      },

      lockedAt: {
        type: Date,
      },

      lockedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },

    baseSchemaOptions,
  );

payrollSchema.index({
  companyId: 1,
});

payrollSchema.index({
  employeeId: 1,
});

payrollSchema.index({
  month: 1,
  year: 1,
});

payrollSchema.index({
  employeeId: 1,
  month: 1,
  year: 1,
});

export const Payroll =
  model<IPayroll>(
    "Payroll",
    payrollSchema,
  );