import {
  QueryClient,
  DefaultOptions,
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

// Query Keys Management
export const queryKeys = {
  // Authentication
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    overview: () => [...queryKeys.dashboard.all, 'overview'] as const,
    summary: () => [...queryKeys.dashboard.all, 'summary'] as const,
  },

  // Companies
  companies: {
    all: ['companies'] as const,
    lists: () => [...queryKeys.companies.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.companies.lists(), { filters }] as const,
    details: () => [...queryKeys.companies.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.companies.details(), id] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.users.details(), id] as const,
  },

  // Machines
  machines: {
    all: ['machines'] as const,
    lists: () => [...queryKeys.machines.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.machines.lists(), { filters }] as const,
    details: () => [...queryKeys.machines.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.machines.details(), id] as const,
    live: () => [...queryKeys.machines.all, 'live'] as const,
  },

  // OEE Data
  oee: {
    all: ['oee'] as const,
    lists: () => [...queryKeys.oee.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.oee.lists(), { filters }] as const,
    machine: (machineId: string) => [...queryKeys.oee.all, 'machine', machineId] as const,
  },

  // Energy Data
  energy: {
    all: ['energy'] as const,
    lists: () => [...queryKeys.energy.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.energy.lists(), { filters }] as const,
    machine: (machineId: string) => [...queryKeys.energy.all, 'machine', machineId] as const,
  },

  // Production Data
  production: {
    all: ['production'] as const,
    lists: () => [...queryKeys.production.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.production.lists(), { filters }] as const,
    machine: (machineId: string) => [...queryKeys.production.all, 'machine', machineId] as const,
  },

  // Quality Data
  quality: {
    all: ['quality'] as const,
    lists: () => [...queryKeys.quality.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.quality.lists(), { filters }] as const,
  },

  // Maintenance Data
  maintenance: {
    all: ['maintenance'] as const,
    lists: () => [...queryKeys.maintenance.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.maintenance.lists(), { filters }] as const,
  },

  // Reports
  reports: {
    all: ['reports'] as const,
    oee: () => [...queryKeys.reports.all, 'oee'] as const,
    energy: () => [...queryKeys.reports.all, 'energy'] as const,
    production: () => [...queryKeys.reports.all, 'production'] as const,
    quality: () => [...queryKeys.reports.all, 'quality'] as const,
    maintenance: () => [...queryKeys.reports.all, 'maintenance'] as const,
  },

  // Inventory
  inventory: {
    all: ['inventory'] as const,
    lists: () => [...queryKeys.inventory.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.inventory.lists(), { filters }] as const,
  },
}

// Query Client Configuration with Authentication Integration
const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    retry: (failureCount, error: unknown) => {
      // Don't retry on client errors (4xx) except 401 (handled by axios interceptor)
      const axiosError = error as { response?: { status?: number } }
      const status = axiosError?.response?.status
      if (status && status >= 400 && status < 500 && status !== 401) {
        return false
      }
      // Retry server errors (5xx) up to 3 times, and 401 (token refresh will be handled by axios)
      return failureCount < 3
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: (failureCount, error: unknown) => {
      // Don't retry mutations on client errors except 401
      const axiosError = error as { response?: { status?: number } }
      const status = axiosError?.response?.status
      if (status && status >= 400 && status < 500 && status !== 401) {
        return false
      }
      // Retry server errors up to 2 times for mutations, and 401 (token refresh)
      return failureCount < 2
    },
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})

// Type definitions for better TypeScript support
export type QueryOptions<TData = unknown> = Omit<
  UseQueryOptions<TData, Error, TData>,
  'queryKey' | 'queryFn'
>

export type MutationOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  'mutationFn'
>

export type InfiniteQueryOptions<TData = unknown> = Omit<
  UseInfiniteQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>
