import mongoose from "mongoose";
import { BonusType } from "../../common/constants/enums";
import { Bonus } from "../../models/bonusModel";

import { IBonus } from "./bonusTypes";

class BonusRepository {
  async create(
    data: Partial<IBonus>,
  ) {
    return Bonus.create(data);
  }

  async findById(
    id: string,
  ) {
    return Bonus.findOne({
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
    data: Partial<IBonus>,
  ) {
    return Bonus.findByIdAndUpdate(
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
    return Bonus.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      },
    );
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

        Bonus.find(filter)
          .populate(
            "employeeId",
            "firstName lastName email",
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit),

        Bonus.countDocuments(
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

  async getApprovedBonuses(
    employeeId: string,
    month: number,
    year: number,
  ) {
    return Bonus.find({
      employeeId,
      month,
      year,
      approved: true,
      deletedAt: null,
    });
  }

  async findDuplicate(
    employeeId: string,
    month: number,
    year: number,
    type: BonusType,
  ) {
    return Bonus.findOne({
      employeeId,
      month,
      year,
      type,
      deletedAt: null,
    });
  }

  async getAnalytics(
    companyId: string,
  ) {
    return Bonus.aggregate([
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

          totalBonus: {
            $sum: "$amount",
          },

          totalRecords: {
            $sum: 1,
          },

          averageBonus: {
            $avg: "$amount",
          },

          highestBonus: {
            $max: "$amount",
          },

          lowestBonus: {
            $min: "$amount",
          },
        },
      },
      {
        $sort: {
          totalBonus: -1,
        },
      },
    ]);
  }
}

export const bonusRepository =
  new BonusRepository();