/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance Management APIs
 */

/**
 * @swagger
 * /api/v1/attendance/check-in:
 *   post:
 *     summary: Check in employee
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workMode:
 *                 type: string
 *                 enum: [OFFICE, REMOTE, HYBRID]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Checked in successfully
 */

/**
 * @swagger
 * /api/v1/attendance/check-out:
 *   patch:
 *     summary: Check out employee
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checked out successfully
 */

/**
 * @swagger
 * /api/v1/attendance/break/start:
 *   patch:
 *     summary: Start break
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Break started successfully
 */

/**
 * @swagger
 * /api/v1/attendance/break/end:
 *   patch:
 *     summary: End break
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Break ended successfully
 */

/**
 * @swagger
 * /api/v1/attendance/my:
 *   get:
 *     summary: Get logged in employee attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance fetched successfully
 */

/**
 * @swagger
 * /api/v1/attendance/report:
 *   get:
 *     summary: Get monthly attendance report
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Monthly report fetched successfully
 */

/**
 * @swagger
 * /api/v1/attendance/search:
 *   get:
 *     summary: Search attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: endDate
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
 *         description: Attendance fetched successfully
 */

/**
 * @swagger
 * /api/v1/attendance/analytics:
 *   get:
 *     summary: Get attendance analytics
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */