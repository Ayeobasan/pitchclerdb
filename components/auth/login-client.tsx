"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import Logo from "@/components/logo"
import { Input, Button, Divider, Spin, Alert } from "antd"
import { ChromeIcon as Google } from "lucide-react"

export default function LoginClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Add a console log to see the auth context data
  const auth = useAuth()
  console.log("Auth context in login:", auth)

  const { login, loginWithGoogle, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log("Attempting login with:", { email, password })
      const userData = await login(email, password)

      if (userData) {
        console.log("Login successful, user data loaded:", userData)
        router.push("/dashboard")
      } else {
        const errorMsg = "Login failed. Please check your credentials and try again."
        console.error(errorMsg)
        setError(errorMsg)
      }
    } catch (error: any) {
      console.error("Login failed:", error)
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please check your credentials and try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google login failed:", error)
      const errorMessage = error?.response?.data?.message || "Google login failed. Please try again."
      setError(errorMessage)
    } finally {
      setGoogleLoading(false)
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
          <Logo className="mx-auto flex justify-center text-center h-12" />
          <h1 className="mt-6 text-3xl font-bold">Login To Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your credentials to access your account</p>
        </div>

        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        {/* <Button
          block
          size="large"
          icon={<Google className="h-5 w-5 mr-2" />}
          onClick={handleGoogleLogin}
          loading={googleLoading}
          className="flex items-center justify-center"
        >
          Sign in with Google
        </Button>

        <Divider plain>Or continue with email</Divider> */}

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:text-purple-700">
                Forgot password?
              </Link>
            </div>
            <Input.Password
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Enter your password"
            />
          </div>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:text-purple-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

