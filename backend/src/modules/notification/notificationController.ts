import {
  Request,
  Response,
} from "express";

import { ApiResponse }
from "../../common/utils/ApiResponse";

import { notificationService }
from "./notificationService";
import { asyncHandler } from "../../utils/asyncHandler";

class NotificationController {

  createNotification =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const notification =
          await notificationService
            .createNotification(
              req.user!.companyId,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Notification created successfully",
            notification,
          ),
        );
      },
    );

  getMyNotifications =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const notifications =
          await notificationService
            .getUserNotifications(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Notifications fetched successfully",
            notifications,
          ),
        );
      },
    );

  markAsRead =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const notification =
          await notificationService
            .markAsRead(String(
              req.params.id)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Notification marked as read",
            notification,
          ),
        );
      },
    );

  markAllAsRead =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await notificationService
          .markAllAsRead(
            req.user!.id,
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "All notifications marked as read",
          ),
        );
      },
    );

  deleteNotification =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await notificationService
          .deleteNotification(String(
            req.params.id)
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Notification deleted successfully",
          ),
        );
      },
    );

  searchNotifications =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const data =
          await notificationService
            .searchNotifications(
              req.user!.id,

              req.query,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Notifications fetched successfully",
            data,
          ),
        );
      },
    );
}

export const notificationController =
  new NotificationController();