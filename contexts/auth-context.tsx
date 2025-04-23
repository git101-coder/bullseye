"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import {
  type User,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  getCurrentUser,
  addMockUser,
  getAllUsers,
} from "@/lib/auth-service"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for auth cookie and restore user on mount
  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") return

    // Ensure we have at least one test user
    addMockUser("user1@example.com", "password123", "Test User", "+254700000000")

    const authCookie = getCookie("auth")
    if (authCookie) {
      // If we have an auth cookie but no user, try to restore the session
      if (!user) {
        const currentUser = getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        }
      }
    }
    setLoading(false)
  }, [user])

  const signUp = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    setLoading(true)
    setError(null)

    try {
      const newUser = await authSignUp(email, password, fullName, phoneNumber)
      setUser(newUser)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error signing up:", error)

      if (error.message === "auth/email-already-in-use") {
        setError("This email is already registered. Please sign in instead.")
      } else {
        setError(error.message || "Failed to sign up")
      }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // For demo purposes, automatically create users if they don't exist
      const createIfNotExists = true // Set to true for demo purposes
      const loggedInUser = await authSignIn(email, password, createIfNotExists)
      setUser(loggedInUser)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error signing in:", error)

      if (error.message === "auth/user-not-found") {
        setError(`User not found. Available users: ${getAllUsers().join(", ")}. Please sign up first.`)
      } else if (error.message === "auth/wrong-password") {
        setError("Invalid password. Please try again.")
      } else {
        setError(error.message || "Failed to sign in")
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)

    try {
      await authSignOut()
      setUser(null)
      router.push("/")
    } catch (error: any) {
      console.error("Error signing out:", error)
      setError(error.message || "Failed to sign out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
