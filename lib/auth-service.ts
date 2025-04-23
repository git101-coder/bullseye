"use client"

import { setCookie, deleteCookie } from "cookies-next"

// User type
export interface User {
  id: string
  email: string
  fullName?: string
  phoneNumber?: string
}

// User credentials type
interface UserCredentials {
  email: string
  password: string
  fullName?: string
  phoneNumber?: string
}

// Local storage key for users
const USERS_STORAGE_KEY = "bullseye_users"

// Initialize users from localStorage or use default test user
function initializeUsers(): Record<string, UserCredentials> {
  if (typeof window === "undefined") {
    return {
      "user1@example.com": {
        email: "user1@example.com",
        password: "password123",
        fullName: "Test User",
        phoneNumber: "+254700000000",
      },
    }
  }

  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
    if (storedUsers) {
      return JSON.parse(storedUsers)
    }
  } catch (error) {
    console.error("Error loading users from localStorage:", error)
  }

  // Default user if nothing in localStorage
  const defaultUsers = {
    "user1@example.com": {
      email: "user1@example.com",
      password: "password123",
      fullName: "Test User",
      phoneNumber: "+254700000000",
    },
  }

  // Save default users to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers))
  }

  return defaultUsers
}

// Get users from localStorage
let users = initializeUsers()

// Save users to localStorage
function saveUsers() {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  }
}

// Generate a simple ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Sign up function
export async function signUp(email: string, password: string, fullName: string, phoneNumber: string): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  if (users[email]) {
    throw new Error("auth/email-already-in-use")
  }

  // Create new user
  const userId = generateId()
  users[email] = {
    email,
    password,
    fullName,
    phoneNumber,
  }

  // Save updated users to localStorage
  saveUsers()

  // Set auth cookie
  setCookie("auth", "true", { maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // Store user info in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        id: userId,
        email,
        fullName,
        phoneNumber,
      }),
    )
  }

  // Return user object
  return {
    id: userId,
    email,
    fullName,
    phoneNumber,
  }
}

// Sign in function
export async function signIn(email: string, password: string, createIfNotExists = false): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Reinitialize users to ensure we have the latest data
  users = initializeUsers()

  // Check if user exists
  const user = users[email]
  if (!user) {
    if (createIfNotExists) {
      // Create a new user on the fly for demo purposes
      return signUp(email, password, `User ${email.split("@")[0]}`, "+254700000000")
    }
    console.error("User not found:", email, "Available users:", Object.keys(users))
    throw new Error("auth/user-not-found")
  }

  // Check password
  if (user.password !== password) {
    throw new Error("auth/wrong-password")
  }

  // Set auth cookie
  setCookie("auth", "true", { maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // Store user info in localStorage
  const userId = generateId()
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        id: userId,
        email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      }),
    )
  }

  // Return user object
  return {
    id: userId,
    email,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
  }
}

// Sign out function
export async function signOut(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove auth cookie
  deleteCookie("auth")

  // Remove user info from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("userInfo")
  }
}

// Get current user function
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null
  }

  const userInfoStr = localStorage.getItem("userInfo")
  if (!userInfoStr) {
    return null
  }

  try {
    return JSON.parse(userInfoStr) as User
  } catch (error) {
    console.error("Error parsing user info:", error)
    return null
  }
}

// Add a new user to the mock database (for testing)
export function addMockUser(email: string, password: string, fullName?: string, phoneNumber?: string): void {
  users[email] = {
    email,
    password,
    fullName,
    phoneNumber,
  }
  saveUsers()
}

// Get all users (for debugging)
export function getAllUsers(): string[] {
  return Object.keys(users)
}
