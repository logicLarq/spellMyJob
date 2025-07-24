"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">SpellMyJob</span>
              </Link>
              <Badge className="bg-purple-100 text-purple-700">
                {profile?.plan === "pro" ? "Pro Plan" : "Free Plan"}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {profile?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile?.firstName || "User"}!</h1>
          <p className="text-gray-600">Here's your resume optimization dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resumes Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
              <p className="text-xs text-muted-foreground">Total uploaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+12% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="matches">Job Matches</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with your resume optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/dashboard/upload">
                    <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
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
              </Card>

              {/* Recent Activity */}
              <Card>
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
              </Card>
            </div>

            {/* Top Job Matches */}
            <Card>
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
            </Card>
          </TabsContent>

          <TabsContent value="resumes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Resumes</h2>
              <Link href="/dashboard/upload">
                <Button className="bg-purple-600 hover:bg-purple-700">
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
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes uploaded yet</h3>
                  <p className="text-gray-600 mb-6">Upload your first resume to get started with AI-powered analysis</p>
                  <Link href="/dashboard/upload">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id}>
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
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Job Matches</h2>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Filter Matches
              </Button>
            </div>

            <div className="grid gap-4">
              {jobMatches.map((match, index) => (
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
                        <p className="text-gray-600 mb-2">{match.company}</p>
                        <p className="text-sm text-gray-500">{match.salary}</p>
                        <div className="mt-3">
                          <Progress value={match.match} className="w-full max-w-xs" />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Optimize Resume
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Match Score Trends</CardTitle>
                  <CardDescription>Your resume performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>

              <Card>
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
              </Card>
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
