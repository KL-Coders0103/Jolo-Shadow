/**
 * @swagger
 * tags:
 *   name: Salary Structure
 *   description: Salary Structure Management APIs
 */

/**
 * @swagger
 * /api/v1/salary-structures:
 *   post:
 *     summary: Create Salary Structure
 *     tags: [Salary Structure]
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
 *               - basicSalary
 *             properties:
 *               employeeId:
 *                 type: string
 *               basicSalary:
 *                 type: number
 *               hra:
 *                 type: number
 *               allowances:
 *                 type: number
 *               pf:
 *                 type: number
 *               professionalTax:
 *                 type: number
 *               incomeTax:
 *                 type: number
 *               otherDeductions:
 *                 type: number
 *     responses:
 *       201:
 *         description: Salary Structure created successfully
 */

/**
 * @swagger
 * /api/v1/salary-structures:
 *   get:
 *     summary: Get All Salary Structures
 *     tags: [Salary Structure]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Salary Structure list
 */

/**
 * @swagger
 * /api/v1/salary-structures/search:
 *   get:
 *     summary: Search Salary Structures
 *     tags: [Salary Structure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *       - in: query
 *         name: minSalary
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxSalary
 *         schema:
 *           type: number
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
 *         description: Salary Structure search results
 */

/**
 * @swagger
 * /api/v1/salary-structures/{id}:
 *   get:
 *     summary: Get Salary Structure By Id
 *     tags: [Salary Structure]
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
 *         description: Salary Structure fetched successfully
 */

/**
 * @swagger
 * /api/v1/salary-structures/{id}:
 *   patch:
 *     summary: Update Salary Structure
 *     tags: [Salary Structure]
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
 *         description: Salary Structure updated successfully
 */

/**
 * @swagger
 * /api/v1/salary-structures/{id}:
 *   delete:
 *     summary: Delete Salary Structure
 *     tags: [Salary Structure]
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
 *         description: Salary Structure deleted successfully
 */