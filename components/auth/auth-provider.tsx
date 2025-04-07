"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AuthService } from "@/app/services/auth.services"
import { ProfileService } from "@/app/services/profile.services"
import { setAuthorizationToken } from "@/app/services/api"
import { useRouter } from "next/navigation"

// Update the User type to include firstName and lastName
type User = {
  id: string
  name?: string
  firstName?: string
  lastName?: string
  email: string
  provider?: string
  [key: string]: any // Allow for additional properties from the API
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<User | null>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  resetPassword: (email: string) => Promise<any>
  verifyOTP: (email: string, otp: string) => Promise<any>
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<any>
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void>
}

// Create a default context value to avoid the "must be used within a provider" error
const defaultContextValue: AuthContextType = {
  user: null,
  login: async () => null,
  loginWithGoogle: async () => { },
  register: async () => { },
  logout: async () => { },
  isLoading: true,
  resetPassword: async () => ({}),
  verifyOTP: async () => ({}),
  resetPasswordWithCode: async () => ({}),
  confirmPasswordReset: async () => { },
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    // This will only run on the client side
    const initAuth = async () => {
      setIsLoading(true)
      try {
        // Check if user is logged in
        const token = localStorage.getItem("AUTH_TOKEN_KEY")
        const storedUser = localStorage.getItem("user")

        if (token && storedUser) {
          // Set the authorization token
          setAuthorizationToken(token)

          // Set the user from localStorage first
          setUser(JSON.parse(storedUser))

          // Then try to fetch the full profile
          try {
            await checkValidityOfToken()
          } catch (profileError) {
            console.error("Error fetching profile during init:", profileError)
            // We already set the user from localStorage, so we can continue
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // Update the checkValidityOfToken function to properly map the profile data
  const checkValidityOfToken = async () => {
    try {
      const res = await ProfileService.getProfile()
      console.log("Profile validation response:", res)

      // If we get a successful response, update the user data with the profile data
      if (res && res.data) {
        // Create a properly formatted user object from the profile data
        const profileData = res.data
        const updatedUser = {
          ...user, // Keep existing user data
          ...profileData, // Add all profile data
          // If the API returns firstName and lastName but not name, create a name
          name:
            profileData.name || (profileData.firstName && profileData.lastName)
              ? `${profileData.firstName} ${profileData.lastName}`
              : user?.name || "User",
        }

        console.log("Updated user data:", updatedUser)
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return user
    } catch (e) {
      console.error("Profile validation error:", e)
      if (e.response?.data?.message === "Invalid Token") {
        // Token is invalid, clear user data
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("AUTH_TOKEN_KEY")
      } else if (e.response?.data?.status === false) {
        console.log("Redirecting to /dashboard/register due to failed status.")
      } else {
        console.error("Unhandled error: ", e)
      }
      throw e
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log("Login attempt with:", { email, password })

      const response = await AuthService.authenticateUser({
        email: email.trim(),
        password: password.trim(),
      })

      console.log("Login response:", response)

      // Check if the response contains user data
      if (response && response.success === true) {
        // Extract user data from the response
        const userData = response.user || { email, id: response.userId || "unknown" }

        // Format the user data
        const formattedUser = {
          id: userData.id || response.userId || "unknown",
          email: userData.email || email,
          name:
            userData.name ||
            (userData.firstName && userData.lastName
              ? `${userData.firstName} ${userData.lastName}`
              : email.split("@")[0]),
          ...userData,
        }

        console.log("Setting user data after login:", formattedUser)
        setUser(formattedUser)
        localStorage.setItem("user", JSON.stringify(formattedUser))

        // After login, fetch the full profile
        try {
          const updatedUser = await checkValidityOfToken()
          console.log("Profile data loaded successfully after login:", updatedUser)

          // Return the latest user data
          return updatedUser || formattedUser
        } catch (profileError) {
          console.error("Failed to load profile after login:", profileError)
          // Continue with basic user data even if profile fetch fails
          return formattedUser
        }
      }

      console.error("Login failed: Invalid response format", response)
      return null
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    // This is a mock implementation
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock successful Google login
        const mockUser = {
          id: "2",
          name: "Google User",
          email: "user@gmail.com",
          provider: "google",
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        resolve()
      }, 1500)
    })
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    // phone_number?: string,
    // country_code?: string,
  ) => {
    try {
      const response = await AuthService.signUp({
        firstName,
        lastName,
        email,
        // phone_number,
        // country_code,
      })

      if (response && response.data) {
        // Format user data from the response
        const userData = {
          id: response.data.id || "unknown",
          email: email,
          name: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          phone_number: phone_number,
          country_code: country_code,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        // After registration, try to fetch the full profile
        try {
          await checkValidityOfToken()
        } catch (profileError) {
          console.error("Failed to load profile after registration:", profileError)
          // Continue with basic user data even if profile fetch fails
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }
  const resetPassword = async (email: string) => {
    try {
      const response = await AuthService.forgetPassword({ email })
      return response
    } catch (error) {
      console.error("Password reset error:", error)
      throw error
    }
  }

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const response = await AuthService.verifyOTP({ email, otp })
      return response
    } catch (error) {
      console.error("OTP verification error:", error)
      throw error
    }
  }

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
    try {
      const response = await AuthService.resetPasswordWithCode({ email, code, newPassword })
      return response
    } catch (error) {
      console.error("Password reset with code error:", error)
      throw error
    }
  }

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    // This is a mock implementation
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock successful password reset
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("AUTH_TOKEN_KEY")
    router.replace("/login")
  }

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    isLoading,
    resetPassword,
    verifyOTP,
    resetPasswordWithCode,
    confirmPasswordReset,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

