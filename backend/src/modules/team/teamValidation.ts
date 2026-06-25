import { z } from "zod";

export const createTeamSchema =
  z.object({
    body: z.object({
      teamName:
        z.string().min(2),

      description:
        z.string().optional(),
    }),
  });

export const updateTeamSchema =
  z.object({
    body: z.object({
      teamName:
        z.string().min(2).optional(),

      description:
        z.string().optional(),
    }),
  });

export const assignLeadSchema =
  z.object({
    body: z.object({
      teamLeadId:
        z.string(),
    }),
  });

export const addMembersSchema =
  z.object({
    body: z.object({
      memberIds:
        z.array(z.string()),
    }),
  });