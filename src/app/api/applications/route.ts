import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import ApplicationModel from "@/model/application"
import JobModel from "@/model/job"
import { getUserFromRequest } from "@/utils/authHelper"
import { applicationSchema } from "@/schemas/applicationSchema"
import mongoose from "mongoose"

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    // Get user
    const user = await getUserFromRequest(request)

    // Only candidate can apply
    if (user.role !== "candidate") {
      return NextResponse.json(
        { success: false, message: "Only candidates can apply" },
        { status: 403 }
      )
    }

    // 📦 2. Validate input
    const body = await request.json()
    const result = applicationSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message
        },
        { status: 400 }
      )
    }

    const data = result.data

    const jobId = new mongoose.Types.ObjectId(data.jobId)
    const userId = user._id

    // 🔍 3. Check job exists
    const job = await JobModel.findById(jobId)

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      )
    }

    // ❌ 4. Prevent duplicate apply
    const existing = await ApplicationModel.findOne({
      jobId,
      userId
    })

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Already applied to this job" },
        { status: 400 }
      )
    }

    // 🧾 5. Create application
    const application = await ApplicationModel.create({
      jobId,
      userId,
      githubLink: data.githubLink,
      linkedinLink: data.linkedinLink,
      resumeLink: data.resumeLink,
      coverLetter: data.coverLetter,
      projectExplanation: data.projectExplanation,
      techStack: data.techStack
    })

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        application
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Error in applying job", error)

    return NextResponse.json(
      { success: false, message: "Error applying job" },
      { status: 500 }
    )
  }
}
