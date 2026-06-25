import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { TokenPayload } from "../interfaces/tokenPayload";

const accessSecret: Secret =
  process.env.JWT_ACCESS_SECRET || "access-secret";

const refreshSecret: Secret =
  process.env.JWT_REFRESH_SECRET || "refresh-secret";

export const generateAccessToken = (
  payload: TokenPayload,
) => {
  const options: SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(
    payload,
    accessSecret,
    options,
  );
};

export const generateRefreshToken = (
  payload: TokenPayload,
) => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(
    payload,
    refreshSecret,
    options,
  );
};

export const verifyAccessToken = (
  token: string,
) => {
  return jwt.verify(
    token,
    accessSecret,
  ) as TokenPayload;
};

export const verifyRefreshToken = (
  token: string,
) => {
  return jwt.verify(
    token,
    refreshSecret,
  ) as TokenPayload;
};