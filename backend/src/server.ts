import http from "http";

import app from "./app";

import { env } from "./config/env";
import { logger } from "./config/logger";

import { connectDatabase } from "./config/database";

import { initializeSocket } from "./sockets/socketServer";

import { setupProcessHandlers } from "./common/utils/processHandlers";

import { gracefulShutdown } from "./common/utils/gracefulShutdown";

setupProcessHandlers();

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);

  initializeSocket(server);

  server.listen(env.PORT, () => {
    logger.info(
      `Server running on port ${env.PORT}`,
    );
  });

  gracefulShutdown(server);
};

startServer();