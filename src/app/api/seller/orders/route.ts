import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sellerOrders, user } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const VALID_STATUS_VALUES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const VALID_PAYMENT_STATUS_VALUES = ['pending', 'paid', 'refunded'];

async function authenticateSeller(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return { error: NextResponse.json({ error: 'Authentication required', code: 'UNAUTHENTICATED' }, { status: 401 }) };
    }

    if (session.user.role !== 'seller') {
      return { error: NextResponse.json({ error: 'Seller access required', code: 'FORBIDDEN' }, { status: 403 }) };
    }

    return { sellerId: session.user.id };
  } catch (error) {
    console.error('Authentication error:', error);
    return { error: NextResponse.json({ error: 'Authentication failed', code: 'AUTH_ERROR' }, { status: 401 }) };
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateSeller(request);
    if (authResult.error) return authResult.error;
    const { sellerId } = authResult;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single order by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: 'Valid ID is required', 
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      const order = await db.select()
        .from(sellerOrders)
        .where(and(
          eq(sellerOrders.id, parseInt(id)),
          eq(sellerOrders.sellerId, sellerId)
        ))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json({ 
          error: 'Order not found or access denied', 
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(order[0], { status: 200 });
    }

    // List orders with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const statusFilter = searchParams.get('status');
    const paymentStatusFilter = searchParams.get('paymentStatus');

    // Validate status filter
    if (statusFilter && !VALID_STATUS_VALUES.includes(statusFilter)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${VALID_STATUS_VALUES.join(', ')}`, 
        code: 'INVALID_STATUS' 
      }, { status: 400 });
    }

    // Validate payment status filter
    if (paymentStatusFilter && !VALID_PAYMENT_STATUS_VALUES.includes(paymentStatusFilter)) {
      return NextResponse.json({ 
        error: `Invalid payment status. Must be one of: ${VALID_PAYMENT_STATUS_VALUES.join(', ')}`, 
        code: 'INVALID_PAYMENT_STATUS' 
      }, { status: 400 });
    }

    // Build query conditions
    const conditions = [eq(sellerOrders.sellerId, sellerId)];

    if (search) {
      const searchCondition = or(
        like(sellerOrders.orderId, `%${search}%`),
        like(sellerOrders.customerName, `%${search}%`),
        like(sellerOrders.customerEmail, `%${search}%`),
        like(sellerOrders.productName, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    if (statusFilter) {
      conditions.push(eq(sellerOrders.status, statusFilter));
    }

    if (paymentStatusFilter) {
      conditions.push(eq(sellerOrders.paymentStatus, paymentStatusFilter));
    }

    const orders = await db.select()
      .from(sellerOrders)
      .where(and(...conditions))
      .orderBy(desc(sellerOrders.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateSeller(request);
    if (authResult.error) return authResult.error;
    const { sellerId } = authResult;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required', 
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { status, trackingNumber, notes, paymentStatus } = body;

    // Validate status if provided
    if (status && !VALID_STATUS_VALUES.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${VALID_STATUS_VALUES.join(', ')}`, 
        code: 'INVALID_STATUS' 
      }, { status: 400 });
    }

    // Validate payment status if provided
    if (paymentStatus && !VALID_PAYMENT_STATUS_VALUES.includes(paymentStatus)) {
      return NextResponse.json({ 
        error: `Invalid payment status. Must be one of: ${VALID_PAYMENT_STATUS_VALUES.join(', ')}`, 
        code: 'INVALID_PAYMENT_STATUS' 
      }, { status: 400 });
    }

    // Check if order exists and belongs to seller
    const existingOrder = await db.select()
      .from(sellerOrders)
      .where(and(
        eq(sellerOrders.id, parseInt(id)),
        eq(sellerOrders.sellerId, sellerId)
      ))
      .limit(1);

    if (existingOrder.length === 0) {
      return NextResponse.json({ 
        error: 'Order not found or access denied', 
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (status !== undefined) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (notes !== undefined) updateData.notes = notes;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;

    const updated = await db.update(sellerOrders)
      .set(updateData)
      .where(and(
        eq(sellerOrders.id, parseInt(id)),
        eq(sellerOrders.sellerId, sellerId)
      ))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update order', 
        code: 'UPDATE_FAILED' 
      }, { status: 500 });
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}