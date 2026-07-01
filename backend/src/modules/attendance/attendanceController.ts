import {
  Request,
  Response,
} from "express";

import { ApiResponse }
from "../../common/utils/ApiResponse";

import { attendanceService }
from "./attendanceService";
import { asyncHandler } from "../../utils/asyncHandler";

class AttendanceController {

  checkIn =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const attendance =
        await attendanceService
          .checkIn(
            req.user!.id,

            req.user!.companyId,

            req.body,
          );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Checked in successfully",
          attendance,
        ),
      );
    },
  );

  checkOut =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const attendance =
          await attendanceService
            .checkOut(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Checked out successfully",
            attendance,
          ),
        );
      },
    );

  startBreak =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const attendance =
          await attendanceService
            .startBreak(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Break started",
            attendance,
          ),
        );
      },
    );

  endBreak =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const attendance =
          await attendanceService
            .endBreak(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Break ended",
            attendance,
          ),
        );
      },
    );

  getMyAttendance =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const data =
          await attendanceService
            .getMyAttendance(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Attendance fetched successfully",
            data,
          ),
        );
      },
    );

  getMonthlyReport =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const report =
          await attendanceService
            .getMonthlyReport(
              req.user!.id,

              Number(
                req.query.month,
              ),

              Number(
                req.query.year,
              ),
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Attendance report fetched successfully",
            report,
          ),
        );
      },
    );

  searchAttendance =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const data =
        await attendanceService
          .searchAttendance(
            req.user!.companyId,

            req.query,
          );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Attendance fetched successfully",
          data,
        ),
      );
    },
  );

  getAnalytics =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const analytics =
        await attendanceService
          .getAnalytics(
            req.user!.companyId,
          );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Attendance analytics fetched successfully",
          analytics,
        ),
      );
    },
  );
}

export const attendanceController =
  new AttendanceController();