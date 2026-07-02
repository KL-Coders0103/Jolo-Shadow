import { UserRole } from "../../common/constants/enums";
import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";
import { User } from "../../models/userModel";

import { salaryStructureRepository } from "./salaryStructureRepository";

class SalaryStructureService {

  async createSalaryStructure(
    companyId: string,
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

    const existing =
      await salaryStructureRepository
        .findActiveByEmployee(
          data.employeeId, companyId,
        );

    if (existing) {

      await salaryStructureRepository.update(String(existing._id), {
        isActive: false,
      },);

      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Salary structure already exists",
      );
    }

    const grossSalary =
      data.basicSalary +
      data.hra +
      data.allowances +
      data.bonus;

    const netSalary =
      grossSalary -
      data.pf -
      data.professionalTax -
      data.incomeTax -
      data.otherDeductions;

    return salaryStructureRepository
      .create({

        ...data,

        companyId,

        grossSalary,

        netSalary,
      });
  }

  async getAll(
    companyId: string,
  ) {

    return salaryStructureRepository
      .findAll(
        companyId,
      );
  }

  async getById(
    id: string,
  ) {

    const salary =
      await salaryStructureRepository
        .findById(id);

    if (!salary) {

      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Salary structure not found",
      );
    }

    return salary;
  }

  async update(
    id: string,
    data: any,
  ) {

    const grossSalary =
      data.basicSalary +
      data.hra +
      data.allowances +
      data.bonus;

    const netSalary =
      grossSalary -
      data.pf -
      data.professionalTax -
      data.incomeTax -
      data.otherDeductions;

    return salaryStructureRepository
      .update(id, {
        ...data,
        grossSalary,
        netSalary,
      });
  }

  async delete(
    id: string,
  ) {

    return salaryStructureRepository
      .softDelete(id);
  }

  async search(
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

    return salaryStructureRepository
      .search(
        filter,
        Number(query.page || 1),
        Number(query.limit || 10),
      );
  }
}

export const salaryStructureService =
  new SalaryStructureService();