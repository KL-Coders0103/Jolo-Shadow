import {
  model,
  Schema,
} from "mongoose";

import {
  TaskPriority,
  TaskStatus,
} from "../common/constants/enums";

import { baseSchemaOptions }
from "../common/constants/database";

import { ITask }
from "../modules/task/taskTypes";

const taskSchema =
  new Schema<ITask>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: String,

      companyId: {
        type:
          Schema.Types.ObjectId,

        ref: "Company",

        required: true,
      },

      projectId: {
        type:
          Schema.Types.ObjectId,

        ref: "Project",

        required: true,
      },

      assignedTo: {
        type:
          Schema.Types.ObjectId,

        ref: "User",
      },

      createdBy: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      parentTaskId: {
        type:
          Schema.Types.ObjectId,

        ref: "Task",
      },

      status: {
        type: String,

        enum:
          Object.values(
            TaskStatus,
          ),

        default:
          TaskStatus.TODO,
      },

      priority: {
        type: String,

        enum:
          Object.values(
            TaskPriority,
          ),

        default:
          TaskPriority.MEDIUM,
      },

      dueDate: Date,

      estimatedHours:
        Number,

      actualHours: {
        type: Number,
        default: 0,
      },

      progress: {
        type: Number,
        default: 0,
      },

      isRecurring: {
        type: Boolean,
        default: false,
      },

      recurrenceRule:
        String,

      attachments: [
        String,
      ],

      isActive: {
        type: Boolean,
        default: true,
      },

      deletedAt: Date,
    },

    baseSchemaOptions,
  );

taskSchema.index({
  companyId: 1,
});

taskSchema.index({
  projectId: 1,
});

taskSchema.index({
  assignedTo: 1,
});

taskSchema.index({
  status: 1,
});

taskSchema.index({
  priority: 1,
});

export const Task =
  model<ITask>(
    "Task",
    taskSchema,
  );