import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes";
import employeeRoutes from "../modules/employee/employeeRoutes";
import teamRoutes from "../modules/team/teamRoutes";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Jolo Shadow API v1",
  });
});

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/teams", teamRoutes);

export default router;