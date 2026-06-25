import { logger } from "../../config/logger";

export const setupProcessHandlers = () => {
  process.on("uncaughtException", (error) => {
    logger.fatal(error);

    process.exit(1);
  });

  process.on(
    "unhandledRejection",
    (reason) => {
      logger.fatal(reason);

      process.exit(1);
    },
  );
};