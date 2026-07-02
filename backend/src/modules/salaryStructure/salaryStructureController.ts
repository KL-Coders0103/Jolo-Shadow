import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { salaryStructureService } from "./salaryStructureService";
import { asyncHandler } from "../../utils/asyncHandler";

class SalaryStructureController {

  create =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const salary =
          await salaryStructureService
            .createSalaryStructure(
              req.user!.companyId,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Salary structure created successfully",
            salary,
          ),
        );
      },
    );

  getAll =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const salaries =
          await salaryStructureService
            .getAll(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary structures fetched successfully",
            salaries,
          ),
        );
      },
    );

  getById =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const salary =
          await salaryStructureService
            .getById(String(req.params.id));

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary structure fetched successfully",
            salary,
          ),
        );
      },
    );

  update =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const salary =
          await salaryStructureService
            .update(
              String(req.params.id),
              req.body,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary structure updated successfully",
            salary,
          ),
        );
      },
    );

  delete =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        await salaryStructureService
          .delete(
            String(req.params.id),
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary structure deleted successfully",
          ),
        );
      },
    );

  search =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const result =
          await salaryStructureService
            .search(
              req.user!.companyId,
              req.query,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary structures fetched successfully",
            result,
          ),
        );
      },
    );
}

export const salaryStructureController =
  new SalaryStructureController();