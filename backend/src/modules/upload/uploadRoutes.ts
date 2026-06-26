import { Router } from "express";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { upload }
from "../../middlewares/uploadMiddleware";

import { uploadController }
from "./uploadController";

const router = Router();

router.use(
  authMiddleware,
);

router.post(
  "/single",

  upload.single("file"),

  uploadController
    .uploadSingle,
);

router.post(
  "/multiple",

  upload.array(
    "files",
    10,
  ),

  uploadController
    .uploadMultiple,
);

router.get(
  "/",
  uploadController
    .getFiles,
);

router.delete(
  "/:id",
  uploadController
    .deleteFile,
);

router.post(
  "/avatar",

  upload.single("file"),

  uploadController
    .uploadAvatar,
);

router.post(
  "/task/:taskId",

  upload.single("file"),

  uploadController
    .uploadTaskAttachment,
);

router.post(
  "/project/:projectId",

  upload.single("file"),

  uploadController
    .uploadProjectDocument,
);

router.get(
  "/module/:module/:entityId",

  uploadController
    .getFilesByModule,
);

export default router;