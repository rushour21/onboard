import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"
import {NextResponse} from "next/server"
import { signUpSchema } from "@/schemas/signUpSchema"


export async function POST(request: Request){
    await dbConnect()

    try {

        const result = signUpSchema.safeParse(await request.json())

        if(!result.success){
            return NextResponse.json({
                success: false,
                message: "Invalid request"
            },{
                status: 400
            })
        }
        
        const {name, email, password, organization, role} = result.data

        
        const existingUser = await UserModel.findOne({ email, role });
        if (existingUser) {
        return NextResponse.json(
            { success: false, message: "User already exists" },
            { status: 400 }
        );
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
            organization: role === "company" ? organization : undefined,
        })

        await newUser.save();
        return NextResponse.json(
            { success: true, message: "User registered successfully" },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Error in registering user")
        return NextResponse.json(
            {success: false, message: "Error in registering user"},
            {status: 500}
        )
    }
}