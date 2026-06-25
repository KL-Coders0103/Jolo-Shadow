import { UserRole } from "../constants/enums";

export interface TokenPayload {
  userId: string;
  companyId?: string;
  role: UserRole;
}