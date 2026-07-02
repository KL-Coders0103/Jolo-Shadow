import { prisma } from '../config/db';

export class TeamService {
  static async createTeam(companyId: string, data: { name: string; departmentId?: string; leadId?: string }) {
    if (data.departmentId) {
      const dept = await prisma.department.findFirst({
        where: { id: data.departmentId, companyId }
      });
      if (!dept) throw new Error("Invalid Department ID");
    }

    if (data.leadId) {
      const user = await prisma.user.findFirst({
        where: { id: data.leadId, companyId }
      });
      if (!user) throw new Error("Invalid Lead ID");
      
      const existingLead = await prisma.team.findUnique({
        where: { leadId: data.leadId }
      });
      if (existingLead) throw new Error("This user is already leading another team");
    }

    return prisma.team.create({
      data: {
        companyId,
        name: data.name,
        departmentId: data.departmentId,
        leadId: data.leadId
      }
    });
  }

  static async getTeams(companyId: string) {
    return prisma.team.findMany({
      where: { companyId },
      include: {
        department: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true, email: true } },
        _count: { select: { members: true } }
      }
    });
  }
}