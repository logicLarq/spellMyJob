"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Lightbulb, Download, Share, RefreshCw } from "lucide-react"
import Link from "next/link"
import axios from "axios"

export default function AnalyzePage() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const jsonFile = localStorage.getItem("uploadedJson")
    if (!jsonFile) {
      setError("No resume uploaded. Please upload a resume first.")
      setIsAnalyzing(false)
      return
    }

    // Start analysis
    axios.post("http://127.0.0.1:8000/analyze/", { file: jsonFile })
      .then(() => {
        // Poll for status
        const poll = setInterval(() => {
          axios.get(`http://127.0.0.1:8000/analyze/status?file=${jsonFile}`)
            .then(res => {
              setAnalysisProgress(res.data.progress || 0)
              if (res.data.complete) {
                setIsAnalyzing(false)
                setAnalysisComplete(true)
                setAnalysisResults(res.data.results)
                clearInterval(poll)
              }
            })
            .catch(() => {
              setError("Failed to fetch analysis status.")
              setIsAnalyzing(false)
              clearInterval(poll)
            })
        }, 1000)
        return () => clearInterval(poll)
      })
      .catch(() => {
        setError("Failed to start analysis.")
        setIsAnalyzing(false)
      })
  }, [])

  // UI for error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
          <p className="mb-4">{error}</p>
          <Link href="/dashboard/upload">
            <Button>Go to Upload</Button>
          </Link>
        </div>
      </div>
    )
  }

  // UI for progress
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold text-gray-900">SpellMyJob</span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="h-8 w-8 text-purple-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Resume</h2>
                <p className="text-gray-600 mb-8">
                  Our AI is analyzing your resume content, structure, and matching it against job market data...
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Analysis Progress</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>

                <div className="mt-8 text-left">
                  <h3 className="font-semibold mb-4">What we're analyzing:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resume structure and formatting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Keyword optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>ATS compatibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 text-purple-500 animate-spin" />
                      <span>Job role matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                      <span>Improvement suggestions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // UI for results
  if (analysisComplete && analysisResults) {
    // If backend returned an error, show it
    if (analysisResults.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">Analysis Error</h2>
            <p className="mb-4">{analysisResults.error}</p>
            <Link href="/dashboard/upload">
              <Button>Go to Upload</Button>
            </Link>
          </div>
        </div>
      )
    }
    // Use backend-provided fields, fallback to empty/defaults if missing
    const results = {
      overallScore: analysisResults.overallScore ?? 0,
      sections: Array.isArray(analysisResults.sections) ? analysisResults.sections : [],
      strengths: Array.isArray(analysisResults.strengths) ? analysisResults.strengths : [],
      improvements: Array.isArray(analysisResults.improvements) ? analysisResults.improvements : [],
      missingKeywords: Array.isArray(analysisResults.missingKeywords) ? analysisResults.missingKeywords : [],
      jobMatches: Array.isArray(analysisResults.jobMatches) ? analysisResults.jobMatches : [],
    }
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-purple-600" />
                  <span className="text-xl font-bold text-gray-900">SpellMyJob</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis Results</h1>
              <p className="text-gray-600">Comprehensive analysis of your resume with actionable insights</p>
            </div>

            {/* Overall Score Card - Centered */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-xs">
                <Card className="border-2">
                  <CardHeader className="text-center">
                    <CardTitle className="text-sm font-medium text-gray-600">Overall Score</CardTitle>
                    <div className="text-4xl font-bold text-purple-600">{results.overallScore}%</div>
                    <Badge className="bg-purple-100 text-purple-700">{results.overallScore >= 80 ? "Excellent" : results.overallScore >= 60 ? "Good" : "Needs Improvement"}</Badge>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sections">Section Analysis</TabsTrigger>
                <TabsTrigger value="matches">Job Matches</TabsTrigger>
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Strengths</span>
                      </CardTitle>
                      <CardDescription>What your resume does well</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span>Quick Wins</span>
                      </CardTitle>
                      <CardDescription>Easy improvements for immediate impact</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Missing Keywords</CardTitle>
                    <CardDescription>Add these keywords to improve your match rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sections" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Section-by-Section Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of each resume section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {results.sections.map((section: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                section.status === "excellent"
                                  ? "bg-green-500"
                                  : section.status === "good"
                                    ? "bg-blue-500"
                                    : "bg-yellow-500"
                              }`}
                            />
                            <div>
                              <h4 className="font-semibold">{section.name}</h4>
                              <p className="text-sm text-gray-600 capitalize">{section.status?.replace("-", " ")}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold">{section.score}%</div>
                            </div>
                            <div className="w-24">
                              <Progress value={section.score} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="matches" className="space-y-6">
                <div className="grid gap-6">
                  {results.jobMatches.map((match: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">{match.role}</h3>
                              <Badge
                                className={`${
                                  match.match >= 90
                                    ? "bg-green-100 text-green-700"
                                    : match.match >= 80
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {match.match}% Match
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{match.company}</p>
                            <div className="flex flex-wrap gap-2">
                              {match.requirements?.map((req: string, reqIndex: number) => (
                                <Badge key={reqIndex} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-6">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Optimize for Role
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="improvements" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Priority Improvements</CardTitle>
                      <CardDescription>High-impact changes to make first</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-red-800">Critical</h4>
                              <p className="text-sm text-red-700">Add contact information section</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800">High Priority</h4>
                              <p className="text-sm text-yellow-700">Optimize keyword density for ATS</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-blue-800">Medium Priority</h4>
                              <p className="text-sm text-blue-700">Add quantified achievements</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Suggestions</CardTitle>
                      <CardDescription>Personalized recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Professional Summary</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Consider adding a brief professional summary at the top of your resume.
                          </p>
                          <Button size="sm" variant="outline">
                            Generate Summary
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Skills Section</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Reorganize your skills by relevance to target roles.
                          </p>
                          <Button size="sm" variant="outline">
                            Optimize Skills
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Work Experience</h4>
                          <p className="text-sm text-gray-600 mb-2">Add more action verbs and quantified results.</p>
                          <Button size="sm" variant="outline">
                            Enhance Experience
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  // Fallback UI
  return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>
}
