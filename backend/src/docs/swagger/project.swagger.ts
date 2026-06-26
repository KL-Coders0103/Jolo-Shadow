/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project Management APIs
 */

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created successfully
 */

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 */

/**
 * @swagger
 * /api/v1/projects/search:
 *   get:
 *     summary: Search projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: priority
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
 *         description: Projects fetched successfully
 */

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Get project by id
 *     tags: [Projects]
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
 *         description: Project fetched successfully
 */

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   patch:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project updated successfully
 */

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */

/**
 * @swagger
 * /api/v1/projects/{id}/assign-teams:
 *   patch:
 *     summary: Assign teams to project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teams assigned successfully
 */

/**
 * @swagger
 * /api/v1/projects/{id}/assign-members:
 *   patch:
 *     summary: Assign members to project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Members assigned successfully
 */