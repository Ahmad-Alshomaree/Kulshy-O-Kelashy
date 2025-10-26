import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const VALID_STATUS_VALUES = ['pending', 'processing', 'completed', 'failed', 'refunded'];
const VALID_PAYMENT_STATUS_VALUES = ['unpaid', 'paid', 'refunded'];

export async function GET(request: NextRequest) {
  try {
    // Authentication
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single order fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      const orderId = parseInt(id);
      
      // Query order using raw SQL
      const orderResult = await db.all(`
        SELECT * FROM stripe_orders WHERE id = ?
      `, [orderId]);

      if (orderResult.length === 0) {
        return NextResponse.json({ 
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND' 
        }, { status: 404 });
      }

      const order = orderResult[0];

      // Check authorization
      const userRole = session.user.role;
      if (order.user_id !== session.user.id && userRole !== 'admin' && userRole !== 'seller') {
        return NextResponse.json({ 
          error: 'Access denied',
          code: 'FORBIDDEN' 
        }, { status: 403 });
      }

      // Fetch order items
      const items = await db.all(`
        SELECT * FROM order_items WHERE order_id = ?
      `, [orderId]);

      return NextResponse.json({
        ...order,
        orderItems: items
      }, { status: 200 });
    }

    // List orders
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const statusFilter = searchParams.get('status');

    // Build query
    let query = 'SELECT * FROM stripe_orders';
    const queryParams: any[] = [];
    const conditions: string[] = [];
    
    // Regular users can only see their own orders
    const userRole = session.user.role;
    if (userRole !== 'admin' && userRole !== 'seller') {
      conditions.push('user_id = ?');
      queryParams.push(session.user.id);
    }

    // Add status filter
    if (statusFilter) {
      if (!VALID_STATUS_VALUES.includes(statusFilter)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUS_VALUES.join(', ')}`,
          code: 'INVALID_STATUS' 
        }, { status: 400 });
      }
      conditions.push('status = ?');
      queryParams.push(statusFilter);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const orders = await db.all(query, queryParams);

    // Fetch order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order: any) => {
        const items = await db.all(`
          SELECT * FROM order_items WHERE order_id = ?
        `, [order.id]);
        
        return {
          ...order,
          orderItems: items
        };
      })
    );

    return NextResponse.json(ordersWithItems, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authentication
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Authorization check - only admin/seller can update orders
    const userRole = session.user.role;
    if (userRole !== 'admin' && userRole !== 'seller') {
      return NextResponse.json({ 
        error: 'Access denied. Admin or seller role required.',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    const orderId = parseInt(id);

    // Check if order exists
    const existingOrder = await db.all(`
      SELECT * FROM stripe_orders WHERE id = ?
    `, [orderId]);

    if (existingOrder.length === 0) {
      return NextResponse.json({ 
        error: 'Order not found',
        code: 'ORDER_NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { status, paymentStatus, metadata } = body;

    // Build update parts
    const updateParts: string[] = ['updated_at = ?'];
    const updateParams: any[] = [new Date().toISOString()];

    // Validate and add status
    if (status !== undefined) {
      if (!VALID_STATUS_VALUES.includes(status)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUS_VALUES.join(', ')}`,
          code: 'INVALID_STATUS' 
        }, { status: 400 });
      }
      updateParts.push('status = ?');
      updateParams.push(status);
    }

    // Validate and add paymentStatus
    if (paymentStatus !== undefined) {
      if (!VALID_PAYMENT_STATUS_VALUES.includes(paymentStatus)) {
        return NextResponse.json({ 
          error: `Invalid payment status. Must be one of: ${VALID_PAYMENT_STATUS_VALUES.join(', ')}`,
          code: 'INVALID_PAYMENT_STATUS' 
        }, { status: 400 });
      }
      updateParts.push('payment_status = ?');
      updateParams.push(paymentStatus);
    }

    // Add metadata
    if (metadata !== undefined) {
      updateParts.push('metadata = ?');
      updateParams.push(JSON.stringify(metadata));
    }

    updateParams.push(orderId);

    // Update order
    await db.run(`
      UPDATE stripe_orders 
      SET ${updateParts.join(', ')}
      WHERE id = ?
    `, updateParams);

    // Fetch updated order
    const updated = await db.all(`
      SELECT * FROM stripe_orders WHERE id = ?
    `, [orderId]);

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
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}