import {
  Request,
  Response,
} from "express";


import { ApiResponse }
from "../../common/utils/ApiResponse";

import { uploadService }
from "./uploadService";
import { asyncHandler } from "../../utils/asyncHandler";

class UploadController {

  uploadSingle =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const file =
          req.file;

        const uploaded =
          await uploadService
            .uploadSingleFile(
              file!,
              req.user!.id,
              req.user!
                .companyId,

              req.body.module,

              req.body.entityId,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "File uploaded successfully",
            uploaded,
          ),
        );
      },
    );

  uploadMultiple =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const files =
          req.files as Express
            .Multer.File[];

        const uploaded =
          await uploadService
            .uploadMultipleFiles(
              files,

              req.user!.id,

              req.user!
                .companyId,

              req.body.module,

              req.body.entityId,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Files uploaded successfully",
            uploaded,
          ),
        );
      },
    );

  getFiles =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const files =
          await uploadService
            .getFiles(
              req.user!
                .companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Files fetched successfully",
            files,
          ),
        );
      },
    );

  deleteFile =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await uploadService
          .deleteFile(String(
            req.params.id)
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "File deleted successfully",
          ),
        );
      },
    );

  uploadAvatar =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const uploaded =
          await uploadService
            .uploadSingleFile(
              req.file!,

              req.user!.id,

              req.user!.companyId,

              "avatar",

              req.user!.id,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Avatar uploaded successfully",
            uploaded,
          ),
        );
      },
    );

  uploadTaskAttachment =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const uploaded =
          await uploadService
            .uploadSingleFile(
              req.file!,

              req.user!.id,

              req.user!.companyId,

              "task",

              String(req.params.taskId)
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Task attachment uploaded successfully",
            uploaded,
          ),
        );
      },
    );

  uploadProjectDocument =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const uploaded =
          await uploadService
            .uploadSingleFile(
              req.file!,

              req.user!.id,

              req.user!.companyId,

              "project",

              String(req.params.projectId)
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Project document uploaded successfully",
            uploaded,
          ),
        );
      },
    );

  getFilesByModule =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const files =
          await uploadService
            .getFilesByModule(String(
              req.params.module),String(
              req.params.entityId)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Files fetched successfully",
            files,
          ),
        );
      },
    );
}

export const uploadController =
  new UploadController();