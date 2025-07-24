import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "./firebase"

export interface Resume {
  id: string
  userId: string
  fileName: string
  originalName: string
  fileUrl: string
  uploadDate: Date
  status: "uploaded" | "analyzing" | "analyzed" | "error"
  analysis?: ResumeAnalysisResult
  fileSize: number
  fileType: string
}

export interface ResumeAnalysisResult {
  overallScore: number
  atsScore: number
  keywordDensity: number
  strengths: string[]
  improvements: string[]
  missingKeywords: string[]
  jobMatches: Array<{
    role: string
    match: number
    company: string
    requirements: string[]
    salary?: string
  }>
  analyzedAt: Date
}

// Upload resume file to Firebase Storage
export async function uploadResumeFile(file: File, userId: string): Promise<string> {
  try {
    const fileName = `resumes/${userId}/${Date.now()}_${file.name}`
    const storageRef = ref(storage, fileName)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload resume file")
  }
}

// Save resume metadata to Firestore
export async function saveResumeMetadata(resumeData: Omit<Resume, "id">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "resumes"), {
      ...resumeData,
      uploadDate: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error saving resume metadata:", error)
    throw new Error("Failed to save resume metadata")
  }
}

// Get user's resumes
export async function getUserResumes(userId: string): Promise<Resume[]> {
  try {
    const q = query(collection(db, "resumes"), where("userId", "==", userId), orderBy("uploadDate", "desc"))

    const querySnapshot = await getDocs(q)
    const resumes: Resume[] = []

    querySnapshot.forEach((doc) => {
      resumes.push({
        id: doc.id,
        ...doc.data(),
      } as Resume)
    })

    return resumes
  } catch (error) {
    console.error("Error getting user resumes:", error)
    return []
  }
}

// Update resume analysis
export async function updateResumeAnalysis(resumeId: string, analysis: ResumeAnalysisResult): Promise<void> {
  try {
    const resumeRef = doc(db, "resumes", resumeId)
    await updateDoc(resumeRef, {
      analysis,
      status: "analyzed",
    })
  } catch (error) {
    console.error("Error updating resume analysis:", error)
    throw new Error("Failed to update resume analysis")
  }
}

// Delete resume
export async function deleteResume(resumeId: string, fileUrl: string): Promise<void> {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, "resumes", resumeId))

    // Delete from Storage
    const storageRef = ref(storage, fileUrl)
    await deleteObject(storageRef)
  } catch (error) {
    console.error("Error deleting resume:", error)
    throw new Error("Failed to delete resume")
  }
}
