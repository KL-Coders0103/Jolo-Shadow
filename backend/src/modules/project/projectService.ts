import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";

import { projectRepository }
from "./projectRepository";

class ProjectService {

  async createProject(
    companyId: string,

    data: {
      projectName: string;
      description?: string;
      priority?: string;
      startDate?: string;
      endDate?: string;
    },
  ) {

    return projectRepository
      .createProject({
        ...data,

        companyId,

        startDate:
          data.startDate
            ? new Date(
                data.startDate,
              )
            : undefined,

        endDate:
          data.endDate
            ? new Date(
                data.endDate,
              )
            : undefined,
      });
  }

  async getProjects(
    companyId: string,
  ) {

    return projectRepository
      .getProjects(companyId);
  }

  async getProjectById(
    projectId: string,
  ) {

    const project =
      await projectRepository
        .getProjectById(
          projectId,
        );

    if (!project) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Project not found",
      );
    }

    return project;
  }

  async updateProject(
    projectId: string,

    data: Record<
      string,
      unknown
    >,
  ) {

    const project =
      await projectRepository
        .updateProject(
          projectId,
          data,
        );

    if (!project) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Project not found",
      );
    }

    return project;
  }

  async deleteProject(
    projectId: string,
  ) {

    const project =
      await projectRepository
        .deleteProject(
          projectId,
        );

    if (!project) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Project not found",
      );
    }
  }

  async assignTeams(
    projectId: string,
    teamIds: string[],
  ) {

    const project =
      await projectRepository
        .updateProject(
          projectId,
          {
            $addToSet: {
              teamIds: {
                $each: teamIds,
              },
            },
          },
        );

    if (!project) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Project not found",
      );
    }

    return project;
  }

  async assignMembers(
    projectId: string,
    memberIds: string[],
  ) {

    const project =
      await projectRepository
        .updateProject(
          projectId,
          {
            $addToSet: {
              memberIds: {
                $each:
                  memberIds,
              },
            },
          },
        );

    if (!project) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Project not found",
      );
    }

    return project;
  }

  async searchProjects(
    companyId: string,

    query: {
        search?: string;
        status?: string;
        priority?: string;
        page?: string;
        limit?: string;
    },
    ) {

    return projectRepository
        .searchProjects(
        companyId,
        {
            search:
            query.search,

            status:
            query.status,

            priority:
            query.priority,

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

export const projectService =
  new ProjectService();