import { z } from "zod";

export const generatePayrollSchema =
  z.object({
    body: z.object({

      employeeId:
        z.string(),

      month:
        z.number()
          .min(1)
          .max(12),

      year:
        z.number()
          .min(2024),
    }),
  });