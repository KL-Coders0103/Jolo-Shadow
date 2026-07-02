import PDFDocument from "pdfkit";

import { Buffer } from "buffer";

export const generatePayslipPdf = (
  payroll: any,
): Promise<Buffer> => {

  return new Promise(
    (resolve) => {

      const doc = new PDFDocument();

      const chunks: Buffer[] = [];

      doc.on(
        "data",
        (chunk) => chunks.push(chunk),
      );

      doc.on(
        "end",
        () => {

          resolve(
            Buffer.concat(chunks),
          );

        },
      );

      doc
        .fontSize(24)
        .text("Employee Payslip", {
          align: "center",
        });

      doc.moveDown();

      doc.text(
        `Employee : ${payroll.employeeId.firstName} ${payroll.employeeId.lastName}`,
      );

      doc.text(
        `Email : ${payroll.employeeId.email}`,
      );

      doc.text(
        `Month : ${payroll.month}`,
      );

      doc.text(
        `Year : ${payroll.year}`,
      );

      doc.moveDown();

      doc.text(
        `Basic Salary : ₹${payroll.basicSalary}`,
      );

      doc.text(
        `HRA : ₹${payroll.hra}`,
      );

      doc.text(
        `Allowances : ₹${payroll.allowances}`,
      );

      doc.text(
        `Bonus : ₹${payroll.bonus}`,
      );

      doc.text(
        `Gross Salary : ₹${payroll.grossSalary}`,
      );

      doc.moveDown();

      doc.text(
        `PF : ₹${payroll.pf}`,
      );

      doc.text(
        `Professional Tax : ₹${payroll.professionalTax}`,
      );

      doc.text(
        `Income Tax : ₹${payroll.incomeTax}`,
      );

      doc.text(
        `Other Deductions : ₹${payroll.otherDeductions}`,
      );

      doc.moveDown();

      doc
        .fontSize(18)
        .text(
          `Net Salary : ₹${payroll.netSalary}`,
        );

      doc.end();

    },
  );

};