"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { AlertCircle, Copy, Info, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getCookie } from "cookies-next"
import { paymentDetails, paymentNotes, featuredSignal } from "@/data/content"

export default function Payment() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const authCookie = getCookie("auth")
    if (!authCookie && !loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button
            variant="ghost"
            className="text-yellow-500 hover:text-yellow-400 hover:bg-gray-800"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Payment Details
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Complete your payment to access the {featuredSignal.name} signal
          </p>
        </div>

        <Alert className="bg-yellow-900 border-yellow-700 mb-8">
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <AlertTitle className="text-yellow-400">Payment Required</AlertTitle>
          <AlertDescription className="text-yellow-200">
            Please make your payment using M-Pesa with the details below.
          </AlertDescription>
        </Alert>

        <div className="max-w-md mx-auto mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500">M-Pesa Payment Details</CardTitle>
              <CardDescription>Minimum amount: {paymentDetails.minimum}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-400">Name:</div>
                <div className="font-medium flex items-center">
                  {paymentDetails.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 w-6 p-0"
                    onClick={() => copyToClipboard(paymentDetails.name, "name")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copied === "name" && <span className="text-xs text-green-500 ml-2">Copied!</span>}
                </div>

                <div className="text-gray-400">Paybill:</div>
                <div className="font-medium flex items-center">
                  {paymentDetails.paybill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 w-6 p-0"
                    onClick={() => copyToClipboard(paymentDetails.paybill, "paybill")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copied === "paybill" && <span className="text-xs text-green-500 ml-2">Copied!</span>}
                </div>

                <div className="text-gray-400">Account:</div>
                <div className="font-medium flex items-center">
                  {paymentDetails.account}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 w-6 p-0"
                    onClick={() => copyToClipboard(paymentDetails.account, "account")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copied === "account" && <span className="text-xs text-green-500 ml-2">Copied!</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes Card */}
        <Card className="bg-gray-800 border-gray-700 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-yellow-500 flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {paymentNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-1 shrink-0" />
                  <p className="text-gray-300">{note}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
