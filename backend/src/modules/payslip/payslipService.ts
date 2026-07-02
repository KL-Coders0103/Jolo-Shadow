import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";
import { generatePayslipPdf } from "../../common/utils/generatePayslipPdf";

import { Payroll } from "../../models/payrollModel";
import { User } from "../../models/userModel";
import { emailService } from "../email/emailService";
import { emailTemplates } from "../email/emailTemplate";
import { uploadService } from "../upload/uploadService";

import { payslipRepository } from "./payslipRepository";

class PayslipService {
  /**
   * Generate Payslip
   */
  async generatePayslip(
    companyId: string,
    payrollId: string,
  ) {
    const existingPayslip =
      await payslipRepository.findByPayroll(
        payrollId,
      );

    if (existingPayslip) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Payslip already generated",
      );
    }

    const payroll =
      await Payroll.findOne({
        _id: payrollId,
        companyId,
        deletedAt: null,
      });

    if (!payroll) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Payroll not found",
      );
    }

    return payslipRepository.create({
      employeeId: payroll.employeeId,

      companyId,

      payrollId,

      month: payroll.month,

      year: payroll.year,

      generatedAt: new Date(),
    });
  }

  /**
   * Get Payslip By Id
   */
  async getPayslipById(
    payslipId: string,
  ) {
    const payslip =
      await payslipRepository.getById(
        payslipId,
      );

    if (!payslip) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Payslip not found",
      );
    }

    return payslip;
  }

  /**
   * Employee Payslip History
   */
  async getEmployeeHistory(
    employeeId: string,
  ) {
    return payslipRepository.getEmployeeHistory(
      employeeId,
    );
  }

  /**
   * Company Search
   */
  async searchPayslips(
    companyId: string,
    query: {
      employeeId?: string;
      month?: string;
      year?: string;
    },
  ) {
    return payslipRepository.search(
      companyId,
      query,
    );
  }

  async generatePdf(payslipId: string) {
    const payslip = await payslipRepository.getById(
      payslipId,
    );

    if (!payslip) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Payslip not found"
        );
    }

    const pdfBuffer = await generatePayslipPdf(payslip.payrollId);

    const pdfUrl = await uploadService.uploadPdf(pdfBuffer);

    return payslipRepository.update(payslipId, {
        pdfUrl,
    });
  }

  async downloadPayslip(payslipId: string) {
    const payslip = await payslipRepository.getById(
      payslipId,
    );

    if (!payslip) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Payslip not found"
        );
    }

    await payslipRepository.update(payslipId, {
        downloadedAt: new Date(),
        $inc: { downloadCount: 1 },
    });

    return payslip.pdfUrl;
  }

  async emailPayslip(payslipId: string) {
    const payslip = await payslipRepository.getById(
      payslipId,
    );

    if (!payslip) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Payslip not found"
        );
    }

    if (!payslip.pdfUrl) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Generate PDF before sending email"
        );
    }

    const user = await User.findById(payslip.employeeId);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Employee not found"
        );
    }

    await emailService.sendEmail({
        to:user.email,
        subject:`Payslip ${payslip.month}/${payslip.year}`,
        html: emailTemplates.payslip(
            `${user.firstName} ${user.lastName}`,
            payslip.month,
            payslip.year,
        ),
        attachments: [
            {
                filename:
                `Payslip-${payslip.month}-${payslip.year}.pdf`,
                path:
                payslip.pdfUrl,
            },
        ],
    });

    return payslipRepository.update(payslipId, {
        emailed: true,
        emailedAt: new Date(),
    });
  }
}

export const payslipService =
  new PayslipService();