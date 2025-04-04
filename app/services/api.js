import axios from "axios"

// Create a function to initialize the API client
const createApiClient = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL ?? "https://pitchclerk-api.onrender.com/v1/",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        process.env.NEXT_PUBLIC_API_KEY ??
        "ddd1215ca93b6a0067dcaaf414cdb330:3498fd8251b0752fb1ef96ccc26e20780d694b4d93b076631b4d993e4a9b707f",
    },
    // timeout: 15000,
  })

  // Only add interceptors on the client side
  if (typeof window !== "undefined") {
    // Add request interceptor for better error handling
    api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("AUTH_TOKEN_KEY")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Add response interceptor for better error handling
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle network errors more gracefully
        if (error.message === "Network Error") {
          console.error("Network error detected. API might be down or unreachable.")
        }

        // Handle token expiration
        if (error.response && error.response.status === 401) {
          // Token might be expired, clear it
          localStorage.removeItem("AUTH_TOKEN_KEY")
        }

        return Promise.reject(error)
      },
    )
  }

  return api
}

// Create the API client
export const api = createApiClient()

export const setAuthorizationToken = (token) => {
  if (typeof window === "undefined") return

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

