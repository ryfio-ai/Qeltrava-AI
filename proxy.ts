import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';

const handleRequest = createMiddleware(routing);

export default handleRequest;
export const proxy = handleRequest;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|de|fr|pt-BR|ar)/:path*']
};
