import { User } from "../../models/userModel";
import { Invitation } from "../../models/invitationModel";
import { IInvitation } from "./employeeTypes";

class EmployeeRepository {

  async createInvitation(
    data: Record<string, unknown>,
  ) {
    return Invitation.create(data);
  }

  async findInvitationByToken(
    token: string,
  ): Promise<IInvitation | null> {
    return Invitation.findOne({
      token,
      accepted: false,
    });
  }

  async updateInvitation(
    invitationId: string,
    data: Record<string, unknown>,
  ) {
    return Invitation.findByIdAndUpdate(
      invitationId,
      data,
      { new: true },
    );
  }

  async getEmployees(
    companyId: string,
  ) {
    return User.find({
      companyId,
      deletedAt: null,
    }).select("-password");
  }

  async getEmployeeById(
    employeeId: string,
  ) {
    return User.findById(
      employeeId,
    ).select("-password");
  }

  async updateEmployee(
    employeeId: string,
    data: Record<string, unknown>,
  ) {
    return User.findByIdAndUpdate(
      employeeId,
      data,
      { new: true },
    );
  }

  async getEmployeesWithFilters(
    companyId: string,
    filters: {
        search?: string;
        role?: string;
        page: number;
        limit: number;
    },
    ) {

    const query: Record<string, unknown> = {
        companyId,
        deletedAt: null,
    };

    if (filters.search) {
        query.$or = [
        {
            firstName: {
            $regex: filters.search,
            $options: "i",
            },
        },

        {
            lastName: {
            $regex: filters.search,
            $options: "i",
            },
        },

        {
            email: {
            $regex: filters.search,
            $options: "i",
            },
        },
        ];
    }

    if (filters.role) {
        query.role = filters.role;
    }

    const skip =
        (filters.page - 1) *
        filters.limit;

    const [employees, total] =
        await Promise.all([
        User.find(query)
            .select("-password")
            .skip(skip)
            .limit(filters.limit),

        User.countDocuments(query),
        ]);

    return {
        employees,
        total,
        page: filters.page,
        pages: Math.ceil(
        total / filters.limit,
        ),
    };
    }
}

export const employeeRepository =
  new EmployeeRepository();