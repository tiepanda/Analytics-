import { useQuery } from '@tanstack/react-query'
import { useApiQuery } from './useApi'
import { queryKeys } from '@src/lib/queryClient'
import { getDashboardSummary } from '@src/data/eagleAnalytics'

// Get dashboard summary with fallback to mock data
export const useDashboardSummary = (companyId: number) => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: () => getDashboardSummary(companyId),
    staleTime: 30 * 1000, // 30 seconds - dashboard data changes frequently
    refetchInterval: 60 * 1000, // Refetch every minute for live updates
  })
}

// Get dashboard overview data from API
export const useDashboardOverview = () => {
  return useApiQuery(
    queryKeys.dashboard.overview(),
    '/dashboard/overview',
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for overview data
    }
  )
}

// Get real-time dashboard metrics
export const useDashboardMetrics = () => {
  return useApiQuery(
    [...queryKeys.dashboard.all, 'metrics'],
    '/dashboard/metrics',
    {
      staleTime: 15 * 1000, // 15 seconds for real-time metrics
      refetchInterval: 30 * 1000, // Refetch every 30 seconds
      retry: 2,
    }
  )
}

// Get dashboard alerts and notifications
export const useDashboardAlerts = () => {
  return useApiQuery(
    [...queryKeys.dashboard.all, 'alerts'],
    '/dashboard/alerts',
    {
      staleTime: 10 * 1000, // 10 seconds for alerts
      refetchInterval: 20 * 1000, // Refetch every 20 seconds
      retry: 2,
    }
  )
}

// Get production summary for dashboard
export const useProductionSummary = (companyId?: number) => {
  const url = companyId ? `/companies/${companyId}/production/summary` : '/production/summary'
  return useApiQuery(
    [...queryKeys.dashboard.all, 'production-summary', companyId],
    url,
    {
      staleTime: 60 * 1000, // 1 minute
      refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    }
  )
}

// Get energy summary for dashboard
export const useEnergySummary = (companyId?: number) => {
  const url = companyId ? `/companies/${companyId}/energy/summary` : '/energy/summary'
  return useApiQuery(
    [...queryKeys.dashboard.all, 'energy-summary', companyId],
    url,
    {
      staleTime: 60 * 1000, // 1 minute
      refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    }
  )
}

// Get OEE summary for dashboard
export const useOEESummary = (companyId?: number) => {
  const url = companyId ? `/companies/${companyId}/oee/summary` : '/oee/summary'
  return useApiQuery(
    [...queryKeys.dashboard.all, 'oee-summary', companyId],
    url,
    {
      staleTime: 60 * 1000, // 1 minute
      refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    }
  )
}
