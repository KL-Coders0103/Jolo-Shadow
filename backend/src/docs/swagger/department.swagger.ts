/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department Management APIs
 */

/**
 * @swagger
 * /api/v1/departments:
 *   post:
 *     summary: Create Department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Engineering
 *               code:
 *                 type: string
 *                 example: ENG
 *               description:
 *                 type: string
 *                 example: Software Development Team
 *               head:
 *                 type: string
 *                 example: 66bc9b5fd8d6b50cf9830012
 *     responses:
 *       201:
 *         description: Department created successfully
 */

/**
 * @swagger
 * /api/v1/departments:
 *   get:
 *     summary: Get All Departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Department list
 */

/**
 * @swagger
 * /api/v1/departments/search:
 *   get:
 *     summary: Search Departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
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
 *         description: Department search results
 */

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Get Department By Id
 *     tags: [Departments]
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
 *         description: Department details
 */

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   patch:
 *     summary: Update Department
 *     tags: [Departments]
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
 *         description: Department updated successfully
 */

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   delete:
 *     summary: Delete Department
 *     tags: [Departments]
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
 *         description: Department deleted successfully
 */

/**
 * @swagger
 * /api/v1/departments/analytics:
 *   get:
 *     summary: Department Analytics
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Department analytics
 */