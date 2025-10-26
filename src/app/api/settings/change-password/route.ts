import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { account, user } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    // Get session using better-auth
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate required fields
    if (!currentPassword) {
      return NextResponse.json({ 
        error: 'Current password is required',
        code: 'MISSING_CURRENT_PASSWORD' 
      }, { status: 400 });
    }

    if (!newPassword) {
      return NextResponse.json({ 
        error: 'New password is required',
        code: 'MISSING_NEW_PASSWORD' 
      }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ 
        error: 'New password must be at least 8 characters',
        code: 'INVALID_PASSWORD_LENGTH' 
      }, { status: 400 });
    }

    // Query account table for credential provider
    const accountRecord = await db.select()
      .from(account)
      .where(
        and(
          eq(account.userId, session.user.id),
          eq(account.providerId, 'credential')
        )
      )
      .limit(1);

    if (accountRecord.length === 0 || !accountRecord[0].password) {
      return NextResponse.json({ 
        error: 'Password authentication not set up',
        code: 'NO_PASSWORD_ACCOUNT' 
      }, { status: 400 });
    }

    const userAccount = accountRecord[0];

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, userAccount.password);

    if (!isValid) {
      return NextResponse.json({ 
        error: 'Current password is incorrect',
        code: 'INVALID_CURRENT_PASSWORD' 
      }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update account with new password
    await db.update(account)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(account.id, userAccount.id));

    return NextResponse.json({ 
      success: true, 
      message: 'Password changed successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('POST /api/settings/change-password error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}