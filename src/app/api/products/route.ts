import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { kulshyProducts, kulshyCategories, user } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single product by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const product = await db
        .select()
        .from(kulshyProducts)
        .where(eq(kulshyProducts.productId, parseInt(id)))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(product[0], { status: 200 });
    }

    // List products with filters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const sellerId = searchParams.get('sellerId');
    const isNew = searchParams.get('isNew');
    const isSale = searchParams.get('isSale');

    let query = db.select().from(kulshyProducts);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(kulshyProducts.productName, `%${search}%`),
          like(kulshyProducts.description, `%${search}%`)
        )
      );
    }

    if (categoryId) {
      conditions.push(eq(kulshyProducts.productCategories, parseInt(categoryId)));
    }

    if (sellerId) {
      conditions.push(eq(kulshyProducts.sellerId, parseInt(sellerId)));
    }

    if (isNew === 'true') {
      conditions.push(eq(kulshyProducts.isNew, true));
    } else if (isNew === 'false') {
      conditions.push(eq(kulshyProducts.isNew, false));
    }

    if (isSale === 'true') {
      conditions.push(eq(kulshyProducts.isSaled, true));
    } else if (isSale === 'false') {
      conditions.push(eq(kulshyProducts.isSaled, false));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(kulshyProducts.createdAt))
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

    // Validate required fields
    if (!body.productName || typeof body.productName !== 'string') {
      return NextResponse.json(
        { error: 'Product name is required and must be a string', code: 'INVALID_PRODUCT_NAME' },
        { status: 400 }
      );
    }

    if (!body.description || typeof body.description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required and must be a string', code: 'INVALID_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!body.price || typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { error: 'Price is required and must be a positive number', code: 'INVALID_PRICE' },
        { status: 400 }
      );
    }

    if (body.originalPrice !== undefined && body.originalPrice !== null) {
      if (typeof body.originalPrice !== 'number' || body.originalPrice <= 0) {
        return NextResponse.json(
          { error: 'Original price must be a positive number', code: 'INVALID_ORIGINAL_PRICE' },
          { status: 400 }
        );
      }
    }

    if (!body.imageUrl || typeof body.imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Image URL is required and must be a string', code: 'INVALID_IMAGE_URL' },
        { status: 400 }
      );
    }

    // Validate foreign keys
    if (body.sellerId !== undefined && body.sellerId !== null) {
      const seller = await db
        .select()
        .from(user)
        .where(eq(user.id, body.sellerId))
        .limit(1);

      if (seller.length === 0) {
        return NextResponse.json(
          { error: 'Invalid seller ID: seller does not exist', code: 'SELLER_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    if (body.categoryId !== undefined && body.categoryId !== null) {
      const category = await db
        .select()
        .from(kulshyCategories)
        .where(eq(kulshyCategories.id, body.categoryId))
        .limit(1);

      if (category.length === 0) {
        return NextResponse.json(
          { error: 'Invalid category ID: category does not exist', code: 'CATEGORY_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Prepare product data
    const productData = {
      productName: body.productName.trim(),
      description: body.description.trim(),
      price: body.price,
      originalPrice: body.originalPrice || null,
      stock: body.stock !== undefined ? body.stock : 0,
      sellerId: body.sellerId || null,
      categoryId: body.categoryId || null,
      rating: body.rating !== undefined ? body.rating : 0,
      reviewCount: body.reviewCount !== undefined ? body.reviewCount : 0,
      viewCount: body.viewCount !== undefined ? body.viewCount : 0,
      isNew: body.isNew !== undefined ? body.isNew : false,
      isSale: body.isSale !== undefined ? body.isSale : false,
      discount: body.discount || null,
      colors: body.colors || null,
      size: body.size || null,
      imageUrl: body.imageUrl.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newProduct = await db.insert(kulshyProducts).values(productData).returning();

    return NextResponse.json(newProduct[0], { status: 201 });
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

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(kulshyProducts)
      .where(eq(kulshyProducts.productId, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate fields if provided
    if (body.productName !== undefined && (typeof body.productName !== 'string' || body.productName.trim() === '')) {
      return NextResponse.json(
        { error: 'Product name must be a non-empty string', code: 'INVALID_PRODUCT_NAME' },
        { status: 400 }
      );
    }

    if (body.description !== undefined && (typeof body.description !== 'string' || body.description.trim() === '')) {
      return NextResponse.json(
        { error: 'Description must be a non-empty string', code: 'INVALID_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (body.price !== undefined && (typeof body.price !== 'number' || body.price <= 0)) {
      return NextResponse.json(
        { error: 'Price must be a positive number', code: 'INVALID_PRICE' },
        { status: 400 }
      );
    }

    if (body.originalPrice !== undefined && body.originalPrice !== null) {
      if (typeof body.originalPrice !== 'number' || body.originalPrice <= 0) {
        return NextResponse.json(
          { error: 'Original price must be a positive number', code: 'INVALID_ORIGINAL_PRICE' },
          { status: 400 }
        );
      }
    }

    if (body.imageUrl !== undefined && (typeof body.imageUrl !== 'string' || body.imageUrl.trim() === '')) {
      return NextResponse.json(
        { error: 'Image URL must be a non-empty string', code: 'INVALID_IMAGE_URL' },
        { status: 400 }
      );
    }

    // Validate foreign keys if provided
    if (body.sellerId !== undefined && body.sellerId !== null) {
      const seller = await db
        .select()
        .from(user)
        .where(eq(user.id, body.sellerId))
        .limit(1);

      if (seller.length === 0) {
        return NextResponse.json(
          { error: 'Invalid seller ID: seller does not exist', code: 'SELLER_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    if (body.categoryId !== undefined && body.categoryId !== null) {
      const category = await db
        .select()
        .from(kulshyCategories)
        .where(eq(kulshyCategories.id, body.categoryId))
        .limit(1);

      if (category.length === 0) {
        return NextResponse.json(
          { error: 'Invalid category ID: category does not exist', code: 'CATEGORY_NOT_FOUND' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.productName !== undefined) updateData.productName = body.productName.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.price !== undefined) updateData.price = body.price;
    if (body.originalPrice !== undefined) updateData.originalPrice = body.originalPrice;
    if (body.stock !== undefined) updateData.stock = body.stock;
    if (body.sellerId !== undefined) updateData.sellerId = body.sellerId;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.reviewCount !== undefined) updateData.reviewCount = body.reviewCount;
    if (body.viewCount !== undefined) updateData.viewCount = body.viewCount;
    if (body.isNew !== undefined) updateData.isNew = body.isNew;
    if (body.isSale !== undefined) updateData.isSale = body.isSale;
    if (body.discount !== undefined) updateData.discount = body.discount;
    if (body.colors !== undefined) updateData.colors = body.colors;
    if (body.size !== undefined) updateData.size = body.size;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl.trim();

    const updated = await db
      .update(kulshyProducts)
      .set(updateData)
      .where(eq(kulshyProducts.productId, parseInt(id)))
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(kulshyProducts)
      .where(eq(kulshyProducts.productId, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(kulshyProducts)
      .where(eq(kulshyProducts.productId, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        product: deleted[0],
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