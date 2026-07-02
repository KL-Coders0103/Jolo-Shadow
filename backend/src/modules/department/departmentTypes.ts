import { Document, Types } from "mongoose";

export interface IDepartment extends Document {
  companyId: Types.ObjectId;

  name: string;

  code: string;

  description?: string;

  head?: Types.ObjectId;

  isActive: boolean;

  deletedAt?: Date;
}