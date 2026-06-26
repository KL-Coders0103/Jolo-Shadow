import {
  model,
  Schema,
} from "mongoose";

import {
  ProjectPriority,
  ProjectStatus,
} from "../common/constants/enums";

import { baseSchemaOptions }
from "../common/constants/database";

import { IProject }
from "../modules/project/projectTypes";

const projectSchema =
  new Schema<IProject>(
    {
      projectName: {
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

      teamIds: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "Team",
        },
      ],

      memberIds: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "User",
        },
      ],

      status: {
        type: String,

        enum:
          Object.values(
            ProjectStatus,
          ),

        default:
          ProjectStatus.PLANNING,
      },

      priority: {
        type: String,

        enum:
          Object.values(
            ProjectPriority,
          ),

        default:
          ProjectPriority.MEDIUM,
      },

      startDate: Date,

      endDate: Date,

      progress: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      deletedAt: Date,
    },

    baseSchemaOptions,
  );

projectSchema.index({
  companyId: 1,
});

projectSchema.index({
  status: 1,
});

projectSchema.index({
  priority: 1,
});

export const Project =
  model<IProject>(
    "Project",
    projectSchema,
  );