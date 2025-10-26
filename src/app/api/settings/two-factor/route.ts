import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get session using better-auth
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { enabled } = body;

    // Validate enabled field
    if (typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'enabled must be a boolean', code: 'INVALID_ENABLED' },
        { status: 400 }
      );
    }

    // Query existing preferences
    const existingPreferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id))
      .limit(1);

    if (existingPreferences.length > 0) {
      // Update existing preferences
      await db
        .update(userPreferences)
        .set({
          twoFactorEnabled: enabled,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(userPreferences.userId, session.user.id));
    } else {
      // Insert new preferences
      await db.insert(userPreferences).values({
        userId: session.user.id,
        language: 'en',
        theme: 'light',
        twoFactorEnabled: enabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        twoFactorEnabled: enabled,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}