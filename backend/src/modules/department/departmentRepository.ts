import mongoose from "mongoose";
import { Department } from "../../models/departmentModel";

import { IDepartment } from "./departmentTypes";

class DepartmentRepository {
  async create(
    data: Partial<IDepartment>,
  ) {
    return Department.create(data);
  }

  async findById(
    id: string,
  ) {
    return Department.findOne({
      _id: id,
      deletedAt: null,
    }).populate(
      "head",
      "firstName lastName email",
    );
  }

  async findByName(
    companyId: string,
    name: string,
  ) {
    return Department.findOne({
      companyId,
      name,
      deletedAt: null,
    });
  }

  async findByCode(
    companyId: string,
    code: string,
  ) {
    return Department.findOne({
      companyId,
      code,
      deletedAt: null,
    });
  }

  async update(
    id: string,
    data: Partial<IDepartment>,
  ) {
    return Department.findByIdAndUpdate(
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
    return Department.findByIdAndUpdate(
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
        Department.find(filter)
          .populate(
            "head",
            "firstName lastName email",
          )
          .sort({
            name: 1,
          })
          .skip(skip)
          .limit(limit),

        Department.countDocuments(
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

  async getAll(
    companyId: string,
  ) {
    return Department.find({
      companyId,
      deletedAt: null,
    })
      .populate(
        "head",
        "firstName lastName email",
      )
      .sort({
        name: 1,
      });
  }

  async getAnalytics(
    companyId: string,
  ) {
    return Department.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(
            companyId,
          ),
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "departmentId",
          as: "employees",
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          isActive: 1,
          employeeCount: {
            $size: "$employees",
          },
        },
      },
      {
        $sort: {
          employeeCount: -1,
        },
      },
    ]);
  }
}

export const departmentRepository =
  new DepartmentRepository();