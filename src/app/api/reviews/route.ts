import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews, products, user } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const review = await db
        .select()
        .from(reviews)
        .where(eq(reviews.id, parseInt(id)))
        .limit(1);

      if (review.length === 0) {
        return NextResponse.json(
          { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(review[0], { status: 200 });
    }

    // List with pagination and filters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');
    const rating = searchParams.get('rating');

    let query = db.select().from(reviews);

    // Build filter conditions
    const conditions = [];
    
    if (productId) {
      const productIdNum = parseInt(productId);
      if (!isNaN(productIdNum)) {
        conditions.push(eq(reviews.productId, productIdNum));
      }
    }

    if (userId) {
      if (typeof userId === 'string' && userId.trim() !== '') {
        conditions.push(eq(reviews.userId, userId));
      }
    }

    if (rating) {
      const ratingNum = parseInt(rating);
      if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
        conditions.push(eq(reviews.rating, ratingNum));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(reviews.createdAt))
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
    const { productId, userId, rating, title, comment, isVerifiedPurchase } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!rating) {
      return NextResponse.json(
        { error: 'Rating is required', code: 'MISSING_RATING' },
        { status: 400 }
      );
    }

    if (!comment || comment.trim() === '') {
      return NextResponse.json(
        { error: 'Comment is required', code: 'MISSING_COMMENT' },
        { status: 400 }
      );
    }

    // Validate rating range
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
        { status: 400 }
      );
    }

    // Validate productId is a valid integer
    const productIdNum = parseInt(productId);
    if (isNaN(productIdNum)) {
      return NextResponse.json(
        { error: 'Product ID must be a valid integer', code: 'INVALID_PRODUCT_ID' },
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

    // Validate product exists
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productIdNum))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
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

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData = {
      productId: productIdNum,
      userId: userId,
      rating: ratingNum,
      title: title ? title.trim() : null,
      comment: comment.trim(),
      isVerifiedPurchase: isVerifiedPurchase === true,
      createdAt: now,
      updatedAt: now,
    };

    const newReview = await db
      .insert(reviews)
      .values(insertData)
      .returning();

    return NextResponse.json(newReview[0], { status: 201 });
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

    const reviewId = parseInt(id);

    // Check if review exists
    const existingReview = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { productId, userId, rating, title, comment, isVerifiedPurchase } = body;

    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    // Validate and add optional fields
    if (productId !== undefined) {
      const productIdNum = parseInt(productId);
      if (isNaN(productIdNum)) {
        return NextResponse.json(
          { error: 'Product ID must be a valid integer', code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      // Validate product exists
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productIdNum))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
          { status: 400 }
        );
      }

      updates.productId = productIdNum;
    }

    if (userId !== undefined) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json(
          { error: 'User ID must be a valid string', code: 'INVALID_USER_ID' },
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

      updates.userId = userId;
    }

    if (rating !== undefined) {
      const ratingNum = parseInt(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json(
          { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
          { status: 400 }
        );
      }
      updates.rating = ratingNum;
    }

    if (title !== undefined) {
      updates.title = title ? title.trim() : null;
    }

    if (comment !== undefined) {
      if (!comment || comment.trim() === '') {
        return NextResponse.json(
          { error: 'Comment cannot be empty', code: 'EMPTY_COMMENT' },
          { status: 400 }
        );
      }
      updates.comment = comment.trim();
    }

    if (isVerifiedPurchase !== undefined) {
      updates.isVerifiedPurchase = isVerifiedPurchase === true;
    }

    const updatedReview = await db
      .update(reviews)
      .set(updates)
      .where(eq(reviews.id, reviewId))
      .returning();

    if (updatedReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedReview[0], { status: 200 });
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

    const reviewId = parseInt(id);

    // Check if review exists
    const existingReview = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedReview = await db
      .delete(reviews)
      .where(eq(reviews.id, reviewId))
      .returning();

    if (deletedReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Review deleted successfully',
        review: deletedReview[0],
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