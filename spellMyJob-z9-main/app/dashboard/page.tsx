"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import jobs from "@data/jobs.json" // Adjust path as needed
import PopupModal from '@/components/PopupModal'; // Adjust path as needed
import NeonCard from "@/components/NeonCard"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Download,
  Eye,
  Settings,
  Bell,
  Zap,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { ProtectedRoute } from "@/components/protected-route"
import { getUserResumes } from "@/lib/resume-storage"
import type { Resume } from "@/lib/resume-storage"

let res = 0

function DashboardContent() {
  const { user, profile, signOut } = useAuth()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserResumes()
    }
  }, [user])

  const loadUserResumes = async () => {
    if (!user) return

    try {
      const userResumes = await getUserResumes(user.uid)
      setResumes(userResumes)
    } catch (error) {
      console.error("Error loading resumes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const jobMatches = [
    { role: "Software Engineer", match: 92, company: "Tech Corp", salary: "$120k-150k" },
    { role: "Full Stack Developer", match: 88, company: "StartupXYZ", salary: "$100k-130k" },
    { role: "Frontend Developer", match: 85, company: "WebCo", salary: "$90k-120k" },
    { role: "Backend Engineer", match: 82, company: "DataTech", salary: "$110k-140k" },
    { role: "DevOps Engineer", match: 78, company: "CloudFirst", salary: "$115k-145k" },
  ]

  const recentActivity = [
    { action: "Resume analyzed", time: "2 hours ago", type: "analysis" },
    { action: "Job match found", time: "1 day ago", type: "match" },
    { action: "Resume uploaded", time: "2 days ago", type: "upload" },
    { action: "Profile updated", time: "1 week ago", type: "profile" },
  ]

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-transparent ">
      {/* Header */}
      <header className="bg-gryffindor-red/10 sticky-header top-0 z-50 backdrop-blur-md">
        <div className="px-20 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center size-max space-x-4">
                
                <img
                  src="/logo.png" // Replace with actual path
                  alt="SpellMyJob Logo"
                  className="h-10 w-auto"
                />

              </Link>
              <Badge className="bg-purple-100 text-gryffindor-gold-500">
                {profile?.plan === "pro" ? "Pro Plan" : "Free Plan"}
              </Badge>
            </div>
            <div className="flex items-center text-white space-x-4">
              <Button onClick={() => setShowNotifications(true)}
                  className="relative p-2 rounded-full hover:bg-white/10 transition"
                  aria-label="Open Notifications" variant="ghost" size="sm" >
                <Bell className="h-4 w-4" />
              </Button>
              <Button onClick={() => setShowNotifications(true)}
                  className="relative p-2 rounded-full hover:bg-white/10 transition"
                  aria-label="Open Notifications" variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
               <PopupModal isOpen={showNotifications} onClose={() => setShowNotifications(false)}>
                <h2 className="text-xl font-semibold mb-2">🔔 Notifications</h2>
                <p className="text-gray-300">Coming soon...</p>
              </PopupModal>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-gryffindor-gold rounded-full flex items-center justify-center text-white text-sm font-medium">
                {profile?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold center-div text-gryffindor-gold mb-2">Welcome back, {profile?.firstName || "User"}!</h1>
          <p className="text-white center-div">Here's your resume optimization dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 center-div">
          <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-transparent text-white hover:text-black backdrop-blur-sm" >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-white font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{res}</div>
              <p className="text-xs text-gryffindor-light ">Uploaded resumes</p>
            </CardContent>
          </Card>

          {/* <Card className="bg-ravenclaw-blue/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-white font-medium">Job Matches</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card> */}
          <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-transparent text-white hover:text-black backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-white font-medium">Job Matches</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobMatches.length}</div>
              <p className="text-xs text-gryffindor-light ">Across all roles</p>
            </CardContent>
          </Card>

          
        </div>

        <Tabs defaultValue="overview" className="space-y-6 ">
          <TabsList className=" bg-transparent center-div  ">
            <TabsTrigger value="overview" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group ">Overview</TabsTrigger>
            <TabsTrigger value="resumes" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group">My Resumes</TabsTrigger>
            <TabsTrigger value="matches" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group">Job Matches</TabsTrigger>
            <TabsTrigger value="analytics" className="hover:bg-transparent  px-3 py-1.5  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="bg-transparent space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <NeonCard>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with your resume optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/dashboard/upload">
                    <Button className="w-full justify-start bg-hufflepuff-yellow hover:bg-ravenclaw-bronze" onClick={() => res++}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Resume
                    </Button>
                  </Link>
                  <Link href="/dashboard/analyze">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Target className="mr-2 h-4 w-4" />
                      Analyze Existing Resume
                    </Button>
                  </Link>
                  <Link href="/dashboard/matches">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="mr-2 h-4 w-4" />
                      Browse Job Matches
                    </Button>
                  </Link>
                </CardContent>
              </NeonCard>

              {/* Recent Activity */}
              <NeonCard>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest resume optimization activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "analysis"
                              ? "bg-green-500"
                              : activity.type === "match"
                                ? "bg-blue-500"
                                : activity.type === "upload"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </NeonCard>
            </div>

            {/* Top Job Matches */}
            <NeonCard>
              <CardHeader>
                <CardTitle>Top Job Matches</CardTitle>
                <CardDescription>Based on your latest resume analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobMatches.slice(0, 3).map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{match.role}</h4>
                        <p className="text-sm text-gray-600">
                          {match.company} • {match.salary}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
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
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/matches">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Matches
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </NeonCard>
          </TabsContent>

          <TabsContent value="resumes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white font-bold">My Resumes</h2>
              <Link href="/dashboard/upload">
                <Button className=" bg-hufflepuff-yellow hover:bg-ravenclaw-bronze">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Resume
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : resumes.length === 0 ? (
              <NeonCard className="hover:scale-100">
                <CardContent className="p-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gryffindor-gold mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No resumes uploaded yet</h3>
                  <p className="text-gray-600 mb-6">Upload your first resume to get started with AI-powered analysis</p>
                  <Link href="/dashboard/upload">
                    <Button className=" bg-hufflepuff-yellow hover:bg-ravenclaw-bronze">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </Link>
                </CardContent>
              </NeonCard>
            ) : (
              <div className="grid gap-6">
                {resumes.map((resume) => (
                  <NeonCard key={resume.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{resume.originalName}</h3>
                            <p className="text-sm text-gray-600">
                              Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={`${
                                  resume.status === "analyzed"
                                    ? "bg-green-100 text-green-700"
                                    : resume.status === "analyzing"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {resume.status}
                              </Badge>
                              {resume.analysis && (
                                <span className="text-sm text-gray-500">
                                  Overall Score: {resume.analysis.overallScore}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Link href="/dashboard/analyze">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Analyze
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </NeonCard>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white font-bold">Job Matches</h2>
              <Button variant="outline" className=" bg-hufflepuff-yellow hover:bg-ravenclaw-bronze"> 
                <Settings className="mr-2 h-4 w-4 " />
                Filter Matches
              </Button>
            </div>

            <div className="grid gap-4">
              {jobMatches.map((match, index) => (
                <NeonCard key={index} className="hover:scale-100">
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
                        <p className="text-gray-600 mb-2">{match.company}</p>
                        <p className="text-sm text-gray-500">{match.salary}</p>
                        <div className="mt-3">
                          <Progress value={match.match} className="w-full max-w-xs" />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className=" bg-hufflepuff-yellow hover:bg-ravenclaw-bronze">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className=" bg-transparent hover:bg-white hover:text-black">
                          Optimize Resume
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </NeonCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Chatbot</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NeonCard className="hover:scale-100">
                <CardHeader>
                  <CardTitle>Match Score Trends</CardTitle>
                  <CardDescription>Your resume performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </NeonCard>

              <NeonCard className="hover:scale-100">
                <CardHeader>
                  <CardTitle>Top Skills</CardTitle>
                  <CardDescription>Most in-demand skills for your roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["JavaScript", "React", "Node.js", "Python", "AWS"].map((skill, index) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={90 - index * 10} className="w-24" />
                          <span className="text-xs text-gray-500">{90 - index * 10}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </NeonCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
