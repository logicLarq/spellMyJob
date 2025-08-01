import NeonCard from "./NeonCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export const PackagesComponent = () => {
  return (
    <div className="mt-10 mb-10">
      <h1 className="text-center text-6xl max-sm:text-5xl text-gryffindor-gold font-bold mb">
        Packages
      </h1>
      <div className="grid md:grid-cols-3 gap-10 px-4 md:px-15 mt-40 min-h-[80vh]">
            <Card className="border-2 border-amber-200 hover:border-gryffindor-red hover:bg-white px-8 py-6 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-gryffindor-red to-gryffindor-gold rounded-lg flex items-center justify-center mb-4">
                    <text className="text-white text-2xl">🧙‍♂️</text>
                    </div>
                    <CardTitle className="font-magical text-4xl">Apprentice</CardTitle>
                    <CardDescription className="font-crimson">
                    <h1 className="text-bold text-5xl mb-4">0$</h1>
                    <ul className="list-disc pl-5 text-lg space-y-2 text-black">
                        <li>🧹 Free Forever</li>
                        <li>🧹 Spell Casting(Analysis) Limit - 5/day</li>
                        <li>🧹 Basic Wand Access</li>
                        <li>🧹 Email Support</li>
                    </ul>
                    </CardDescription>
                    <p>


                    Unlock the magic of job searching with our free Apprentice package. Perfect for those just starting their journey, this package offers essential tools to help you cast your first spells in the job market.        

                    </p>
                    {/* Centered Button Below */}
                    <div className="flex justify-center mt-20">
                    <Link href="/">
                        <Button
                        size="lg"
                        className="bg-gradient-to-r from-gryffindor-red to-gryffindor-gold hover:bg-gryffindor-gold px-8 py-6 relative overflow-hidden transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group text-white text-lg"
                        >
                        Begin Your Journey
                        </Button>
                    </Link>
                    </div>
                </CardHeader>
                </Card>


            <Card className="border-2 border-amber-200 hover:border-slytherin-green hover:bg-gryffindor-gold  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-gryffindor-red to-gryffindor-gold rounded-lg flex items-center justify-center mb-4">
                  <text className="text-white text-2xl">🧙‍♂️</text>
                </div>
                <CardTitle className="font-magical text-4xl ">Spell-Caster</CardTitle>
                <CardDescription className="font-crimson">
                  <h1 className="text-bold text-5xl mb-4">1.99$</h1>
                  <ul className="list-disc pl-5 text-lg space-y-2 text-black">
                    <li>🪄 Unlimited Analysis</li>
                    <li>🪄 Unlimited Wand Access</li>
                    <li>🪄 Structurization tools</li>
                    <li>🪄 Personal AI-Chatbot</li>
                    <li>🪄 Coming Soon</li>
                    <li>🪄 Coming Soon</li>
                  </ul>
                </CardDescription>
              </CardHeader> 
            </Card>

            <Card className="border-2 border-amber-200 hover:border-ravenclaw-blue hover:bg-gryffindor-light  px-8 py-6  relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group  bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-gryffindor-red to-gryffindor-gold rounded-lg flex items-center justify-center mb-4">
                  <text className="text-white text-2xl">🧙‍♂️</text>
                </div>
                <CardTitle className="font-magical text-4xl ">Archmade Elite</CardTitle>
                <CardDescription className="font-crimson">
                  <h1 className="text-bold text-5xl mb-4">4.99$</h1>
                  <ul className="list-disc pl-5 text-lg space-y-2 text-black">
                    <li>🔮 Unlimited Analysis</li>
                    <li>🔮 Unlimited Wand Access</li>
                    <li>🔮 Structurization Tools</li>
                    <li>🔮 AI-template Generator</li>
                    <li>🔮 Preparation Assistant</li>
                    <li>🔮 AI-Mock Interview</li>
                    <li>🔮 Coming Soon</li>
                    <li>🔮 Coming Soon</li>
                  </ul>
                </CardDescription>
              </CardHeader> 
            </Card>
          </div>
      </div>
    
  );
};