import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, User } from '@src/lib/auth'
import { queryKeys } from '@src/lib/queryClient'

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => authService.getUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!authService.getToken(), // Only run if user is authenticated
  })
}

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ identifier, password }: { identifier: string; password: string }): Promise<User> => {
      const result = await authService.login(identifier, password)
      if (!result.success) {
        throw new Error(result.error || 'Login failed')
      }
      if (!result.user) {
        throw new Error('Login successful but user data not received')
      }
      return result.user
    },
    onSuccess: (user: User) => {
      // Update user data in cache
      queryClient.setQueryData(queryKeys.auth.user(), user)
      queryClient.setQueryData(queryKeys.auth.profile(), user)
    },
  })
}

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await authService.logout()
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear()
    },
  })
}

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (identifier: string) => {
      const result = await authService.forgotPassword(identifier)
      if (!result.success) {
        throw new Error(result.error || 'Failed to send OTP')
      }
      return result
    },
  })
}
