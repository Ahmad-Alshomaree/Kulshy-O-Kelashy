import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, user, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const cartItem = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.id, parseInt(id)))
        .limit(1);

      if (cartItem.length === 0) {
        return NextResponse.json(
          { error: 'Cart item not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(cartItem[0], { status: 200 });
    }

    // List with optional userId filter
    let query = db.select().from(cartItems);

    if (userId) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json(
          { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }
      query = query.where(eq(cartItems.userId, userId));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId, quantity, selectedColor, selectedSize } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Validate userId is a valid string
    if (typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'User ID must be a valid string', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Validate productId is a valid integer
    if (isNaN(parseInt(productId))) {
      return NextResponse.json(
        { error: 'Product ID must be a valid integer', code: 'INVALID_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Verify user exists
    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Verify product exists
    const productExists = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (productExists.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate quantity if provided
    const finalQuantity = quantity !== undefined ? parseInt(quantity) : 1;
    if (isNaN(finalQuantity) || finalQuantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be a positive integer', code: 'INVALID_QUANTITY' },
        { status: 400 }
      );
    }

    // Create new cart item
    const newCartItem = await db
      .insert(cartItems)
      .values({
        userId: userId,
        productId: parseInt(productId),
        quantity: finalQuantity,
        selectedColor: selectedColor || null,
        selectedSize: selectedSize || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newCartItem[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { productId, quantity, selectedColor, selectedSize } = body;

    // Check if cart item exists
    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, parseInt(id)))
      .limit(1);

    if (existingCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate productId if provided
    if (productId !== undefined) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json(
          { error: 'Product ID must be a valid integer', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      // Verify product exists
      const productExists = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(productId)))
        .limit(1);

      if (productExists.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Validate quantity if provided
    if (quantity !== undefined) {
      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        return NextResponse.json(
          { error: 'Quantity must be a positive integer', code: 'INVALID_QUANTITY' },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (productId !== undefined) updateData.productId = parseInt(productId);
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (selectedColor !== undefined) updateData.selectedColor = selectedColor || null;
    if (selectedSize !== undefined) updateData.selectedSize = selectedSize || null;

    // Update cart item
    const updated = await db
      .update(cartItems)
      .set(updateData)
      .where(eq(cartItems.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if cart item exists
    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, parseInt(id)))
      .limit(1);

    if (existingCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete cart item
    const deleted = await db
      .delete(cartItems)
      .where(eq(cartItems.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Cart item deleted successfully',
        deletedItem: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}