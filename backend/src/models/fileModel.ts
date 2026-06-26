import {
  model,
  Schema,
} from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";

import { IFile }
from "../modules/upload/uploadTypes";

const fileSchema =
  new Schema<IFile>(
    {
      fileName: {
        type: String,
        required: true,
      },

      originalName: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        required: true,
      },

      mimeType: {
        type: String,
        required: true,
      },

      size: {
        type: Number,
        required: true,
      },

      uploadedBy: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      companyId: {
        type:
          Schema.Types.ObjectId,

        ref: "Company",

        required: true,
      },

      module: {
        type: String,
      },

      entityId: {
        type:
          Schema.Types.ObjectId,
      },
    },

    baseSchemaOptions,
  );

fileSchema.index({
  companyId: 1,
});

fileSchema.index({
  uploadedBy: 1,
});

fileSchema.index({
  module: 1,
});

export const File =
  model<IFile>(
    "File",
    fileSchema,
  );