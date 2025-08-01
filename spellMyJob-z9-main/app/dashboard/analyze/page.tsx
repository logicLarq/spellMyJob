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
import NeonCard from "@/components/NeonCard"

export default function AnalyzePage() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "user", text: "Coming soon......" },
    { role: "ai", text: "Coming soon......" }
  ])
  const [isChatLoading] = useState(false)
  const [chatError] = useState<string | null>(null)

  // Chat is hardcoded to "Coming soon......"
  const handleSendMessage = () => {}

  useEffect(() => {
    const jsonFile = localStorage.getItem("uploadedJson")
    if (!jsonFile) {
      setError("No resume uploaded. Please upload a resume first.")
      setIsAnalyzing(false)
      return
    }

    
    // Start analysis
    axios.post("https://spellmyjob.onrender.com/analyze/", { file: jsonFile })
      .then(() => {
        // Poll for status
        const poll = setInterval(() => {
          axios.get(`https://spellmyjob.onrender.com/analyze/status?file=${jsonFile}`)
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

  const sendMessageToChatbot = async (message: string) => {
  const jsonFile = localStorage.getItem("uploadedJson");
  if (!jsonFile) {
    throw new Error("No resume uploaded. Please upload a resume first.");
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/chat/", {
      file: jsonFile,
      message: message,
    });

    return response.data.response;
  } catch (error) {
    throw new Error("Failed to get response from chatbot.");
  }
};




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
      <div className="min-h-screen bg-transparent">
        <header className="bg-transparent ">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:text-gryffindor-light">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center size-max space-x-4">
                
                  <img
                    src="/logo.png" // Replace with actual path
                    alt="SpellMyJob Logo"
                    className="h-10 w-auto"
                  />

                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <NeonCard className="border-2">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="h-8 w-8 text-gryffindor-gold animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gryffindor-light mb-4">Analyzing Your Resume</h2>
                <p className="text-white mb-8">
                  Our AI is analyzing your resume content, structure, and matching it against job market data...
                </p>

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
                      <RefreshCw className="h-4 w-4 text-gryffindor-gold animate-spin" />
                      <span>Job role matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                      <span>Improvement suggestions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </NeonCard>
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
      <div className="min-h-screen bg-transparent">
        <header className="bg-trabsparent">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:text-gryffindor-light">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link href="/" className="flex items-center size-max space-x-4">
                
                    <img
                      src="/logo.png" // Replace with actual path
                      alt="SpellMyJob Logo"
                      className="h-10 w-auto"
                    />

                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-8xl center-div font-bold text-gryffindor-gold mb-2">Resume Analysis Results</h1>
              <p className="text-white center-div">Comprehensive analysis of your resume with actionable insights</p>
            </div>

            {/* Overall Score Card - Centered */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-xs">
                <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-sm font-medium text-gray-600">Overall Score</CardTitle>
                    <div className="text-4xl font-bold text-gryffindor-light">{results.overallScore}%</div>
                    <Badge className="bg-transparent border-black text-black text-center hover:bg-gryffindor-light/30">{results.overallScore >= 80 ? "Excellent" : results.overallScore >= 60 ? "Good" : "Needs Improvement"}</Badge>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full bg-transparent center-div grid-cols-4">
                <TabsTrigger value="overview" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group ">Overview</TabsTrigger>
                <TabsTrigger value="sections" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group ">ChatBot</TabsTrigger>
                <TabsTrigger value="improvements" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group ">Improvements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-transparent text-white hover:text-black backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Strengths</span>
                      </CardTitle>
                      <CardDescription className="text-gryffindor-light">What your resume does well</CardDescription>
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

                  <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-transparent text-white hover:text-black backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-white" />
                        <span>Quick Wins</span>
                      </CardTitle>
                      <CardDescription className="text-gryffindor-light">Easy improvements for immediate impact</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-6">
                <NeonCard className="border-2 hover:scale-105">
                  <CardHeader>
                    <CardTitle>AI Resume Chatbot</CardTitle>
                    <CardDescription>Ask anything about your resume — our AI will help!</CardDescription>
                  </CardHeader>
                  <CardContent >
                    <div className="space-y-4">
                      <div className="h-64 overflow-y-auto p-4 border-gryffindor-gold rounded-lg bg-transparent space-y-2" id="chat-window">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`text-sm p-2 rounded-md max-w-sm ${
                              msg.role === "user"
                                ? "bg-gryffindor-gold/30 text-black ml-auto"
                                : "bg-gryffindor-light/30 text-black-800 mr-auto"
                            }`}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Ask something like 'What are my strengths?'"
                          className="flex-1 border rounded p-2 text-sm"
                        />
                        <Button className="bg-gryffindor-gold hover:bg-ravenclaw-bronze" disabled={isChatLoading}>
                          {isChatLoading ? "..." : "Send"}
                        </Button>
                      </div>
                      {chatError && <p className="text-red-600 text-sm">{chatError}</p>}
                    </div>
                  </CardContent>
                </NeonCard>
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
