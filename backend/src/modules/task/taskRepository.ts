import { Task }
from "../../models/taskModel";

class TaskRepository {

  async createTask(
    data:
      Record<string, unknown>,
  ) {

    return Task.create(data);
  }

  async getTasks(
    companyId: string,
  ) {

    return Task.find({
      companyId,
      deletedAt: null,
    })
      .populate(
        "projectId",
        "projectName",
      )
      .populate(
        "assignedTo",
        "firstName lastName email",
      )
      .populate(
        "createdBy",
        "firstName lastName",
      );
  }

  async getTaskById(
    taskId: string,
  ) {

    return Task.findById(
      taskId,
    )
      .populate(
        "projectId",
        "projectName",
      )
      .populate(
        "assignedTo",
        "firstName lastName email",
      )
      .populate(
        "createdBy",
        "firstName lastName",
      );
  }

  async updateTask(
    taskId: string,

    data:
      Record<string, unknown>,
  ) {

    return Task.findByIdAndUpdate(
      taskId,
      data,
      { new: true },
    );
  }

  async deleteTask(
    taskId: string,
  ) {

    return Task.findByIdAndUpdate(
      taskId,
      {
        deletedAt:
          new Date(),
      },

      { new: true },
    );
  }

  async searchTasks(
    companyId: string,

    filters: {
        search?: string;
        status?: string;
        priority?: string;
        assignedTo?: string;
        page: number;
        limit: number;
    },
    ) {

    const query: Record<
        string,
        unknown
    > = {
        companyId,
        deletedAt: null,
    };

    if (filters.search) {

        query.$or = [
        {
            title: {
            $regex:
                filters.search,

            $options: "i",
            },
        },

        {
            description: {
            $regex:
                filters.search,

            $options: "i",
            },
        },
        ];
    }

    if (filters.status) {
        query.status =
        filters.status;
    }

    if (filters.priority) {
        query.priority =
        filters.priority;
    }

    if (filters.assignedTo) {
        query.assignedTo =
        filters.assignedTo;
    }

    const skip =
        (filters.page - 1) *
        filters.limit;

    const [tasks, total] =
        await Promise.all([

        Task.find(query)
            .populate(
            "projectId",
            "projectName",
            )
            .populate(
            "assignedTo",
            "firstName lastName email",
            )
            .skip(skip)
            .limit(filters.limit),

        Task.countDocuments(
            query,
        ),
        ]);

    return {
        tasks,
        total,
        page: filters.page,

        pages: Math.ceil(
        total /
            filters.limit,
        ),
    };
    }
}

export const taskRepository =
  new TaskRepository();