import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  // For demo purposes, middleware only checks for token in the dashboard route
  // In a real application, this should be more robust
  
  if (req.nextUrl.pathname.startsWith('/admin-dashboard')) {
    const token = req.cookies.get('auth_token')?.value;
    
    // If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/about', req.url));
    }
    
    // Verify token (commented out since client-side auth is used in this demo)
    // const isValid = await verifyToken(token);
    // if (!isValid) {
    //   return NextResponse.redirect(new URL('/about', req.url));
    // }
  }
  
  return NextResponse.next();
}

// Only run middleware on the admin dashboard routes
export const config = {
  matcher: '/admin-dashboard/:path*',
};