import { NextFunction, Request, Response } from "express";

import { ApiError } from "../common/errors/ApiError";
import { HTTP_STATUS } from "../common/errors/errorCodes";

import { UserRole } from "../common/constants/enums";

export const rbacMiddleware =
  (...roles: UserRole[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Unauthorized",
      );
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "Access denied",
      );
    }

    next();
  };