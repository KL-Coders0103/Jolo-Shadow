import { Router } from "express";

import { employeeController }
from "./employeeController";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
    acceptInvitationSchema,
  inviteEmployeeSchema,
} from "./employeeValidation";

const router = Router();

router.post(
  "/accept-invitation",
  validate(acceptInvitationSchema),
  employeeController.acceptInvitation,
);

router.use(authMiddleware);

router.post(
  "/invite",
  validate(inviteEmployeeSchema),
  employeeController.inviteEmployee,
);

router.get(
  "/",
  employeeController.getEmployees,
);

// IMPORTANT: Put search BEFORE :id
router.get(
  "/search",
  employeeController.searchEmployees,
);

router.patch(
  "/:id/suspend",
  employeeController.suspendEmployee,
);

router.patch(
  "/:id/activate",
  employeeController.activateEmployee,
);

router.delete(
  "/:id",
  employeeController.deleteEmployee,
);

router.get(
  "/:id",
  employeeController.getEmployeeById,
);

export default router;