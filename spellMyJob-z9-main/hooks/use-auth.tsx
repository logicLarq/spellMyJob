"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange, getUserProfile } from "@/lib/auth"
import type { UserProfile } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user)

      if (user) {
        const userProfile = await getUserProfile(user.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signOut = async () => {
    const { signOutUser } = await import("@/lib/auth")
    await signOutUser()
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
