import { employeeRepository }
from "./employeeRepository";

import { generateRandomToken }
from "../../common/utils/tokenUtils";

import { ApiError }
from "../../common/errors/ApiError";

import { HTTP_STATUS }
from "../../common/errors/errorCodes";
import { User } from "../../models/userModel";
import { UserRole } from "../../common/constants/enums";

class EmployeeService {

  async inviteEmployee(
    companyId: string,
    invitedBy: string,
    email: string,
  ) {

    const token =
      generateRandomToken();

    const invitation =
      await employeeRepository
        .createInvitation({
          email,
          companyId,
          invitedBy,

          token,

          expiresAt: new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000,
          ),
        });

    return invitation;
  }

  async getEmployees(
    companyId: string,
  ) {
    return employeeRepository
      .getEmployees(companyId);
  }

  async getEmployeeById(
    employeeId: string,
  ) {

    const employee =
      await employeeRepository
        .getEmployeeById(employeeId);

    if (!employee) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Employee not found",
      );
    }

    return employee;
  }

  async acceptInvitation(data: {
    token: string;
    firstName: string;
    lastName: string;
    password: string;
    }) {

    const invitation =
        await employeeRepository
        .findInvitationByToken(
            data.token,
        );

    if (!invitation) {
        throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid invitation",
        );
    }

    const existingUser =
        await User.findOne({
        email: invitation.email,
        });

    if (existingUser) {
        throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "User already exists",
        );
    }

    const employee =
        await User.create({
        firstName: data.firstName,

        lastName: data.lastName,

        email: invitation.email,

        password: data.password,

        role: UserRole.EMPLOYEE,

        companyId:
            invitation.companyId,

        isEmailVerified: true,
        });

    await employeeRepository
        .updateInvitation(
        String(invitation._id),
        {
            accepted: true,
        },
        );

    return employee;
    }

    async suspendEmployee(
    employeeId: string,
    ) {

    const employee =
        await employeeRepository
        .updateEmployee(
            employeeId,
            {
            isActive: false,
            },
        );

    if (!employee) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Employee not found",
        );
    }

    return employee;
    }

    async activateEmployee(
    employeeId: string,
    ) {

    const employee =
        await employeeRepository
        .updateEmployee(
            employeeId,
            {
            isActive: true,
            },
        );

    if (!employee) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Employee not found",
        );
    }

    return employee;
    }

    async deleteEmployee(
    employeeId: string,
    ) {

    const employee =
        await employeeRepository
        .updateEmployee(
            employeeId,
            {
            deletedAt: new Date(),
            },
        );

    if (!employee) {
        throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Employee not found",
        );
    }

    return employee;
    }

    async searchEmployees(
    companyId: string,
    query: {
        search?: string;
        role?: string;
        page?: string;
        limit?: string;
    },
    ) {

    return employeeRepository
        .getEmployeesWithFilters(
        companyId,
        {
            search: query.search,

            role: query.role,

            page: Number(
            query.page || 1,
            ),

            limit: Number(
            query.limit || 10,
            ),
        },
        );
    }
}

export const employeeService =
  new EmployeeService();