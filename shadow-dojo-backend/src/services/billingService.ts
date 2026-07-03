import Stripe from 'stripe';
import { prisma } from '../config/db';
import { SubscriptionPlan, SubscriptionStatus } from '../generated/prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-06-24.dahlia' as any, 
});

const STRIPE_PRICE_IDS: Record<string, string> = {
  STARTER: process.env.STRIPE_PRICE_STARTER || 'price_dummy_starter',
  PRO: process.env.STRIPE_PRICE_PRO || 'price_dummy_pro',
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE || 'price_dummy_enterprise',
};

export class BillingService {
  
  static async createCheckoutSession(companyId: string, plan: SubscriptionPlan) {
    const company = await prisma.company.findUnique({ 
      where: { id: companyId },
      include: { subscription: true }
    });

    if (!company) throw new Error("Company not found");

    const priceId = STRIPE_PRICE_IDS[plan];
    if (!priceId) throw new Error("Invalid plan selected");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: companyId, 
      customer: company.subscription?.stripeCustomerId || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/billing?canceled=true`,
    });

    return { url: session.url };
  }

  static async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await this.processSuccessfulCheckout(session);
        break;
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await this.syncSubscriptionStatus(subscription);
        break;
    }

    return { received: true };
  }

  private static async processSuccessfulCheckout(session: Stripe.Checkout.Session) {
    const companyId = session.client_reference_id;
    if (!companyId) return;

    const rawSub = await stripe.subscriptions.retrieve(session.subscription as string) as any;

    const priceId = rawSub.items.data[0].price.id;
    const plan = Object.keys(STRIPE_PRICE_IDS).find(key => STRIPE_PRICE_IDS[key] === priceId) as SubscriptionPlan;

    await prisma.subscription.upsert({
      where: { companyId },
      create: {
        companyId,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: rawSub.id,
        plan: plan || 'FREE',
        status: rawSub.status.toUpperCase() as SubscriptionStatus,
        currentPeriodStart: new Date(rawSub.current_period_start * 1000),
        currentPeriodEnd: new Date(rawSub.current_period_end * 1000),
      },
      update: {
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: rawSub.id,
        plan: plan || 'FREE',
        status: rawSub.status.toUpperCase() as SubscriptionStatus,
        currentPeriodStart: new Date(rawSub.current_period_start * 1000),
        currentPeriodEnd: new Date(rawSub.current_period_end * 1000),
      }
    });
  }

  private static async syncSubscriptionStatus(stripeSub: Stripe.Subscription) {
    const rawSub = stripeSub as any;
    
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: rawSub.id },
      data: {
        status: rawSub.status.toUpperCase() as SubscriptionStatus,
        currentPeriodStart: new Date(rawSub.current_period_start * 1000),
        currentPeriodEnd: new Date(rawSub.current_period_end * 1000),
        cancelAtPeriodEnd: rawSub.cancel_at_period_end,
      }
    });
  }
}