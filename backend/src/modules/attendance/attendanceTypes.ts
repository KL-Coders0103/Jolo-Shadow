import {
  Document,
  Types,
} from "mongoose";

import {
  AttendanceStatus,
  WorkMode,
} from "../../common/constants/enums";

export interface IAttendance
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  checkIn?: Date;

  checkOut?: Date;

  breakStart?: Date;

  breakEnd?: Date;

  totalHours?: number;

  status: AttendanceStatus;

  notes?: string;

  deletedAt?: Date;

  workMode: WorkMode;
}