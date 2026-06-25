import { SchemaOptions } from "mongoose";

export const baseSchemaOptions: SchemaOptions = {
  timestamps: true,

  versionKey: false,

  toJSON: {
    virtuals: true,
  },

  toObject: {
    virtuals: true,
  },
};