import {
  Document,
  Types,
} from "mongoose";

import {
  ProjectPriority,
  ProjectStatus,
} from "../../common/constants/enums";

export interface IProject
  extends Document {

  projectName: string;

  description?: string;

  companyId: Types.ObjectId;

  teamIds: Types.ObjectId[];

  memberIds: Types.ObjectId[];

  status: ProjectStatus;

  priority: ProjectPriority;

  startDate?: Date;

  endDate?: Date;

  progress: number;

  isActive: boolean;

  deletedAt?: Date;
}