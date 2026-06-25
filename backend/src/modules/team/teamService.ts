import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";

import { teamRepository }
from "./teamRepository";

class TeamService {

  async createTeam(
    companyId: string,
    data: {
      teamName: string;
      description?: string;
    },
  ) {

    return teamRepository
      .createTeam({
        ...data,
        companyId,
      });
  }

  async getTeams(
    companyId: string,
  ) {

    return teamRepository
      .getTeams(companyId);
  }

  async getTeamById(
    teamId: string,
  ) {

    const team =
      await teamRepository
        .getTeamById(teamId);

    if (!team) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
      );
    }

    return team;
  }

  async updateTeam(
    teamId: string,
    data: Record<string, unknown>,
  ) {

    const team =
      await teamRepository
        .updateTeam(
          teamId,
          data,
        );

    if (!team) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
      );
    }

    return team;
  }

  async deleteTeam(
    teamId: string,
  ) {

    const team =
      await teamRepository
        .deleteTeam(teamId);

    if (!team) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
      );
    }
  }

  async assignLead(
    teamId: string,
    teamLeadId: string,
    ) {

    const team =
        await teamRepository
        .updateTeam(
            teamId,
            {
            teamLeadId,
            },
        );

    if (!team) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
        );
    }

    return team;
    }

    async addMembers(
    teamId: string,
    memberIds: string[],
    ) {

    const team =
        await teamRepository
        .updateTeam(
            teamId,
            {
            $addToSet: {
                members: {
                $each: memberIds,
                },
            },
            },
        );

    if (!team) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
        );
    }

    return team;
    }

    async removeMember(
    teamId: string,
    memberId: string,
    ) {

    const team =
        await teamRepository
        .updateTeam(
            teamId,
            {
            $pull: {
                members: memberId,
            },
            },
        );

    if (!team) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Team not found",
        );
    }

    return team;
    }
}

export const teamService =
  new TeamService();