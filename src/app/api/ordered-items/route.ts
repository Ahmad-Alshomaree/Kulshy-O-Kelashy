import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { kulshyOrderedItems, products } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Single record by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const record = await db
        .select()
        .from(kulshyOrderedItems)
        .where(eq(kulshyOrderedItems.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Ordered item not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with filters
    let query = db.select().from(kulshyOrderedItems);
    const conditions = [];

    // Filter by orderId
    if (orderId) {
      if (isNaN(parseInt(orderId))) {
        return NextResponse.json(
          { error: 'Valid order ID is required', code: 'INVALID_ORDER_ID' },
          { status: 400 }
        );
      }
      conditions.push(eq(kulshyOrderedItems.orderId, parseInt(orderId)));
    }

    // Filter by productId
    if (productId) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json(
          { error: 'Valid product ID is required', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }
      conditions.push(eq(kulshyOrderedItems.productId, parseInt(productId)));
    }

    // Search in productName
    if (search) {
      conditions.push(like(kulshyOrderedItems.productName, `%${search}%`));
    }

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply pagination and ordering
    const results = await query
      .orderBy(desc(kulshyOrderedItems.createdAt))
      .limit(limit)
      .offset(offset);

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
    const {
      productId,
      productName,
      productPrice,
      quantity,
      selectedColors,
      selectedSize,
      orderId,
    } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    if (!productName || typeof productName !== 'string') {
      return NextResponse.json(
        { error: 'Product name is required', code: 'MISSING_PRODUCT_NAME' },
        { status: 400 }
      );
    }

    if (productPrice === undefined || productPrice === null) {
      return NextResponse.json(
        { error: 'Product price is required', code: 'MISSING_PRODUCT_PRICE' },
        { status: 400 }
      );
    }

    if (!quantity) {
      return NextResponse.json(
        { error: 'Quantity is required', code: 'MISSING_QUANTITY' },
        { status: 400 }
      );
    }

    // Validate productId is valid integer
    if (isNaN(parseInt(productId))) {
      return NextResponse.json(
        { error: 'Valid product ID is required', code: 'INVALID_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Validate productPrice is positive number
    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        {
          error: 'Product price must be a positive number',
          code: 'INVALID_PRODUCT_PRICE',
        },
        { status: 400 }
      );
    }

    // Validate quantity is positive integer
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
      return NextResponse.json(
        {
          error: 'Quantity must be a positive integer',
          code: 'INVALID_QUANTITY',
        },
        { status: 400 }
      );
    }

    // Validate productId exists in products table
    const productExists = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (productExists.length === 0) {
      return NextResponse.json(
        { error: 'Product does not exist', code: 'PRODUCT_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData: any = {
      productId: parseInt(productId),
      productName: productName.trim(),
      productPrice: price,
      quantity: qty,
      time: now,
      createdAt: now,
    };

    // Add optional fields
    if (selectedColors !== undefined) {
      insertData.selectedColors = selectedColors;
    }

    if (selectedSize !== undefined && selectedSize !== null) {
      insertData.selectedSize =
        typeof selectedSize === 'string' ? selectedSize.trim() : selectedSize;
    }

    if (orderId !== undefined && orderId !== null) {
      const orderIdInt = parseInt(orderId);
      if (!isNaN(orderIdInt)) {
        insertData.orderId = orderIdInt;
      }
    }

    // Insert into database
    const newOrderedItem = await db
      .insert(kulshyOrderedItems)
      .values(insertData)
      .returning();

    return NextResponse.json(newOrderedItem[0], { status: 201 });
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

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const orderedItemId = parseInt(id);

    // Check if ordered item exists
    const existingItem = await db
      .select()
      .from(kulshyOrderedItems)
      .where(eq(kulshyOrderedItems.id, orderedItemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Ordered item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      productId,
      productName,
      productPrice,
      quantity,
      selectedColors,
      selectedSize,
      orderId,
    } = body;

    const updates: any = {};

    // Validate and add productId if provided
    if (productId !== undefined) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json(
          { error: 'Valid product ID is required', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      // Validate productId exists in products table
      const productExists = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(productId)))
        .limit(1);

      if (productExists.length === 0) {
        return NextResponse.json(
          { error: 'Product does not exist', code: 'PRODUCT_NOT_FOUND' },
          { status: 400 }
        );
      }

      updates.productId = parseInt(productId);
    }

    // Validate and add productName if provided
    if (productName !== undefined) {
      if (typeof productName !== 'string' || productName.trim() === '') {
        return NextResponse.json(
          { error: 'Valid product name is required', code: 'INVALID_PRODUCT_NAME' },
          { status: 400 }
        );
      }
      updates.productName = productName.trim();
    }

    // Validate and add productPrice if provided
    if (productPrice !== undefined) {
      const price = parseFloat(productPrice);
      if (isNaN(price) || price <= 0) {
        return NextResponse.json(
          {
            error: 'Product price must be a positive number',
            code: 'INVALID_PRODUCT_PRICE',
          },
          { status: 400 }
        );
      }
      updates.productPrice = price;
    }

    // Validate and add quantity if provided
    if (quantity !== undefined) {
      const qty = parseInt(quantity);
      if (isNaN(qty) || qty < 1) {
        return NextResponse.json(
          {
            error: 'Quantity must be a positive integer',
            code: 'INVALID_QUANTITY',
          },
          { status: 400 }
        );
      }
      updates.quantity = qty;
    }

    // Add optional fields if provided
    if (selectedColors !== undefined) {
      updates.selectedColors = selectedColors;
    }

    if (selectedSize !== undefined) {
      updates.selectedSize =
        selectedSize === null
          ? null
          : typeof selectedSize === 'string'
          ? selectedSize.trim()
          : selectedSize;
    }

    if (orderId !== undefined) {
      if (orderId === null) {
        updates.orderId = null;
      } else {
        const orderIdInt = parseInt(orderId);
        if (!isNaN(orderIdInt)) {
          updates.orderId = orderIdInt;
        }
      }
    }

    // If no updates, return current item
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingItem[0], { status: 200 });
    }

    // Update the record
    const updated = await db
      .update(kulshyOrderedItems)
      .set(updates)
      .where(eq(kulshyOrderedItems.id, orderedItemId))
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

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const orderedItemId = parseInt(id);

    // Check if ordered item exists
    const existingItem = await db
      .select()
      .from(kulshyOrderedItems)
      .where(eq(kulshyOrderedItems.id, orderedItemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Ordered item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the record
    const deleted = await db
      .delete(kulshyOrderedItems)
      .where(eq(kulshyOrderedItems.id, orderedItemId))
      .returning();

    return NextResponse.json(
      {
        message: 'Ordered item deleted successfully',
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