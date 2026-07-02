import { z } from 'zod';

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Team name must be at least 2 characters"),
    departmentId: z.string().uuid("Invalid Department ID").optional(),
    leadId: z.string().uuid("Invalid Lead ID").optional(),
  })
});

export const updateTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Team name must be at least 2 characters").optional(),
    departmentId: z.string().uuid("Invalid Department ID").optional().nullable(),
    leadId: z.string().uuid("Invalid Lead ID").optional().nullable(),
  })
});