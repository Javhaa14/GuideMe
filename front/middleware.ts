import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
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
