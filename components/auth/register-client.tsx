"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import Logo from "@/components/logo"
import { Input, Button, Divider, Spin } from "antd"
import { ChromeIcon as Google } from "lucide-react"

export default function RegisterClient() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await register(name, email, password)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google login failed:", error)
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
          <Logo className="mx-auto h-12" />
          <h1 className="mt-6 text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">Sign up to start distributing your music</p>
        </div>

        <Button
          block
          size="large"
          icon={<Google className="h-5 w-5 mr-2" />}
          onClick={handleGoogleLogin}
          loading={googleLoading}
          className="flex items-center justify-center"
        >
          Sign up with Google
        </Button>

        <Divider plain>Or continue with email</Divider>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="large"
              placeholder="Enter your full name"
            />
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input.Password
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Create a password"
            />
          </div>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-purple-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

