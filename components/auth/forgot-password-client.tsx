"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Input, Button, message, Alert, Spin } from "antd"
import Logo from "@/components/logo"
import { useAuth } from "@/components/auth/auth-provider"

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPassword, isLoading } = useAuth()

  // Pre-fill email if provided in URL
  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await resetPassword(email)
      message.success("OTP sent to your email")
      // Redirect directly to reset password page with email
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      console.error("Password reset request failed:", err)
      // Display a more specific error message if available
      const errorMessage = err?.response?.data?.message || "Network error. Please check your connection and try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <Logo className="mx-auto h-12" />
          <h1 className="mt-6 text-3xl font-bold">Forgot Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you an OTP to reset your password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert message="Error" description={error} type="error" showIcon closable onClose={() => setError(null)} />
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              placeholder="Enter your email address"
            />
          </div>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Send OTP
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-primary hover:text-purple-700">
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

