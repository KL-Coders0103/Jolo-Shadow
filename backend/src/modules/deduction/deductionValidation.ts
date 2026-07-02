import { z } from "zod";

import {
  DeductionType,
} from "../../common/constants/enums";

export const createDeductionSchema =
  z.object({
    body: z.object({
      employeeId:
        z.string(),

      title:
        z.string().min(2),

      description:
        z.string().optional(),

      type:
        z.nativeEnum(
          DeductionType,
        ),

      amount:
        z.number().positive(),

      month:
        z.number().min(1).max(12),

      year:
        z.number().min(2024),
    }),
  });