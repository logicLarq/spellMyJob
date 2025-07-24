import { type NextRequest, NextResponse } from "next/server"
import { uploadResumeFile, saveResumeMetadata } from "@/lib/resume-storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string

    if (!file || !userId) {
      return NextResponse.json({ error: "File and userId are required" }, { status: 400 })
    }

    // Upload file to Firebase Storage
    const fileUrl = await uploadResumeFile(file, userId)

    // Save metadata to Firestore
    const resumeId = await saveResumeMetadata({
      userId,
      fileName: `${Date.now()}_${file.name}`,
      originalName: file.name,
      fileUrl,
      uploadDate: new Date(),
      status: "uploaded",
      fileSize: file.size,
      fileType: file.type,
    })

    return NextResponse.json({
      success: true,
      resumeId,
      fileUrl,
      message: "Resume uploaded successfully",
    })
  } catch (error) {
    console.error("Error uploading resume:", error)
    return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 })
  }
}
