import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import { payrollController } from "./payrollController";
import { generatePayrollSchema } from "./payrollValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/generate",
  validate(generatePayrollSchema),
  payrollController.generatePayroll,
);

router.post(
  "/regenerate/:id",
  payrollController.regeneratePayroll,
);

router.get(
  "/",
  payrollController.getPayrolls,
);

router.get(
  "/search",
  payrollController.searchPayroll,
);

router.get(
  "/analytics",
  payrollController.getAnalytics,
);

router.get(
  "/history/:employeeId",
  payrollController.getPayrollHistory,
);

router.get(
  "/reports/department",
  payrollController.getDepartmentWiseSalaryReport,
);

router.get(
  "/reports/monthly",
  payrollController.getMonthlyPayrollReport,
);

router.get(
  "/reports/expense",
  payrollController.getSalaryExpenseReport,
);

router.get(
  "/reports/yearly",
  payrollController.getYearlyPayrollReport,
);

router.get(
  "/export/excel",
  payrollController.exportPayrollExcel,
);

router.get(
  "/export/pdf",
  payrollController.exportPayrollPdf,
);

router.get(
  "/:id",
  payrollController.getPayrollById,
);

router.patch(
  "/approve/:id",
  payrollController.approvePayroll,
);

router.patch(
  "/pay/:id",
  payrollController.markAsPaid,
);

router.delete(
  "/:id",
  payrollController.deletePayroll,
);

router.patch(
  "/:id/lock",
  payrollController.lockPayroll,
);

router.patch(
  "/:id/unlock",
  payrollController.unlockPayroll,
);

export default router;