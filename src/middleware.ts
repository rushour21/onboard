import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const decoded = verifyToken(token)

    const path = request.nextUrl.pathname

    // company routes protection
    if (path.startsWith("/dashboard/company") && decoded.role !== "company") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    // candidate routes protection
    if (path.startsWith("/dashboard/candidate") && decoded.role !== "candidate") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return NextResponse.next()

  } catch {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
}