import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

const googleProvider = new GoogleAuthProvider()

export interface UserProfile {
  uid: string
  email: string
  firstName: string
  lastName: string
  createdAt: Date
  plan: "free" | "pro" | "enterprise"
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string, firstName: string, lastName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      firstName,
      lastName,
      createdAt: new Date(),
      plan: "free",
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    return { user, profile: userProfile }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        createdAt: new Date(),
        plan: "free",
      }
      await setDoc(doc(db, "users", user.uid), userProfile)
    }

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Sign out
export async function signOutUser() {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

// Auth state observer
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
