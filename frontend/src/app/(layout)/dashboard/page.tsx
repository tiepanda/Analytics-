'use client'

import React, { useState } from 'react'
import { NextPageWithLayout } from '@src/dtos'
import BreadCrumb from '@src/components/common/BreadCrumb'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { RefreshCw, Download, Calendar } from 'lucide-react'
import CompanyDashboardSummaryCards from '@src/views/CompanyDashboard/CompanyDashboardSummaryCards'
import OperationalMetricsWidgets from '@src/views/CompanyDashboard/OperationalMetricsWidgets'
import OEEMetricsSection from '@src/views/CompanyDashboard/OEEMetricsSection'
import QualityMetricsSection from '@src/views/CompanyDashboard/QualityMetricsSection'
import PerformanceMetricsSection from '@src/views/CompanyDashboard/PerformanceMetricsSection'
import AvailabilityMetricsSection from '@src/views/CompanyDashboard/AvailabilityMetricsSection'

const DashboardPage: NextPageWithLayout = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const isSuperAdmin = rbacService.isSuperAdmin(user)

  // Redirect SuperAdmin to their dashboard
  React.useEffect(() => {
    if (user && isSuperAdmin) {
      router.push('/super-admin')
    }
  }, [user, isSuperAdmin, router])

  if (!user) {
    return null
  }

  if (isSuperAdmin) {
    return null
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const handleExportDashboard = () => {
    alert('Exporting dashboard data...')
  }

  return (
    <>
      <BreadCrumb title={'Dashboard'} subTitle={'Company Dashboard'} />

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
            Company Dashboard
          </h6>
          <p className="text-sm text-gray-500 dark:text-dark-500">
            Real-time monitoring of production, quality, performance, and equipment effectiveness
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-500">
            <span>Last updated:</span>
            <span>{lastUpdated.toLocaleTimeString()}</span>
          </div>
          <button
            type="button"
            className="btn btn-sub-primary flex items-center gap-2 h-10"
            onClick={handleRefresh}
            disabled={isRefreshing}>
            <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            className="btn btn-sub-primary flex items-center gap-2 h-10"
            onClick={handleExportDashboard}>
            <Download className="size-4" />
            Export Dashboard
          </button>
          <button
            type="button"
            className="btn btn-sub-primary flex items-center gap-2 h-10"
            onClick={() => alert('Date range filter')}>
            <Calendar className="size-4" />
            Month
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <CompanyDashboardSummaryCards />
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <OperationalMetricsWidgets />
      </div>

      {/* OEE Metrics Section */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <OEEMetricsSection />
      </div>

      {/* Quality Metrics Section */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <QualityMetricsSection />
      </div>

      {/* Performance Metrics Section */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <PerformanceMetricsSection />
      </div>

      {/* Availability Metrics Section */}
      <div className="grid grid-cols-12 gap-x-space">
        <AvailabilityMetricsSection />
      </div>
    </>
  )
}

export default DashboardPage
