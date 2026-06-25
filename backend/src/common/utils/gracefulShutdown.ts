import { Server } from "http";
import mongoose from "mongoose";
import { logger } from "../../config/logger";

export const gracefulShutdown = (
  server: Server,
) => {
  const shutdown = async () => {
    logger.info("Graceful shutdown started");

    server.close(async () => {
      await mongoose.connection.close();

      logger.info("Server Closed");

      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};