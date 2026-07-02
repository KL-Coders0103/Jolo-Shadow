import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { bonusService } from "./bonusService";
import { asyncHandler } from "../../utils/asyncHandler";

class BonusController {
  createBonus = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const bonus =
        await bonusService.createBonus(
          req.user!.companyId,
          req.user!.id,
          req.body,
        );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Bonus created successfully",
          bonus,
        ),
      );
    },
  );

  approveBonus = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const bonus =
        await bonusService.approveBonus(
          String(req.params.id),
          req.user!.id,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Bonus approved successfully",
          bonus,
        ),
      );
    },
  );

  getBonusById = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const bonus =
        await bonusService.getBonusById(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Bonus fetched successfully",
          bonus,
        ),
      );
    },
  );

  searchBonuses = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const bonuses =
        await bonusService.searchBonuses(
          req.user!.companyId,
          req.query,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Bonuses fetched successfully",
          bonuses,
        ),
      );
    },
  );

  deleteBonus = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      await bonusService.deleteBonus(
        String(req.params.id),
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Bonus deleted successfully",
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
        await bonusService.getAnalytics(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Bonus analytics fetched successfully",
          analytics,
        ),
      );

    },
  );
}

export const bonusController =
  new BonusController();