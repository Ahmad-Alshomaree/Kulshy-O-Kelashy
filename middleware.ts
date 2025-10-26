import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Define role-based route access control
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/seller': ['seller', 'admin'],
  '/admin': ['admin'],
  '/account': ['customer', 'seller', 'admin'],
  '/cart': ['customer', 'seller', 'admin'],
  '/checkout': ['customer', 'seller', 'admin'],
  '/wishlist': ['customer', 'seller', 'admin'],
  '/profile': ['customer', 'seller', 'admin'],
  '/settings': ['customer', 'seller', 'admin'],
};

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // If no session, redirect to sign-in
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check role-based access
  const pathname = request.nextUrl.pathname;
  const userRole = session.user?.role || 'customer';

  // Find matching route permission
  for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate page based on role
        if (userRole === 'seller') {
          return NextResponse.redirect(new URL("/seller/dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/account/:path*",
    "/cart",
    "/checkout/:path*",
    "/wishlist",
    "/seller/:path*",
    "/profile",
    "/settings/:path*",
    "/admin/:path*"
  ],
};