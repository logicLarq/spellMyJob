import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Target, TrendingUp, Star, Sparkles, Wand2, BookOpen, Crown } from "lucide-react"
import Link from "next/link"
import { MagicalLogo } from "@/components/magical-logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Background Effects */}
      <div className="absolute inset-0 bg-magical-glow opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gryffindor-red/10 rounded-full blur-xl animate-spell-glow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-slytherin-green/10 rounded-full blur-xl animate-spell-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-ravenclaw-blue/10 rounded-full blur-lg animate-spell-glow" style={{ animationDelay: '2s' }}></div>
      
      {/* Header */}
      <header className="sticky-header top-0 z-50 ">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          <MagicalLogo size="lg" logoImage="/logo.png" logoAlt="SpellMyJob Logo" />
          <div className="flex-1" />
          <nav className="flex items-center space-x-10 text-lg text-white font-semibold">
            <a href="#features" className="px-4 py-2 rounded-lg hover:bg-gryffindor-red/8 hover:text-gryffindor-red transition-colors">
              Magical Features
            </a>
            <a href="#pricing" className="px-4 py-2 rounded-lg hover:bg-slytherin-green/10 hover:text-slytherin-green transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="px-4 py-2 rounded-lg hover:bg-ravenclaw-blue/10 hover:text-ravenclaw-blue transition-colors">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center space-x-6 ml-6">
            
            <Link href="/auth/signin">
              <Button size="lg" className=" bg-gradient-to-r from-gryffindor-red to-gryffindor-gold hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  text-white text-lg">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-to-r from-gryffindor-red to-gryffindor-gold text-white hover:from-gryffindor-light hover:to-gryffindor-gold">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Resume Enchantment
          </Badge>
          <h1 className="text-5xl md:text-6xl font-magical font-bold text-white mb-6 leading-tight">
            Transform Your Resume With
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gryffindor-red via-slytherin-green to-ravenclaw-blue">
              {" "}
              Magical Precision
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed font-crimson">
            Cast the perfect spell on your career! Upload your resume and watch our AI wizardry analyze, match, and optimize it for any magical position. 
            Get ATS-friendly enchantments, keyword optimization, and role-specific improvements in the blink of an eye.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signin">
              <Button size="lg" className=" bg-gradient-to-r from-gryffindor-red to-gryffindor-gold hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  text-white text-lg ">
                <Wand2 className="w-5 h-5 mr-2" />
                Start Free Enchantment
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-gryffindor-red" />
              <span>Free to begin</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-slytherin-green" />
              <span>No magical credit required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-ravenclaw-blue" />
              <span>Instant enchantments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-0 relative z-10">
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <img src="/feature-bg.png" alt="Features Background" className="w-full h-full object-cover object-center" style={{ zIndex: 0 }} />
        </div>
        <div className="container mx-auto w-full max-w-none px-0 relative z-10">
          <div className="text-center mb-16 px-4 md:px-12 ">
            <h2 className="text-4xl font-magical font-bold text-white mb-4 drop-shadow-lg">Everything You Need to Land Your Dream Position</h2>
            <p className="text-xl text-white font-crimson drop-shadow">Powered by advanced AI wizardry and magical expertise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-4 md:px-12 mt-80">
            <Card className="border-2 border-amber-200 hover:border-gryffindor-red hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-gryffindor-red to-gryffindor-gold rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-magical">Smart Job Matching</CardTitle>
                <CardDescription className="font-crimson">
                  AI analyzes your resume against thousands of magical positions and provides match scores with detailed
                  explanations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-slytherin-green to-slytherin-silver rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-magical">ATS Optimization</CardTitle>
                <CardDescription className="font-crimson">
                  Ensure your resume passes through Applicant Tracking Systems with our intelligent formatting and keyword optimization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-amber-200 hover:border-ravenclaw-blue hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-ravenclaw-blue to-ravenclaw-bronze rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-magical">Expert Insights</CardTitle>
                <CardDescription className="font-crimson">
                  Get professional recommendations from our AI-powered analysis to make your resume stand out from the crowd.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-transparent relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-magical font-bold text-gryffindor-gold mb-4">How the Magic Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 hover:bg-gray-100  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group bg-gradient-to-r from-gryffindor-red to-gryffindor-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-white font-magical font-semibold mb-2">Upload Your Scroll</h3>
              <p className="text-white font-crimson">Simply upload your resume in PDF, DOC, or DOCX format</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 hover:bg-gray-100  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group bg-gradient-to-r from-slytherin-green to-slytherin-silver rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-white font-magical font-semibold mb-2">AI Enchantment</h3>
              <p className="text-white font-crimson">Our AI analyzes and optimizes your resume with magical precision</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 hover:bg-gray-100  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group bg-gradient-to-r from-ravenclaw-blue to-ravenclaw-bronze rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-white font-magical font-semibold mb-2">Land Your Dream Job</h3>
              <p className="text-white font-crimson">Get detailed insights and recommendations to ace your interviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[url('/HIW-bg.png')] bg-cover bg-center bg-no-repeat relative z-10">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-magical font-bold text-white mb-4">Ready to Cast Your Career Spell?</h2>
          <p className="text-xl text-white/90 mb-8 font-crimson">
            Join thousands of wizards who have transformed their careers with SpellMyJob
          </p>
          <Link href="/auth/signup">
            <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 font-semibold relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 opacity-0 group-hover:opacity-20 blur-lg transition duration-500 pointer-events-none"></span>
                <Crown className="w-5 h-5 mr-2" />
                Start Your Magical Journey
              </Button>
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-transparent text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <MagicalLogo size="lg" showIcon={false} className="mb-6 justify-center" logoImage="/logo.png" logoAlt="SpellMyJob Logo" />
          <p className="text-gray-400 font-crimson">
            © 2024 SpellMyJob. All rights reserved. Made with magical precision.
          </p>
        </div>
      </footer>
    </div>
  )
}
