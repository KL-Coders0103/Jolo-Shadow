import { z } from "zod";

import { NotificationType }
from "../../common/constants/enums";

export const createNotificationSchema =
  z.object({
    body: z.object({
      userId:
        z.string(),

      title:
        z.string()
          .min(2),

      message:
        z.string()
          .min(2),

      type:
        z.nativeEnum(
          NotificationType,
        ),
    }),
  });