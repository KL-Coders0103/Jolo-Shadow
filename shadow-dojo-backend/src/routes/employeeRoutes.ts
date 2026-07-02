import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { inviteEmployeeSchema, bulkInviteSchema, updateEmployeeSchema } from '../validations/employeeValidation';

const router = Router();

router.use(requireAuth);
router.use(requireRole(['COMPANY_ADMIN']));

router.post('/invite', validate(inviteEmployeeSchema), EmployeeController.invite);
router.post('/bulk-invite', validate(bulkInviteSchema), EmployeeController.bulkInvite);
router.patch('/:id', validate(updateEmployeeSchema), EmployeeController.update);

export default router;