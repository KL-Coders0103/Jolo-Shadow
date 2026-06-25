import { Document, Types }
from "mongoose";

export interface ITeam
  extends Document {
  teamName: string;
  description?: string;
  companyId: Types.ObjectId;
  teamLeadId?: Types.ObjectId;
  members: Types.ObjectId[];
  isActive: boolean;
}