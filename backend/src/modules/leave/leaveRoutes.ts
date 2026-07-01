import { Router } from "express";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
  applyLeaveSchema,
} from "./leaveValidation";

import { leaveController }
from "./leaveController";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",

  validate(
    applyLeaveSchema,
  ),

  leaveController
    .applyLeave,
);

router.get(
  "/my",
  leaveController
    .getMyLeaves,
);

router.get(
  "/company",
  leaveController
    .getCompanyLeaves,
);

router.get(
  "/search",

  leaveController
    .searchLeaves,
);

router.patch(
  "/:id/approve",
  leaveController
    .approveLeave,
);

router.patch(
  "/:id/reject",
  leaveController
    .rejectLeave,
);

router.patch(
  "/:id/cancel",
  leaveController
    .cancelLeave,
);

router.get(
  "/analytics",
  leaveController
    .getAnalytics,
);

router.get(
  "/balance",
  leaveController.getBalance,
);

export default router;