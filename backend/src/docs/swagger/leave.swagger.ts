/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leave Management APIs
 */

/**
 * @swagger
 * /api/v1/leaves:
 *   post:
 *     summary: Apply leave
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - startDate
 *               - endDate
 *               - reason
 *
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - CASUAL
 *                   - SICK
 *                   - ANNUAL
 *                   - MATERNITY
 *                   - PATERNITY
 *                   - UNPAID
 *
 *               startDate:
 *                 type: string
 *
 *               endDate:
 *                 type: string
 *
 *               reason:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Leave applied successfully
 */

/**
 * @swagger
 * /api/v1/leaves/my:
 *   get:
 *     summary: Get logged in employee leaves
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Leaves fetched successfully
 */

/**
 * @swagger
 * /api/v1/leaves/company:
 *   get:
 *     summary: Get company leave requests
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Company leaves fetched successfully
 */

/**
 * @swagger
 * /api/v1/leaves/search:
 *   get:
 *     summary: Search leaves
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Leaves fetched successfully
 */

/**
 * @swagger
 * /api/v1/leaves/analytics:
 *   get:
 *     summary: Get leave analytics
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */

/**
 * @swagger
 * /api/v1/leaves/balance:
 *   get:
 *     summary: Get leave balance
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Leave balance fetched successfully
 */

/**
 * @swagger
 * /api/v1/leaves/{id}/approve:
 *   patch:
 *     summary: Approve leave request
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Leave approved successfully
 */

/**
 * @swagger
 * /api/v1/leaves/{id}/reject:
 *   patch:
 *     summary: Reject leave request
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comments:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Leave rejected successfully
 */

/**
 * @swagger
 * /api/v1/leaves/{id}/cancel:
 *   patch:
 *     summary: Cancel leave request
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Leave cancelled successfully
 */