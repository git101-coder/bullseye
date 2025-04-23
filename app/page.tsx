"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle, Target, Mail, Lock, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { siteInfo } from "@/data/content"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
    } catch (error) {
      console.error("Error in sign-in form:", error)
    }
  }

  const useTestAccount = () => {
    setEmail("user1@example.com")
    setPassword("password123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <Target className="h-8 w-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            {siteInfo.name}
          </h1>
          <p className="text-gray-400 mt-2">{siteInfo.tagline}</p>
        </div>

        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 opacity-10 rounded-full -mt-10 -mr-10"></div>
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-500">Sign In</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access the signals</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert className="mb-4 bg-blue-900 border-blue-800">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-2">
                  <strong>Congrats on signing up for premium:</strong> You can use the universal email and password to sign in.We really dont need your info.If you have this link it means you already paid for premium so please avoid sharing.
                </p>
                <p>
                  Use test account: <strong>user1@example.com</strong> / <strong>password123</strong>{" "}
                  <Button variant="link" className="text-blue-300 p-0 h-auto" onClick={useTestAccount}>
                    Fill Test Credentials
                  </Button>
                </p>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-yellow-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
