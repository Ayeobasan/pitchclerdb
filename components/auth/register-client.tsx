"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import Logo from "@/components/logo"
import { Input, Button, Divider, Spin, message, Alert, Select } from "antd"
import { ChromeIcon as Google } from "lucide-react"

const { Option } = Select

export default function RegisterClient() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("NG") // Default to Nigeria
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate inputs
      if (!firstName || !lastName || !email ) {
        throw new Error("All fields are required")
      }

      // Call the updated register function with the separate first and last name
      await register(firstName, lastName, email)
      message.success("Registration successful!")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Registration failed:", error)
      const errorMessage = error?.response?.data?.message || error.message || "Registration failed. Please try again."
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
          <h1 className="mt-6 text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">Sign up to start distributing your music</p>
        </div>

        {error && (
          <Alert
            message="Registration Error"
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
          Sign up with Google
        </Button>

        <Divider plain>Or continue with email</Divider> */}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                size="large"
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                size="large"
                placeholder="Enter your last name"
              />
            </div>
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

          {/* <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <Select value={countryCode} onChange={setCountryCode} style={{ width: 100 }} size="large">
                <Option value="NG">+234 (NG)</Option>
                <Option value="GH">+233 (GH)</Option>
                <Option value="KE">+254 (KE)</Option>
                <Option value="US">+1 (US)</Option>
                <Option value="UK">+44 (UK)</Option>
              </Select>
              <Input
                id="phone"
                name="phone"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="large"
                placeholder="Enter your phone number"
                className="flex-1"
              />
            </div>
          </div> */}

          {/* <div className="space-y-2">
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
          </div> */}

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

