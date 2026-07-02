import PDFDocument from "pdfkit";

export const exportPayrollPdf = (
  payrolls: any[],
): Promise<Buffer> => {
  return new Promise(
    (resolve) => {
      const doc =
        new PDFDocument({
          margin: 40,
          size: "A4",
        });

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
        .fontSize(22)
        .text(
          "Payroll Report",
          {
            align: "center",
          },
        );

      doc.moveDown();

      doc
        .fontSize(10)
        .text(
          `Generated At: ${new Date().toLocaleString()}`,
        );

      doc.moveDown();

      payrolls.forEach(
        (payroll, index) => {
          doc
            .fontSize(14)
            .text(
              `Employee ${
                index + 1
              }`,
              {
                underline: true,
              },
            );

          doc.fontSize(11);

          doc.text(
            `Employee ID : ${
              payroll.employeeId
                .employeeId
            }`,
          );

          doc.text(
            `Employee : ${
              payroll.employeeId
                .firstName
            } ${
              payroll.employeeId
                .lastName
            }`,
          );

          doc.text(
            `Email : ${
              payroll.employeeId
                .email
            }`,
          );

          doc.text(
            `Month : ${payroll.month}`,
          );

          doc.text(
            `Year : ${payroll.year}`,
          );

          doc.text(
            `Gross Salary : ₹${payroll.grossSalary}`,
          );

          doc.text(
            `Bonus : ₹${payroll.bonus}`,
          );

          doc.text(
            `Net Salary : ₹${payroll.netSalary}`,
          );

          doc.text(
            `Status : ${payroll.status}`,
          );

          doc.text(
            `Locked : ${
              payroll.isLocked
                ? "Yes"
                : "No"
            }`,
          );

          doc.moveDown();
        },
      );

      doc.end();
    },
  );
};