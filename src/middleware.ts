import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export function middleware(request: NextRequest) {
  // Middleware route protection/redirects intentionally disabled.
  // Login-based redirects are handled client-side after successful auth.
  void request
  return NextResponse.next()
}

export const config = {
  // Empty matcher disables middleware for all routes.
  matcher: []
}