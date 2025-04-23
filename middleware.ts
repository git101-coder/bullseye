import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  const path = request.nextUrl.pathname

  // Protected routes
  if (path.startsWith("/dashboard") || path.startsWith("/payment")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Redirect authenticated users from auth pages
  if ((path === "/" || path === "/signup") && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard", "/payment", "/signup"],
}
