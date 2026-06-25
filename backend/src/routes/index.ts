import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Jolo Shadow API v1",
  });
});

router.use("/auth", authRoutes);

export default router;