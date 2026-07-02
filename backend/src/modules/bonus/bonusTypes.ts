import { Document, Types } from "mongoose";

import { BonusType } from "../../common/constants/enums";

export interface IBonus
  extends Document {

  employeeId: Types.ObjectId;

  companyId: Types.ObjectId;

  title: string;

  description?: string;

  type: BonusType;

  amount: number;

  month: number;

  year: number;

  approved: boolean;

  approvedBy?: Types.ObjectId;

  approvedAt?: Date;

  createdBy: Types.ObjectId;

  deletedAt?: Date;

}