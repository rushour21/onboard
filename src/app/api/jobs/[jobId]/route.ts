import dbConnect from "@/lib/dbConnect"
import JobModel from "@/model/job"
import ApplicationModel from "@/model/application"
import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/utils/authHelper"


export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  await dbConnect()

  try {
    const { jobId } = params

    let userId: string | null = null

    // Try to get user
    try {
      const user = await getUserFromRequest(request)
      userId = user._id.toString()
    } catch {
      userId = null
    }

    const job = await JobModel.findById(jobId)

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found"
        },
        { status: 404 }
      )
    }

    let isApplied = false

    // Check application only if user exists
    if (userId) {
      const application = await ApplicationModel.findOne({
        jobId,
        userId
      })

      isApplied = !!application
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job fetched successfully",
        job,
        isApplied
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error in fetching job")

    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching job"
      },
      { status: 500 }
    )
  }
}

export async function UPDATE(request: NextRequest, { params }: { params: { jobId: string } }){ 
    await dbConnect()

    try {

        const user = await getUserFromRequest(request)

        if(user.role !== "company"){
            return NextResponse.json({
                success: false,
                message: "Only companies can update jobs"
            },{
                status: 403
            })
        }
        const {jobId} = params
        const { title, description, requirements, responsibilities, location, salary, jobType, experience, skills, organization, assessmentDescription, assessmentDueDate} = await request.json()

        const job = await JobModel.findByIdAndUpdate(jobId, {
            title,
            description,
            requirements,
            responsibilities,
            location,
            salary,
            jobType,
            experience,
            skills,
            organization,
            assessmentDescription,
            assessmentDueDate
        })

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
            message: "Job updated successfully",
            job
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error in updating job")
        return NextResponse.json({
            success: false,
            message: "Error in updating job"
        },{
            status: 500
        })
    }
}
    
export async function DELETE(request: NextRequest, { params }: { params: { jobId: string } }){
    await dbConnect()

    try {
        const {jobId} = params
        const user = await getUserFromRequest(request)

        if(user.role !== "company"){
            return NextResponse.json({
                success: false,
                message: "Only companies can delete jobs"
            },{
                status: 403
            })
        }

        const job = await JobModel.findByIdAndDelete(jobId)

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