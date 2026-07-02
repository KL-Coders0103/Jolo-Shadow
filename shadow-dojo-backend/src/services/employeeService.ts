import { prisma } from '../config/db';
import crypto from 'crypto';
import { UserRole } from '../generated/prisma/client';

export class EmployeeService {
  
  static async inviteEmployee(companyId: string, inviterId: string, data: { email: string; role: UserRole }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (existingUser) throw new Error("User already exists in the system");

    const existingInvite = await prisma.invitation.findFirst({
      where: { email: data.email, status: 'PENDING' }
    });
    if (existingInvite) throw new Error("An invitation is already pending for this email");

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    const invitation = await prisma.invitation.create({
      data: {
        companyId,
        email: data.email,
        role: data.role,
        token,
        expiresAt
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: inviterId,
        action: "EMPLOYEE_INVITED",
        metadata: { invitedEmail: data.email, role: data.role }
      }
    });

    return {
      message: "Invitation generated successfully",
      invitationUrl: `http://localhost:3000/accept-invite?token=${token}`,
      invitation
    };
  }

  static async bulkInvite(companyId: string, inviterId: string, data: { employees: Array<{ email: string; role: UserRole }> }) {
    const results = [];
    const errors = [];

    for (const emp of data.employees) {
      try {
        const result = await this.inviteEmployee(companyId, inviterId, emp);
        results.push(result);
      } catch (error: any) {
        errors.push({ email: emp.email, reason: error.message });
      }
    }

    return { results, errors };
  }

  static async updateEmployee(companyId: string, employeeId: string, data: any) {
    const employee = await prisma.user.findFirst({
      where: { id: employeeId, companyId }
    });

    if (!employee) throw new Error("Employee not found in your company");

    return prisma.user.update({
      where: { id: employeeId },
      data,
      select: { id: true, name: true, email: true, role: true, departmentId: true, teamId: true, status: true }
    });
  }
}