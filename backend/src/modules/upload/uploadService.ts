import streamifier from "streamifier";

import cloudinary from "../../config/cloudinary";

import { File } from "../../models/fileModel";

import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

class UploadService {

  private uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {

    return new Promise(
      (resolve, reject) => {

        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder,
            },

            (
              error,
              result,
            ) => {

              if (error) {
                return reject(error);
              }

              resolve(result);
            },
          );

        streamifier
          .createReadStream(
            file.buffer,
          )
          .pipe(stream);
      },
    );
  }

  async uploadSingleFile(
    file: Express.Multer.File,

    userId: string,

    companyId: string,

    module?: string,

    entityId?: string,
  ) {

    const result =
      await this.uploadToCloudinary(
        file,
        "jolo-shadow",
      );

    return File.create({
      fileName:
        result.display_name,

      originalName:
        file.originalname,

      url: result.secure_url,

      publicId:
        result.public_id,

      mimeType:
        file.mimetype,

      size: file.size,

      uploadedBy:
        userId,

      companyId,

      module,

      entityId,
    });
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],

    userId: string,

    companyId: string,

    module?: string,

    entityId?: string,
  ) {

    const uploadedFiles =
      [];

    for (const file of files) {

      const uploaded =
        await this.uploadSingleFile(
          file,
          userId,
          companyId,
          module,
          entityId,
        );

      uploadedFiles.push(
        uploaded,
      );
    }

    return uploadedFiles;
  }

  async getFiles(
    companyId: string,
  ) {

    return File.find({
      companyId,
    });
  }

  async deleteFile(
    fileId: string,
  ) {

    const file =
      await File.findById(
        fileId,
      );

    if (!file) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "File not found",
      );
    }

    await cloudinary.uploader.destroy(
      file.publicId,
    );

    await File.findByIdAndDelete(
      fileId,
    );
  }

  async getFilesByModule(
    module: string,
    entityId: string,
  ) {

    return File.find({
      module,
      entityId,
    });
  }
}

export const uploadService =
  new UploadService();