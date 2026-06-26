/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File Management APIs
 */

/**
 * @swagger
 * /api/v1/uploads/single:
 *   post:
 *     summary: Upload single file
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 */

/**
 * @swagger
 * /api/v1/uploads/multiple:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 */

/**
 * @swagger
 * /api/v1/uploads/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Avatar uploaded successfully
 */

/**
 * @swagger
 * /api/v1/uploads/task/{taskId}:
 *   post:
 *     summary: Upload task attachment
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Task attachment uploaded
 */

/**
 * @swagger
 * /api/v1/uploads/project/{projectId}:
 *   post:
 *     summary: Upload project document
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Project document uploaded
 */

/**
 * @swagger
 * /api/v1/uploads:
 *   get:
 *     summary: Get all files
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Files fetched successfully
 */

/**
 * @swagger
 * /api/v1/uploads/module/{module}/{entityId}:
 *   get:
 *     summary: Get files by module
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: module
 *         required: true
 *         schema:
 *           type: string
 *
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Files fetched successfully
 */

/**
 * @swagger
 * /api/v1/uploads/{id}:
 *   delete:
 *     summary: Delete file
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: File deleted successfully
 */