import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { deductionService } from "./deductionService";
import { asyncHandler } from "../../utils/asyncHandler";

class DeductionController {
  createDeduction = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const deduction =
        await deductionService.createDeduction(
          req.user!.companyId,
          req.user!.id,
          req.body,
        );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Deduction created successfully",
          deduction,
        ),
      );
    },
  );

  approveDeduction = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const deduction =
        await deductionService.approveDeduction(
          String(req.params.id),
          req.user!.id,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deduction approved successfully",
          deduction,
        ),
      );
    },
  );

  getDeductionById = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const deduction =
        await deductionService.getDeductionById(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deduction fetched successfully",
          deduction,
        ),
      );
    },
  );

  searchDeductions = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const deductions =
        await deductionService.searchDeductions(
          req.user!.companyId,
          req.query,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deductions fetched successfully",
          deductions,
        ),
      );
    },
  );

  deleteDeduction = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      await deductionService.deleteDeduction(
        String(req.params.id),
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deduction deleted successfully",
        ),
      );
    },
  );

  getDeductionAnalytics = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const analytics =
        await deductionService.getDeductionAnalytics(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deduction analytics fetched successfully",
          analytics,
        ),
      );
    },
  );

  getAnalytics =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const analytics =
        await deductionService.getAnalytics(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Deduction analytics fetched successfully",
          analytics,
        ),
      );

    },
  );
}

export const deductionController =
  new DeductionController();