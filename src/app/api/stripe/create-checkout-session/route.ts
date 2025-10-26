import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { db } from '@/db';
import { kulshyProducts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Zod validation schema
const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'At least one item is required'),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  shippingAddress: z.any().optional(),
});

// Validate environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const user = session.user;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = checkoutSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { items, successUrl, cancelUrl, shippingAddress } = validationResult.data;

    // Prepare line items for Stripe and validate products
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let totalAmount = 0;

    for (const item of items) {
      // Query product from database
      const product = await db
        .select()
        .from(kulshyProducts)
        .where(eq(kulshyProducts.productId, item.productId))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          {
            error: `Product with ID ${item.productId} not found`,
            code: 'PRODUCT_NOT_FOUND',
          },
          { status: 400 }
        );
      }

      const productData = product[0];

      // Check stock availability
      if (productData.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for product "${productData.productName}". Available: ${productData.stock}, Requested: ${item.quantity}`,
            code: 'INSUFFICIENT_STOCK',
          },
          { status: 400 }
        );
      }

      // Calculate line total in cents
      const unitAmount = Math.round(productData.price * 100);
      const lineTotal = unitAmount * item.quantity;
      totalAmount += lineTotal;

      // Add to Stripe line items
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: productData.productName,
            description: productData.description || undefined,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      });
    }

    // Prepare URLs
    const appUrl = NEXT_PUBLIC_APP_URL;
    const finalSuccessUrl = successUrl || `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl || `${appUrl}/checkout/cancel`;

    // Prepare metadata
    const metadata: Record<string, string> = {
      userId: user.id,
      items: JSON.stringify(items),
    };

    if (shippingAddress) {
      metadata.shippingAddress = JSON.stringify(shippingAddress);
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      customer_email: user.email,
      metadata,
      payment_intent_data: {
        metadata: {
          userId: user.id,
        },
      },
      shipping_address_collection: shippingAddress ? undefined : {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        sessionId: checkoutSession.id,
        sessionUrl: checkoutSession.url,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/stripe/create-checkout-session error:', error);

    // Handle Stripe-specific errors
    if (error.type === 'StripeCardError' || error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        {
          error: `Stripe error: ${error.message}`,
          code: 'STRIPE_ERROR',
        },
        { status: 500 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error.message,
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
