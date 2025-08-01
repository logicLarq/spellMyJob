import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import ScrollProgressBar from '../components/ScrollProgressBar';
import MusicToggle from "@/components/MusicToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SpellMyJob - AI-Powered Resume Optimization",
  description:
    "Transform your resume into a job-winning machine with AI-powered analysis, job matching, and optimization suggestions.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      <ScrollProgressBar />
        <AuthProvider>{children}</AuthProvider>
        <MusicToggle />
        {/* Add any additional components or layout elements here */}
      </body>
    </html>
  )
}
