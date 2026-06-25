import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import apiRoutes from "./routes";

import { API_PREFIX } from "./common/constants/api";

import { rateLimiter } from "./middlewares/rateLimiterMiddleware";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { requestIdMiddleware } from "./middlewares/requestIdMiddleware";
import { setupSwagger } from "./docs/swagger";

const app = express();

app.use(rateLimiter);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server Healthy",
  });
});

app.use(API_PREFIX, apiRoutes);

app.use(requestIdMiddleware);

setupSwagger(app);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;