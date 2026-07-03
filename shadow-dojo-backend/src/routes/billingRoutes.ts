import express, { Router } from 'express';
import { BillingController } from '../controllers/billingController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createCheckoutSchema } from '../validations/billingValidation';

const router = Router();

router.post(
  '/webhook', 
  express.raw({ type: 'application/json' }), 
  BillingController.webhook
);

router.post(
  '/checkout',
  express.json(),
  requireAuth,
  requireRole(['COMPANY_ADMIN']),
  validate(createCheckoutSchema),
  BillingController.createCheckoutSession
);

export default router;