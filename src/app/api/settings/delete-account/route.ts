import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function DELETE(request: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    // Check authentication
    if (!session || !session.user) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }

    // Extract userId from session
    const userId = session.user.id;

    // Delete user - CASCADE will automatically delete related records:
    // - session table (onDelete: cascade)
    // - account table (onDelete: cascade)
    // - any other related records with CASCADE constraint
    const deleted = await db.delete(user)
      .where(eq(user.id, userId))
      .returning();

    // Verify deletion occurred
    if (deleted.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Account deleted successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE /api/settings/delete-account error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}