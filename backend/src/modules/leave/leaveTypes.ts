import {
  Document,
  Types,
} from "mongoose";

import {
  LeaveStatus,
  LeaveType,
} from "../../common/constants/enums";

export interface ILeave
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  type: LeaveType;

  startDate: Date;

  endDate: Date;

  reason: string;

  status: LeaveStatus;

  approvedBy?: Types.ObjectId;

  comments?: string;

  deletedAt?: Date;

  days: number;
}