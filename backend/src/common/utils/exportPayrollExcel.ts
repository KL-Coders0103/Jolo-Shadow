import ExcelJS from "exceljs";

export const exportPayrollExcel = async (
  payrolls: any[],
) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet("Payroll Report");

  worksheet.columns = [
  {
    header: "Employee ID",
    key: "employeeCode",
    width: 18,
  },
  {
    header: "Employee Name",
    key: "employeeName",
    width: 30,
  },
  {
    header: "Email",
    key: "email",
    width: 35,
  },
  {
    header: "Department",
    key: "department",
    width: 25,
  },
  {
    header: "Designation",
    key: "designation",
    width: 25,
  },
  {
    header: "Month",
    key: "month",
    width: 10,
  },
  {
    header: "Year",
    key: "year",
    width: 10,
  },
  {
    header: "Working Days",
    key: "workingDays",
    width: 15,
  },
  {
    header: "Present Days",
    key: "presentDays",
    width: 15,
  },
  {
    header: "Absent Days",
    key: "absentDays",
    width: 15,
  },
  {
    header: "Leave Days",
    key: "leaveDays",
    width: 15,
  },
  {
    header: "Gross Salary",
    key: "grossSalary",
    width: 18,
  },
  {
    header: "Bonus",
    key: "bonus",
    width: 15,
  },
  {
    header: "PF",
    key: "pf",
    width: 15,
  },
  {
    header: "Professional Tax",
    key: "professionalTax",
    width: 20,
  },
  {
    header: "Income Tax",
    key: "incomeTax",
    width: 18,
  },
  {
    header: "Other Deductions",
    key: "otherDeductions",
    width: 20,
  },
  {
    header: "Net Salary",
    key: "netSalary",
    width: 18,
  },
  {
    header: "Status",
    key: "status",
    width: 15,
  },
  {
    header: "Locked",
    key: "locked",
    width: 12,
  },
  {
    header: "Paid At",
    key: "paidAt",
    width: 25,
  },
];

  payrolls.forEach((payroll) => {
    worksheet.addRow({
      employeeCode:
        payroll.employeeId.employeeId,

      employeeName:
        `${payroll.employeeId.firstName} ${payroll.employeeId.lastName}`,

      email:
        payroll.employeeId.email,

      department:
        payroll.employeeId.departmentId?.name ??
        "-",

      designation:
        payroll.employeeId.designationId?.title ??
        "-",

      month:
        payroll.month,

      year:
        payroll.year,

      workingDays:
        payroll.workingDays,

      presentDays:
        payroll.presentDays,

      absentDays:
        payroll.absentDays,

      leaveDays:
        payroll.leaveDays,

      grossSalary:
        payroll.grossSalary,

      bonus:
        payroll.bonus,

      pf:
        payroll.pf,

      professionalTax:
        payroll.professionalTax,

      incomeTax:
        payroll.incomeTax,

      otherDeductions:
        payroll.otherDeductions,

      netSalary:
        payroll.netSalary,

      status:
        payroll.status,

      locked:
        payroll.isLocked
          ? "Yes"
          : "No",

      paidAt:
        payroll.paidAt
          ? payroll.paidAt.toLocaleDateString()
          : "-",
    });

    worksheet.getRow(1).font = {
      bold: true,
    };

    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    worksheet.autoFilter = {
      from: "A1",
      to: "U1",
    };
  });

  const summary = workbook.addWorksheet("Summary");

  summary.addRow([
    "Payroll Report",
  ]);

  summary.addRow([]);

  summary.addRow([
    "Generated At",
    new Date(),
  ]);

  summary.addRow([]);

  summary.addRow([
    "Total Employees",
    payrolls.length,
  ]);

  summary.addRow([
    "Total Gross Salary",
    payrolls.reduce(
      (sum, payroll) =>
        sum + payroll.grossSalary,
      0,
    ),
  ]);

  summary.addRow([
    "Total Net Salary",
    payrolls.reduce(
      (sum, payroll) =>
        sum + payroll.netSalary,
      0,
    ),
  ]);

  summary.addRow([
    "Total Bonus",
    payrolls.reduce(
      (sum, payroll) =>
        sum + payroll.bonus,
      0,
    ),
  ]);

  return workbook.xlsx.writeBuffer();
};