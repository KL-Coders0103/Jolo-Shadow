import { SalaryStructure } from "../../models/salaryStructureModel";
import { ISalaryStructure } from "./salaryStructureTypes";

class SalaryStructureRepository {

  async create(
    data: Partial<ISalaryStructure>,
  ) {
    return SalaryStructure.create(data);
  }

  async findById(
    id: string,
  ) {
    return SalaryStructure.findOne({
      _id: id,
      deletedAt: null,
    })
      .populate(
        "employeeId",
        "firstName lastName email",
      )
      .lean();
  }

  async findActiveByEmployee(
    employeeId: string,
    companyId?: string,
  ) {
    return SalaryStructure.findOne({
      employeeId,
      companyId,
      isActive: true,
      deletedAt: null,
    });
  }

  async update(
    id: string,
    data: Partial<ISalaryStructure>,
  ) {
    return SalaryStructure.findByIdAndUpdate(
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
    return SalaryStructure.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
        isActive: false,
      },
      {
        new: true,
      },
    );
  }

  async findAll(
    companyId: string,
  ) {
    return SalaryStructure.find({
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

  async search(
    filter: Record<string, unknown>,
    page: number,
    limit: number,
  ) {

    const skip =
      (page - 1) * limit;

    const [items, total] =
      await Promise.all([

        SalaryStructure.find(filter)
          .populate(
            "employeeId",
            "firstName lastName email",
          )
          .skip(skip)
          .limit(limit)
          .sort({
            createdAt: -1,
          }),

        SalaryStructure.countDocuments(
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
}

export const salaryStructureRepository =
  new SalaryStructureRepository();