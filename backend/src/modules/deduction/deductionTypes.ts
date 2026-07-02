import { Document, Types } from "mongoose";

import { DeductionType } from "../../common/constants/enums";

export interface IDeduction
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  title: string;

  description?: string;

  type: DeductionType;

  amount: number;

  month: number;

  year: number;

  approved: boolean;

  approvedBy?: Types.ObjectId;

  approvedAt?: Date;

  createdBy: Types.ObjectId;

  deletedAt?: Date;

}