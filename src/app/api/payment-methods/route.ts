import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { paymentMethods, user } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const VALID_PAYMENT_TYPES = ['card', 'paypal', 'bank_transfer'] as const;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const paymentMethod = await db.select()
        .from(paymentMethods)
        .where(eq(paymentMethods.id, parseInt(id)))
        .limit(1);

      if (paymentMethod.length === 0) {
        return NextResponse.json({ 
          error: 'Payment method not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(paymentMethod[0]);
    }

    // List with pagination and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const userId = searchParams.get('userId');

    let query = db.select().from(paymentMethods);

    // Filter by userId if provided
    if (userId) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json({ 
          error: "Valid user ID is required for filtering",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }
      query = query.where(eq(paymentMethods.userId, userId));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, cardLastFour, cardBrand, isDefault } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ 
        error: "userId is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!type) {
      return NextResponse.json({ 
        error: "type is required",
        code: "MISSING_TYPE" 
      }, { status: 400 });
    }

    // Validate userId is a valid string
    if (typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json({ 
        error: "userId must be a valid string",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Validate type
    if (!VALID_PAYMENT_TYPES.includes(type)) {
      return NextResponse.json({ 
        error: `type must be one of: ${VALID_PAYMENT_TYPES.join(', ')}`,
        code: "INVALID_TYPE" 
      }, { status: 400 });
    }

    // Validate user exists
    const userRecord = await db.select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ 
        error: "User not found",
        code: "USER_NOT_FOUND" 
      }, { status: 400 });
    }

    // Prepare insert data with sanitized and default values
    const insertData = {
      userId: userId,
      type: type.trim(),
      cardLastFour: cardLastFour ? cardLastFour.trim() : null,
      cardBrand: cardBrand ? cardBrand.trim() : null,
      isDefault: isDefault !== undefined ? Boolean(isDefault) : false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newPaymentMethod = await db.insert(paymentMethods)
      .values(insertData)
      .returning();

    return NextResponse.json(newPaymentMethod[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const body = await request.json();
    const { type, cardLastFour, cardBrand, isDefault } = body;

    // Check if payment method exists
    const existing = await db.select()
      .from(paymentMethods)
      .where(eq(paymentMethods.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Payment method not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    // Validate type if provided
    if (type && !VALID_PAYMENT_TYPES.includes(type)) {
      return NextResponse.json({ 
        error: `type must be one of: ${VALID_PAYMENT_TYPES.join(', ')}`,
        code: "INVALID_TYPE" 
      }, { status: 400 });
    }

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (type !== undefined) {
      updates.type = type.trim();
    }

    if (cardLastFour !== undefined) {
      updates.cardLastFour = cardLastFour ? cardLastFour.trim() : null;
    }

    if (cardBrand !== undefined) {
      updates.cardBrand = cardBrand ? cardBrand.trim() : null;
    }

    if (isDefault !== undefined) {
      updates.isDefault = Boolean(isDefault);
    }

    const updated = await db.update(paymentMethods)
      .set(updates)
      .where(eq(paymentMethods.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Payment method not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if payment method exists
    const existing = await db.select()
      .from(paymentMethods)
      .where(eq(paymentMethods.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Payment method not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(paymentMethods)
      .where(eq(paymentMethods.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Payment method not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Payment method deleted successfully',
      paymentMethod: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}