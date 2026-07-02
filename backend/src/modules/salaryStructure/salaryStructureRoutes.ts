import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import {
  createSalaryStructureSchema,
} from "./salaryStructureValidation";

import { salaryStructureController } from "./salaryStructureController";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(
    createSalaryStructureSchema,
  ),
  salaryStructureController.create,
);

router.get(
  "/",
  salaryStructureController.getAll,
);

router.get(
  "/search",
  salaryStructureController.search,
);

router.get(
  "/:id",
  salaryStructureController.getById,
);

router.patch(
  "/:id",
  salaryStructureController.update,
);

router.delete(
  "/:id",
  salaryStructureController.delete,
);

export default router;