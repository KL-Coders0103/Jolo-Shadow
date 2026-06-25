import { z } from "zod";

export const inviteEmployeeSchema =
  z.object({
    body: z.object({
      email: z.email(),

      role: z.enum([
        "TEAM_LEAD",
        "EMPLOYEE",
      ]),
    }),
  });

export const acceptInvitationSchema =
  z.object({
    body: z.object({
      token: z.string(),

      firstName: z.string().min(2),

      lastName: z.string().min(2),

      password: z
        .string()
        .min(8),
    }),
  });