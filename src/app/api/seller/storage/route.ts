import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sellerStorage, products, user } from '@/db/schema';
import { eq, and, or, desc, lte, like } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller role required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      const record = await db.select()
        .from(sellerStorage)
        .where(and(
          eq(sellerStorage.id, parseInt(id)),
          eq(sellerStorage.sellerId, sellerId)
        ))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ 
          error: 'Storage record not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const lowStock = searchParams.get('lowStock') === 'true';

    let query = db.select()
      .from(sellerStorage)
      .where(eq(sellerStorage.sellerId, sellerId))
      .orderBy(desc(sellerStorage.createdAt));

    if (lowStock) {
      query = db.select()
        .from(sellerStorage)
        .where(and(
          eq(sellerStorage.sellerId, sellerId),
          lte(sellerStorage.quantity, sellerStorage.lowStockThreshold)
        ))
        .orderBy(desc(sellerStorage.createdAt));
    }

    if (search) {
      const searchCondition = or(
        like(sellerStorage.productName, `%${search}%`),
        like(sellerStorage.sku, `%${search}%`),
        like(sellerStorage.warehouse, `%${search}%`)
      );

      query = db.select()
        .from(sellerStorage)
        .where(and(
          eq(sellerStorage.sellerId, sellerId),
          lowStock ? lte(sellerStorage.quantity, sellerStorage.lowStockThreshold) : undefined,
          searchCondition
        ))
        .orderBy(desc(sellerStorage.createdAt));
    }

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
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller role required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const sellerId = session.user.id;
    const body = await request.json();

    if ('sellerId' in body || 'seller_id' in body) {
      return NextResponse.json({ 
        error: 'Seller ID cannot be provided in request body',
        code: 'SELLER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    const { productId, quantity, sku, warehouse, lowStockThreshold, lastRestocked } = body;

    if (!productId) {
      return NextResponse.json({ 
        error: 'Product ID is required',
        code: 'MISSING_PRODUCT_ID' 
      }, { status: 400 });
    }

    if (quantity === undefined || quantity === null) {
      return NextResponse.json({ 
        error: 'Quantity is required',
        code: 'MISSING_QUANTITY' 
      }, { status: 400 });
    }

    if (quantity < 0) {
      return NextResponse.json({ 
        error: 'Quantity must be greater than or equal to 0',
        code: 'INVALID_QUANTITY' 
      }, { status: 400 });
    }

    if (!sku || sku.trim() === '') {
      return NextResponse.json({ 
        error: 'SKU is required',
        code: 'MISSING_SKU' 
      }, { status: 400 });
    }

    if (!warehouse || warehouse.trim() === '') {
      return NextResponse.json({ 
        error: 'Warehouse is required',
        code: 'MISSING_WAREHOUSE' 
      }, { status: 400 });
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found',
        code: 'PRODUCT_NOT_FOUND' 
      }, { status: 404 });
    }

    const currentDate = new Date().toISOString();
    
    const newStorage = await db.insert(sellerStorage)
      .values({
        sellerId,
        productId: parseInt(productId),
        productName: product[0].productName,
        sku: sku.trim(),
        quantity: parseInt(quantity),
        lowStockThreshold: lowStockThreshold !== undefined ? parseInt(lowStockThreshold) : 10,
        warehouse: warehouse.trim(),
        lastRestocked: lastRestocked || currentDate,
        createdAt: currentDate,
        updatedAt: currentDate,
      })
      .returning();

    return NextResponse.json(newStorage[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller role required',
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

    if ('sellerId' in body || 'seller_id' in body) {
      return NextResponse.json({ 
        error: 'Seller ID cannot be provided in request body',
        code: 'SELLER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    const existingRecord = await db.select()
      .from(sellerStorage)
      .where(and(
        eq(sellerStorage.id, parseInt(id)),
        eq(sellerStorage.sellerId, sellerId)
      ))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'Storage record not found or access denied',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const { quantity, lowStockThreshold, warehouse, lastRestocked, sku } = body;
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (quantity !== undefined) {
      if (quantity < 0) {
        return NextResponse.json({ 
          error: 'Quantity must be greater than or equal to 0',
          code: 'INVALID_QUANTITY' 
        }, { status: 400 });
      }
      updates.quantity = parseInt(quantity);
    }

    if (lowStockThreshold !== undefined) {
      if (lowStockThreshold < 0) {
        return NextResponse.json({ 
          error: 'Low stock threshold must be greater than or equal to 0',
          code: 'INVALID_THRESHOLD' 
        }, { status: 400 });
      }
      updates.lowStockThreshold = parseInt(lowStockThreshold);
    }

    if (warehouse !== undefined) {
      updates.warehouse = warehouse.trim();
    }

    if (lastRestocked !== undefined) {
      updates.lastRestocked = lastRestocked;
    }

    if (sku !== undefined) {
      updates.sku = sku.trim();
    }

    const updated = await db.update(sellerStorage)
      .set(updates)
      .where(and(
        eq(sellerStorage.id, parseInt(id)),
        eq(sellerStorage.sellerId, sellerId)
      ))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Storage record not found or access denied',
        code: 'NOT_FOUND' 
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
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    if (session.user.role !== 'seller') {
      return NextResponse.json({ 
        error: 'Seller role required',
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

    const existingRecord = await db.select()
      .from(sellerStorage)
      .where(and(
        eq(sellerStorage.id, parseInt(id)),
        eq(sellerStorage.sellerId, sellerId)
      ))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'Storage record not found or access denied',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(sellerStorage)
      .where(and(
        eq(sellerStorage.id, parseInt(id)),
        eq(sellerStorage.sellerId, sellerId)
      ))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Storage record not found or access denied',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Storage record deleted successfully',
      deleted: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}