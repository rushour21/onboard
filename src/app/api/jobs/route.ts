import dbConnect from "@/lib/dbConnect"
import JobModel from "@/model/job"
import { NextRequest, NextResponse } from "next/server"
import { addJobSchema } from "@/schemas/addJobSchema"
import { getUserFromRequest } from "@/utils/authHelper"

export async function GET(request: NextRequest){
    await dbConnect()

    try {
        const jobs = await JobModel.find({
            status: "open"
        }).select("title organization location postedBy jobType salary")

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

export async function POST(request: NextRequest){
    await dbConnect()

    try {
        const user = await getUserFromRequest(request)
        if (user.role !== "company") {
          return NextResponse.json(
            { success: false, message: "Only companies can create jobs" },
            { status: 403 }
          )
        }

        const result = addJobSchema.safeParse(await request.json())

        if(!result.success){
            return NextResponse.json({
                success: false,
                message: result.error.issues[0]?.message || "Invalid request"
            },{
                status: 400
            })
        }

        const {title, description, requirements, responsibilities, location, salary, jobType, experience, skills, organization, assessmentDescription, assessmentDueDate} = result.data

        const newJob = new JobModel({
            title,
            description,
            requirements,
            responsibilities,
            location,
            salary,
            jobType,
            experience,
            skills,
            organization: organization || user.organization || user.name,
            assessmentDescription,
            assessmentDueDate,
            postedBy: user._id
        })

        await newJob.save()

        return NextResponse.json({
            success: true,
            message: "Job created successfully",
            job: newJob
        },{
            status: 201
        })
    } catch (error) {
        console.error("Error in creating job")
        return NextResponse.json({
            success: false,
            message: "Error in creating job"
        },{
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest){
    await dbConnect()

    try {
        const user = await getUserFromRequest(request)
        if (user.role !== "company") {
          return NextResponse.json(
            { success: false, message: "Only companies can delete jobs" },
            { status: 403 }
          )
        }

        const {jobId} = await request.json()

        const job = await JobModel.findOneAndDelete({ _id: jobId, postedBy: user._id })

        if(!job){
            return NextResponse.json({
                success: false,
                message: "Job not found"
            },{
                status: 404
            })
        }

        return NextResponse.json({
            success: true,
            message: "Job deleted successfully",
            job
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error in deleting job")
        return NextResponse.json({
            success: false,
            message: "Error in deleting job"
        },{
            status: 500
        })
    }
}