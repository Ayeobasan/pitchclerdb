import { api } from "./api"

export class AdminService {
  static async getAllUsers() {
    try {
      const response = await api.get("/account/users")
      console.log("Users data received:", response.data)
      return response.data
    } catch (e) {
      console.error("Error fetching users:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async approveUser(userId: string) {
    try {
      const response = await api.post(`/account/users/approve/${userId}`)
      console.log("User approval response:", response.data)
      return response.data
    } catch (e) {
      console.error("Error approving user:", e?.response?.data?.message || e.message)
      throw e
    }
  }
  static async getAllPitches() {
    try {
      const response = await api.get("/pitch/admin/all")
      console.log("Pitches data received:", response.data)
      return response.data
    } catch (e) {
      console.error("Error fetching pitches:", e?.response?.data?.message || e.message)
      throw e
    }
  }

  static async updatePitchStatus(pitchId: string, status: string) {
    try {
      console.log(`Updating pitch status: ${pitchId} to ${status}`)
      const response = await api.patch(`/pitch/admin/${pitchId}/status`, { status })
      console.log("Pitch status update response:", response.data)
      return response.data
    } catch (e) {
      console.error("Error updating pitch status:", e?.response?.data?.message || e.message)
      throw e
    }
  }
}


