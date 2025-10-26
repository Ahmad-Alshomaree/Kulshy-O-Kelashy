import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get session using better-auth
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

    // Parse request body
    const body = await request.json();
    const { theme } = body;

    // Validate theme presence and type
    if (!theme || typeof theme !== 'string' || theme.trim() === '') {
      return NextResponse.json(
        {
          error: 'Valid theme is required',
          code: 'INVALID_THEME'
        },
        { status: 400 }
      );
    }

    // Validate theme value
    const validThemes = ['light', 'dark', 'system'];
    const sanitizedTheme = theme.trim();

    if (!validThemes.includes(sanitizedTheme)) {
      return NextResponse.json(
        {
          error: 'Theme must be light, dark, or system',
          code: 'INVALID_THEME_VALUE'
        },
        { status: 400 }
      );
    }

    // Check if user preferences exist
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
          theme: sanitizedTheme,
          updatedAt: new Date().toISOString()
        })
        .where(eq(userPreferences.userId, session.user.id));
    } else {
      // Insert new preferences
      await db.insert(userPreferences).values({
        userId: session.user.id,
        language: 'en',
        theme: sanitizedTheme,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json(
      {
        success: true,
        theme: sanitizedTheme
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('POST /api/settings/theme error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}