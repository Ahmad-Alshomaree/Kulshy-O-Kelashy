import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get session
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
    const { language } = body;

    // Validate language field
    if (!language || typeof language !== 'string' || language.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid language code is required',
          code: 'INVALID_LANGUAGE' 
        },
        { status: 400 }
      );
    }

    // Sanitize language input
    const sanitizedLanguage = language.trim().toLowerCase();

    // Query existing user preferences
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
          language: sanitizedLanguage,
          updatedAt: new Date().toISOString()
        })
        .where(eq(userPreferences.userId, session.user.id));
    } else {
      // Create new preferences
      await db
        .insert(userPreferences)
        .values({
          userId: session.user.id,
          language: sanitizedLanguage,
          theme: 'light',
          twoFactorEnabled: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        language: sanitizedLanguage 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('POST /api/settings/language error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}