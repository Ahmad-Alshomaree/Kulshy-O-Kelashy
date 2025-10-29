import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { db } from '@/db';
import { stripeOrders, kulshyProducts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import * as Sentry from '@sentry/nextjs';

// Edge runtime for low latency
export const runtime = 'edge';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      logger.warn('Missing Stripe signature header');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const error = err as Error;
      logger.error('Webhook signature verification failed', { error: error.message });
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    logger.info('Stripe webhook received', {
      eventType: event.type,
      eventId: event.id,
    });

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await handleChargeRefunded(charge);
        break;
      }

      default:
        logger.info('Unhandled webhook event type', { eventType: event.type });
    }

    const duration = Date.now() - startTime;
    logger.info('Webhook processed successfully', {
      eventType: event.type,
      eventId: event.id,
      duration,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Stripe webhook handler failed', { error: error instanceof Error ? error.message : String(error) });
    
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }

    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const orderId = session.metadata?.orderId || session.id;
    const userId = session.metadata?.userId;
    const items = session.metadata?.items ? JSON.parse(session.metadata.items) : [];

    if (!userId) {
      throw new Error('Missing userId in session metadata');
    }

    // Create or update order in database
    const orderData = {
      orderId,
      userId,
      customerEmail: session.customer_email || '',
      customerName: session.customer_details?.name || '',
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      amount: session.amount_total || 0,
      currency: session.currency || 'usd',
      status: 'confirmed',
      paymentStatus: 'paid',
      items: JSON.stringify(items),
      shippingAddress: session.shipping_details
        ? JSON.stringify(session.shipping_details)
        : null,
      metadata: session.metadata ? JSON.stringify(session.metadata) : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Check if order exists
    const existingOrder = await db
      .select()
      .from(stripeOrders)
      .where(eq(stripeOrders.orderId, orderId))
      .limit(1);

    if (existingOrder.length > 0) {
      // Update existing order
      await db
        .update(stripeOrders)
        .set({
          status: 'confirmed',
          paymentStatus: 'paid',
          stripePaymentIntentId: session.payment_intent as string,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(stripeOrders.orderId, orderId));
    } else {
      // Create new order
      await db.insert(stripeOrders).values(orderData);
    }

    // Update product stock
    for (const item of items) {
      const product = await db
        .select()
        .from(kulshyProducts)
        .where(eq(kulshyProducts.productId, item.productId))
        .limit(1);

      if (product.length > 0 && product[0].stock >= item.quantity) {
        await db
          .update(kulshyProducts)
          .set({
            stock: product[0].stock - item.quantity,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(kulshyProducts.productId, item.productId));
      }
    }

    logger.info('Checkout session completed', {
      orderId,
      userId,
      amount: session.amount_total,
    });
  } catch (error) {
    logger.error('handleCheckoutSessionCompleted failed', { error: error instanceof Error ? error.message : String(error), sessionId: session.id });
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update order payment status
    await db
      .update(stripeOrders)
      .set({
        paymentStatus: 'paid',
        status: 'confirmed',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(stripeOrders.stripePaymentIntentId, paymentIntent.id));

    logger.info('Payment intent succeeded', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    logger.error('handlePaymentIntentSucceeded failed', { error: error instanceof Error ? error.message : String(error), paymentIntentId: paymentIntent.id });
    throw error;
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update order payment status
    await db
      .update(stripeOrders)
      .set({
        paymentStatus: 'failed',
        status: 'cancelled',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(stripeOrders.stripePaymentIntentId, paymentIntent.id));

    logger.warn('Payment intent failed', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      lastPaymentError: paymentIntent.last_payment_error?.message,
    });
  } catch (error) {
    logger.error('handlePaymentIntentFailed failed', { error: error instanceof Error ? error.message : String(error), paymentIntentId: paymentIntent.id });
    throw error;
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  try {
    // Update order status to refunded
    await db
      .update(stripeOrders)
      .set({
        status: 'refunded',
        paymentStatus: 'refunded',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(stripeOrders.stripePaymentIntentId, charge.payment_intent as string));

    logger.info('Charge refunded', {
      chargeId: charge.id,
      amount: charge.amount_refunded,
    });
  } catch (error) {
    logger.error('handleChargeRefunded failed', { error: error instanceof Error ? error.message : String(error), chargeId: charge.id });
    throw error;
  }
}