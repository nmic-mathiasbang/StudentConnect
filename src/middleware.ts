import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Check if the user is accessing dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // For now, we'll let the client-side authentication handle the redirect
    // This middleware could be enhanced to check server-side authentication
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};