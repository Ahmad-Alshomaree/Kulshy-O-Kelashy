import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { kulshyAddresses, users } from '@/db/schema';
import { eq, like, and, or } from 'drizzle-orm';

const VALID_ADDRESS_TYPES = ['home', 'work', 'other'] as const;

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

      const address = await db
        .select()
        .from(kulshyAddresses)
        .where(eq(kulshyAddresses.id, parseInt(id)))
        .limit(1);

      if (address.length === 0) {
        return NextResponse.json(
          { error: 'Address not found', code: 'ADDRESS_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(address[0], { status: 200 });
    }

    // List with pagination and filters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let query = db.select().from(kulshyAddresses);
    const conditions = [];

    // Filter by userId
    if (userId) {
      if (isNaN(parseInt(userId))) {
        return NextResponse.json(
          { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }
      conditions.push(eq(kulshyAddresses.userId, parseInt(userId)));
    }

    // Filter by type
    if (type) {
      if (!VALID_ADDRESS_TYPES.includes(type as any)) {
        return NextResponse.json(
          { error: 'Invalid address type. Must be home, work, or other', code: 'INVALID_TYPE' },
          { status: 400 }
        );
      }
      conditions.push(eq(kulshyAddresses.type, type));
    }

    // Search across location1, city, state
    if (search) {
      conditions.push(
        or(
          like(kulshyAddresses.location1, `%${search}%`),
          like(kulshyAddresses.city, `%${search}%`),
          like(kulshyAddresses.state, `%${search}%`)
        )
      );
    }

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

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
    const { location1, location2, city, state, type, isDefault, userId } = body;

    // Validate required fields
    if (!location1 || typeof location1 !== 'string' || location1.trim() === '') {
      return NextResponse.json(
        { error: 'location1 is required', code: 'MISSING_LOCATION1' },
        { status: 400 }
      );
    }

    if (!city || typeof city !== 'string' || city.trim() === '') {
      return NextResponse.json(
        { error: 'city is required', code: 'MISSING_CITY' },
        { status: 400 }
      );
    }

    if (!state || typeof state !== 'string' || state.trim() === '') {
      return NextResponse.json(
        { error: 'state is required', code: 'MISSING_STATE' },
        { status: 400 }
      );
    }

    if (!type || typeof type !== 'string') {
      return NextResponse.json(
        { error: 'type is required', code: 'MISSING_TYPE' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    // Validate type
    if (!VALID_ADDRESS_TYPES.includes(type as any)) {
      return NextResponse.json(
        { error: 'type must be one of: home, work, other', code: 'INVALID_TYPE' },
        { status: 400 }
      );
    }

    // Validate userId
    if (isNaN(parseInt(userId))) {
      return NextResponse.json(
        { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Verify user exists
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData = {
      location1: location1.trim(),
      location2: location2 ? location2.trim() : null,
      city: city.trim(),
      state: state.trim(),
      type: type.trim(),
      isDefault: isDefault === true,
      userId: parseInt(userId),
      createdAt: new Date().toISOString(),
    };

    const newAddress = await db
      .insert(kulshyAddresses)
      .values(insertData)
      .returning();

    return NextResponse.json(newAddress[0], { status: 201 });
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

    const addressId = parseInt(id);

    // Check if address exists
    const existingAddress = await db
      .select()
      .from(kulshyAddresses)
      .where(eq(kulshyAddresses.id, addressId))
      .limit(1);

    if (existingAddress.length === 0) {
      return NextResponse.json(
        { error: 'Address not found', code: 'ADDRESS_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { location1, location2, city, state, type, isDefault, userId } = body;

    const updates: any = {};

    // Validate and add optional fields
    if (location1 !== undefined) {
      if (typeof location1 !== 'string' || location1.trim() === '') {
        return NextResponse.json(
          { error: 'location1 cannot be empty', code: 'INVALID_LOCATION1' },
          { status: 400 }
        );
      }
      updates.location1 = location1.trim();
    }

    if (location2 !== undefined) {
      updates.location2 = location2 ? location2.trim() : null;
    }

    if (city !== undefined) {
      if (typeof city !== 'string' || city.trim() === '') {
        return NextResponse.json(
          { error: 'city cannot be empty', code: 'INVALID_CITY' },
          { status: 400 }
        );
      }
      updates.city = city.trim();
    }

    if (state !== undefined) {
      if (typeof state !== 'string' || state.trim() === '') {
        return NextResponse.json(
          { error: 'state cannot be empty', code: 'INVALID_STATE' },
          { status: 400 }
        );
      }
      updates.state = state.trim();
    }

    if (type !== undefined) {
      if (!VALID_ADDRESS_TYPES.includes(type as any)) {
        return NextResponse.json(
          { error: 'type must be one of: home, work, other', code: 'INVALID_TYPE' },
          { status: 400 }
        );
      }
      updates.type = type.trim();
    }

    if (isDefault !== undefined) {
      updates.isDefault = isDefault === true;
    }

    if (userId !== undefined) {
      if (isNaN(parseInt(userId))) {
        return NextResponse.json(
          { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }

      // Verify user exists
      const userExists = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json(
          { error: 'User not found', code: 'USER_NOT_FOUND' },
          { status: 400 }
        );
      }

      updates.userId = parseInt(userId);
    }

    // If no updates, return current address
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingAddress[0], { status: 200 });
    }

    const updated = await db
      .update(kulshyAddresses)
      .set(updates)
      .where(eq(kulshyAddresses.id, addressId))
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

    const addressId = parseInt(id);

    // Check if address exists
    const existingAddress = await db
      .select()
      .from(kulshyAddresses)
      .where(eq(kulshyAddresses.id, addressId))
      .limit(1);

    if (existingAddress.length === 0) {
      return NextResponse.json(
        { error: 'Address not found', code: 'ADDRESS_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(kulshyAddresses)
      .where(eq(kulshyAddresses.id, addressId))
      .returning();

    return NextResponse.json(
      {
        message: 'Address deleted successfully',
        deletedAddress: deleted[0],
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