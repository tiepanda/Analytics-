import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { authService } from '../lib/auth'

// Create axios instance with interceptors
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7006'

// Handle the case where the env var includes /api at the end
const baseURL = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL

const api: AxiosInstance & {
  post<T>(
    url: string,
    newRecord: T,
    field?: string
  ): Promise<{ data: T; message: string }>
  put<T>(
    url: string,
    updatedRecord: T,
    field?: string
  ): Promise<{ data: T; message: string }>
  delete(
    url: string,
    id: number,
    field?: string
  ): Promise<{ data: number; message: string }>
} = axios.create({
  baseURL: baseURL,
  timeout: 30000,
})

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for token refresh and error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshed = await authService.refreshToken()
        if (refreshed) {
          const newToken = authService.getToken()
          if (newToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
          }
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Redirect to login if refresh fails
        console.error('Refresh token failed:', refreshError)
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

api.get = async <T>(url: string): Promise<T> => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'
  const isAuthenticated = authService.isAuthenticated()

  // If API is not active or user is not authenticated, return empty array/null
  if (!isApiActive || !isAuthenticated) {
    console.log(`API disabled for ${url}, returning empty array`)
    return [] as T
  }

  try {
    const response: AxiosResponse<T> = await api.request({
      method: 'GET',
      url: url
    })
    return response.data
  } catch (error) {
    console.error('GET request error:', error)
    throw new Error('Failed to fetch data')
  }
}

export const customPost = async <T>(
  url: string,
  newRecord: T,
  field?: string
): Promise<{ data: T; message: string }> => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

  if (isApiActive) {
    try {
      const response: AxiosResponse<T> = await api.post(url, newRecord, {
        headers: { 'Content-Type': 'application/json' },
      })
      return {
        data: response.data,
        message: `${field} record added successfully`,
      }
    } catch (error) {
      console.error('Error adding record:', error)
      throw new Error('Internal Server Error')
    }
  } else {
    return { data: newRecord, message: `${field} record added successfully` }
  }
}

export const customPut = async <T>(
  url: string,
  updatedRecord: T,
  field?: string
): Promise<{ data: T; message: string }> => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

  if (isApiActive) {
    try {
      const response: AxiosResponse<T> = await api.put(url, updatedRecord, {
        headers: { 'Content-Type': 'application/json' },
      })
      return { data: response.data, message: `${field} update successful` }
    } catch (error) {
      console.error('Error updating record:', error)
      throw new Error('Internal Server Error')
    }
  } else {
    return { data: updatedRecord, message: `${field} update successful` }
  }
}

export const customDelete = async (
  url: string,
  id: number,
  field?: string
): Promise<{ data: number; message: string }> => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

  if (isApiActive) {
    try {
      const response: AxiosResponse<number> = await api.delete(url, {
        headers: { 'Content-Type': 'application/json' },
        data: { id },
      })

      if (response.status === 200) {
        return { data: id, message: `${field} delete successful` }
      } else {
        throw new Error('Failed to delete record')
      }
    } catch (error) {
      console.error('Error deleting record:', error)
      throw new Error('Internal Server Error')
    }
  } else {
    return { data: id, message: `${field} delete successful` }
  }
}

export default api
