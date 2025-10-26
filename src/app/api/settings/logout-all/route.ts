import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { session } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get current session using better-auth
    const currentSession = await auth.api.getSession({ 
      headers: await headers() 
    });

    // Check if session exists and has user
    if (!currentSession || !currentSession.user) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Extract userId from session
    const userId = currentSession.user.id;

    // Delete all sessions for this user
    await db.delete(session)
      .where(eq(session.userId, userId));

    return NextResponse.json({ 
      success: true,
      message: 'Logged out from all devices' 
    }, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}