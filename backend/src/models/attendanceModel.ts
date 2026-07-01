import {
  model,
  Schema,
} from "mongoose";

import {
  AttendanceStatus,
  WorkMode,
} from "../common/constants/enums";

import {
  IAttendance,
} from "../modules/attendance/attendanceTypes";

import {
  baseSchemaOptions,
} from "../common/constants/database";

const attendanceSchema =
  new Schema<IAttendance>(
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

      checkIn: Date,

      checkOut: Date,

      breakStart: Date,

      breakEnd: Date,

      totalHours: Number,

      status: {
        type: String,

        enum:
          Object.values(
            AttendanceStatus,
          ),

        default:
          AttendanceStatus.PRESENT,
      },

      notes: String,

      deletedAt: Date,

      workMode: {
      type: String,

      enum: Object.values(
        WorkMode,
      ),

      default: WorkMode.OFFICE,
    },
    },

    baseSchemaOptions,
  );

attendanceSchema.index({
  employeeId: 1,
});

attendanceSchema.index({
  companyId: 1,
});

attendanceSchema.index({
  createdAt: -1,
});

export const Attendance =
  model<IAttendance>(
    "Attendance",
    attendanceSchema,
  );