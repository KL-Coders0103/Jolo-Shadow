import { Deduction } from "../../models/deductionModel";

import { IDeduction } from "./deductionTypes";

import { DeductionType } from "../../common/constants/enums";
import mongoose from "mongoose";

class DeductionRepository {
  async create(
    data: Partial<IDeduction>,
  ) {
    return Deduction.create(data);
  }

  async findById(
    id: string,
  ) {
    return Deduction.findOne({
      _id: id,
      deletedAt: null,
    })
      .populate(
        "employeeId",
        "firstName lastName email",
      )
      .populate(
        "approvedBy",
        "firstName lastName",
      )
      .populate(
        "createdBy",
        "firstName lastName",
      );
  }

  async update(
    id: string,
    data: Partial<IDeduction>,
  ) {
    return Deduction.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );
  }

  async softDelete(
    id: string,
  ) {
    return Deduction.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

  async findDuplicate(
    employeeId: string,
    month: number,
    year: number,
    type: DeductionType,
  ) {
    return Deduction.findOne({
      employeeId,
      month,
      year,
      type,
      deletedAt: null,
    });
  }

  async search(
    filter: any,
    page: number,
    limit: number,
  ) {
    const skip =
      (page - 1) * limit;

    const [items, total] =
      await Promise.all([
        Deduction.find(filter)
          .populate(
            "employeeId",
            "firstName lastName email",
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit),

        Deduction.countDocuments(
          filter,
        ),
      ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(
        total / limit,
      ),
    };
  }

  async getApprovedDeductions(
    employeeId: string,
    month: number,
    year: number,
  ) {
    return Deduction.find({
      employeeId,
      month,
      year,
      approved: true,
      deletedAt: null,
    });
  }

  async getAnalytics(
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

          totalDeduction: {
            $sum: "$amount",
          },

          totalRecords: {
            $sum: 1,
          },

          averageDeduction: {
            $avg: "$amount",
          },

          highestDeduction: {
            $max: "$amount",
          },

          lowestDeduction: {
            $min: "$amount",
          },
        },
      },
      {
        $sort: {
          totalDeduction: -1,
        },
      },
    ]);
  }
}

export const deductionRepository =
  new DeductionRepository();