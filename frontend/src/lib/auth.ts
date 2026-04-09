// Custom authentication service for .NET 9.0 backend API
export interface LoginRequest {
  identifier: string
  password: string
}

export interface LoginResponse {
  Status: 'success' | 'error'
  Message: string
  Data?: {
    UserID: string
    UserId: string
    UserName?: string
    CompID: number
    Company: string
    Role: string
    UserStatus: boolean
    LicenseStatus: boolean
    Token: string
    RefreshToken: string
    MenuItems?: Array<{
      id: string
      label: string
      path?: string
      icon?: string
      children?: Array<{
        id: string
        label: string
        path: string
        icon?: string
      }>
    }>
  }
}

export interface ForgotPasswordResponse {
  Status: 'success' | 'error'
  Message: string
  Data?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  company: string
  compId: number
  userStatus: boolean
  licenseStatus: boolean
  token: string
  refreshToken: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7006'

// Helper function to get the correct API base URL
const getApiBaseUrl = () => {
  const baseUrl = API_BASE_URL
  // Remove trailing /api if it exists to avoid double /api/api
  return baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl
}

/**
 * Mock Authentication Credentials
 * 
 * These credentials are used when NEXT_PUBLIC_IS_API_ACTIVE=false
 * 
 * Quick Reference (Email / Password):
 * - SuperAdmin: superadmin@eagle.com / admin123
 * - Admin: admin@eagle.com / admin123
 * - Manager: manager@eagle.com / manager123
 * - Operator: operator@eagle.com / operator123
 * - Viewer: viewer@eagle.com / viewer123
 * 
 * See docs/MOCK_AUTH_CREDENTIALS.md for full documentation
 */

// Mock user credentials for testing different roles
// Format: { identifier: string (email), password: string, role: string, ... }
interface MockUserCredential {
  identifier: string // Email address
  password: string
  role: string
  userId: string
  userName: string
  company: string
  compId: number
}

const MOCK_CREDENTIALS: MockUserCredential[] = [
  {
    identifier: 'superadmin@eagle.com',
    password: 'admin123',
    role: 'SuperAdmin',
    userId: 'SA-001',
    userName: 'Super Admin',
    company: 'Eagle Analytics',
    compId: 0,
  },
  {
    identifier: 'admin@eagle.com',
    password: 'admin123',
    role: 'Admin',
    userId: 'AD-001',
    userName: 'Company Admin',
    company: 'TechCorp Industries',
    compId: 1,
  },
  {
    identifier: 'manager@eagle.com',
    password: 'manager123',
    role: 'Manager',
    userId: 'MG-001',
    userName: 'Department Manager',
    company: 'TechCorp Industries',
    compId: 1,
  },
  {
    identifier: 'operator@eagle.com',
    password: 'operator123',
    role: 'Operator',
    userId: 'OP-001',
    userName: 'Machine Operator',
    company: 'TechCorp Industries',
    compId: 1,
  },
  {
    identifier: 'viewer@eagle.com',
    password: 'viewer123',
    role: 'Viewer',
    userId: 'VW-001',
    userName: 'Data Viewer',
    company: 'TechCorp Industries',
    compId: 1,
  },
]

// Generate mock JWT token (simple base64 encoded string for development)
const generateMockToken = (userId: string, role: string): string => {
  const payload = {
    userId,
    role,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    iat: Math.floor(Date.now() / 1000),
  }
  // Simple mock token (not a real JWT, just for development)
  return `mock_token_${btoa(JSON.stringify(payload))}`
}

// Mock authentication function
const mockLogin = (
  identifier: string,
  password: string
): { success: boolean; user?: User; error?: string } => {
  const credential = MOCK_CREDENTIALS.find(
    (cred) =>
      cred.identifier.toLowerCase() === identifier.toLowerCase() &&
      cred.password === password
  )

  if (!credential) {
    return { success: false, error: 'Invalid credentials' }
  }

  const mockToken = generateMockToken(credential.userId, credential.role)
  const mockRefreshToken = generateMockToken(credential.userId, credential.role) + '_refresh'

  const user: User = {
    id: credential.userId,
    name: credential.userName,
    email: credential.identifier, // Email address
    role: credential.role,
    company: credential.company,
    compId: credential.compId,
    userStatus: true,
    licenseStatus: true,
    token: mockToken,
    refreshToken: mockRefreshToken,
  }

  return { success: true, user }
}

export class AuthService {
  private static instance: AuthService
  private user: User | null = null
  private token: string | null = null

