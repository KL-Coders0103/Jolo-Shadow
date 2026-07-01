import { attendanceRepository }
from "./attendanceRepository";

import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";
import { AttendanceStatus } from "../../common/constants/enums";

class AttendanceService {

  async checkIn(
    employeeId: string,
    companyId: string,

    data: {
      workMode?: string;
      notes?: string;
    },
  ) {

    const existing =
      await attendanceRepository
        .findTodayAttendance(
          employeeId,
        );

    if (existing) {

      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Already checked in today",
      );
    }

    const now = new Date();

    let status =
      AttendanceStatus.PRESENT;

    if (
      now.getHours() > 9 ||

      (now.getHours() === 9 &&
      now.getMinutes() > 30)
    ) {

      status =
        AttendanceStatus.LATE;
    }

    return attendanceRepository.create({
      employeeId,
      companyId,
      checkIn: now,
      status,
      workMode:
        data.workMode,
      notes:
        data.notes,
    });
  }

  async checkOut(
    employeeId: string,
  ) {

    const attendance =
      await attendanceRepository
        .findTodayAttendance(
          employeeId,
        );

    if (!attendance) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Attendance not found",
      );
    }

    const checkOut =
      new Date();

    const totalHours =
      (
        checkOut.getTime() -
        attendance.checkIn!.getTime()
      ) /
      (1000 * 60 * 60);

    return attendanceRepository.update(
      String(attendance._id),
      {
        checkOut,
        totalHours:
          totalHours.toFixed(2),
      },
    );
  }

  async startBreak(
    employeeId: string,
  ) {

    const attendance =
      await attendanceRepository
        .findTodayAttendance(
          employeeId,
        );

    if (!attendance) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Attendance not found",
      );
    }

    return attendanceRepository.update(
      String(attendance._id),
      {
        breakStart:
          new Date(),
      },
    );
  }

  async endBreak(
    employeeId: string,
  ) {

    const attendance =
      await attendanceRepository
        .findTodayAttendance(
          employeeId,
        );

    if (!attendance) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Attendance not found",
      );
    }

    return attendanceRepository.update(
      String(attendance._id),
      {
        breakEnd:
          new Date(),
      },
    );
  }

  async getMyAttendance(
    employeeId: string,
  ) {

    return attendanceRepository
      .getEmployeeAttendance(
        employeeId,
      );
  }

  async getMonthlyReport(
    employeeId: string,
    month: number,
    year: number,
  ) {

    return attendanceRepository
      .getMonthlyReport(
        employeeId,
        month,
        year,
      );
  }

  async searchAttendance(
  companyId: string,

  query: {
    employeeId?: string;
    status?: string;
    page?: string;
    limit?: string;
    startDate?: string;
    endDate?: string;
  },
) {

  return attendanceRepository
    .searchAttendance(
      companyId,
      {
        ...query,

        page:
          Number(
            query.page || 1,
          ),

        limit:
          Number(
            query.limit || 10,
          ),
      },
    );
}

async getAnalytics(
  companyId: string,
) {

  return attendanceRepository
    .getAnalytics(
      companyId,
    );
}
}

export const attendanceService =
  new AttendanceService();