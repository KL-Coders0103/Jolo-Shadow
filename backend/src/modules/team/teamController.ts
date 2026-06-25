import { Request, Response } from "express";

import { teamService } from "./teamService";

import { ApiResponse }
from "../../common/utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

class TeamController {

  createTeam =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const team =
          await teamService
            .createTeam(
              req.user!.companyId,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Team created successfully",
            team,
          ),
        );
      },
    );

  getTeams =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const teams =
          await teamService
            .getTeams(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Teams fetched successfully",
            teams,
          ),
        );
      },
    );

  getTeamById =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const team =
          await teamService
            .getTeamById(String(req.params.id));

        return res.status(200).json(
          new ApiResponse(
            true,
            "Team fetched successfully",
            team,
          ),
        );
      },
    );

  updateTeam =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const team =
          await teamService
            .updateTeam(
              (String(req.params.id)),
              req.body,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Team updated successfully",
            team,
          ),
        );
      },
    );

  deleteTeam =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await teamService
          .deleteTeam(String(req.params.id));

        return res.status(200).json(
          new ApiResponse(
            true,
            "Team deleted successfully",
          ),
        );
      },
    );

    assignLead =
    asyncHandler(
        async (req, res) => {

        const team =
            await teamService
            .assignLead(
                (String(req.params.id)),
                req.body.teamLeadId,
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Team lead assigned successfully",
            team,
            ),
        );
        },
    );

    addMembers =
    asyncHandler(
        async (req, res) => {

        const team =
            await teamService
            .addMembers(
                (String(req.params.id)),
                req.body.memberIds,
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Members added successfully",
            team,
            ),
        );
        },
    );

    removeMember =
    asyncHandler(
        async (req, res) => {

        const team =
            await teamService
            .removeMember(
                (String(req.params.id)),
                (String(req.params.memberId))
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Member removed successfully",
            team,
            ),
        );
        },
    );
}

export const teamController =
  new TeamController();