  private constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (storedUser && storedToken) {
        try {
          this.user = JSON.parse(storedUser)
          this.token = storedToken
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          this.clearAuth()
        }
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(identifier: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Check if API is active, if not use mock authentication
    const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

    if (!isApiActive) {
      console.log('🔧 Using mock authentication (API is disabled)')
      const mockResult = mockLogin(identifier, password)

      if (mockResult.success && mockResult.user) {
        this.user = mockResult.user
        this.token = mockResult.user.token

        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(mockResult.user))
          localStorage.setItem('token', mockResult.user.token)
          localStorage.setItem('refreshToken', mockResult.user.refreshToken)
        }

        return { success: true, user: mockResult.user }
      } else {
        return { success: false, error: mockResult.error || 'Invalid credentials' }
      }
    }

    // Real API call
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/Login/Login?identifier=${encodeURIComponent(identifier)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Login response error:', response.status, errorText)
        return { success: false, error: `Server error: ${response.status}` }
      }

      // Check if response has content
      const responseText = await response.text()
      if (!responseText || responseText.trim() === '') {
        console.error('Empty response from server')
        return { success: false, error: 'Empty response from server' }
      }

      let data: LoginResponse
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', responseText)
        return { success: false, error: 'Invalid response format from server' }
      }

      if (data.Status === 'success' && data.Data) {
        const user: User = {
          id: data.Data.UserID,
          name: data.Data.UserName || data.Data.UserID, // Use UserName if available
          email: identifier,
          role: data.Data.Role,
          company: data.Data.Company,
          compId: data.Data.CompID,
          userStatus: data.Data.UserStatus,
          licenseStatus: data.Data.LicenseStatus,
          token: data.Data.Token,
          refreshToken: data.Data.RefreshToken,
        }

        this.user = user
        this.token = data.Data.Token

        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', data.Data.Token)
          localStorage.setItem('refreshToken', data.Data.RefreshToken)
        }

        return { success: true, user }
      } else {
        return { success: false, error: data.Message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }

  async refreshToken(): Promise<boolean> {
    if (!this.user?.refreshToken) {
      return false
    }

    // Check if API is active, if not use mock refresh
    const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

    if (!isApiActive) {
      // Mock token refresh - just generate new tokens
      if (this.user) {
        const newToken = generateMockToken(this.user.id, this.user.role)
        const newRefreshToken = generateMockToken(this.user.id, this.user.role) + '_refresh'

        this.token = newToken
        this.user.token = newToken
        this.user.refreshToken = newRefreshToken

        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('token', newToken)
          localStorage.setItem('refreshToken', newRefreshToken)
        }

        return true
      }
      return false
    }

    // Real API call
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/Login/refreshToken?refreshToken=${encodeURIComponent(this.user.refreshToken)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if response is ok
      if (!response.ok) {
        console.error('Refresh token response error:', response.status)
        this.clearAuth()
        return false
      }

      // Check if response has content
      const responseText = await response.text()
      if (!responseText || responseText.trim() === '') {
        console.error('Empty response from refresh token server')
        this.clearAuth()
        return false
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error for refresh token:', parseError, 'Response text:', responseText)
        this.clearAuth()
        return false
      }

      if (data.Status === 'success' && data.Data) {
        this.token = data.Data.Token
        this.user.token = data.Data.Token
        this.user.refreshToken = data.Data.RefreshToken

        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('token', data.Data.Token)
          localStorage.setItem('refreshToken', data.Data.RefreshToken)
        }

        return true
      } else {
        this.clearAuth()
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      this.clearAuth()
      return false
    }
  }

  async forgotPassword(identifier: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/Login/ForgotPassword?identifier=${encodeURIComponent(identifier)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Forgot password response error:', response.status, errorText)
        return { success: false, error: `Server error: ${response.status}` }
      }

      // Check if response has content
      const responseText = await response.text()
      if (!responseText || responseText.trim() === '') {
        console.error('Empty response from forgot password server')
        return { success: false, error: 'Empty response from server' }
      }

      let data: ForgotPasswordResponse
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error for forgot password:', parseError, 'Response text:', responseText)
        return { success: false, error: 'Invalid response format from server' }
      }

      if (data.Status === 'success') {
        return { success: true }
      } else {
        return { success: false, error: data.Message || 'Failed to send OTP' }
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }

  async logout(): Promise<void> {
    this.clearAuth()
  }

  getUser(): User | null {
    return this.user
  }

  getToken(): string | null {
    return this.token
  }

  isAuthenticated(): boolean {
    return this.user !== null && this.token !== null
  }

  private clearAuth(): void {
    this.user = null
    this.token = null
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }

  // Helper method to make authenticated API calls
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.token) {
      throw new Error('No authentication token available')
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // If token is expired, try to refresh
    if (response.status === 401) {
      const refreshed = await this.refreshToken()
      if (refreshed) {
        // Retry the request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...headers,
            'Authorization': `Bearer ${this.token}`,
          },
        })
      } else {
        this.clearAuth()
        throw new Error('Authentication failed')
      }
    }

    return response
  }
}

export const authService = AuthService.getInstance()
