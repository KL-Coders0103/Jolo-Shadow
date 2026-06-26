import { TaskComment } from "../../models/taskCommentModel";
import { TimeLog } from "../../models/timeLogModel";

import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

import { taskRepository } from "./taskRepository";

class TaskService {

  async createTask(
    companyId: string,
    createdBy: string,
    data: Record<string, unknown>,
  ) {

    return taskRepository.createTask({
      ...data,

      companyId,

      createdBy,

      dueDate: data.dueDate
        ? new Date(
            String(data.dueDate),
          )
        : undefined,
    });
  }

  async getTasks(
    companyId: string,
  ) {

    return taskRepository.getTasks(
      companyId,
    );
  }

  async getTaskById(
    taskId: string,
  ) {

    const task =
      await taskRepository.getTaskById(
        taskId,
      );

    if (!task) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Task not found",
      );
    }

    return task;
  }

  async updateTask(
    taskId: string,
    data: Record<string, unknown>,
  ) {

    const task =
      await taskRepository.updateTask(
        taskId,
        data,
      );

    if (!task) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Task not found",
      );
    }

    return task;
  }

  async deleteTask(
    taskId: string,
  ) {

    const task =
      await taskRepository.deleteTask(
        taskId,
      );

    if (!task) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Task not found",
      );
    }
  }

  async addComment(
    taskId: string,
    userId: string,
    comment: string,
  ) {

    return TaskComment.create({
      taskId,
      userId,
      comment,
    });
  }

  async getComments(
    taskId: string,
  ) {

    return TaskComment.find({
      taskId,
    })
      .populate(
        "userId",
        "firstName lastName",
      );
  }

  async logTime(
    taskId: string,
    userId: string,
    hours: number,
    description?: string,
  ) {

    return TimeLog.create({
      taskId,
      userId,
      hours,
      description,
    });
  }

  async getTimeLogs(
    taskId: string,
  ) {

    return TimeLog.find({
      taskId,
    }).populate(
      "userId",
      "firstName lastName",
    );
  }

  async searchTasks(
    companyId: string,

    query: {
        search?: string;
        status?: string;
        priority?: string;
        assignedTo?: string;
        page?: string;
        limit?: string;
    },
    ) {

    return taskRepository
        .searchTasks(
        companyId,
        {
            search:
            query.search,

            status:
            query.status,

            priority:
            query.priority,

            assignedTo:
            query.assignedTo,

            page: Number(
            query.page || 1,
            ),

            limit: Number(
            query.limit || 10,
            ),
        },
        );
    }
}

export const taskService =
  new TaskService();