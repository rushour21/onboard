import dbConnect from "@/lib/dbConnect";
import ApplicationModel from "@/model/application";
import { getUserFromRequest } from "@/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest){
    await dbConnect()

    try {
        const user = await getUserFromRequest(request)
        const { applicationId, status } = await request.json()

        if(user.role !== "company"){
            return NextResponse.json({
                success: false,
                message: "Only companies can update applications"
            },{
                status: 403
            })
        }
        if(status !== "accepted" && status !== "rejected"){
            return NextResponse.json({
                success: false,
                message: "Invalid status"
            },{
                status: 400
            })
        }

        const application = await ApplicationModel.findByIdAndUpdate(applicationId, {
            status
        })

        if(!application){
            return NextResponse.json({
                success: false,
                message: "Application not found"
            },{
                status: 404
            })
        }

        return NextResponse.json({
            success: true,
            message: "Application updated successfully",
            application
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error in updating application")
        return NextResponse.json({
            success: false,
            message: "Error in updating application"
        },{
            status: 500
        })
    }
}