import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { departmentService } from "./departmentService";
import { asyncHandler } from "../../utils/asyncHandler";

class DepartmentController {
  createDepartment = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const department =
        await departmentService.createDepartment(
          req.user!.companyId,
          req.body,
        );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Department created successfully",
          department,
        ),
      );
    },
  );

  updateDepartment = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const department =
        await departmentService.updateDepartment(
          String(req.params.id),
          req.body,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Department updated successfully",
          department,
        ),
      );
    },
  );

  getDepartmentById = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const department =
        await departmentService.getDepartmentById(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Department fetched successfully",
          department,
        ),
      );
    },
  );

  getDepartments = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const departments =
        await departmentService.getDepartments(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Departments fetched successfully",
          departments,
        ),
      );
    },
  );

  searchDepartments = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const result =
        await departmentService.searchDepartments(
          req.user!.companyId,
          req.query,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Departments fetched successfully",
          result,
        ),
      );
    },
  );

  deleteDepartment = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      await departmentService.deleteDepartment(
        String(req.params.id),
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Department deleted successfully",
        ),
      );
    },
  );

  getAnalytics = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const analytics =
        await departmentService.getAnalytics(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Department analytics fetched successfully",
          analytics,
        ),
      );
    },
  );
}

export const departmentController =
  new DepartmentController();