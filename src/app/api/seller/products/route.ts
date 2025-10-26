import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products, categories, user } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Role verification
    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller access required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single product fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      const product = await db.select()
        .from(products)
        .where(and(
          eq(products.id, parseInt(id)),
          eq(products.sellerId, parseInt(sellerId))
        ))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json({ 
          error: 'Product not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(product[0], { status: 200 });
    }

    // List products with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const isNew = searchParams.get('isNew');
    const isSale = searchParams.get('isSale');
    const sort = searchParams.get('sort') ?? 'createdAt';
    const order = searchParams.get('order') ?? 'desc';

    const conditions = [eq(products.sellerId, parseInt(sellerId))];

    if (search) {
      conditions.push(
        or(
          like(products.productName, `%${search}%`),
          like(products.description, `%${search}%`)
        )!
      );
    }

    if (categoryId) {
      conditions.push(eq(products.categoryId, parseInt(categoryId)));
    }

    if (isNew !== null && isNew !== undefined) {
      conditions.push(eq(products.isNew, isNew === 'true'));
    }

    if (isSale !== null && isSale !== undefined) {
      conditions.push(eq(products.isSale, isSale === 'true'));
    }

    let query = db.select()
      .from(products)
      .where(and(...conditions));

    // Apply sorting
    const sortColumn = products[sort as keyof typeof products] ?? products.createdAt;
    query = order === 'asc' 
      ? query.orderBy(asc(sortColumn))
      : query.orderBy(desc(sortColumn));

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Role verification
    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller access required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const body = await request.json();

    // Security check: reject if sellerId provided in body
    if ('sellerId' in body || 'seller_id' in body) {
      return NextResponse.json({ 
        error: 'Seller ID cannot be provided in request body',
        code: 'SELLER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    const { 
      productName, 
      description, 
      price, 
      stock, 
      imageUrl, 
      categoryId,
      originalPrice,
      isNew,
      isSale,
      discount,
      colors,
      size
    } = body;

    // Validate required fields
    if (!productName || productName.trim() === '') {
      return NextResponse.json({ 
        error: 'Product name is required',
        code: 'MISSING_PRODUCT_NAME' 
      }, { status: 400 });
    }

    if (!description || description.trim() === '') {
      return NextResponse.json({ 
        error: 'Description is required',
        code: 'MISSING_DESCRIPTION' 
      }, { status: 400 });
    }

    if (!price || price <= 0) {
      return NextResponse.json({ 
        error: 'Price must be greater than 0',
        code: 'INVALID_PRICE' 
      }, { status: 400 });
    }

    if (stock === undefined || stock === null || stock < 0) {
      return NextResponse.json({ 
        error: 'Stock must be 0 or greater',
        code: 'INVALID_STOCK' 
      }, { status: 400 });
    }

    if (!imageUrl || imageUrl.trim() === '') {
      return NextResponse.json({ 
        error: 'Image URL is required',
        code: 'MISSING_IMAGE_URL' 
      }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ 
        error: 'Category ID is required',
        code: 'MISSING_CATEGORY_ID' 
      }, { status: 400 });
    }

    // Validate categoryId exists
    const category = await db.select()
      .from(categories)
      .where(eq(categories.id, parseInt(categoryId)))
      .limit(1);

    if (category.length === 0) {
      return NextResponse.json({ 
        error: 'Category not found',
        code: 'INVALID_CATEGORY' 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    const newProduct = await db.insert(products)
      .values({
        sellerId: parseInt(sellerId),
        categoryId: parseInt(categoryId),
        productName: productName.trim(),
        description: description.trim(),
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        stock: parseInt(stock),
        rating: 0,
        reviewCount: 0,
        viewCount: 0,
        isNew: isNew !== undefined ? Boolean(isNew) : false,
        isSale: isSale !== undefined ? Boolean(isSale) : false,
        discount: discount ?? null,
        colors: colors ?? null,
        size: size ?? null,
        imageUrl: imageUrl.trim(),
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Role verification
    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller access required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    const body = await request.json();

    // Security check: reject if sellerId provided in body
    if ('sellerId' in body || 'seller_id' in body) {
      return NextResponse.json({ 
        error: 'Seller ID cannot be provided in request body',
        code: 'SELLER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    // Check if product exists and belongs to seller
    const existingProduct = await db.select()
      .from(products)
      .where(and(
        eq(products.id, parseInt(id)),
        eq(products.sellerId, parseInt(sellerId))
      ))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found or access denied',
        code: 'NOT_FOUND_OR_FORBIDDEN' 
      }, { status: 404 });
    }

    const { 
      productName, 
      description, 
      price, 
      originalPrice,
      stock, 
      imageUrl, 
      categoryId,
      isNew,
      isSale,
      discount,
      colors,
      size
    } = body;

    // Validate changed fields
    if (price !== undefined && price <= 0) {
      return NextResponse.json({ 
        error: 'Price must be greater than 0',
        code: 'INVALID_PRICE' 
      }, { status: 400 });
    }

    if (stock !== undefined && stock < 0) {
      return NextResponse.json({ 
        error: 'Stock must be 0 or greater',
        code: 'INVALID_STOCK' 
      }, { status: 400 });
    }

    if (productName !== undefined && productName.trim() === '') {
      return NextResponse.json({ 
        error: 'Product name cannot be empty',
        code: 'INVALID_PRODUCT_NAME' 
      }, { status: 400 });
    }

    // Validate categoryId if provided
    if (categoryId !== undefined) {
      const category = await db.select()
        .from(categories)
        .where(eq(categories.id, parseInt(categoryId)))
        .limit(1);

      if (category.length === 0) {
        return NextResponse.json({ 
          error: 'Category not found',
          code: 'INVALID_CATEGORY' 
        }, { status: 400 });
      }
    }

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (productName !== undefined) updates.productName = productName.trim();
    if (description !== undefined) updates.description = description.trim();
    if (price !== undefined) updates.price = parseFloat(price);
    if (originalPrice !== undefined) updates.originalPrice = originalPrice ? parseFloat(originalPrice) : null;
    if (stock !== undefined) updates.stock = parseInt(stock);
    if (imageUrl !== undefined) updates.imageUrl = imageUrl.trim();
    if (categoryId !== undefined) updates.categoryId = parseInt(categoryId);
    if (isNew !== undefined) updates.isNew = Boolean(isNew);
    if (isSale !== undefined) updates.isSale = Boolean(isSale);
    if (discount !== undefined) updates.discount = discount;
    if (colors !== undefined) updates.colors = colors;
    if (size !== undefined) updates.size = size;

    const updated = await db.update(products)
      .set(updates)
      .where(and(
        eq(products.id, parseInt(id)),
        eq(products.sellerId, parseInt(sellerId))
      ))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found or access denied',
        code: 'NOT_FOUND_OR_FORBIDDEN' 
      }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Role verification
    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller access required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    // Check if product exists and belongs to seller
    const existingProduct = await db.select()
      .from(products)
      .where(and(
        eq(products.id, parseInt(id)),
        eq(products.sellerId, parseInt(sellerId))
      ))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found or access denied',
        code: 'NOT_FOUND_OR_FORBIDDEN' 
      }, { status: 404 });
    }

    const deleted = await db.delete(products)
      .where(and(
        eq(products.id, parseInt(id)),
        eq(products.sellerId, parseInt(sellerId))
      ))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found or access denied',
        code: 'NOT_FOUND_OR_FORBIDDEN' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Product deleted successfully',
      product: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}