import { endpoints } from "../resources/resources"
import { api, setAuthorizationToken } from "./api"

export class AuthService {
  static async authenticateUser(data) {
    try {
      const response = await api.post(endpoints.auth.loginUser, data)
      console.log({ response })

      if (response?.data?.success === false) {
        return response.data
      }

      if (response?.data?.success === true) {
        localStorage.setItem("AUTH_TOKEN_KEY", response.data.token)
        setAuthorizationToken(response.data.token)
        return response.data
      }

      return response.data
    } catch (e) {
      console.error("Login error:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async signUp(data) {
    try {
      const response = await api.post(endpoints.auth.createUser, data)
      console.log({ response })

      if (response?.data?.token) {
        localStorage.setItem("AUTH_TOKEN_KEY", response.data.token)
        setAuthorizationToken(response.data.token)
      }

      return response
    } catch (e) {
      console.error("Signup error:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async forgetPassword(data) {
    try {
      // Make the actual API call for production
      const response = await api.post(endpoints.auth.forgetPassword, data)
      console.log("Password reset response:", response)
      return response
    } catch (e) {
      console.error("Password reset request failed:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async verifyOTP(data) {
    try {
      const response = await api.post(endpoints.auth.verifyOTP, data)
      console.log("OTP verification response:", response)
      return response
    } catch (e) {
      console.error("OTP verification failed:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async resetPasswordWithCode(data) {
    try {
      const response = await api.post(endpoints.auth.resetPasswordWithCode, data)
      console.log("Password reset with code response:", response)
      return response
    } catch (e) {
      console.error("Password reset with code failed:", e?.response?.data?.message || e.message)
      throw e
    }
  }
}

