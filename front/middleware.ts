import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // List of protected paths
  const protectedPaths = [
    "/Guidedetail",
    "/guideProfile",
    "/Guidesinfo",
    "/notification",
    "/Settings",
    "/Touristdetail",
    "/touristProfile",
    "/Travelersinfo",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL("/log-in", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Guidedetail/:path*",
    "/guideProfile/:path*",
    "/Guidesinfo/:path*",
    "/notification/:path*",
    "/Settings/:path*",
    "/Touristdetail/:path*",
    "/touristProfile/:path*",
    "/Travelersinfo/:path*",
  ],
};
