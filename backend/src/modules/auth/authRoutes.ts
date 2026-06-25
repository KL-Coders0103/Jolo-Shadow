import { Router } from "express";
import { authController } from "./authController";
import { validate } from "../../middlewares/validateMiddleware";

import {registerSchema, loginSchema, refreshTokenSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema} from "./authValidation";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.profile);
router.post("/refresh-token", validate(refreshTokenSchema), authController.refreshToken);
router.post("/logout", validate(refreshTokenSchema), authController.logout);
router.post("/logout-all", authMiddleware, authController.logoutAll);
router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);
router.post("/change-password", authMiddleware, validate(changePasswordSchema), authController.changePassword);

export default router;