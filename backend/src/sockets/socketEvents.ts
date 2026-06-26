import { getIO }
from "./socketServer";

export const emitNotification =
(
  userId: string,
  data: unknown,
) => {

  const io = getIO();

  io.to(userId).emit(
    "notification",
    data,
  );
};

export const emitTaskAssigned =
(
  userId: string,
  data: unknown,
) => {

  const io = getIO();

  io.to(userId).emit(
    "task-assigned",
    data,
  );
};

export const emitProjectUpdated =
(
  userId: string,
  data: unknown,
) => {

  const io = getIO();

  io.to(userId).emit(
    "project-updated",
    data,
  );
};