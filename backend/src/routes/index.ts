import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes";
import employeeRoutes from "../modules/employee/employeeRoutes";
import teamRoutes from "../modules/team/teamRoutes";
import projectRoutes from "../modules/project/projectRoutes";
import taskRoutes from "../modules/task/taskRoutes";

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
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

export default router;