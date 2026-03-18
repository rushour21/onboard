import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function POST(request: Request){
    await dbConnect()

    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
            },{
                status: 400
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            },{
                status: 404
            })
        }

        const isPasswordValid = await user.validatePassword(password)

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
            token
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

