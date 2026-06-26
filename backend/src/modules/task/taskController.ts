import {
  Request,
  Response,
} from "express";


import { ApiResponse }
from "../../common/utils/ApiResponse";

import { taskService }
from "./taskService";
import { asyncHandler } from "../../utils/asyncHandler";

class TaskController {

  createTask =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const task =
          await taskService
            .createTask(
              req.user!.companyId,
              req.user!.id,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Task created successfully",
            task,
          ),
        );
      },
    );

  getTasks =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const tasks =
          await taskService
            .getTasks(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Tasks fetched successfully",
            tasks,
          ),
        );
      },
    );

  getTaskById =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const task =
          await taskService
            .getTaskById(String(
              req.params.id)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Task fetched successfully",
            task,
          ),
        );
      },
    );

  updateTask =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const task =
          await taskService
            .updateTask(String(
              req.params.id),
              req.body,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Task updated successfully",
            task,
          ),
        );
      },
    );

  deleteTask =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await taskService
          .deleteTask(String(
            req.params.id)
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Task deleted successfully",
          ),
        );
      },
    );

  addComment =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const comment =
          await taskService
            .addComment(String(
              req.params.id),
              req.user!.id,
              req.body.comment,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Comment added successfully",
            comment,
          ),
        );
      },
    );

  getComments =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const comments =
          await taskService
            .getComments(String(
              req.params.id)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Comments fetched successfully",
            comments,
          ),
        );
      },
    );

  logTime =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const timeLog =
          await taskService
            .logTime(String(
              req.params.id),
              req.user!.id,
              req.body.hours,
              req.body.description,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Time logged successfully",
            timeLog,
          ),
        );
      },
    );

  getTimeLogs =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const logs =
          await taskService
            .getTimeLogs(String(
              req.params.id)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Time logs fetched successfully",
            logs,
          ),
        );
      },
    );

    searchTasks =
    asyncHandler(
        async (
        req: Request,
        res: Response,
        ) => {

        const tasks =
            await taskService
            .searchTasks(
                req.user!.companyId,

                req.query,
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Tasks fetched successfully",
            tasks,
            ),
        );
        },
    );
}

export const taskController =
  new TaskController();