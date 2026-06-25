/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team Management APIs
 */

/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Create team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamName
 *             properties:
 *               teamName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 */

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teams fetched successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Get team by id
 *     tags: [Teams]
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
 *         description: Team fetched successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   patch:
 *     summary: Update team
 *     tags: [Teams]
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
 *         description: Team updated successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Delete team
 *     tags: [Teams]
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
 *         description: Team deleted successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}/assign-lead:
 *   patch:
 *     summary: Assign team lead
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team lead assigned successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}/add-members:
 *   patch:
 *     summary: Add team members
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Members added successfully
 */

/**
 * @swagger
 * /api/v1/teams/{id}/remove-member/{memberId}:
 *   patch:
 *     summary: Remove team member
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member removed successfully
 */