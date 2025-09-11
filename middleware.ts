// middleware.ts


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/sign-in', '/sign-up', '/', '/api'];
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if ((pathname === '/sign-in' || pathname === '/sign-up') && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};