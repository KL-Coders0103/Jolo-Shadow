import { NextFunction, Request, Response } from "express";

import { ApiError } from "../common/errors/ApiError";
import { HTTP_STATUS } from "../common/errors/errorCodes";

import { verifyAccessToken } from "../common/utils/jwtUtils";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Unauthorized",
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded =
      verifyAccessToken(token);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
      companyId: decoded.companyId,
      email: "",
    };

    next();
  } catch (error) {
    next(
      new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid or expired token",
      ),
    );
  }
};