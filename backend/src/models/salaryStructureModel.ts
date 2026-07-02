import {
  Schema,
  model,
} from "mongoose";

import {
  baseSchemaOptions,
} from "../common/constants/database";

import {
  ISalaryStructure,
} from "../modules/salaryStructure/salaryStructureTypes";

const salaryStructureSchema =
  new Schema<ISalaryStructure>(
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

      basicSalary: {
        type: Number,
        required: true,
      },

      hra: {
        type: Number,
        default: 0,
      },

      allowances: {
        type: Number,
        default: 0,
      },

      bonus: {
        type: Number,
        default: 0,
      },

      pf: {
        type: Number,
        default: 0,
      },

      professionalTax: {
        type: Number,
        default: 0,
      },

      incomeTax: {
        type: Number,
        default: 0,
      },

      otherDeductions: {
        type: Number,
        default: 0,
      },

      grossSalary: {
        type: Number,
        required: true,
      },

      netSalary: {
        type: Number,
        required: true,
      },

      effectiveFrom: {
        type: Date,
        required: true,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      deletedAt: Date,
    },
    baseSchemaOptions,
  );

salaryStructureSchema.index({
  companyId: 1,
});

salaryStructureSchema.index({
  employeeId: 1,
});

salaryStructureSchema.index({
  effectiveFrom: -1,
});

export const SalaryStructure =
  model<ISalaryStructure>(
    "SalaryStructure",
    salaryStructureSchema,
  );