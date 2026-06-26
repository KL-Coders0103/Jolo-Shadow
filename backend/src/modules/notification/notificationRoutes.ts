import { Router } from "express";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
  createNotificationSchema,
} from "./notificationValidation";

import { notificationController }
from "./notificationController";

const router = Router();

router.use(
  authMiddleware,
);

router.post(
  "/",

  validate(
    createNotificationSchema,
  ),

  notificationController
    .createNotification,
);

router.get(
  "/my",

  notificationController
    .getMyNotifications,
);

router.get(
  "/search",

  notificationController
    .searchNotifications,
);

router.patch(
  "/:id/read",

  notificationController
    .markAsRead,
);

router.patch(
  "/read-all",

  notificationController
    .markAllAsRead,
);

router.delete(
  "/:id",

  notificationController
    .deleteNotification,
);

export default router;