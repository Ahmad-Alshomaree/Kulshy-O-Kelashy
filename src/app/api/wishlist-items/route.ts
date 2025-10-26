import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems, user, products } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
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

      const item = await db
        .select()
        .from(wishlistItems)
        .where(eq(wishlistItems.id, parseInt(id)))
        .limit(1);

      if (item.length === 0) {
        return NextResponse.json(
          { error: 'Wishlist item not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(item[0], { status: 200 });
    }

    // List with optional userId filter and pagination
    let query = db.select().from(wishlistItems);

    if (userId) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json(
          { error: 'Valid userId is required', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }
      query = query.where(eq(wishlistItems.userId, userId));
    }

    const items = await query
      .orderBy(desc(wishlistItems.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(items, { status: 200 });
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
    const { userId, productId } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Validate userId is a valid string
    if (typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'userId must be a valid string', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Validate productId is a valid integer
    const productIdInt = parseInt(productId);
    if (isNaN(productIdInt)) {
      return NextResponse.json(
        { error: 'productId must be a valid integer', code: 'INVALID_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Validate user exists
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate product exists
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productIdInt))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Check if item already exists in wishlist
    const existingItem = await db
      .select()
      .from(wishlistItems)
      .where(
        and(
          eq(wishlistItems.userId, userId),
          eq(wishlistItems.productId, productIdInt)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      return NextResponse.json(
        { error: 'Product already in wishlist', code: 'DUPLICATE_WISHLIST_ITEM' },
        { status: 400 }
      );
    }

    // Create new wishlist item
    const newItem = await db
      .insert(wishlistItems)
      .values({
        userId: userId,
        productId: productIdInt,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const itemId = parseInt(id);
    const body = await request.json();

    // Check if wishlist item exists
    const existingItem = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.id, itemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Wishlist item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const updates: any = {};

    // Validate and update userId if provided
    if (body.userId !== undefined) {
      if (typeof body.userId !== 'string' || body.userId.trim() === '') {
        return NextResponse.json(
          { error: 'userId must be a valid string', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }

      // Validate user exists
      const userRecord = await db
        .select()
        .from(user)
        .where(eq(user.id, body.userId))
        .limit(1);

      if (userRecord.length === 0) {
        return NextResponse.json(
          { error: 'User not found', code: 'USER_NOT_FOUND' },
          { status: 400 }
        );
      }

      updates.userId = body.userId;
    }

    // Validate and update productId if provided
    if (body.productId !== undefined) {
      const productIdInt = parseInt(body.productId);
      if (isNaN(productIdInt)) {
        return NextResponse.json(
          { error: 'productId must be a valid integer', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      // Validate product exists
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productIdInt))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
          { status: 400 }
        );
      }

      updates.productId = productIdInt;
    }

    // Check for duplicate if userId or productId is being updated
    if (updates.userId || updates.productId) {
      const checkUserId = updates.userId || existingItem[0].userId;
      const checkProductId = updates.productId || existingItem[0].productId;

      const duplicate = await db
        .select()
        .from(wishlistItems)
        .where(
          and(
            eq(wishlistItems.userId, checkUserId),
            eq(wishlistItems.productId, checkProductId)
          )
        )
        .limit(1);

      if (duplicate.length > 0 && duplicate[0].id !== itemId) {
        return NextResponse.json(
          { error: 'Product already in wishlist for this user', code: 'DUPLICATE_WISHLIST_ITEM' },
          { status: 400 }
        );
      }
    }

    // If no updates provided, return existing item
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingItem[0], { status: 200 });
    }

    // Update wishlist item
    const updated = await db
      .update(wishlistItems)
      .set(updates)
      .where(eq(wishlistItems.id, itemId))
      .returning();

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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const itemId = parseInt(id);

    // Check if wishlist item exists
    const existingItem = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.id, itemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Wishlist item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete wishlist item
    const deleted = await db
      .delete(wishlistItems)
      .where(eq(wishlistItems.id, itemId))
      .returning();

    return NextResponse.json(
      {
        message: 'Wishlist item deleted successfully',
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