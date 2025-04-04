"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input, Button, message, Alert, Spin } from "antd"
import Logo from "@/components/logo"
import { useAuth } from "@/components/auth/auth-provider"

export default function ResetPasswordClient() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPasswordWithCode, isLoading } = useAuth()

  // Pre-fill email if provided in URL
  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!email) {
      setError("Email is required")
      return
    }

    if (!code) {
      setError("OTP code is required")
      return
    }

    setLoading(true)

    try {
      await resetPasswordWithCode(email, code, password)
      message.success("Password reset successful")
      router.push("/login")
    } catch (error: any) {
      console.error("Password reset failed:", error)
      const errorMessage = error?.response?.data?.message || "Failed to reset password. Please try again."
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
          <h1 className="mt-6 text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">Enter the OTP code sent to your email and create a new password</p>
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

          <div className="space-y-2">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <Input
              id="code"
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              size="large"
              placeholder="Enter the 6-digit OTP code"
              maxLength={6}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input.Password
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <Input.Password
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="large"
              placeholder="Confirm new password"
            />
          </div>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  )
}

