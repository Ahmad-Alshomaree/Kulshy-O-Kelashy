import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ 
        error: 'User ID and role are required' 
      }, { status: 400 });
    }

    if (role !== 'customer' && role !== 'seller') {
      return NextResponse.json({ 
        error: 'Invalid role. Must be either customer or seller' 
      }, { status: 400 });
    }

    // Update user role
    const updated = await db.update(user)
      .set({ 
        role,
        businessName: body.businessName || null,
        storeId: body.storeId || null,
        updatedAt: new Date()
      })
      .where(eq(user.id, userId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      user: updated[0]
    }, { status: 200 });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
