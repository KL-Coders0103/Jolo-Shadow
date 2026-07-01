import { z } from "zod";

import {
  LeaveType,
} from "../../common/constants/enums";

export const applyLeaveSchema =
  z.object({
    body: z.object({
      type:
        z.nativeEnum(
          LeaveType,
        ),

      startDate:
        z.string(),

      endDate:
        z.string(),

      reason:
        z.string()
          .min(5),
    }),
  });