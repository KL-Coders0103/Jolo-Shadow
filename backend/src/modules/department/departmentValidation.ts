import { z } from "zod";

export const createDepartmentSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .min(2)
        .max(100),

      code: z
        .string()
        .min(2)
        .max(10),

      description: z
        .string()
        .optional(),

      head: z
        .string()
        .optional(),
    }),
  });

export const updateDepartmentSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .min(2)
        .max(100)
        .optional(),

      code: z
        .string()
        .min(2)
        .max(10)
        .optional(),

      description: z
        .string()
        .optional(),

      head: z
        .string()
        .optional(),

      isActive: z
        .boolean()
        .optional(),
    }),
  });