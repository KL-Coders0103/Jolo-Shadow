import {
  model,
  Schema,
} from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";

import { ITaskComment }
from "../modules/task/taskTypes";

const taskCommentSchema =
  new Schema<ITaskComment>(
    {
      taskId: {
        type:
          Schema.Types.ObjectId,

        ref: "Task",

        required: true,
      },

      userId: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },

    baseSchemaOptions,
  );

export const TaskComment =
  model<ITaskComment>(
    "TaskComment",
    taskCommentSchema,
  );