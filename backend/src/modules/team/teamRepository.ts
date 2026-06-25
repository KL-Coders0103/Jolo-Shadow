import { Team }
from "../../models/teamModel";

class TeamRepository {

  async createTeam(
    data: Record<string, unknown>,
  ) {
    return Team.create(data);
  }

  async getTeams(
    companyId: string,
  ) {
    return Team.find({
      companyId,
    })
      .populate(
        "teamLeadId",
        "firstName lastName email",
      )
      .populate(
        "members",
        "firstName lastName email",
      );
  }

  async getTeamById(
    teamId: string,
  ) {
    return Team.findById(teamId)
      .populate(
        "teamLeadId",
        "firstName lastName email",
      )
      .populate(
        "members",
        "firstName lastName email",
      );
  }

  async updateTeam(
    teamId: string,
    data: Record<string, unknown>,
  ) {
    return Team.findByIdAndUpdate(
      teamId,
      data,
      { new: true },
    );
  }

  async deleteTeam(
    teamId: string,
  ) {
    return Team.findByIdAndDelete(
      teamId,
    );
  }
}

export const teamRepository =
  new TeamRepository();