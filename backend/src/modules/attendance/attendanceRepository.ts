import { Types } from "mongoose";
import { Attendance } from "../../models/attendanceModel";

class AttendanceRepository {

  async create(data: Record<string, unknown>) {
    return Attendance.create(data);
  }

  async findTodayAttendance(
    employeeId: string,
  ) {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return Attendance.findOne({
      employeeId,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
  }

  async update(
    id: string,
    data: Record<string, unknown>,
  ) {

    return Attendance.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
  }

  async getEmployeeAttendance(
    employeeId: string,
  ) {

    return Attendance.find({
      employeeId,
      deletedAt: null,
    }).sort({
      createdAt: -1,
    });
  }

  async getMonthlyReport(
    employeeId: string,
    month: number,
    year: number,
  ) {

    const startDate =
      new Date(year, month - 1, 1);

    const endDate =
      new Date(year, month, 0);

    return Attendance.find({
      employeeId,

      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },

      deletedAt: null,
    });
  }

  async searchAttendance(
    companyId: string,
    query: {
      employeeId?: string;
      status?: string;
      page: number;
      limit: number;
      startDate?: string;
      endDate?: string;
    },
  ) {

    const filter: any = {
      companyId,
      deletedAt: null,
    };

    if (query.employeeId) {
      filter.employeeId =
        query.employeeId;
    }

    if (query.status) {
      filter.status =
        query.status;
    }

    if (
      query.startDate &&
      query.endDate
    ) {

      filter.createdAt = {
        $gte: new Date(
          query.startDate,
        ),

        $lte: new Date(
          query.endDate,
        ),
      };
    }

    const skip =
      (query.page - 1) *
      query.limit;

    const [attendance, total] =
      await Promise.all([

        Attendance.find(filter)
          .populate(
            "employeeId",
            "firstName lastName email",
          )
          .skip(skip)
          .limit(query.limit),

        Attendance.countDocuments(
          filter,
        ),
      ]);

    return {
      attendance,
      total,
      page: query.page,

      pages: Math.ceil(
        total / query.limit,
      ),
    };
  }

  async getAnalytics(
    companyId: string,
  ) {

    return Attendance.aggregate([
      {
        $match: {
          companyId:
            new Types.ObjectId(
              companyId,
            ),
        },
      },

      {
        $group: {
          _id: "$status",

          count: {
            $sum: 1,
          },

          avgHours: {
            $avg:
              "$totalHours",
          },
        },
      },
    ]);
  }

}

export const attendanceRepository =
  new AttendanceRepository();