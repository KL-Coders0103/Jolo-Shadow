import {
  LeaveStatus,
  LeaveType,
} from "../../common/constants/enums";

import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";
import { User } from "../../models/userModel";

import { leaveRepository }
from "./leaveRepository";

class LeaveService {

  async applyLeave(
    employeeId: string,
    companyId: string,

    data: {
      type: string;
      startDate: string;
      endDate: string;
      reason: string;
    },
  ) {

    const overlappingLeave =
      await leaveRepository
        .findOverlappingLeave(
          employeeId,

          new Date(
            data.startDate,
          ),

          new Date(
            data.endDate,
          ),
        );

    if (overlappingLeave) {

      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,

        "Overlapping leave request already exists",
      );
    }

    const start =
      new Date(data.startDate);

    const end =
      new Date(data.endDate);

    const days =
      Math.ceil(
        (
          end.getTime() -
          start.getTime()
        ) /
        (1000 * 60 * 60 * 24),
      ) + 1;

    return leaveRepository.create({
      employeeId,
      companyId,

      ...data,

      days
    });
  }

  async getMyLeaves(
    employeeId: string,
  ) {

    return leaveRepository
      .getEmployeeLeaves(
        employeeId,
      );
  }

  async getCompanyLeaves(
    companyId: string,
  ) {

    return leaveRepository
      .getCompanyLeaves(
        companyId,
      );
  }

  async approveLeave(
    leaveId: string,
    approvedBy: string,
  ) {

    const leave =
      await leaveRepository.findById(
        leaveId,
      );

    if (!leave) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Leave not found",
      );
    }

    if (
      leave.status ===
      LeaveStatus.APPROVED
    ) {

      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Leave already approved",
      );
    }

    const user =
      await User.findById(
        leave.employeeId,
      );

    if (!user) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found",
      );
    }

    switch (leave.type) {

      case LeaveType.CASUAL:

        if (
          user.leaveBalance.casual <=
          0
        ) {

          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "No casual leaves remaining",
          );
        }

        user.leaveBalance.casual -= 1;

        break;

      case LeaveType.SICK:

        if (
          user.leaveBalance.sick <=
          0
        ) {

          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "No sick leaves remaining",
          );
        }

        user.leaveBalance.sick -= 1;

        break;

      case LeaveType.ANNUAL:

        if (
          user.leaveBalance.annual <=
          0
        ) {

          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "No annual leaves remaining",
          );
        }

        user.leaveBalance.annual -= 1;

        break;
    }

    await user.save();

    return leaveRepository.update(
      leaveId,
      {
        status:
          LeaveStatus.APPROVED,

        approvedBy,
      },
    );
  }

  async rejectLeave(
    leaveId: string,
    approvedBy: string,
    comments?: string,
  ) {

    const leave =
      await leaveRepository.findById(
        leaveId,
      );

    if (!leave) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Leave not found",
      );
    }

    return leaveRepository.update(
      leaveId,
      {
        status:
          LeaveStatus.REJECTED,

        approvedBy,

        comments,
      },
    );
  }

  async cancelLeave(
    leaveId: string,
  ) {

    const leave =
      await leaveRepository.findById(
        leaveId,
      );

    if (!leave) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Leave not found",
      );
    }

    if (
      leave.status ===
      LeaveStatus.APPROVED
    ) {

      const user =
        await User.findById(
          leave.employeeId,
        );

      if (user) {

        switch (leave.type) {

          case LeaveType.CASUAL:
            user.leaveBalance.casual +=
              1;
            break;

          case LeaveType.SICK:
            user.leaveBalance.sick += 1;
            break;

          case LeaveType.ANNUAL:
            user.leaveBalance.annual +=
              1;
            break;
        }

        await user.save();
      }
    }

    return leaveRepository.update(
      leaveId,
      {
        status:
          LeaveStatus.CANCELLED,
      },
    );
  }

  async searchLeaves(
    companyId: string,

    query: {
      search?: string;
      page?: string;
      limit?: string;
    },
  ) {

    return leaveRepository
      .searchLeaves(
        companyId,
        {
          search:
            query.search,

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

  async getBalance(
      userId: string,
    ) {

      const user =
        await User.findById(
          userId,
        ).select(
          "leaveBalance",
        );

      return user?.leaveBalance;
    }
}

export const leaveService =
  new LeaveService();