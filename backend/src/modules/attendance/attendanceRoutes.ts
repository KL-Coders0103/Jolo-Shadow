import { Router } from "express";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { attendanceController }
from "./attendanceController";
import { attendanceSchema } from "./attendanceValidation";
import { validate } from "../../middlewares/validateMiddleware";

const router = Router();

router.use(authMiddleware);

router.post(
  "/check-in",

  validate(
    attendanceSchema,
  ),

  attendanceController
    .checkIn,
);

router.patch(
  "/check-out",
  attendanceController.checkOut,
);

router.patch(
  "/break/start",
  attendanceController.startBreak,
);

router.patch(
  "/break/end",
  attendanceController.endBreak,
);

router.get(
  "/my",
  attendanceController.getMyAttendance,
);

router.get(
  "/report",

  attendanceController
    .getMonthlyReport,
);

router.get(
  "/search",

  attendanceController
    .searchAttendance,
);

router.get(
  "/analytics",

  attendanceController
    .getAnalytics,
);

export default router;