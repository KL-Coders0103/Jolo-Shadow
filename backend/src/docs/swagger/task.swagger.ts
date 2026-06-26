/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task Management APIs
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */

/**
 * @swagger
 * /api/v1/tasks/search:
 *   get:
 *     summary: Search tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string

 *       - in: query
 *         name: status
 *         schema:
 *           type: string

 *       - in: query
 *         name: priority
 *         schema:
 *           type: string

 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string

 *       - in: query
 *         name: page
 *         schema:
 *           type: integer

 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
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
 *         description: Task fetched successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}/comments:
 *   post:
 *     summary: Add comment to task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}/comments:
 *   get:
 *     summary: Get task comments
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}/time-logs:
 *   post:
 *     summary: Log time on task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Time logged successfully
 */

/**
 * @swagger
 * /api/v1/tasks/{id}/time-logs:
 *   get:
 *     summary: Get task time logs
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Time logs fetched successfully
 */