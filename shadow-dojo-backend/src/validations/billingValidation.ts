import { z } from 'zod';

export const createCheckoutSchema = z.object({
  body: z.object({
    plan: z.enum(['STARTER', 'PRO', 'ENTERPRISE'], {
      message: "A valid subscription plan is required"
    })
  })
});