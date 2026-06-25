import { Request, Response }
from "express";

import { employeeService }
from "./employeeService";


import { ApiResponse }
from "../../common/utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

class EmployeeController {

  inviteEmployee =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const invitation =
          await employeeService
            .inviteEmployee(
              req.user!.companyId,
              req.user!.id,
              req.body.email,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Employee invited successfully",
            invitation,
          ),
        );
      },
    );

  getEmployees =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const employees =
          await employeeService
            .getEmployees(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Employees fetched successfully",
            employees,
          ),
        );
      },
    );

  getEmployeeById =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const employee =
          await employeeService.getEmployeeById(String(req.params.id));

        return res.status(200).json(
          new ApiResponse(
            true,
            "Employee fetched successfully",
            employee,
          ),
        );
      },
    );

    acceptInvitation =
    asyncHandler(
        async (
        req: Request,
        res: Response,
        ) => {

        const employee =
            await employeeService
            .acceptInvitation(
                req.body,
            );

        return res.status(201).json(
            new ApiResponse(
            true,
            "Invitation accepted successfully",
            employee,
            ),
        );
        },
    );

    suspendEmployee =
    asyncHandler(
        async (req, res) => {

        const employee =
            await employeeService
            .suspendEmployee(String(req.params.id));

        return res.status(200).json(
            new ApiResponse(
            true,
            "Employee suspended successfully",
            employee,
            ),
        );
        },
    );

    activateEmployee =
    asyncHandler(
        async (req, res) => {

        const employee =
            await employeeService
            .activateEmployee(String(req.params.id));

        return res.status(200).json(
            new ApiResponse(
            true,
            "Employee activated successfully",
            employee,
            ),
        );
        },
    );

    deleteEmployee =
    asyncHandler(
        async (req, res) => {

        await employeeService
            .deleteEmployee(String(req.params.id));

        return res.status(200).json(
            new ApiResponse(
            true,
            "Employee deleted successfully",
            ),
        );
        },
    );

    searchEmployees =
    asyncHandler(
        async (req, res) => {

        const employees =
            await employeeService
            .searchEmployees(
                req.user!.companyId,
                req.query,
            );

        return res.status(200).json(
            new ApiResponse(
            true,
            "Employees fetched successfully",
            employees,
            ),
        );
        },
    );
}

export const employeeController =
  new EmployeeController();