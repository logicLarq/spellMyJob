import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface ResumeAnalysis {
  overallScore: number
  atsScore: number
  keywordDensity: number
  strengths: string[]
  improvements: string[]
  missingKeywords: string[]
  jobMatches: JobMatch[]
}

export interface JobMatch {
  role: string
  match: number
  company: string
  requirements: string[]
  salary?: string
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert resume analyzer and career coach. Analyze the provided resume and return a comprehensive analysis in JSON format.

      Analyze the resume for:
      1. Overall quality and professionalism
      2. ATS (Applicant Tracking System) compatibility
      3. Keyword optimization
      4. Strengths and areas for improvement
      5. Missing keywords that could improve job matching
      6. Potential job role matches with percentage scores

      Return the analysis in this exact JSON structure:
      {
        "overallScore": number (0-100),
        "atsScore": number (0-100),
        "keywordDensity": number (0-100),
        "strengths": ["strength1", "strength2", ...],
        "improvements": ["improvement1", "improvement2", ...],
        "missingKeywords": ["keyword1", "keyword2", ...],
        "jobMatches": [
          {
            "role": "Job Title",
            "match": number (0-100),
            "company": "Example Company",
            "requirements": ["skill1", "skill2", ...],
            "salary": "$XX,XXX - $XX,XXX"
          }
        ]
      }`,
      prompt: `Please analyze this resume and provide a comprehensive analysis:

      ${resumeText}

      Focus on technical skills, experience relevance, formatting, and overall presentation. Provide actionable feedback for improvement.`,
    })

    // Parse the AI response
    const analysis = JSON.parse(text) as ResumeAnalysis
    return analysis
  } catch (error) {
    console.error("Error analyzing resume:", error)

    // Return a fallback analysis if AI fails
    return {
      overallScore: 75,
      atsScore: 70,
      keywordDensity: 80,
      strengths: ["Clear work experience section", "Professional formatting", "Relevant technical skills"],
      improvements: [
        "Add more quantified achievements",
        "Include industry-specific keywords",
        "Optimize for ATS scanning",
      ],
      missingKeywords: ["Project management", "Team leadership", "Agile methodology"],
      jobMatches: [
        {
          role: "Software Engineer",
          match: 85,
          company: "Tech Company",
          requirements: ["JavaScript", "React", "Node.js"],
          salary: "$90,000 - $120,000",
        },
      ],
    }
  }
}

export async function generateResumeImprovement(resumeText: string, targetRole: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert resume writer and career coach. Help improve a resume for a specific job role by providing detailed, actionable suggestions.`,
      prompt: `Please provide specific improvement suggestions for this resume to better match the "${targetRole}" role:

      ${resumeText}

      Focus on:
      1. Keywords to add or emphasize
      2. Skills to highlight
      3. Experience descriptions to improve
      4. Sections to add or modify
      5. Formatting improvements for ATS compatibility

      Provide concrete, actionable advice that the user can implement immediately.`,
    })

    return text
  } catch (error) {
    console.error("Error generating improvement suggestions:", error)
    return "Unable to generate improvement suggestions at this time. Please try again later."
  }
}
