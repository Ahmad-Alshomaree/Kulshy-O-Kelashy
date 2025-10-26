import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { kulshyFavorites, users, products } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Single record by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const favorite = await db.select()
        .from(kulshyFavorites)
        .where(eq(kulshyFavorites.id, parseInt(id)))
        .limit(1);

      if (favorite.length === 0) {
        return NextResponse.json({ 
          error: 'Favorite not found',
          code: "NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(favorite[0]);
    }

    // List with filters
    let query = db.select().from(kulshyFavorites);
    const conditions = [];

    // Filter by userId
    if (userId) {
      if (isNaN(parseInt(userId))) {
        return NextResponse.json({ 
          error: "Valid userId is required",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(kulshyFavorites.userId, parseInt(userId)));
    }

    // Filter by productId
    if (productId) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json({ 
          error: "Valid productId is required",
          code: "INVALID_PRODUCT_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(kulshyFavorites.productId, parseInt(productId)));
    }

    // Apply filters if any
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by time descending and apply pagination
    const favorites = await query
      .orderBy(desc(kulshyFavorites.time))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(favorites);

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
    const { userId, productId } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ 
        error: "userId is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!productId) {
      return NextResponse.json({ 
        error: "productId is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    // Validate userId is valid integer
    if (isNaN(parseInt(userId))) {
      return NextResponse.json({ 
        error: "Valid userId is required",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Validate productId is valid integer
    if (isNaN(parseInt(productId))) {
      return NextResponse.json({ 
        error: "Valid productId is required",
        code: "INVALID_PRODUCT_ID" 
      }, { status: 400 });
    }

    // Validate userId exists in kulshy_users table
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({ 
        error: "User does not exist",
        code: "USER_NOT_FOUND" 
      }, { status: 400 });
    }

    // Validate productId exists in kulshy_products table
    const productExists = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (productExists.length === 0) {
      return NextResponse.json({ 
        error: "Product does not exist",
        code: "PRODUCT_NOT_FOUND" 
      }, { status: 400 });
    }

    // Check for duplicate favorite
    const existingFavorite = await db.select()
      .from(kulshyFavorites)
      .where(
        and(
          eq(kulshyFavorites.userId, parseInt(userId)),
          eq(kulshyFavorites.productId, parseInt(productId))
        )
      )
      .limit(1);

    if (existingFavorite.length > 0) {
      return NextResponse.json({ 
        error: "This favorite already exists",
        code: "DUPLICATE_FAVORITE" 
      }, { status: 400 });
    }

    // Create new favorite
    const timestamp = new Date().toISOString();
    const newFavorite = await db.insert(kulshyFavorites)
      .values({
        userId: parseInt(userId),
        productId: parseInt(productId),
        time: timestamp,
        createdAt: timestamp
      })
      .returning();

    return NextResponse.json(newFavorite[0], { status: 201 });

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

    // Check if favorite exists
    const existingFavorite = await db.select()
      .from(kulshyFavorites)
      .where(eq(kulshyFavorites.id, parseInt(id)))
      .limit(1);

    if (existingFavorite.length === 0) {
      return NextResponse.json({ 
        error: 'Favorite not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { userId, productId } = body;
    const updates: any = {};

    // Validate and update userId if provided
    if (userId !== undefined) {
      if (isNaN(parseInt(userId))) {
        return NextResponse.json({ 
          error: "Valid userId is required",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }

      // Validate userId exists in kulshy_users table
      const userExists = await db.select()
        .from(users)
        .where(eq(users.id, parseInt(userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json({ 
          error: "User does not exist",
          code: "USER_NOT_FOUND" 
        }, { status: 400 });
      }

      updates.userId = parseInt(userId);
    }

    // Validate and update productId if provided
    if (productId !== undefined) {
      if (isNaN(parseInt(productId))) {
        return NextResponse.json({ 
          error: "Valid productId is required",
          code: "INVALID_PRODUCT_ID" 
        }, { status: 400 });
      }

      // Validate productId exists in kulshy_products table
      const productExists = await db.select()
        .from(products)
        .where(eq(products.id, parseInt(productId)))
        .limit(1);

      if (productExists.length === 0) {
        return NextResponse.json({ 
          error: "Product does not exist",
          code: "PRODUCT_NOT_FOUND" 
        }, { status: 400 });
      }

      updates.productId = parseInt(productId);
    }

    // Check for duplicate if userId or productId is being changed
    if (userId !== undefined || productId !== undefined) {
      const checkUserId = userId !== undefined ? parseInt(userId) : existingFavorite[0].userId;
      const checkProductId = productId !== undefined ? parseInt(productId) : existingFavorite[0].productId;

      const duplicateCheck = await db.select()
        .from(kulshyFavorites)
        .where(
          and(
            eq(kulshyFavorites.userId, checkUserId),
            eq(kulshyFavorites.productId, checkProductId)
          )
        )
        .limit(1);

      // If duplicate exists and it's not the same record being updated
      if (duplicateCheck.length > 0 && duplicateCheck[0].id !== parseInt(id)) {
        return NextResponse.json({ 
          error: "This favorite already exists",
          code: "DUPLICATE_FAVORITE" 
        }, { status: 400 });
      }
    }

    // Perform update if there are changes
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingFavorite[0]);
    }

    const updated = await db.update(kulshyFavorites)
      .set(updates)
      .where(eq(kulshyFavorites.id, parseInt(id)))
      .returning();

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

    // Check if favorite exists
    const existingFavorite = await db.select()
      .from(kulshyFavorites)
      .where(eq(kulshyFavorites.id, parseInt(id)))
      .limit(1);

    if (existingFavorite.length === 0) {
      return NextResponse.json({ 
        error: 'Favorite not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    // Delete the favorite
    const deleted = await db.delete(kulshyFavorites)
      .where(eq(kulshyFavorites.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Favorite deleted successfully',
      favorite: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}