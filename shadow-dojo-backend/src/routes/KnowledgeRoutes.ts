import { Router } from 'express';
import { KnowledgeController } from '../controllers/KnowledgeController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { uploadDocumentSchema, searchKnowledgeSchema } from '../validations/knowledgeValidation';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.use(requireAuth);

router.post(
  '/upload',
  requireRole(['COMPANY_ADMIN', 'MANAGER']),
  upload.single('file'),         
  validate(uploadDocumentSchema),
  KnowledgeController.uploadDocument
);

router.post(
  '/search',
  validate(searchKnowledgeSchema),
  KnowledgeController.search
);

export default router;