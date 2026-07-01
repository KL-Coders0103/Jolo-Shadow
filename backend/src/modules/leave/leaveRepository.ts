import { LeaveStatus } from "../../common/constants/enums";
import { Leave } from "../../models/leaveModel";

class LeaveRepository {

  async create(
    data: Record<string, unknown>,
  ) {

    return Leave.create(data);
  }

  async findById(
    id: string,
  ) {

    return Leave.findById(id);
  }

  async update(
    id: string,
    data: Record<string, unknown>,
  ) {

    return Leave.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
  }

  async getEmployeeLeaves(
    employeeId: string,
  ) {

    return Leave.find({
      employeeId,
      deletedAt: null,
    }).sort({
      createdAt: -1,
    });
  }

  async getCompanyLeaves(
    companyId: string,
  ) {

    return Leave.find({
      companyId,
      deletedAt: null,
    })
      .populate(
        "employeeId",
        "firstName lastName email",
      )
      .sort({
        createdAt: -1,
      });
  }

  async getLeaveAnalytics(
    companyId: string,
  ) {

    return Leave.aggregate([
      {
        $match: {
          companyId,
        },
      },

      {
        $group: {
          _id: "$status",

          count: {
            $sum: 1,
          },
        },
      },
    ]);
  }

  async searchLeaves(
    companyId: string,

    query: {
      search?: string;
      page: number;
      limit: number;
    },
  ) {

    const filter: any = {
      companyId,
      deletedAt: null,
    };

    if (query.search) {

      filter.reason = {
        $regex:
          query.search,

        $options: "i",
      };
    }

    const skip =
      (query.page - 1) *
      query.limit;

    const [leaves, total] =
      await Promise.all([

        Leave.find(filter)
          .skip(skip)
          .limit(query.limit),

        Leave.countDocuments(
          filter,
        ),
      ]);

    return {
      leaves,
      total,
      page: query.page,

      pages: Math.ceil(
        total /
          query.limit,
      ),
    };
  }

  async findOverlappingLeave(
    employeeId: string,

    startDate: Date,

    endDate: Date,
  ) {

    return Leave.findOne({
      employeeId,

      status: {
        $ne:
          LeaveStatus.REJECTED,
      },

      startDate: {
        $lte: endDate,
      },

      endDate: {
        $gte: startDate,
      },
    });
  }
}

export const leaveRepository =
  new LeaveRepository();