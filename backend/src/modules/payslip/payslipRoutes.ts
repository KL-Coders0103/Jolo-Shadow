import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import { payslipController } from "./payslipController";
import { generatePayslipSchema } from "./payslipValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/generate",
  validate(generatePayslipSchema),
  payslipController.generatePayslip,
);

router.post(
  "/pdf/:id",
  payslipController.generatePdf,
);

router.post(
  "/email/:id",
  payslipController.emailPayslip,
);

router.get(
  "/download/:id",
  payslipController.downloadPayslip,
);

router.get(
  "/history",
  payslipController.getEmployeeHistory,
);

router.get(
  "/search",
  payslipController.searchPayslips,
);

router.get(
  "/:id",
  payslipController.getPayslipById,
);

export default router;