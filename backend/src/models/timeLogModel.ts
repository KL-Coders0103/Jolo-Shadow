import {
  model,
  Schema,
} from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";

import { ITimeLog }
from "../modules/task/taskTypes";

const timeLogSchema =
  new Schema<ITimeLog>(
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

      hours: {
        type: Number,
        required: true,
      },

      description:
        String,
    },

    baseSchemaOptions,
  );

export const TimeLog =
  model<ITimeLog>(
    "TimeLog",
    timeLogSchema,
  );