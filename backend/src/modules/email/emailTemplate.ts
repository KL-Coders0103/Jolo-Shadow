export const emailTemplates = {
  payslip: (
    employeeName: string,
    month: number,
    year: number,
  ) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="font-family: Arial, sans-serif;">

<h2>Hello ${employeeName},</h2>

<p>
Your payslip for
<strong>${month}/${year}</strong>
has been generated.
</p>

<p>
Please find the attached payslip.
</p>

<br/>

<p>
Regards,
</p>

<p>
HR Team
</p>

</body>

</html>
`,
};