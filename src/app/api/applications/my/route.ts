import dbConnect from "@/lib/dbConnect";
import ApplicationModel from "@/model/application";
import { getUserFromRequest } from "@/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    await dbConnect()

    try {
        const user = await getUserFromRequest(request)

        if(user.role !== "candidate"){
            return NextResponse.json({
                success: false,
                message: "Only candidates can get their applications"
            },{
                status: 403
            })
        }

        const applications = await ApplicationModel.find({
            userId: user._id
        }).populate("jobId", "title organization location")

        return NextResponse.json({
            success: true,
            message: "Applications fetched successfully",
            applications
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error in fetching applications")
        return NextResponse.json({
            success: false,
            message: "Error in fetching applications"
        },{
            status: 500
        })
    }
}
