import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orderItems, orders, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const orderId = searchParams.get('orderId');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: "Valid ID is required",
            code: "INVALID_ID" 
          },
          { status: 400 }
        );
      }

      const orderItem = await db.select()
        .from(orderItems)
        .where(eq(orderItems.id, parseInt(id)))
        .limit(1);

      if (orderItem.length === 0) {
        return NextResponse.json(
          { error: 'Order item not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(orderItem[0]);
    }

    // List with pagination and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(orderItems);

    // Filter by orderId if provided
    if (orderId) {
      const orderIdInt = parseInt(orderId);
      if (isNaN(orderIdInt)) {
        return NextResponse.json(
          { 
            error: "Valid order ID is required",
            code: "INVALID_ORDER_ID" 
          },
          { status: 400 }
        );
      }
      query = query.where(eq(orderItems.orderId, orderIdInt));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results);
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
      orderId, 
      productId, 
      productName, 
      productPrice, 
      quantity, 
      selectedColor, 
      selectedSize, 
      subtotal 
    } = body;

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        { 
          error: "Order ID is required",
          code: "MISSING_ORDER_ID" 
        },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { 
          error: "Product ID is required",
          code: "MISSING_PRODUCT_ID" 
        },
        { status: 400 }
      );
    }

    if (!productName || !productName.trim()) {
      return NextResponse.json(
        { 
          error: "Product name is required",
          code: "MISSING_PRODUCT_NAME" 
        },
        { status: 400 }
      );
    }

    if (productPrice === undefined || productPrice === null) {
      return NextResponse.json(
        { 
          error: "Product price is required",
          code: "MISSING_PRODUCT_PRICE" 
        },
        { status: 400 }
      );
    }

    if (typeof productPrice !== 'number' || productPrice <= 0) {
      return NextResponse.json(
        { 
          error: "Product price must be a positive number",
          code: "INVALID_PRODUCT_PRICE" 
        },
        { status: 400 }
      );
    }

    if (!quantity) {
      return NextResponse.json(
        { 
          error: "Quantity is required",
          code: "MISSING_QUANTITY" 
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json(
        { 
          error: "Quantity must be a positive integer",
          code: "INVALID_QUANTITY" 
        },
        { status: 400 }
      );
    }

    if (subtotal === undefined || subtotal === null) {
      return NextResponse.json(
        { 
          error: "Subtotal is required",
          code: "MISSING_SUBTOTAL" 
        },
        { status: 400 }
      );
    }

    if (typeof subtotal !== 'number' || subtotal <= 0) {
      return NextResponse.json(
        { 
          error: "Subtotal must be a positive number",
          code: "INVALID_SUBTOTAL" 
        },
        { status: 400 }
      );
    }

    // Validate orderId exists
    const orderExists = await db.select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (orderExists.length === 0) {
      return NextResponse.json(
        { 
          error: "Order not found",
          code: "ORDER_NOT_FOUND" 
        },
        { status: 400 }
      );
    }

    // Validate productId exists
    const productExists = await db.select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (productExists.length === 0) {
      return NextResponse.json(
        { 
          error: "Product not found",
          code: "PRODUCT_NOT_FOUND" 
        },
        { status: 400 }
      );
    }

    // Create new order item
    const newOrderItem = await db.insert(orderItems)
      .values({
        orderId,
        productId,
        productName: productName.trim(),
        productPrice,
        quantity,
        selectedColor: selectedColor || null,
        selectedSize: selectedSize || null,
        subtotal,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newOrderItem[0], { status: 201 });
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
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { 
      orderId, 
      productId, 
      productName, 
      productPrice, 
      quantity, 
      selectedColor, 
      selectedSize, 
      subtotal 
    } = body;

    // Check if order item exists
    const existingOrderItem = await db.select()
      .from(orderItems)
      .where(eq(orderItems.id, parseInt(id)))
      .limit(1);

    if (existingOrderItem.length === 0) {
      return NextResponse.json(
        { error: 'Order item not found' },
        { status: 404 }
      );
    }

    // Validate quantity if provided
    if (quantity !== undefined) {
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          { 
            error: "Quantity must be a positive integer",
            code: "INVALID_QUANTITY" 
          },
          { status: 400 }
        );
      }
    }

    // Validate productPrice if provided
    if (productPrice !== undefined) {
      if (typeof productPrice !== 'number' || productPrice <= 0) {
        return NextResponse.json(
          { 
            error: "Product price must be a positive number",
            code: "INVALID_PRODUCT_PRICE" 
          },
          { status: 400 }
        );
      }
    }

    // Validate subtotal if provided
    if (subtotal !== undefined) {
      if (typeof subtotal !== 'number' || subtotal <= 0) {
        return NextResponse.json(
          { 
            error: "Subtotal must be a positive number",
            code: "INVALID_SUBTOTAL" 
          },
          { status: 400 }
        );
      }
    }

    // Validate orderId if provided
    if (orderId !== undefined) {
      const orderExists = await db.select()
        .from(orders)
        .where(eq(orders.id, orderId))
        .limit(1);

      if (orderExists.length === 0) {
        return NextResponse.json(
          { 
            error: "Order not found",
            code: "ORDER_NOT_FOUND" 
          },
          { status: 400 }
        );
      }
    }

    // Validate productId if provided
    if (productId !== undefined) {
      const productExists = await db.select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (productExists.length === 0) {
        return NextResponse.json(
          { 
            error: "Product not found",
            code: "PRODUCT_NOT_FOUND" 
          },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (orderId !== undefined) updateData.orderId = orderId;
    if (productId !== undefined) updateData.productId = productId;
    if (productName !== undefined) updateData.productName = productName.trim();
    if (productPrice !== undefined) updateData.productPrice = productPrice;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (selectedColor !== undefined) updateData.selectedColor = selectedColor || null;
    if (selectedSize !== undefined) updateData.selectedSize = selectedSize || null;
    if (subtotal !== undefined) updateData.subtotal = subtotal;

    // Update order item
    const updated = await db.update(orderItems)
      .set(updateData)
      .where(eq(orderItems.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
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
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    // Check if order item exists
    const existingOrderItem = await db.select()
      .from(orderItems)
      .where(eq(orderItems.id, parseInt(id)))
      .limit(1);

    if (existingOrderItem.length === 0) {
      return NextResponse.json(
        { error: 'Order item not found' },
        { status: 404 }
      );
    }

    // Delete order item
    const deleted = await db.delete(orderItems)
      .where(eq(orderItems.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Order item deleted successfully',
      deletedItem: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}