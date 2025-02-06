import { NextResponse } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Auth0 Middleware
const authMiddleware = withMiddlewareAuthRequired();

// next-intl Middleware
const intlMiddleware = createMiddleware(routing);

export const config = {
    matcher: [
        '/users', // Auth-geschützter Pfad
        '/', // Root Pfad mit /de oder /en
        '/(de|en)/:path*' // Internationalisierte Pfade mit /de oder /en
    ]
};

export default async function middleware(request) {
    const { pathname } = request.nextUrl;
  
    // 1. Auth0 Middleware nur für '/users'
    if (pathname.includes('/users')) {
      return authMiddleware(request);
    }
  
    // 2. Next-Intl Middleware für internationalisierte Routen
    return intlMiddleware(request);
}