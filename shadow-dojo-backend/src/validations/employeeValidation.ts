import { z } from 'zod';

export const inviteEmployeeSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    role: z.enum(['MANAGER', 'EMPLOYEE']).default('EMPLOYEE'),
  })
});

export const bulkInviteSchema = z.object({
  body: z.object({
    employees: z.array(
      z.object({
        email: z.string().email("Invalid email format"),
        role: z.enum(['MANAGER', 'EMPLOYEE']).default('EMPLOYEE')
      })
    ).min(1, "At least one employee must be provided")
  })
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    role: z.enum(['MANAGER', 'EMPLOYEE']).optional(),
    departmentId: z.string().uuid("Invalid Department ID").optional().nullable(),
    teamId: z.string().uuid("Invalid Team ID").optional().nullable(),
    status: z.enum(['PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED']).optional(),
  })
});