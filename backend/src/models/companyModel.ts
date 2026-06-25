import { model, Schema } from "mongoose";

import {
  CompanyStatus,
  SubscriptionPlan,
} from "../common/constants/enums";

import { baseSchemaOptions } from "../common/constants/database";
import { ICompany } from "../modules/auth/authTypes";

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
    },

    companyLogo: String,

    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    subscriptionPlan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      default: SubscriptionPlan.FREE,
    },

    status: {
      type: String,
      enum: Object.values(CompanyStatus),
      default: CompanyStatus.ACTIVE,
    },
  },
  baseSchemaOptions,
);

export const Company = model<ICompany>(
  "Company",
  companySchema,
);