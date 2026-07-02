/**
 * @swagger
 * tags:
 *   name: Payroll
 *   description: Payroll Management APIs
 */

/**
 * @swagger
 * /api/v1/payroll/generate:
 *   post:
 *     summary: Generate Payroll
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - month
 *               - year
 *             properties:
 *               employeeId:
 *                 type: string
 *               month:
 *                 type: integer
 *                 example: 7
 *               year:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       201:
 *         description: Payroll generated successfully
 */

/**
 * @swagger
 * /api/v1/payroll/{id}/approve:
 *   patch:
 *     summary: Approve Payroll
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll approved successfully
 */

/**
 * @swagger
 * /api/v1/payroll/{id}/lock:
 *   patch:
 *     summary: Lock Payroll
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll locked successfully
 */

/**
 * @swagger
 * /api/v1/payroll/{id}/unlock:
 *   patch:
 *     summary: Unlock Payroll
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll unlocked successfully
 */

/**
 * @swagger
 * /api/v1/payroll/{id}/pay:
 *   patch:
 *     summary: Mark Payroll as Paid
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll marked as paid
 */

/**
 * @swagger
 * /api/v1/payroll/{id}/regenerate:
 *   post:
 *     summary: Regenerate Payroll
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll regenerated successfully
 */

/**
 * @swagger
 * /api/v1/payroll/history/{employeeId}:
 *   get:
 *     summary: Employee Payroll History
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll history fetched successfully
 */

/**
 * @swagger
 * /api/v1/payroll/reports/departments:
 *   get:
 *     summary: Department Wise Salary Report
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Department salary report
 */

/**
 * @swagger
 * /api/v1/payroll/reports/monthly:
 *   get:
 *     summary: Monthly Payroll Report
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly payroll report
 */

/**
 * @swagger
 * /api/v1/payroll/reports/expense:
 *   get:
 *     summary: Salary Expense Report
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Salary expense report
 */

/**
 * @swagger
 * /api/v1/payroll/reports/yearly:
 *   get:
 *     summary: Yearly Payroll Report
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yearly payroll report
 */

/**
 * @swagger
 * /api/v1/payroll/export/excel:
 *   get:
 *     summary: Export Payroll Excel
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel downloaded successfully
 */

/**
 * @swagger
 * /api/v1/payroll/export/pdf:
 *   get:
 *     summary: Export Payroll PDF
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF downloaded successfully
 */

/**
 * @swagger
 * /api/v1/payroll/{id}:
 *   get:
 *     summary: Get Payroll By Id
 *     tags: [Payroll]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payroll fetched successfully
 */