import { z } from "zod";

import {
  WorkMode,
} from "../../common/constants/enums";

export const attendanceSchema =
  z.object({
    body: z.object({

      notes:
        z.string()
          .optional(),

      workMode:
        z.nativeEnum(
          WorkMode,
        )
          .optional(),
    }),
  });