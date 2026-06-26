import {
  Document,
  Types,
} from "mongoose";

export interface IFile
  extends Document {

  fileName: string;

  originalName: string;

  url: string;

  publicId: string;

  mimeType: string;

  size: number;

  uploadedBy: Types.ObjectId;

  companyId: Types.ObjectId;

  module?: string;

  entityId?: Types.ObjectId;
}