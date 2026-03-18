import { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"
import UserModel from "@/model/User"
import dbConnect from "@/lib/dbConnect"

export const getUserFromRequest = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value

  if (!token) {
    throw new Error("Not authenticated")
  }

  const decoded = verifyToken(token)

  await dbConnect()

  const user = await UserModel.findById(decoded.id)

  if (!user) {
    throw new Error("User not found")
  }

  return user
}