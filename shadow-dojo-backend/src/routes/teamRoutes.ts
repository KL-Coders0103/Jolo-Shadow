import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createTeamSchema } from '../validations/teamValidation';

const router = Router();

router.use(requireAuth);
router.use(requireRole(['COMPANY_ADMIN', 'MANAGER']));

router.post('/', validate(createTeamSchema), TeamController.create);
router.get('/', TeamController.getAll);

export default router;