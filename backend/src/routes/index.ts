import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes";
import employeeRoutes from "../modules/employee/employeeRoutes";
import teamRoutes from "../modules/team/teamRoutes";
import projectRoutes from "../modules/project/projectRoutes";
import taskRoutes from "../modules/task/taskRoutes";
import uploadRoutes from "../modules/upload/uploadRoutes";
import notificationRoutes from "../modules/notification/notificationRoutes";
import attendanceRoutes from "../modules/attendance/attendanceRoutes";
import leaveRoutes from "../modules/leave/leaveRoutes";
import salaryStructureRoutes from "../modules/salaryStructure/salaryStructureRoutes";
import payrollRoutes from "../modules/payroll/payrollRoutes";
import payslipRoutes from "../modules/payslip/payslipRoutes";
import bonusRoutes from "../modules/bonus/bonusRoutes";
import deductionRoutes from "../modules/deduction/deductionRoutes";
import departmentRoutes from "../modules/department/departmentRoutes";

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
router.use("/uploads", uploadRoutes);
router.use("/notifications", notificationRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leaves", leaveRoutes);
router.use("/salary-structures", salaryStructureRoutes);
router.use("/payrolls", payrollRoutes);
router.use("/payslips", payslipRoutes);
router.use("/bonuses", bonusRoutes);
router.use("/deductions", deductionRoutes);
router.use("/departments",departmentRoutes);

export default router;