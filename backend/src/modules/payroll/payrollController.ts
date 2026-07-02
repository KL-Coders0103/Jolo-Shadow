import { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/ApiResponse";

import { payrollService } from "./payrollService";
import { asyncHandler } from "../../utils/asyncHandler";

class PayrollController {

  generatePayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payroll =
        await payrollService.generatePayroll(
          req.user!.companyId,
          req.body,
        );

      return res.status(201).json(
        new ApiResponse(
          true,
          "Payroll generated successfully",
          payroll,
        ),
      );

    },
  );

  regeneratePayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payroll =
        await payrollService.regeneratePayroll(
          req.user!.companyId,
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll regenerated successfully",
          payroll,
        ),
      );

    },
  );

  getPayrolls = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payrolls =
        await payrollService.getPayrolls(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payrolls fetched successfully",
          payrolls,
        ),
      );

    },
  );

  getPayrollById = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payroll =
        await payrollService.getPayrollById(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll fetched successfully",
          payroll,
        ),
      );

    },
  );

  searchPayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payrolls =
        await payrollService.searchPayroll(
          req.user!.companyId,
          req.query,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll search completed",
          payrolls,
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
        await payrollService.getAnalytics(
          req.user!.companyId,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll analytics fetched",
          analytics,
        ),
      );

    },
  );

  approvePayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payroll =
        await payrollService.approvePayroll(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll approved successfully",
          payroll,
        ),
      );

    },
  );

  markAsPaid = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const payroll =
        await payrollService.markAsPaid(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll marked as paid",
          payroll,
        ),
      );

    },
  );

  deletePayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      await payrollService.deletePayroll(
        String(req.params.id),
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll deleted successfully",
        ),
      );

    },
  );

  lockPayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payroll =
        await payrollService.lockPayroll(
          String(req.params.id),
          req.user!.id,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll locked successfully",
          payroll,
        ),
      );
    },
  );

  unlockPayroll = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const payroll =
        await payrollService.unlockPayroll(
          String(req.params.id),
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll unlocked successfully",
          payroll,
        ),
      );
    },
  );

  getPayrollHistory = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const history =
        await payrollService.getPayrollHistory(
          req.user!.companyId,
          String(req.params.employeeId),
          page,
          limit,
        );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Payroll history fetched successfully",
          history,
        ),
      );
    },
  );

  getDepartmentWiseSalaryReport =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const report =
          await payrollService.getDepartmentWiseSalaryReport(
            req.user!.companyId,
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Department wise salary report fetched successfully",
            report,
          ),
        );

      },
  );

  getMonthlyPayrollReport =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const report =
          await payrollService.getMonthlyPayrollReport(
            req.user!.companyId,
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Monthly payroll report fetched successfully",
            report,
          ),
        );

      },
    );

  getSalaryExpenseReport =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {

        const report =
          await payrollService.getSalaryExpenseReport(
            req.user!.companyId,
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Salary expense report fetched successfully",
            report,
          ),
        );

      },
    );

  getYearlyPayrollReport =
    asyncHandler(
      async (
        req: Request,
        res: Response,
      ) => {
        const report =
          await payrollService.getYearlyPayrollReport(
            req.user!.companyId,
          );

        return res.status(200).json(
          new ApiResponse(
            true,
            "Yearly payroll report fetched successfully",
            report,
          ),
        );
      },
    );

  exportPayrollExcel =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const file =
        await payrollService.exportPayrollExcel(
          req.user!.companyId,
        );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=payroll-report.xlsx",
      );

      return res.send(file);

    },
  );

  exportPayrollPdf =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {

      const file =
        await payrollService.exportPayrollPdf(
          req.user!.companyId,
        );

      res.setHeader(
        "Content-Type",
        "application/pdf",
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=payroll-report.pdf",
      );

      return res.send(file);

    },
  );
}

export const payrollController =
  new PayrollController();