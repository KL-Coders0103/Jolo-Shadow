import { Router } from 'express';
import { ChatController } from '../controllers/chatController';
import { requireAuth } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createSessionSchema, sendMessageSchema } from '../validations/chatValidation';

const router = Router();

router.use(requireAuth);

router.post('/sessions', validate(createSessionSchema), ChatController.createSession);
router.get('/sessions', ChatController.getSessions);

router.get('/sessions/:sessionId/messages', ChatController.getMessages);
router.post('/sessions/:sessionId/messages', validate(sendMessageSchema), ChatController.sendMessage);

export default router;