import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export let io: Server;

export const initializeSocket = (
  server: HttpServer,
) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket Connected: ${socket.id}`,
    );

    socket.on("disconnect", () => {
      console.log(
        `Socket Disconnected: ${socket.id}`,
      );
    });
  });

  return io;
};