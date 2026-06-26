import {
  Document,
  Types,
} from "mongoose";

import {
  TaskPriority,
  TaskStatus,
} from "../../common/constants/enums";

export interface ITask
  extends Document {

  title: string;

  description?: string;

  companyId: Types.ObjectId;

  projectId: Types.ObjectId;

  assignedTo?: Types.ObjectId;

  createdBy: Types.ObjectId;

  parentTaskId?: Types.ObjectId;

  status: TaskStatus;

  priority: TaskPriority;

  dueDate?: Date;

  estimatedHours?: number;

  actualHours: number;

  progress: number;

  isRecurring: boolean;

  recurrenceRule?: string;

  attachments: string[];

  isActive: boolean;

  deletedAt?: Date;
}

export interface ITaskComment
  extends Document {

  taskId: Types.ObjectId;

  userId: Types.ObjectId;

  comment: string;
}

export interface ITimeLog
  extends Document {

  taskId: Types.ObjectId;

  userId: Types.ObjectId;

  hours: number;

  description?: string;
}