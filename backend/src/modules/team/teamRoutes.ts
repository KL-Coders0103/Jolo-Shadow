import { Router } from "express";

import { teamController }
from "./teamController";

import { authMiddleware }
from "../../middlewares/authMiddleware";

import { validate }
from "../../middlewares/validateMiddleware";

import {
  createTeamSchema,
  updateTeamSchema,
  assignLeadSchema,
  addMembersSchema,
} from "./teamValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createTeamSchema),
  teamController.createTeam,
);

router.get(
  "/",
  teamController.getTeams,
);

router.get(
  "/:id",
  teamController.getTeamById,
);

router.patch(
  "/:id",
  validate(updateTeamSchema),
  teamController.updateTeam,
);

router.delete(
  "/:id",
  teamController.deleteTeam,
);

router.patch(
  "/:id/assign-lead",
  validate(assignLeadSchema),
  teamController.assignLead,
);

router.patch(
  "/:id/add-members",
  validate(addMembersSchema),
  teamController.addMembers,
);

router.patch(
  "/:id/remove-member/:memberId",
  teamController.removeMember,
);

export default router;