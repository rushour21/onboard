import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/utils/authHelper"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    return NextResponse.json(
      {
        success: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization
        }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    )
  }
}

