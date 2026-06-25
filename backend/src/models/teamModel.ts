import { model, Schema } from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";
import { ITeam } from "../modules/team/teamTypes";

const teamSchema = new Schema<ITeam>(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    teamLeadId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  baseSchemaOptions,
);

teamSchema.index({
  companyId: 1,
});

export const Team = model<ITeam>(
  "Team",
  teamSchema,
);