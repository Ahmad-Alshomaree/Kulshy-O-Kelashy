import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get session using better-auth
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Query user preferences
    const existingPreferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    // If preferences exist, return them
    if (existingPreferences.length > 0) {
      const prefs = existingPreferences[0];
      return NextResponse.json({
        language: prefs.language,
        theme: prefs.theme,
        twoFactorEnabled: prefs.twoFactorEnabled,
      });
    }

    // If preferences don't exist, create default preferences
    const newPreferences = await db
      .insert(userPreferences)
      .values({
        userId,
        language: 'en',
        theme: 'light',
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json({
      language: newPreferences[0].language,
      theme: newPreferences[0].theme,
      twoFactorEnabled: newPreferences[0].twoFactorEnabled,
    });

  } catch (error) {
    console.error('GET preferences error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}