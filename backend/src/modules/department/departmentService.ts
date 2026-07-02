import mongoose from "mongoose";

import { User } from "../../models/userModel";

import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

import { departmentRepository } from "./departmentRepository";

class DepartmentService {
  async createDepartment(
    companyId: string,
    data: any,
  ) {
    const existingName =
      await departmentRepository.findByName(
        companyId,
        data.name,
      );

    if (existingName) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Department name already exists",
      );
    }

    const existingCode =
      await departmentRepository.findByCode(
        companyId,
        data.code,
      );

    if (existingCode) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Department code already exists",
      );
    }

    if (data.head) {
      const employee =
        await User.findOne({
          _id: data.head,
          companyId,
          deletedAt: null,
        });

      if (!employee) {
        throw new ApiError(
          HTTP_STATUS.NOT_FOUND,
          "Department head not found",
        );
      }

      data.head =
        new mongoose.Types.ObjectId(
          data.head,
        );
    }

    return departmentRepository.create({
      companyId:
        new mongoose.Types.ObjectId(
          companyId,
        ),
      ...data,
    });
  }

  async updateDepartment(
    departmentId: string,
    data: any,
  ) {
    const department =
      await departmentRepository.findById(
        departmentId,
      );

    if (!department) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Department not found",
      );
    }

    if (data.head) {
      data.head =
        new mongoose.Types.ObjectId(
          data.head,
        );
    }

    return departmentRepository.update(
      departmentId,
      data,
    );
  }

  async getDepartmentById(
    departmentId: string,
  ) {
    const department =
      await departmentRepository.findById(
        departmentId,
      );

    if (!department) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Department not found",
      );
    }

    return department;
  }

  async getDepartments(
    companyId: string,
  ) {
    return departmentRepository.getAll(
      companyId,
    );
  }

  async searchDepartments(
    companyId: string,
    query: any,
  ) {
    const filter: any = {
      companyId,
      deletedAt: null,
    };

    if (query.name) {
      filter.name = {
        $regex: query.name,
        $options: "i",
      };
    }

    if (query.isActive) {
      filter.isActive =
        query.isActive === "true";
    }

    return departmentRepository.search(
      filter,
      Number(query.page || 1),
      Number(query.limit || 10),
    );
  }

  async deleteDepartment(
    departmentId: string,
  ) {
    const department =
      await departmentRepository.findById(
        departmentId,
      );

    if (!department) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Department not found",
      );
    }

    return departmentRepository.softDelete(
      departmentId,
    );
  }

  async getAnalytics(
    companyId: string,
  ) {
    return departmentRepository.getAnalytics(
      companyId,
    );
  }
}

export const departmentService =
  new DepartmentService();