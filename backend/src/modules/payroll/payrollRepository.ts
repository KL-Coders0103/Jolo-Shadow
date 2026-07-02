import mongoose from "mongoose";
import { Payroll } from "../../models/payrollModel";

class PayrollRepository {

  async create(
    data: Record<string, unknown>,
  ) {
    return Payroll.create(data);
  }

  async findOne(
    employeeId: string,
    companyId: string,
    month: number,
    year: number,
  ) {

    return Payroll.findOne({

      employeeId,

      companyId,

      month,

      year,

      deletedAt: null,

    });

  }

  async getById(
    id: string,
  ) {

    return Payroll.findById(id)
      .populate(
        "employeeId",
        "firstName lastName email",
      )
      .populate(
        "salaryStructureId",
      );
  }

  async getAll(
    companyId: string,
  ) {

    return Payroll.find({

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

  async update(
    id: string,
    data: Record<string, unknown>,
  ) {

    return Payroll.findByIdAndUpdate(
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

    return Payroll.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

  async lockPayroll(
    payrollId: string,
    lockedBy: string,
  ) {
    return Payroll.findByIdAndUpdate(
      payrollId,
      {
        isLocked: true,
        lockedAt: new Date(),
        lockedBy,
      },
      {
        new: true,
      },
    );
  }

  async unlockPayroll(
    payrollId: string,
  ) {
    return Payroll.findByIdAndUpdate(
      payrollId,
      {
        isLocked: false,
        $unset: {
          lockedAt: 1,
          lockedBy: 1,
        },
      },
      {
        new: true,
      },
    );
  }

  async getEmployeePayrollHistory(
    companyId: string,
    employeeId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const filter = {
      companyId,
      employeeId,
      deletedAt: null,
    };

    const [items, total] = await Promise.all([
      Payroll.find(filter)
        .populate(
          "employeeId",
          "firstName lastName email employeeId",
        )
        .populate(
          "salaryStructureId",
        )
        .sort({
          year: -1,
          month: -1,
        })
        .skip(skip)
        .limit(limit),

      Payroll.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async getDepartmentWiseSalary(
    companyId: string,
  ) {
    return Payroll.aggregate([
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
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },

      {
        $unwind: "$employee",
      },

      {
        $lookup: {
          from: "departments",
          localField: "employee.departmentId",
          foreignField: "_id",
          as: "department",
        },
      },

      {
        $unwind: "$department",
      },

      {
        $group: {
          _id: "$department._id",

          departmentName: {
            $first: "$department.name",
          },

          employeeCount: {
            $sum: 1,
          },

          totalSalary: {
            $sum: "$netSalary",
          },

          averageSalary: {
            $avg: "$netSalary",
          },

          highestSalary: {
            $max: "$netSalary",
          },

          lowestSalary: {
            $min: "$netSalary",
          },

          totalBonus: {
            $sum: "$bonus",
          },
        },
      },

      {
        $sort: {
          totalSalary: -1,
        },
      },
    ]);
  }

  async getMonthlyPayrollReport(
    companyId: string,
  ) {
    return Payroll.aggregate([
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
          _id: {
            year: "$year",
            month: "$month",
          },

          employeeCount: {
            $sum: 1,
          },

          totalGrossSalary: {
            $sum: "$grossSalary",
          },

          totalNetSalary: {
            $sum: "$netSalary",
          },

          totalBonus: {
            $sum: "$bonus",
          },

          totalWorkingDays: {
            $sum: "$workingDays",
          },

          totalPresentDays: {
            $sum: "$presentDays",
          },

          totalAbsentDays: {
            $sum: "$absentDays",
          },

          averageSalary: {
            $avg: "$netSalary",
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);
  }

  async getSalaryExpenseReport(
    companyId: string,
  ) {
    return Payroll.aggregate([
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
          _id: {
            year: "$year",
            month: "$month",
          },

          employeesPaid: {
            $sum: 1,
          },

          totalGrossSalary: {
            $sum: "$grossSalary",
          },

          totalNetSalary: {
            $sum: "$netSalary",
          },

          totalBonus: {
            $sum: "$bonus",
          },

          totalPF: {
            $sum: "$pf",
          },

          totalProfessionalTax: {
            $sum: "$professionalTax",
          },

          totalIncomeTax: {
            $sum: "$incomeTax",
          },

          totalOtherDeductions: {
            $sum: "$otherDeductions",
          },
        },
      },
      {
        $project: {
          _id: 0,

          year: "$_id.year",

          month: "$_id.month",

          employeesPaid: 1,

          totalGrossSalary: 1,

          totalNetSalary: 1,

          totalBonus: 1,

          totalPF: 1,

          totalProfessionalTax: 1,

          totalIncomeTax: 1,

          totalOtherDeductions: 1,

          totalExpense: "$totalNetSalary",
        },
      },
      {
        $sort: {
          year: -1,
          month: -1,
        },
      },
    ]);
  }

  async getYearlyPayrollReport(
    companyId: string,
  ) {
    return Payroll.aggregate([
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
          _id: "$year",

          employeeCount: {
            $addToSet: "$employeeId",
          },

          totalGrossSalary: {
            $sum: "$grossSalary",
          },

          totalNetSalary: {
            $sum: "$netSalary",
          },

          totalBonus: {
            $sum: "$bonus",
          },

          totalPF: {
            $sum: "$pf",
          },

          totalProfessionalTax: {
            $sum: "$professionalTax",
          },

          totalIncomeTax: {
            $sum: "$incomeTax",
          },

          totalOtherDeductions: {
            $sum: "$otherDeductions",
          },

          averageSalary: {
            $avg: "$netSalary",
          },

          highestSalary: {
            $max: "$netSalary",
          },

          lowestSalary: {
            $min: "$netSalary",
          },
        },
      },
      {
        $project: {
          _id: 0,

          year: "$_id",

          employeeCount: {
            $size: "$employeeCount",
          },

          totalGrossSalary: 1,

          totalNetSalary: 1,

          totalBonus: 1,

          totalPF: 1,

          totalProfessionalTax: 1,

          totalIncomeTax: 1,

          totalOtherDeductions: 1,

          averageSalary: 1,

          highestSalary: 1,

          lowestSalary: 1,
        },
      },
      {
        $sort: {
          year: -1,
        },
      },
    ]);
  }

  async exportPayroll(
    companyId: string,
  ) {
    return Payroll.find({
      companyId,
      deletedAt: null,
    })
      .populate(
        "employeeId",
        `
        employeeId
        firstName
        lastName
        email
        departmentId
        designationId
        `,
      )
      .sort({
        year: -1,
        month: -1,
      });
  }
}

export const payrollRepository =
  new PayrollRepository();