import { z } from "zod";

import { BonusType } from "../../common/constants/enums";

export const createBonusSchema =
  z.object({
    body: z.object({
      employeeId: z.string(),

      title: z.string().min(2),

      description:
        z.string().optional(),

      type: z.nativeEnum(
        BonusType,
      ),

      amount:
        z.number().positive(),

      month:
        z.number().min(1).max(12),

      year:
        z.number().min(2024),
    }),
  });