/**
 * @swagger
 * tags:
 *   name: Bonus
 *   description: Bonus Management APIs
 */

/**
 * @swagger
 * /api/v1/bonuses:
 *   post:
 *     summary: Create Bonus
 *     tags: [Bonus]
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
 *                 example: Diwali Bonus
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - FESTIVAL
 *                   - PERFORMANCE
 *                   - REFERRAL
 *                   - CUSTOM
 *               amount:
 *                 type: number
 *                 example: 10000
 *               month:
 *                 type: integer
 *                 example: 10
 *               year:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       201:
 *         description: Bonus created successfully
 */

/**
 * @swagger
 * /api/v1/bonuses/{id}/approve:
 *   patch:
 *     summary: Approve Bonus
 *     tags: [Bonus]
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
 *         description: Bonus approved successfully
 */

/**
 * @swagger
 * /api/v1/bonuses/search:
 *   get:
 *     summary: Search Bonuses
 *     tags: [Bonus]
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
 *         description: Bonus search results
 */

/**
 * @swagger
 * /api/v1/bonuses/{id}:
 *   get:
 *     summary: Get Bonus By Id
 *     tags: [Bonus]
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
 *         description: Bonus fetched successfully
 */

/**
 * @swagger
 * /api/v1/bonuses/{id}:
 *   delete:
 *     summary: Delete Bonus
 *     tags: [Bonus]
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
 *         description: Bonus deleted successfully
 */

/**
 * @swagger
 * /api/v1/bonuses/analytics:
 *   get:
 *     summary: Bonus Analytics
 *     tags: [Bonus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bonus analytics fetched successfully
 */