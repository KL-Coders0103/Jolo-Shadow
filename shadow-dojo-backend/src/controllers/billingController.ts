import { Request, Response, NextFunction } from 'express';
import { BillingService } from '../services/billingService';

export class BillingController {
  
  static async createCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const { plan } = req.body;

      const result = await BillingService.createCheckoutSession(companyId, plan);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const signature = req.headers['stripe-signature'];
      
      if (!signature) {
        res.status(400).send('Missing stripe-signature header');
        return;
      }

      await BillingService.handleWebhook(req.body, signature as string);

      res.status(200).send('Webhook received');
    } catch (error) {
      console.error('Stripe Webhook Error:', error);
      res.status(400).send('Webhook Error');
    }
  }
}