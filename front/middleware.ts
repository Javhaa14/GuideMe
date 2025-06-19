import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/guideProfile", "/touristProfile", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ❗ Only run logic if the path matches one of the protected paths
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token =
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}
