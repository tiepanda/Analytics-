import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api, { customPost, customPut, customDelete } from '@src/utils/axios_api'
import { queryKeys, QueryOptions, MutationOptions } from '@src/lib/queryClient'

// Generic API Query Hook
export function useApiQuery<TData = unknown>(
  queryKey: readonly unknown[],
  url: string,
  options?: QueryOptions<TData>
) {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<TData> => {
      const result = await api.get<TData>(url)
      return result as TData
    },
    ...options,
  })
}

// Generic API Mutation Hooks
export function useApiCreate<TData = unknown, TVariables = unknown>(
  url: string,
  field?: string,
  options?: MutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const result = await customPost<TVariables>(url, variables, field)
      return result.data as unknown as TData
    },
    ...options,
    onSuccess: (data, variables, context, mutationContext) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.machines.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.production.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.energy.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.quality.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.maintenance.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all })

      options?.onSuccess?.(data, variables, context, mutationContext)
    },
  })
}

export function useApiUpdate<TData = unknown, TVariables = unknown>(
  url: string,
  field?: string,
  options?: MutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const result = await customPut<TVariables>(url, variables, field)
      return result.data as unknown as TData
    },
    ...options,
    onSuccess: (data, variables, context, mutationContext) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.machines.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.production.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.energy.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.quality.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.maintenance.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all })

      options?.onSuccess?.(data, variables, context, mutationContext)
    },
  })
}

export function useApiDelete(
  url: string,
  field?: string,
  options?: MutationOptions<number, number>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await customDelete(url, id, field)
      return result.data
    },
    ...options,
    onSuccess: (data, variables, context, mutationContext) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.machines.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.production.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.energy.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.quality.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.maintenance.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all })

      options?.onSuccess?.(data, variables, context, mutationContext)
    },
  })
}

// Specialized hooks for common operations

// Companies API Hooks
export function useCompanies(options?: QueryOptions) {
  return useApiQuery(queryKeys.companies.lists(), '/companies', options)
}

export function useCompany(id: string | number, options?: QueryOptions) {
  return useApiQuery(queryKeys.companies.detail(id), `/companies/${id}`, options)
}

export function useCreateCompany(options?: MutationOptions) {
  return useApiCreate('/companies', 'Company', options)
}

export function useUpdateCompany(options?: MutationOptions) {
  return useApiUpdate('/companies', 'Company', options)
}

export function useDeleteCompany(options?: MutationOptions<number, number>) {
  return useApiDelete('/companies', 'Company', options)
}

// Users API Hooks
export function useUsers(companyId?: number, options?: QueryOptions) {
  const url = companyId ? `/companies/${companyId}/users` : '/users'
  return useApiQuery(queryKeys.users.lists(), url, options)
}

export function useUser(id: string | number, options?: QueryOptions) {
  return useApiQuery(queryKeys.users.detail(id), `/users/${id}`, options)
}

export function useCreateUser(options?: MutationOptions) {
  return useApiCreate('/users', 'User', options)
}

export function useUpdateUser(options?: MutationOptions) {
  return useApiUpdate('/users', 'User', options)
}

export function useDeleteUser(options?: MutationOptions<number, number>) {
  return useApiDelete('/users', 'User', options)
}

// Machines API Hooks
export function useMachines(companyId?: number, options?: QueryOptions) {
  const url = companyId ? `/companies/${companyId}/machines` : '/machines'
  return useApiQuery(queryKeys.machines.lists(), url, options)
}

export function useMachine(id: string | number, options?: QueryOptions) {
  return useApiQuery(queryKeys.machines.detail(id), `/machines/${id}`, options)
}

export function useMachineLiveData(id: string | number, options?: QueryOptions) {
  return useApiQuery(
    queryKeys.machines.live(),
    `/machines/${id}/live`,
    {
      refetchInterval: 5000, // Refetch every 5 seconds for live data
      ...options,
    }
  )
}

export function useCreateMachine(options?: MutationOptions) {
  return useApiCreate('/machines', 'Machine', options)
}

export function useUpdateMachine(options?: MutationOptions) {
  return useApiUpdate('/machines', 'Machine', options)
}

export function useDeleteMachine(options?: MutationOptions<number, number>) {
  return useApiDelete('/machines', 'Machine', options)
}

// Production API Hooks
export function useProductionData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.production.list(filters || {}), '/production', options)
}

export function useProductionByMachine(machineId: string, options?: QueryOptions) {
  return useApiQuery(queryKeys.production.machine(machineId), `/machines/${machineId}/production`, options)
}

// Energy API Hooks
export function useEnergyData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.energy.list(filters || {}), '/energy', options)
}

export function useEnergyByMachine(machineId: string, options?: QueryOptions) {
  return useApiQuery(queryKeys.energy.machine(machineId), `/machines/${machineId}/energy`, options)
}

// OEE API Hooks
export function useOEData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.oee.list(filters || {}), '/oee', options)
}

export function useOEEByMachine(machineId: string, options?: QueryOptions) {
  return useApiQuery(queryKeys.oee.machine(machineId), `/machines/${machineId}/oee`, options)
}

// Quality API Hooks
export function useQualityData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.quality.list(filters || {}), '/quality', options)
}

// Maintenance API Hooks
export function useMaintenanceData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.maintenance.list(filters || {}), '/maintenance', options)
}

// Inventory API Hooks
export function useInventoryData(filters?: Record<string, unknown>, options?: QueryOptions) {
  return useApiQuery(queryKeys.inventory.list(filters || {}), '/inventory', options)
}

// Reports API Hooks
export function useOEEReport(options?: QueryOptions) {
  return useApiQuery(queryKeys.reports.oee(), '/reports/oee', options)
}

export function useEnergyReport(options?: QueryOptions) {
  return useApiQuery(queryKeys.reports.energy(), '/reports/energy', options)
}

export function useProductionReport(options?: QueryOptions) {
  return useApiQuery(queryKeys.reports.production(), '/reports/production', options)
}

export function useQualityReport(options?: QueryOptions) {
  return useApiQuery(queryKeys.reports.quality(), '/reports/quality', options)
}

export function useMaintenanceReport(options?: QueryOptions) {
  return useApiQuery(queryKeys.reports.maintenance(), '/reports/maintenance', options)
}
