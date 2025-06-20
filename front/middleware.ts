<<<<<<< HEAD
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get NextAuth session token cookie
=======
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/guideProfile", "/touristProfile", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ❗ Only run logic if the path matches one of the protected paths
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  const token =
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value;

<<<<<<< HEAD
  const pathname = request.nextUrl.pathname;

  // Define protected routes you want to guard
  const protectedPaths = ["/guideProfile", "/touristProfile"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // If route is protected and no token found, redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL("/log-in", request.url);
    // Optionally add a redirect back param to return after login
    loginUrl.searchParams.set("from", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Define which paths middleware applies to (optional, but recommended)
export const config = {
  matcher: ["/guideProfile", "/touristProfile"],
};
=======
  if (!token) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
