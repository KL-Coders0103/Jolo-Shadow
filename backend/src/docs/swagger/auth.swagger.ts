/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth Management APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new company admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - companyName
 *               - industry
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get logged in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched
 */

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Generate new access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout current session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /api/v1/auth/logout-all:
 *   post:
 *     summary: Logout from all devices
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   post:
 *     summary: Verify user email
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Email verified
 */

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Reset email sent
 */

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Password reset successful
 */

/**
 * @swagger
 * /api/v1/auth/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed successfully
 */