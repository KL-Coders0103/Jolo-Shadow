import { z } from "zod";

import {
  TaskPriority,
  TaskStatus,
} from "../../common/constants/enums";

export const createTaskSchema =
  z.object({
    body: z.object({
      title:
        z.string().min(2),

      description:
        z.string().optional(),

      projectId:
        z.string(),

      assignedTo:
        z.string().optional(),

      priority:
        z.nativeEnum(
          TaskPriority,
        ).optional(),

      dueDate:
        z.string().optional(),

      estimatedHours:
        z.number().optional(),
    }),
  });

export const updateTaskSchema =
  z.object({
    body: z.object({
      title:
        z.string()
          .min(2)
          .optional(),

      description:
        z.string()
          .optional(),

      status:
        z.nativeEnum(
          TaskStatus,
        ).optional(),

      priority:
        z.nativeEnum(
          TaskPriority,
        ).optional(),

      progress:
        z.number()
          .min(0)
          .max(100)
          .optional(),

      dueDate:
        z.string()
          .optional(),
    }),
  });

export const addCommentSchema =
  z.object({
    body: z.object({
      comment:
        z.string().min(1),
    }),
  });

export const logTimeSchema =
  z.object({
    body: z.object({
      hours:
        z.number()
          .min(0.5),

      description:
        z.string()
          .optional(),
    }),
  });