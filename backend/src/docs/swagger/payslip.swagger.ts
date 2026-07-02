/**
 * @swagger
 * tags:
 *   name: Payslip
 *   description: Payslip Management APIs
 */

/**
 * @swagger
 * /api/v1/payslips/generate:
 *   post:
 *     summary: Generate Payslip
 *     tags: [Payslip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payrollId
 *             properties:
 *               payrollId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payslip generated successfully
 */

/**
 * @swagger
 * /api/v1/payslips/pdf/{id}:
 *   post:
 *     summary: Generate Payslip PDF
 *     tags: [Payslip]
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
 *         description: PDF generated successfully
 */

/**
 * @swagger
 * /api/v1/payslips/email/{id}:
 *   post:
 *     summary: Email Payslip
 *     tags: [Payslip]
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
 *         description: Payslip emailed successfully
 */

/**
 * @swagger
 * /api/v1/payslips/download/{id}:
 *   get:
 *     summary: Download Payslip PDF
 *     tags: [Payslip]
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
 *         description: Payslip downloaded successfully
 */

/**
 * @swagger
 * /api/v1/payslips/history:
 *   get:
 *     summary: Employee Payslip History
 *     tags: [Payslip]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee payslip history
 */

/**
 * @swagger
 * /api/v1/payslips/search:
 *   get:
 *     summary: Search Payslips
 *     tags: [Payslip]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payslip search results
 */

/**
 * @swagger
 * /api/v1/payslips/{id}:
 *   get:
 *     summary: Get Payslip By Id
 *     tags: [Payslip]
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
 *         description: Payslip fetched successfully
 */