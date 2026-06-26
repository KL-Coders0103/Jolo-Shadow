import { z } from "zod";

import {
  ProjectPriority,
  ProjectStatus,
} from "../../common/constants/enums";

export const createProjectSchema =
  z.object({
    body: z.object({
      projectName:
        z.string().min(2),

      description:
        z.string().optional(),

      priority: z
        .nativeEnum(
          ProjectPriority,
        )
        .optional(),

      startDate:
        z.string().optional(),

      endDate:
        z.string().optional(),
    }),
  });

export const updateProjectSchema =
  z.object({
    body: z.object({
      projectName:
        z.string()
          .min(2)
          .optional(),

      description:
        z.string()
          .optional(),

      status:
        z.nativeEnum(
          ProjectStatus,
        )
        .optional(),

      priority:
        z.nativeEnum(
          ProjectPriority,
        )
        .optional(),

      progress:
        z.number()
          .min(0)
          .max(100)
          .optional(),

      startDate:
        z.string()
          .optional(),

      endDate:
        z.string()
          .optional(),
    }),
  });

export const assignTeamsSchema =
  z.object({
    body: z.object({
      teamIds:
        z.array(
          z.string(),
        ),
    }),
  });

export const assignMembersSchema =
  z.object({
    body: z.object({
      memberIds:
        z.array(
          z.string(),
        ),
    }),
  });