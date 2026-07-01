import {
  Request,
  Response,
} from "express";

import { ApiResponse }
from "../../common/utils/ApiResponse";

import { leaveService }
from "./leaveService";
import { asyncHandler } from "../../utils/asyncHandler";

class LeaveController {

  applyLeave =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leave =
          await leaveService
            .applyLeave(
              req.user!.id,
              req.user!.companyId,
              req.body,
            );

        return res.status(201).json(
          new ApiResponse(
            true,
            "Leave applied successfully",
            leave,
          ),
        );
      },
    );

  getMyLeaves =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leaves =
          await leaveService
            .getMyLeaves(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leaves fetched successfully",
            leaves,
          ),
        );
      },
    );

  getCompanyLeaves =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leaves =
          await leaveService
            .getCompanyLeaves(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leaves fetched successfully",
            leaves,
          ),
        );
      },
    );

  approveLeave =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leave =
          await leaveService
            .approveLeave(String(
              req.params.id),
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leave approved",
            leave,
          ),
        );
      },
    );

  rejectLeave =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leave =
          await leaveService
            .rejectLeave(String(
              req.params.id),
              req.user!.id,
              req.body.comments,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leave rejected",
            leave,
          ),
        );
      },
    );

  cancelLeave =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const leave =
          await leaveService
            .cancelLeave(String(
              req.params.id),
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leave cancelled",
            leave,
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
          await leaveService
            .getAnalytics(
              req.user!.companyId,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leave analytics fetched successfully",
            analytics,
          ),
        );
      },
    );

  searchLeaves =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const data =
          await leaveService
            .searchLeaves(
              req.user!.companyId,

              req.query,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leaves fetched successfully",
            data,
          ),
        );
      },
    );

  getBalance =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const balance =
          await leaveService
            .getBalance(
              req.user!.id,
            );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Leave balance fetched successfully",
            balance,
          ),
        );
      },
    );
}

export const leaveController =
  new LeaveController();