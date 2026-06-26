import { Notification }
from "../../models/notificationModel";

class NotificationRepository {

  async create(
    data:
      Record<string, unknown>,
  ) {

    return Notification.create(
      data,
    );
  }

  async getUserNotifications(
    userId: string,
  ) {

    return Notification.find({
      userId,

      deletedAt: null,
    })
      .sort({
        createdAt: -1,
      });
  }

  async markAsRead(
    id: string,
  ) {

    return Notification.findByIdAndUpdate(
      id,

      {
        isRead: true,
      },

      {
        new: true,
      },
    );
  }

  async markAllAsRead(
    userId: string,
  ) {

    return Notification.updateMany(
      {
        userId,
      },

      {
        isRead: true,
      },
    );
  }

  async delete(
    id: string,
  ) {

    return Notification.findByIdAndUpdate(
      id,

      {
        deletedAt:
          new Date(),
      },

      {
        new: true,
      },
    );
  }

  async searchNotifications(
    userId: string,

    query: {
      search?: string;
      page: number;
      limit: number;
    },
  ) {

    const filter: any = {
      userId,
      deletedAt: null,
    };

    if (query.search) {

      filter.$or = [
        {
          title: {
            $regex:
              query.search,

            $options: "i",
          },
        },

        {
          message: {
            $regex:
              query.search,

            $options: "i",
          },
        },
      ];
    }

    const skip =
      (query.page - 1) *
      query.limit;

    const [notifications, total] =
      await Promise.all([

        Notification.find(
          filter,
        )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(query.limit),

        Notification.countDocuments(
          filter,
        ),
      ]);

    return {
      notifications,
      total,

      page:
        query.page,

      pages:
        Math.ceil(
          total /
            query.limit,
        ),
    };
  }
}

export const notificationRepository =
  new NotificationRepository();