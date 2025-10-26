import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productImages, products } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const productId = searchParams.get('productId');
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

      const productImage = await db
        .select()
        .from(productImages)
        .where(eq(productImages.id, parseInt(id)))
        .limit(1);

      if (productImage.length === 0) {
        return NextResponse.json(
          { error: 'Product image not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(productImage[0], { status: 200 });
    }

    // List with filtering and pagination
    let query = db.select().from(productImages);

    // Filter by productId if provided
    if (productId) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json(
          { error: 'Valid product ID is required', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }
      query = query.where(eq(productImages.productId, parseInt(productId)));
    }

    const results = await query
      .orderBy(desc(productImages.displayOrder))
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
    const { productId, imageUrl, displayOrder } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required', code: 'MISSING_IMAGE_URL' },
        { status: 400 }
      );
    }

    // Validate productId is a valid integer
    if (isNaN(parseInt(productId))) {
      return NextResponse.json(
        { error: 'Product ID must be a valid number', code: 'INVALID_PRODUCT_ID' },
        { status: 400 }
      );
    }

    // Verify that the product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Sanitize and prepare data
    const sanitizedImageUrl = imageUrl.trim();
    const finalDisplayOrder = displayOrder !== undefined ? parseInt(displayOrder) : 0;

    // Validate displayOrder if provided
    if (displayOrder !== undefined && isNaN(finalDisplayOrder)) {
      return NextResponse.json(
        { error: 'Display order must be a valid number', code: 'INVALID_DISPLAY_ORDER' },
        { status: 400 }
      );
    }

    // Insert new product image
    const newProductImage = await db
      .insert(productImages)
      .values({
        productId: parseInt(productId),
        imageUrl: sanitizedImageUrl,
        displayOrder: finalDisplayOrder,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newProductImage[0], { status: 201 });
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

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(productImages)
      .where(eq(productImages.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Product image not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { productId, imageUrl, displayOrder } = body;

    // Build update object with only provided fields
    const updates: any = {};

    // Validate and add productId if provided
    if (productId !== undefined) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json(
          { error: 'Product ID must be a valid number', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      // Verify that the product exists
      const existingProduct = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(productId)))
        .limit(1);

      if (existingProduct.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
          { status: 404 }
        );
      }

      updates.productId = parseInt(productId);
    }

    // Validate and add imageUrl if provided
    if (imageUrl !== undefined) {
      if (!imageUrl || imageUrl.trim() === '') {
        return NextResponse.json(
          { error: 'Image URL cannot be empty', code: 'INVALID_IMAGE_URL' },
          { status: 400 }
        );
      }
      updates.imageUrl = imageUrl.trim();
    }

    // Validate and add displayOrder if provided
    if (displayOrder !== undefined) {
      if (isNaN(parseInt(displayOrder))) {
        return NextResponse.json(
          { error: 'Display order must be a valid number', code: 'INVALID_DISPLAY_ORDER' },
          { status: 400 }
        );
      }
      updates.displayOrder = parseInt(displayOrder);
    }

    // If no fields to update, return error
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    // Update the record
    const updatedProductImage = await db
      .update(productImages)
      .set(updates)
      .where(eq(productImages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedProductImage[0], { status: 200 });
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

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(productImages)
      .where(eq(productImages.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Product image not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the record
    const deletedProductImage = await db
      .delete(productImages)
      .where(eq(productImages.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Product image deleted successfully',
        deletedRecord: deletedProductImage[0],
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