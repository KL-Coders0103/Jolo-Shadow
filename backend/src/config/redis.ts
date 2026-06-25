import Redis from "ioredis";
import { logger } from "./logger";

export const redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: 3,
  },
);

redis.on("connect", () => {
  logger.info("Redis Connected");
});

redis.on("error", (error) => {
  logger.error(error);
});