import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";

import { bonusController } from "./bonusController";
import { createBonusSchema } from "./bonusValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createBonusSchema),
  bonusController.createBonus,
);

router.patch(
  "/:id/approve",
  bonusController.approveBonus,
);

router.get(
  "/search",
  bonusController.searchBonuses,
);

router.get(
  "/analytics",
  bonusController.getAnalytics,
);

router.get(
  "/:id",
  bonusController.getBonusById,
);

router.delete(
  "/:id",
  bonusController.deleteBonus,
);

export default router;