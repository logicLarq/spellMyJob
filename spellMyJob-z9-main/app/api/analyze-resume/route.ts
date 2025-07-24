import { type NextRequest, NextResponse } from "next/server"
import { analyzeResume } from "@/lib/ai-analysis"

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const analysis = await analyzeResume(resumeText)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in resume analysis API:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
