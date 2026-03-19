import { NextRequest, NextResponse } from "next/server"
import { parsePDF } from "@/lib/parser"
import { analyzeWithLLM } from "@/lib/ai"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const resumeFile = formData.get("resume") as File
    const jdInput = formData.get("jd") as string

    if (!resumeFile) {
      return NextResponse.json(
        { success: false, message: "Resume is required" },
        { status: 400 }
      )
    }

    if (!jdInput || jdInput.length < 100) {
      return NextResponse.json(
        { success: false, message: "Job description too short" },
        { status: 400 }
      )
    }

    // 1. Parse resume
    const resumeText = await parsePDF(resumeFile)

    // 2. LLM analysis (score + suggestions)
    const aiResult = await analyzeWithLLM(resumeText, jdInput)

    return NextResponse.json({
      success: true,
      data: {
        score: aiResult.score || 0,
        suggestions: aiResult.suggestions || {
          improvements: [],
          missingSkills: [],
          rewrittenPoints: [],
        },
      },
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}