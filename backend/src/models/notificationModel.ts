import {
  model,
  Schema,
} from "mongoose";

import { baseSchemaOptions }
from "../common/constants/database";

import { NotificationType }
from "../common/constants/enums";

import { INotification }
from "../modules/notification/notificationTypes";

const notificationSchema =
  new Schema<INotification>(
    {
      userId: {
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

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,

        enum:
          Object.values(
            NotificationType,
          ),

        default:
          NotificationType.SYSTEM,
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      metadata: {
        type: Schema.Types.Mixed,
      },

      deletedAt: Date,
    },

    baseSchemaOptions,
  );

notificationSchema.index({
  userId: 1,
});

notificationSchema.index({
  companyId: 1,
});

notificationSchema.index({
  isRead: 1,
});

notificationSchema.index({
  type: 1,
});

export const Notification =
  model<INotification>(
    "Notification",
    notificationSchema,
  );