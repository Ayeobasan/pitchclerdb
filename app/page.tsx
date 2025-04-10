"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Spin } from "antd"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // If user is logged in, redirect based on role
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        // If no user, redirect to login
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  // This will only show briefly before redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spin size="large" tip="Redirecting..." />
    </div>
  )
}
