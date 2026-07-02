import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import { departmentController } from "./departmentController";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./departmentValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createDepartmentSchema),
  departmentController.createDepartment,
);

router.get(
  "/",
  departmentController.getDepartments,
);

router.get(
  "/search",
  departmentController.searchDepartments,
);

router.get(
  "/analytics",
  departmentController.getAnalytics,
);

router.get(
  "/:id",
  departmentController.getDepartmentById,
);

router.patch(
  "/:id",
  validate(updateDepartmentSchema),
  departmentController.updateDepartment,
);

router.delete(
  "/:id",
  departmentController.deleteDepartment,
);

export default router;