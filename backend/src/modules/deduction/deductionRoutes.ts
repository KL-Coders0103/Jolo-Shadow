import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import { deductionController } from "./deductionController";
import { createDeductionSchema } from "./deductionValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createDeductionSchema),
  deductionController.createDeduction,
);

router.patch(
  "/:id/approve",
  deductionController.approveDeduction,
);

router.get(
  "/search",
  deductionController.searchDeductions,
);

router.get(
  "/analytics",
  deductionController.getAnalytics,
);

router.get(
  "/:id",
  deductionController.getDeductionById,
);

router.delete(
  "/:id",
  deductionController.deleteDeduction,
);

router.get("/analytics", deductionController.getDeductionAnalytics);

export default router;