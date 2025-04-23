"use client"

import { useState, useEffect } from "react"
import { initializeFirebase, isInitialized as isFirebaseInitialized } from "@/lib/firebase"

export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(isFirebaseInitialized)
  const [isLoading, setIsLoading] = useState(!isFirebaseInitialized)
  const [error, setError] = useState<Error | null>(null)
  const [services, setServices] = useState<{ auth: any; db: any }>({ auth: null, db: null })

  useEffect(() => {
    // Skip if already initialized
    if (isInitialized) return

    // Skip on server
    if (typeof window === "undefined") return

    let isMounted = true
    setIsLoading(true)

    const initFirebase = async () => {
      try {
        const result = await initializeFirebase()

        if (!isMounted) return

        if (result.success) {
          setServices({ auth: result.auth, db: result.db })
          setIsInitialized(true)
          setError(null)
        } else {
          setError(result.error || new Error("Failed to initialize Firebase"))
        }
      } catch (err) {
        if (!isMounted) return
        console.error("Error in useFirebase hook:", err)
        setError(err instanceof Error ? err : new Error("Unknown error in Firebase initialization"))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    // Initialize Firebase
    initFirebase()

    return () => {
      isMounted = false
    }
  }, [isInitialized])

  return {
    isInitialized,
    isLoading,
    error,
    auth: services.auth,
    db: services.db,
  }
}
