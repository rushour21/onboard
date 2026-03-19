import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextResponse } from "next/server"
import { logInSchema } from "@/schemas/logInSchema"


export async function POST(request: Request){
    await dbConnect()

    try {

        const result = logInSchema.safeParse(await request.json())

        if(!result.success){
            return NextResponse.json({
                success: false,
                message: "Invalid request"
            },{
                status: 400
            })
        }

        const {email, password} = result.data

        const user = await UserModel.findOne({email})

        console.log("Login attempt for:", email)
        console.log("User found:", !!user)

        if(!user){
            console.log("User not found with email:", email)
            return NextResponse.json({
                success: false,
                message: "User not found"
            },{
                status: 404
            })
        }

        const isPasswordValid = await user.validatePassword(password)

        console.log("Password valid:", isPasswordValid)

        if(!isPasswordValid){
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            },{
                status: 401
            })
        }

        const token = user.generateToken()

        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully",
            token,
            role: user.role
        },{
            status: 200
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7
        })

        return response
    } catch (error) {
        console.error("Error in logging in user")
        return NextResponse.json({
            success: false,
            message: "Error in logging in user"
        },{
            status: 500
        })
    }
}

