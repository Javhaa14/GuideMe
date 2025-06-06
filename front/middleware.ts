import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("Middleware - pathname:", request.nextUrl.pathname);
  console.log("Middleware - token:", token);

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

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set(
      "from",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
