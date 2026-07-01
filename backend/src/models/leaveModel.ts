import {
  model,
  Schema,
} from "mongoose";

import {
  LeaveStatus,
  LeaveType,
} from "../common/constants/enums";

import {
  ILeave,
} from "../modules/leave/leaveTypes";

import {
  baseSchemaOptions,
} from "../common/constants/database";

const leaveSchema =
  new Schema<ILeave>(
    {
      employeeId: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      companyId: {
        type:
          Schema.Types.ObjectId,

        ref: "Company",

        required: true,
      },

      type: {
        type: String,

        enum:
          Object.values(
            LeaveType,
          ),

        required: true,
      },

      startDate: {
        type: Date,

        required: true,
      },

      endDate: {
        type: Date,

        required: true,
      },

      reason: {
        type: String,

        required: true,
      },

      status: {
        type: String,

        enum:
          Object.values(
            LeaveStatus,
          ),

        default:
          LeaveStatus.PENDING,
      },

      approvedBy: {
        type:
          Schema.Types.ObjectId,

        ref: "User",
      },

      comments: String,

      deletedAt: Date,

      days: {
        type: Number,
        default: 1,
      },
    },

    baseSchemaOptions,
  );

leaveSchema.index({
  employeeId: 1,
});

leaveSchema.index({
  companyId: 1,
});

leaveSchema.index({
  status: 1,
});

export const Leave =
  model<ILeave>(
    "Leave",
    leaveSchema,
  );