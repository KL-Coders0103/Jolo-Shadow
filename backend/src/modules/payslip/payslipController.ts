import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { payslipService } from "./payslipService";
import { asyncHandler } from "../../utils/asyncHandler";

class PayslipController {
  generatePayslip = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payslip =
        await payslipService.generatePayslip(
          req.user!.companyId,
          req.body.payrollId,
        );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Payslip generated successfully",
          payslip,
        ),
      );
    },
  );

  generatePdf = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payslip =
        await payslipService.generatePdf(
          String(req.params.id)
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "PDF generated successfully",
          payslip,
        ),
      );
    },
  );

  emailPayslip = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payslip =
        await payslipService.emailPayslip(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payslip emailed successfully",
          payslip,
        ),
      );
    },
  );

  downloadPayslip = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const url =
        await payslipService.downloadPayslip(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payslip URL fetched",
          {
            url,
          },
        ),
      );
    },
  );

  getPayslipById = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payslip =
        await payslipService.getPayslipById(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payslip fetched successfully",
          payslip,
        ),
      );
    },
  );

  getEmployeeHistory = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const history =
        await payslipService.getEmployeeHistory(
          req.user!.id,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payslip history fetched",
          history,
        ),
      );
    },
  );

  searchPayslips = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const result =
        await payslipService.searchPayslips(
          req.user!.companyId,
          req.query,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payslips fetched successfully",
          result,
        ),
      );
    },
  );
}

export const payslipController =
  new PayslipController();