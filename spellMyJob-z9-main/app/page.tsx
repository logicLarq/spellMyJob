import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Target, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">SpellMyJob</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">
              Reviews
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100">
            ✨ AI-Powered Resume Optimization
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Resume Into a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              Job-Winning Machine
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Upload your resume and watch our AI analyze, match, and optimize it for any job role. Get ATS-friendly
            suggestions, keyword optimization, and role-specific improvements in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
                Start Free Analysis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Land Your Dream Job</h2>
            <p className="text-xl text-gray-600">Powered by advanced AI and industry expertise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Smart Job Matching</CardTitle>
                <CardDescription>
                  AI analyzes your resume against thousands of job roles and provides match scores with detailed
                  explanations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>ATS Optimization</CardTitle>
                <CardDescription>
                  Ensure your resume passes Applicant Tracking Systems with keyword optimization and formatting
                  suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Role-Specific Improvements</CardTitle>
                <CardDescription>
                  Get tailored suggestions to optimize your resume for specific job roles and industries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">How SpellMyJob Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload Your Resume</h4>
                    <p className="text-gray-600">Simply drag and drop your resume in any format (PDF, DOC, DOCX)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                    <p className="text-gray-600">Our MCP server analyzes your resume against job market data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Optimized Results</h4>
                    <p className="text-gray-600">
                      Receive job matches, improvement suggestions, and optimized versions
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Resume Analysis</h4>
                  <Badge className="bg-green-100 text-green-700">92% Match</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Software Engineer</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Product Manager</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Job Seekers Worldwide</h2>
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-lg font-semibold ml-2">4.9/5 from 10,000+ users</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer",
                content:
                  "SpellMyJob helped me optimize my resume for tech roles. I got 3x more interviews and landed my dream job at a FAANG company!",
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Marcus Johnson",
                role: "Marketing Manager",
                content:
                  "The AI suggestions were spot-on. My resume went from generic to role-specific, and I saw immediate results in my job applications.",
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Emily Rodriguez",
                role: "Data Scientist",
                content:
                  "The job matching feature is incredible. It showed me roles I never considered and helped me pivot my career successfully.",
                avatar: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who've already optimized their resumes with SpellMyJob
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              Start Your Free Analysis Now
            </Button>
          </Link>
          <p className="text-purple-200 mt-4 text-sm">No credit card required • Get results in under 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">SpellMyJob</span>
              </div>
              <p className="text-gray-400">AI-powered resume optimization for the modern job seeker.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SpellMyJob. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
