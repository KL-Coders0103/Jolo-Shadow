import { z } from "zod";

export const createSalaryStructureSchema =
  z.object({
    body: z.object({
      employeeId: z.string(),

      basicSalary:
        z.number().positive(),

      hra:
        z.number().min(0),

      allowances:
        z.number().min(0),

      bonus:
        z.number().min(0),

      pf:
        z.number().min(0),

      professionalTax:
        z.number().min(0),

      incomeTax:
        z.number().min(0),

      otherDeductions:
        z.number().min(0),

      effectiveFrom:
        z.string(),
    }),
  });