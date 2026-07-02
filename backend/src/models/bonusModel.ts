import {
  Schema,
  model,
} from "mongoose";

import {
  BonusType,
} from "../common/constants/enums";

import {
  baseSchemaOptions,
} from "../common/constants/database";

import {
  IBonus,
} from "../modules/bonus/bonusTypes";

const bonusSchema =
  new Schema<IBonus>(
    {
      employeeId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
      },

      type: {
        type: String,
        enum: Object.values(
          BonusType,
        ),
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
      },

      year: {
        type: Number,
        required: true,
      },

      approved: {
        type: Boolean,
        default: false,
      },

      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      approvedAt: {
        type: Date,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      deletedAt: {
        type: Date,
      },
    },
    baseSchemaOptions,
  );

bonusSchema.index({
  employeeId: 1,
  month: 1,
  year: 1,
});

bonusSchema.index({
  companyId: 1,
});

bonusSchema.index({
  approved: 1,
});

export const Bonus =
  model<IBonus>(
    "Bonus",
    bonusSchema,
  );