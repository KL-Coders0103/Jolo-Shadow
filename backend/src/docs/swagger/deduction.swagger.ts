/**
 * @swagger
 * tags:
 *   name: Deduction
 *   description: Deduction Management APIs
 */

/**
 * @swagger
 * /api/v1/deductions:
 *   post:
 *     summary: Create Deduction
 *     tags: [Deduction]
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
 *               - title
 *               - type
 *               - amount
 *               - month
 *               - year
 *             properties:
 *               employeeId:
 *                 type: string
 *               title:
 *                 type: string
 *                 example: Late Arrival Penalty
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - PF
 *                   - ESI
 *                   - PROFESSIONAL_TAX
 *                   - INCOME_TAX
 *                   - PENALTY
 *                   - LOAN
 *                   - SALARY_ADVANCE
 *                   - CUSTOM
 *               amount:
 *                 type: number
 *                 example: 1500
 *               month:
 *                 type: integer
 *                 example: 7
 *               year:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       201:
 *         description: Deduction created successfully
 */

/**
 * @swagger
 * /api/v1/deductions/{id}/approve:
 *   patch:
 *     summary: Approve Deduction
 *     tags: [Deduction]
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
 *         description: Deduction approved successfully
 */

/**
 * @swagger
 * /api/v1/deductions/search:
 *   get:
 *     summary: Search Deductions
 *     tags: [Deduction]
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
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: approved
 *         schema:
 *           type: boolean
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
 *         description: Deduction search results
 */

/**
 * @swagger
 * /api/v1/deductions/{id}:
 *   get:
 *     summary: Get Deduction By Id
 *     tags: [Deduction]
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
 *         description: Deduction fetched successfully
 */

/**
 * @swagger
 * /api/v1/deductions/{id}:
 *   delete:
 *     summary: Delete Deduction
 *     tags: [Deduction]
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
 *         description: Deduction deleted successfully
 */

/**
 * @swagger
 * /api/v1/deductions/analytics:
 *   get:
 *     summary: Deduction Analytics
 *     tags: [Deduction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deduction analytics fetched successfully
 */