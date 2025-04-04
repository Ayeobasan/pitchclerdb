import { endpoints } from "../resources/resources"
import { api } from "./api"

export class ProfileService {
  static async getProfile() {
    try {
      const response = await api.get(endpoints.user.profile)
      console.log("Profile data received:", response.data)
      return response.data
    } catch (e) {
      console.error("Profile error:", e?.response?.data?.message || e.message)
      throw e
    }
  }
}

