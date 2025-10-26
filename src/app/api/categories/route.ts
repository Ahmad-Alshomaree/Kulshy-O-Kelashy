import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { kulshyCategories } from '@/db/schema';
import { eq, like } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const category = await db.select()
        .from(kulshyCategories)
        .where(eq(kulshyCategories.categoryId, parseInt(id)))
        .limit(1);

      if (category.length === 0) {
        return NextResponse.json({ 
          error: 'Category not found',
          code: "CATEGORY_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(category[0], { status: 200 });
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = db.select().from(kulshyCategories);

    if (search) {
      query = query.where(
        like(kulshyCategories.categoryName, `%${search}%`)
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
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
    const { categoryName, description } = body;

    // Validate required fields
    if (!categoryName) {
      return NextResponse.json({ 
        error: "Category name is required",
        code: "MISSING_CATEGORY_NAME" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedCategoryName = categoryName.trim();

    // Check if categoryName already exists
    const existingCategory = await db.select()
      .from(kulshyCategories)
      .where(eq(kulshyCategories.categoryName, sanitizedCategoryName))
      .limit(1);

    if (existingCategory.length > 0) {
      return NextResponse.json({ 
        error: "Category name already exists",
        code: "CATEGORY_NAME_EXISTS" 
      }, { status: 400 });
    }

    // Create new category
    const newCategory = await db.insert(kulshyCategories)
      .values({
        categoryName: sanitizedCategoryName,
        categoryDescription: description || null,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const categoryId = parseInt(id);

    // Check if category exists
    const existingCategory = await db.select()
      .from(kulshyCategories)
      .where(eq(kulshyCategories.categoryId, categoryId))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json({ 
        error: 'Category not found',
        code: "CATEGORY_NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { categoryName, description } = body;

    const updates: any = {};

    // Validate and sanitize categoryName if provided
    if (categoryName !== undefined) {
      const sanitizedCategoryName = categoryName.trim();
      
      // Check if categoryName already exists (excluding current category)
      if (sanitizedCategoryName !== existingCategory[0].categoryName) {
        const duplicateName = await db.select()
          .from(kulshyCategories)
          .where(eq(kulshyCategories.categoryName, sanitizedCategoryName))
          .limit(1);

        if (duplicateName.length > 0) {
          return NextResponse.json({ 
            error: "Category name already exists",
            code: "CATEGORY_NAME_EXISTS" 
          }, { status: 400 });
        }
      }

      updates.categoryName = sanitizedCategoryName;
    }

    // Sanitize description if provided
    if (description !== undefined) {
      updates.categoryDescription = description || null;
    }

    // If no updates, return current category
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingCategory[0], { status: 200 });
    }

    // Update category
    const updated = await db.update(kulshyCategories)
      .set(updates)
      .where(eq(kulshyCategories.categoryId, categoryId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const categoryId = parseInt(id);

    // Check if category exists
    const existingCategory = await db.select()
      .from(kulshyCategories)
      .where(eq(kulshyCategories.categoryId, categoryId))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json({ 
        error: 'Category not found',
        code: "CATEGORY_NOT_FOUND" 
      }, { status: 404 });
    }

    // Delete category
    const deleted = await db.delete(kulshyCategories)
      .where(eq(kulshyCategories.categoryId, categoryId))
      .returning();

    return NextResponse.json({
      message: 'Category deleted successfully',
      category: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}