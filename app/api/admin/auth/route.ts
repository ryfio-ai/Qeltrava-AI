// app/api/admin/auth/route.ts
// API Route Handler: Admin Auth sessions (Login / Logout)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encryptSession, decryptSession, verifyRateLimit, logFailedAttempt, logSuccessfulAttempt, ADMIN_COOKIE_NAME } from '@/platform/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@qeltrava.ai';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '@QeltravaAI26';

export async function POST(request: Request) {
  const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  try {
    const body = await request.json();

    // Check session validity directly if requested
    if (body.check) {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
      
      console.log('[Auth API Debug] Cookie Header:', request.headers.get('cookie') || '');
      console.log('[Auth API Debug] Parsed Session Cookie:', sessionCookie);
      const decrypted = sessionCookie ? decryptSession(sessionCookie) : null;
      console.log('[Auth API Debug] Decrypted Session:', decrypted);
      
      if (decrypted) {
        return NextResponse.json({ success: true, user: decrypted });
      }
      return NextResponse.json({ success: false, message: 'Session expired.' }, { status: 401 });
    }

    const { email, password } = body;

    // Verify login rate limits
    const rateLimit = verifyRateLimit(ipAddress);
    if (!rateLimit.allowed) {
      const minutes = Math.ceil((rateLimit.remainingLockout || 0) / 60000);
      return NextResponse.json(
        { success: false, message: `Too many failed attempts. Try again in ${minutes} minutes.` },
        { status: 429 }
      );
    }

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields.' }, { status: 400 });
    }

    // Authenticate admin (checking config defaults or custom env vars)
    console.log('[Auth Debug] Received credentials:', { 
      submittedEmail: email, 
      submittedPassword: password, 
      expectedEmail: ADMIN_EMAIL, 
      expectedPassword: ADMIN_PASSWORD 
    });
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      logSuccessfulAttempt(ipAddress);

      const payload = {
        userId: 'admin-super-id',
        email: email,
        role: 'Super Admin',
        workspaceId: 'ws-qeltrava-ai', // default active workspace
        createdAt: Date.now()
      };

      const token = encryptSession(payload);
      
      const host = request.headers.get('host') || '';
      const isLocal = host.includes('localhost') || host.includes('127.0.0.1');

      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: isLocal ? false : (process.env.NODE_ENV === 'production'),
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });

      return NextResponse.json({
        success: true,
        user: { email: payload.email, role: payload.role, workspaceId: payload.workspaceId }
      });
    }

    // Fail case
    logFailedAttempt(ipAddress);
    return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Logged out successfully.' });
}
