"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { TrendingUp, Award, Clock, Target, ChevronRight, Zap, BarChart4 } from "lucide-react"
import { getCookie } from "cookies-next"
import { featuredSignal, yearToDateStats, siteInfo } from "@/data/content"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authCookie = getCookie("auth")
    if (!authCookie && !loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

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
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Welcome to {siteInfo.name}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Access our premium trading signals with high win rates and consistent profits.
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 opacity-10 rounded-full -mt-10 -mr-10"></div>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                <BarChart4 className="mr-2 h-6 w-6 text-yellow-500" />
                Year to Date Performance
              </CardTitle>
              <CardDescription className="text-gray-400">Our track record speaks for itself</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-200">
                  <p className="text-5xl font-bold text-green-500 mb-2">{yearToDateStats.wins}</p>
                  <p className="text-sm text-gray-400">Winning Signals</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-200">
                  <p className="text-5xl font-bold text-red-500 mb-2">{yearToDateStats.losses}</p>
                  <p className="text-sm text-gray-400">Losing Signals</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-200">
                  <p className="text-5xl font-bold text-yellow-500 mb-2">{yearToDateStats.successRate}</p>
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Featured Signal
        </h3>

        {/* Featured Signal Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-500 opacity-5 rounded-full -mt-20 -ml-20"></div>
            <CardHeader className="border-b border-gray-700 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-yellow-500">{featuredSignal.name}</CardTitle>
                <div className="flex space-x-2">
                  {featuredSignal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <CardDescription className="text-gray-400">{featuredSignal.description}</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm text-gray-400">Start Time</span>
                  </div>
                  <p className="text-lg font-semibold">{featuredSignal.startTime}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm text-gray-400">Duration</span>
                  </div>
                  <p className="text-lg font-semibold">{featuredSignal.duration}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm text-gray-400">Win Rate</span>
                  </div>
                  <p className="text-lg font-semibold text-green-500">{featuredSignal.winRate}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm text-gray-400">Profit</span>
                  </div>
                  <p className="text-lg font-semibold text-yellow-500">{featuredSignal.profit}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-800 bg-opacity-50 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3"
                onClick={() => router.push("/payment")}
              >
                <Target className="mr-2 h-5 w-5" />
                Get This Signal
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Why Choose Bullseye Signals?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-500">
                  <Target className="mr-2 h-5 w-5" />
                  Precision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We can't tell you our secret now can we?,But if you stick with us money is a sure thing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-500">
                  <Award className="mr-2 h-5 w-5" />
                  Proven Track Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  With a high success rate, our signals have consistently delivered profits to our clients.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-500">
                  <Zap className="mr-2 h-5 w-5" />
                  Easy to Follow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Ideally we do everything for you.All you have to do is simply wait.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
