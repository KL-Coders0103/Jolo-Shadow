import { Router } from 'express';
import { DepartmentController } from '../controllers/departmentController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createDepartmentSchema, updateDepartmentSchema } from '../validations/departmentValidation';

const router = Router();

router.use(requireAuth);
router.use(requireRole(['COMPANY_ADMIN']));

router.post('/', validate(createDepartmentSchema), DepartmentController.create);
router.get('/', DepartmentController.getAll);
router.patch('/:id', validate(updateDepartmentSchema), DepartmentController.update);
router.delete('/:id', DepartmentController.delete);

export default router;