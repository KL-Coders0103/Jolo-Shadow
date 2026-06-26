import { Router } from "express";

import { taskController }
from "./taskController";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
  createTaskSchema,
  updateTaskSchema,
  addCommentSchema,
  logTimeSchema,
} from "./taskValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createTaskSchema),
  taskController.createTask,
);

router.get(
  "/",
  taskController.getTasks,
);

router.get(
  "/search",
  taskController.searchTasks,
);

router.get(
  "/:id",
  taskController.getTaskById,
);

router.patch(
  "/:id",
  validate(updateTaskSchema),
  taskController.updateTask,
);

router.delete(
  "/:id",
  taskController.deleteTask,
);

router.post(
  "/:id/comments",
  validate(addCommentSchema),
  taskController.addComment,
);

router.get(
  "/:id/comments",
  taskController.getComments,
);

router.post(
  "/:id/time-logs",
  validate(logTimeSchema),
  taskController.logTime,
);

router.get(
  "/:id/time-logs",
  taskController.getTimeLogs,
);

export default router;