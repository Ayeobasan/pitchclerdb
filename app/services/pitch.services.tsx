import { api } from "./api"
import { endpoints } from "../resources/resources"

export class PitchService {
  static async createPitch(formData: FormData) {
    try {
      const response = await api.post(endpoints.pitch.new, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Pitch creation response:", response)
      return response.data
    } catch (error) {
      console.error("Error creating pitch:", error?.response?.data?.message || error.message)
      throw error
    }
  }
}

