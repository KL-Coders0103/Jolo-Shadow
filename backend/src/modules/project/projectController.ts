import {
  Request,
  Response,
} from "express";


import { ApiResponse }
from "../../common/utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { projectService } from "./projectService";

class ProjectController {

  createProject =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const project =
          await projectService
            .createProject(
              req.user!.companyId,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Project created successfully",
            project,
          ),
        );
      },
    );

  getProjects =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const projects =
          await projectService
            .getProjects(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Projects fetched successfully",
            projects,
          ),
        );
      },
    );

  getProjectById =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const project =
          await projectService
            .getProjectById(String(
              req.params.id)
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Project fetched successfully",
            project,
          ),
        );
      },
    );

  updateProject =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const project =
          await projectService
            .updateProject(String(
              req.params.id),
              req.body,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Project updated successfully",
            project,
          ),
        );
      },
    );

  deleteProject =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await projectService
          .deleteProject(String(
            req.params.id)
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Project deleted successfully",
          ),
        );
      },
    );

  assignTeams =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const project =
          await projectService
            .assignTeams(String(
              req.params.id),
              req.body.teamIds,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Teams assigned successfully",
            project,
          ),
        );
      },
    );

  assignMembers =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const project =
          await projectService
            .assignMembers(String(
              req.params.id),
              req.body.memberIds,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Members assigned successfully",
            project,
          ),
        );
      },
    );

    searchProjects =
    asyncHandler(
        async (
        req: Request,
        res: Response,
        ) => {

        const projects =
            await projectService
            .searchProjects(
                req.user!.companyId,

                req.query,
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Projects fetched successfully",
            projects,
            ),
        );
        },
    );
}

export const projectController =
  new ProjectController();