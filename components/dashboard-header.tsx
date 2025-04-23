"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Target } from "lucide-react"
import { siteInfo } from "@/data/content"

export function DashboardHeader() {
  const { logout, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error in logout:", error)
    }
  }

  return (
    <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Target className="h-6 w-6 text-yellow-500 mr-2" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            {siteInfo.name}
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          size="sm"
          disabled={loading}
          className="border-yellow-600 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-yellow-500 mr-2"></div>
              <span>Signing out...</span>
            </div>
          ) : (
            <>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </>
          )}
        </Button>
      </div>
    </header>
  )
}
