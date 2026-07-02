import { prisma } from '../config/db';

export class DepartmentService {
  static async createDepartment(companyId: string, data: { name: string }) {
    const existing = await prisma.department.findFirst({
      where: { companyId, name: data.name }
    });

    if (existing) throw new Error("Department with this name already exists");

    return prisma.department.create({
      data: {
        companyId,
        name: data.name
      }
    });
  }

  static async getDepartments(companyId: string) {
    return prisma.department.findMany({
      where: { companyId },
      include: {
        _count: {
          select: { users: true, teams: true }
        }
      }
    });
  }

  static async updateDepartment(companyId: string, departmentId: string, data: { name?: string }) {
    const department = await prisma.department.findFirst({
      where: { id: departmentId, companyId }
    });

    if (!department) throw new Error("Department not found");

    return prisma.department.update({
      where: { id: departmentId },
      data
    });
  }

  static async deleteDepartment(companyId: string, departmentId: string) {
    const department = await prisma.department.findFirst({
      where: { id: departmentId, companyId }
    });

    if (!department) throw new Error("Department not found");

    await prisma.department.delete({
      where: { id: departmentId }
    });

    return { message: "Department deleted successfully" };
  }
}