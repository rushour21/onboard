import dbConnect from "@/lib/dbConnect"
import JobModel from "@/model/job"
import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/utils/authHelper"

export async function GET(request: NextRequest){
    await dbConnect()

    try {
        const user = await getUserFromRequest(request)

        if(user.role !== "company"){
            return NextResponse.json({
                success: false,
                message: "Only companies can get their jobs"
            },{
                status: 403
            })
        }

        const jobs = await JobModel.find({
            postedBy: user._id
        })

        return NextResponse.json({
            success: true,
            message: "Jobs fetched successfully",
            jobs
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error in fetching jobs")
        return NextResponse.json({
            success: false,
            message: "Error in fetching jobs"
        },{
            status: 500
        })
    }
}