import {
  Document,
  Types,
} from "mongoose";

import { NotificationType }
from "../../common/constants/enums";

export interface INotification
  extends Document {

  userId: Types.ObjectId;

  companyId: Types.ObjectId;

  title: string;

  message: string;

  type: NotificationType;

  isRead: boolean;

  metadata?: Record<
    string,
    unknown
  >;

  deletedAt?: Date;
}