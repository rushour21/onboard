import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"


export async function POST(request: Request){
    await dbConnect()

    try {
        const {name, email, password, organization, role} = await request.json()

         // 1. Validate role
        if (!["candidate", "company"].includes(role)) {
        return Response.json(
            { success: false, message: "Invalid role" },
            { status: 400 }
        );
        }

        // 2. Validate required fields
        if (!name || !email || !password) {
        return Response.json(
            { success: false, message: "Missing required fields" },
            { status: 400 }
        );
        }

        if (role === "company" && !organization) {
        return Response.json(
            { success: false, message: "Organization is required for companies" },
            { status: 400 }
        );
        }

        
        const existingUser = await UserModel.findOne({ email, role });
        if (existingUser) {
        return Response.json(
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
        return Response.json(
            { success: true, message: "User registered successfully" },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Error in registering user")
        return Response.json(
            {success: false, message: "Error in registering user"},
            {status: 500}
        )
    }
}