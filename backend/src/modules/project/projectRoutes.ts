import { Router } from "express";

import { projectController }
from "./projectController";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
  createProjectSchema,
  updateProjectSchema,
  assignTeamsSchema,
  assignMembersSchema,
} from "./projectValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(
    createProjectSchema,
  ),
  projectController.createProject,
);

router.get(
  "/",
  projectController.getProjects,
);

router.get(
  "/search",
  projectController
    .searchProjects,
);

router.get(
  "/:id",
  projectController.getProjectById,
);

router.patch(
  "/:id",
  validate(
    updateProjectSchema,
  ),
  projectController.updateProject,
);

router.delete(
  "/:id",
  projectController.deleteProject,
);

router.patch(
  "/:id/assign-teams",
  validate(
    assignTeamsSchema,
  ),
  projectController.assignTeams,
);

router.patch(
  "/:id/assign-members",
  validate(
    assignMembersSchema,
  ),
  projectController.assignMembers,
);

export default router;