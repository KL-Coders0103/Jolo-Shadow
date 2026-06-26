import { z } from "zod";

export const deleteFileSchema =
  z.object({
    params: z.object({
      id: z.string(),
    }),
  });