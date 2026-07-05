// proxy.ts
// Qeltrava OS Gateway Proxy: Manages next-intl routing and intercepts administrative sessions

import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptSession, ADMIN_COOKIE_NAME } from './platform/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Intercept admin paths (e.g. /admin, /en/admin, /de/admin/jobs) but ignore login page
  const adminMatch = pathname.match(/^\/(?:[a-z]{2}(?:-[A-Z]{2})?)?\/admin(?:\/|$)/);
  const isLoginPage = pathname.match(/^\/(?:[a-z]{2}(?:-[A-Z]{2})?)?\/admin\/login(?:\/|$)/);

  if (adminMatch && !isLoginPage) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = sessionCookie ? decryptSession(sessionCookie) : null;

    if (!session) {
      // Redirect unauthenticated requests to login
      const localeMatch = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
      const locale = localeMatch ? localeMatch[1] : 'en';
      
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle public internationalized routing
  return intlMiddleware(request);
}

export const proxy = middleware;

export const config = {
  // Match only internationalized pathnames + admin route wildcards
  matcher: ['/', '/(en|es|de|fr|pt-BR|ar)/:path*', '/admin/:path*']
};
