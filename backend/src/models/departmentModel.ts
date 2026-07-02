import {
  Schema,
  model,
} from "mongoose";

import { baseSchemaOptions } from "../common/constants/database";

import { IDepartment } from "../modules/department/departmentTypes";

const departmentSchema =
  new Schema<IDepartment>(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      code: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },

      description: {
        type: String,
        trim: true,
      },

      head: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      deletedAt: {
        type: Date,
      },
    },
    baseSchemaOptions,
  );

departmentSchema.index({
  companyId: 1,
  name: 1,
});

departmentSchema.index({
  companyId: 1,
  code: 1,
});

export const Department =
  model<IDepartment>(
    "Department",
    departmentSchema,
  );