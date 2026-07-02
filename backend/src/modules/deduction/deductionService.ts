import mongoose from "mongoose";

import { User } from "../../models/userModel";

import { UserRole } from "../../common/constants/enums";
import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

import { deductionRepository } from "./deductionRepository";
import { Deduction } from "../../models/deductionModel";

class DeductionService {
  async createDeduction(
    companyId: string,
    createdBy: string,
    data: any,
  ) {
    const employee =
      await User.findOne({
        _id: data.employeeId,
        companyId,
        role: UserRole.EMPLOYEE,
        deletedAt: null,
      });

    if (!employee) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Employee not found",
      );
    }

    const duplicate =
      await deductionRepository.findDuplicate(
        data.employeeId,
        data.month,
        data.year,
        data.type,
      );

    if (duplicate) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Deduction already exists",
      );
    }

    return deductionRepository.create({
      ...data,
      companyId:
        new mongoose.Types.ObjectId(
          companyId,
        ),
      createdBy:
        new mongoose.Types.ObjectId(
          createdBy,
        ),
    });
  }

  async approveDeduction(
    deductionId: string,
    approvedBy: string,
  ) {
    const deduction =
      await deductionRepository.findById(
        deductionId,
      );

    if (!deduction) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Deduction not found",
      );
    }

    if (deduction.approved) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Deduction already approved",
      );
    }

    return deductionRepository.update(
      deductionId,
      {
        approved: true,
        approvedBy:
          new mongoose.Types.ObjectId(
            approvedBy,
          ),
        approvedAt: new Date(),
      },
    );
  }

  async getDeductionById(
    deductionId: string,
  ) {
    const deduction =
      await deductionRepository.findById(
        deductionId,
      );

    if (!deduction) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Deduction not found",
      );
    }

    return deduction;
  }

  async searchDeductions(
    companyId: string,
    query: any,
  ) {
    const filter: any = {
      companyId,
      deletedAt: null,
    };

    if (query.employeeId) {
      filter.employeeId =
        query.employeeId;
    }

    if (query.month) {
      filter.month =
        Number(query.month);
    }

    if (query.year) {
      filter.year =
        Number(query.year);
    }

    if (query.type) {
      filter.type =
        query.type;
    }

    if (query.approved) {
      filter.approved =
        query.approved === "true";
    }

    return deductionRepository.search(
      filter,
      Number(query.page || 1),
      Number(query.limit || 10),
    );
  }

  async deleteDeduction(
    deductionId: string,
  ) {
    const deduction =
      await deductionRepository.findById(
        deductionId,
      );

    if (!deduction) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Deduction not found",
      );
    }

    return deductionRepository.softDelete(
      deductionId,
    );
  }

  async getApprovedDeductionAmount(
    employeeId: string,
    month: number,
    year: number,
  ) {
    const deductions =
      await deductionRepository.getApprovedDeductions(
        employeeId,
        month,
        year,
      );

    return deductions.reduce(
      (total, deduction) =>
        total + deduction.amount,
      0,
    );
  }

  async getDeductionAnalytics(
    companyId: string,
    ) {
    return Deduction.aggregate([
        {
        $match: {
            companyId: new mongoose.Types.ObjectId(
            companyId,
            ),
            deletedAt: null,
        },
        },
        {
        $group: {
            _id: "$type",
            totalAmount: {
            $sum: "$amount",
            },
            count: {
            $sum: 1,
            },
        },
        },
    ]);
  }
  
  async getAnalytics(
    companyId: string,
  ) {
    return deductionRepository.getAnalytics(
      companyId,
    );
  }
}

export const deductionService =
  new DeductionService();