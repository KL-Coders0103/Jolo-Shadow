import { Project }
from "../../models/projectModel";

class ProjectRepository {

  async createProject(
    data:
      Record<string, unknown>,
  ) {

    return Project.create(data);
  }

  async getProjects(
    companyId: string,
  ) {

    return Project.find({
      companyId,
      deletedAt: null,
    })
      .populate(
        "teamIds",
        "teamName",
      )
      .populate(
        "memberIds",
        "firstName lastName email",
      );
  }

  async getProjectById(
    projectId: string,
  ) {

    return Project.findById(
      projectId,
    )
      .populate(
        "teamIds",
        "teamName",
      )
      .populate(
        "memberIds",
        "firstName lastName email",
      );
  }

  async updateProject(
    projectId: string,

    data:
      Record<string, unknown>,
  ) {

    return Project.findByIdAndUpdate(
      projectId,
      data,
      { new: true },
    );
  }

  async deleteProject(
    projectId: string,
  ) {

    return Project.findByIdAndUpdate(
      projectId,
      {
        deletedAt:
          new Date(),
      },

      { new: true },
    );
  }

  async searchProjects(
    companyId: string,
    filters: {
        search?: string;
        status?: string;
        priority?: string;
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
            projectName: {
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

    const skip =
        (filters.page - 1) *
        filters.limit;

    const [projects, total] =
        await Promise.all([
        Project.find(query)
            .populate(
            "teamIds",
            "teamName",
            )
            .populate(
            "memberIds",
            "firstName lastName email",
            )
            .skip(skip)
            .limit(filters.limit),

        Project.countDocuments(
            query,
        ),
        ]);

    return {
        projects,
        total,
        page: filters.page,

        pages: Math.ceil(
        total /
            filters.limit,
        ),
    };
    }
}

export const projectRepository =
  new ProjectRepository();