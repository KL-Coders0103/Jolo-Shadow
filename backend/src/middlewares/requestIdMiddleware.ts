import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const requestIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.id = crypto.randomUUID();

  next();
};