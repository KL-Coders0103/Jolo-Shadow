import {
  Schema,
  model,
} from "mongoose";

import {
  baseSchemaOptions,
} from "../common/constants/database";

import {
  DeductionType,
} from "../common/constants/enums";

import {
  IDeduction,
} from "../modules/deduction/deductionTypes";

const deductionSchema =
  new Schema<IDeduction>(
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

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
      },

      type: {
        type: String,
        enum: Object.values(
          DeductionType,
        ),
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      month: {
        type: Number,
        required: true,
      },

      year: {
        type: Number,
        required: true,
      },

      approved: {
        type: Boolean,
        default: false,
      },

      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      approvedAt: {
        type: Date,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      deletedAt: {
        type: Date,
      },
    },
    baseSchemaOptions,
  );

deductionSchema.index({
  employeeId: 1,
  month: 1,
  year: 1,
});

deductionSchema.index({
  companyId: 1,
});

deductionSchema.index({
  approved: 1,
});

export const Deduction =
  model<IDeduction>(
    "Deduction",
    deductionSchema,
  );