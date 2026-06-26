import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";
import { emitNotification } from "../../sockets/socketEvents";

import { notificationRepository }
from "./notificationRepository";

class NotificationService {

  async createNotification(
    companyId: string,

    data: {
      userId: string;
      title: string;
      message: string;
      type: string;
      metadata?: Record<
        string,
        unknown
      >;
    },
  ) {

    const notification = await notificationRepository.create({
      ...data,
      companyId,
    });

    emitNotification(data.userId, notification);

    return notification;
  }

  async getUserNotifications(
    userId: string,
  ) {

    return notificationRepository
      .getUserNotifications(
        userId,
      );
  }

  async markAsRead(
    notificationId: string,
  ) {

    const notification =
      await notificationRepository
        .markAsRead(
          notificationId,
        );

    if (!notification) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Notification not found",
      );
    }

    return notification;
  }

  async markAllAsRead(
    userId: string,
  ) {

    return notificationRepository
      .markAllAsRead(
        userId,
      );
  }

  async deleteNotification(
    notificationId: string,
  ) {

    const notification =
      await notificationRepository
        .delete(
          notificationId,
        );

    if (!notification) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Notification not found",
      );
    }
  }

  async searchNotifications(
    userId: string,

    query: {
      search?: string;
      page?: string;
      limit?: string;
    },
  ) {

    return notificationRepository
      .searchNotifications(
        userId,
        {
          search:
            query.search,

          page:
            Number(
              query.page || 1,
            ),

          limit:
            Number(
              query.limit || 10,
            ),
        },
      );
  }
}

export const notificationService =
  new NotificationService();