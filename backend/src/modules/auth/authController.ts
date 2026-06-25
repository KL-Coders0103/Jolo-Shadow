import { Request, Response } from "express";
import { authService } from "./authService";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../common/utils/ApiResponse";

class AuthController {
  register = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await authService.register(req.body);

      return res.status(201).json(
        new ApiResponse(
          true,
          "Registration successful",
          {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          },
        ),
      );
    },
  );

  login = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const result =
        await authService.login(
          req.body,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Login successful",
          result,
        ),
      );
    },
  );

  profile = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      return res.status(200).json(
        new ApiResponse(
          true,
          "Profile fetched successfully",
          req.user,
        ),
      );
    },
  );

  refreshToken = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const { refreshToken } = req.body;

      const result =
        await authService.refreshToken(
          refreshToken,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Token refreshed successfully",
          result,
        ),
      );
    },
  );

  logout = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const { refreshToken } = req.body;

      await authService.logout(
        refreshToken,
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Logout successful",
        ),
      );
    },
  );

  logoutAll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      await authService.logoutAll(
        req.user!.id,
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Logged out from all devices",
        ),
      );
    },
  );

  verifyEmail = asyncHandler(
    async (req, res) => {
      await authService.verifyEmail(
        req.body.token,
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Email verified successfully",
        ),
      );
    },
  );

  forgotPassword = asyncHandler(
    async (req, res) => {
      const result =
        await authService.forgotPassword(
          req.body.email,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Password reset email sent",
          result,
        ),
      );
    },
  );

  resetPassword = asyncHandler(
    async (req, res) => {
      await authService.resetPassword(
        req.body,
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Password reset successful",
        ),
      );
    },
  );

  changePassword = asyncHandler(
    async (req, res) => {
      await authService.changePassword(
        req.user!.id,
        req.body.currentPassword,
        req.body.newPassword,
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Password changed successfully",
        ),
      );
    },
  );
}

export const authController = new AuthController();