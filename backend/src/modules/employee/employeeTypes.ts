import { Document, Types }
from "mongoose";

import { UserRole }
from "../../common/constants/enums";

export interface IInvitation
  extends Document {

  email: string;

  companyId: Types.ObjectId;

  invitedBy: Types.ObjectId;

  token: string;

  expiresAt: Date;

  accepted: boolean;
}

export interface InviteEmployeeDto {
  email: string;

  role: UserRole;
}