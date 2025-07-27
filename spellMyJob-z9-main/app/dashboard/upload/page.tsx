"use client"

import axios from "axios"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("File size must be less than 10MB")
      return
    }

    setUploadedFile(file)
    setUploadProgress(0)
    sendToBackend()
  }

  // const simulateUpload = () => {
  //   setIsUploading(true)
  //   setUploadProgress(0)

  //   const interval = setInterval(() => {
  //     setUploadProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval)
  //         setIsUploading(false)
  //         setUploadComplete(true)

  //         //trigger backend 
  //         sendToBackend()
          
  //         return 100
  //       }
  //       return prev + 10
  //     })
  //   }, 200)
  // }



const sendToBackend = async () => {
  if (!uploadedFile) return

  const formData = new FormData()
  formData.append("file", uploadedFile)

  try {
    setIsUploading(true)
    setUploadProgress(0)

    const response = await axios.post("https://spellmyjob.onrender.com/extract-resume/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin':  "https://spellmyjob.onrender.com",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        )
        setUploadProgress(percentCompleted)
      },
    })

    console.log("Resume Text:", response.data.raw_text)
    setUploadComplete(true)
  } catch (error) {
    console.error("Upload failed:", error)
    alert("Upload failed. Please try again.")
    setUploadProgress(0)
  } finally {
    setIsUploading(false)
  }

  const response = await axios.post("https://spellmyjob.onrender.com/extract-resume/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
      setUploadProgress(percentCompleted)
    },
  })
  
  // Save reference to the uploaded file
  const jsonFile = response.data.json_file
  localStorage.setItem("uploadedJson", jsonFile) // OR use useState
  
}

  

  const proceedToAnalysis = () => {
    router.push("/dashboard/analyze")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Resume</h1>
            <p className="text-gray-600">Upload your resume to get AI-powered analysis and job matching</p>
          </div>

          {!uploadComplete ? (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>Supported formats: PDF, DOC, DOCX (Max size: 10MB)</CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      dragActive
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop your resume here</h3>
                    <p className="text-gray-600 mb-4">or</p>
                    <label htmlFor="file-upload">
                      <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">Browse Files</Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInput}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-4">PDF, DOC, or DOCX up to 10MB</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{uploadedFile.name}</h4>
                        <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      {isUploading && <div className="text-sm text-purple-600">Uploading...</div>}
                      {uploadProgress === 100 && !isUploading && <CheckCircle className="h-6 w-6 text-green-500" />}
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="w-full" />
                      </div>
                    )}

                    {!uploadComplete && (
                      <Button
                        onClick={sendToBackend}
                        disabled={isUploading}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {isUploading ? "Uploading..." : "Upload & Analyze"}
                      </Button>
                    )}

                    {(uploadProgress > 0 || isUploading) && (
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-sm">
                          <span>{isUploading ? "Uploading..." : "Upload Complete"}</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="w-full" />
                      </div>
                    )}

                    {uploadComplete && !isUploading && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Upload successful!</span>
                        </div>
                        <Button onClick={proceedToAnalysis} className="w-full bg-purple-600 hover:bg-purple-700">
                          Proceed to Analysis
                        </Button>
                      </div>
                    )}

                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Your resume has been successfully uploaded and is ready for analysis.
                </p>
                <div className="space-y-3">
                  <Button onClick={proceedToAnalysis} className="w-full bg-purple-600 hover:bg-purple-700">
                    Start AI Analysis
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Upload Another Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features Preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Advanced AI analyzes your resume content and structure</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Job Matching</h3>
                <p className="text-sm text-gray-600">Get matched with relevant job roles based on your skills</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Optimization</h3>
                <p className="text-sm text-gray-600">Receive tailored suggestions to improve your resume</p>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          <Card className="mt-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Tips for Best Results</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Use a clean, professional resume format</li>
                    <li>• Include relevant keywords for your target roles</li>
                    <li>• Ensure your contact information is up to date</li>
                    <li>• Save your file with a descriptive name</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
