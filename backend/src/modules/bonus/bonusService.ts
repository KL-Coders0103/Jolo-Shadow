import { User } from "../../models/userModel";

import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

import { UserRole } from "../../common/constants/enums";

import { bonusRepository } from "./bonusRepository";
import mongoose from "mongoose";

class BonusService {
  async createBonus(
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
      await bonusRepository.findDuplicate(
        data.employeeId,
        data.month,
        data.year,
        data.type,
      );

    if (duplicate) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Bonus already exists for this employee, month and type",
      );
    }

    return bonusRepository.create({
      ...data,
      companyId,
      createdBy,
    });
  }

  async approveBonus(
    bonusId: string,
    approvedBy: string,
  ) {
    const bonus =
      await bonusRepository.findById(
        bonusId,
      );

    if (!bonus) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Bonus not found",
      );
    }

    if (bonus.approved) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Bonus already approved",
      );
    }

    return bonusRepository.update(
      bonusId,
      {
        approved: true,
        approvedBy: new mongoose.Types.ObjectId(approvedBy),
        approvedAt: new Date(),
      },
    );
  }

  async getBonusById(
    bonusId: string,
  ) {
    const bonus =
      await bonusRepository.findById(
        bonusId,
      );

    if (!bonus) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Bonus not found",
      );
    }

    return bonus;
  }

  async searchBonuses(
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

    return bonusRepository.search(
      filter,
      Number(query.page || 1),
      Number(query.limit || 10),
    );
  }

  async deleteBonus(
    bonusId: string,
  ) {
    const bonus =
      await bonusRepository.findById(
        bonusId,
      );

    if (!bonus) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Bonus not found",
      );
    }

    return bonusRepository.softDelete(
      bonusId,
    );
  }

  async getApprovedBonusAmount(
    employeeId: string,
    month: number,
    year: number,
  ) {
    const bonuses =
      await bonusRepository.getApprovedBonuses(
        employeeId,
        month,
        year,
      );

    return bonuses.reduce(
      (total, bonus) =>
        total + bonus.amount,
      0,
    );
  }

  async getAnalytics(
    companyId: string,
  ) {
    return bonusRepository.getAnalytics(
      companyId,
    );
  }
}

export const bonusService =
  new BonusService();