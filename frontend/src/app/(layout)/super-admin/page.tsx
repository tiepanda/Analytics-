'use client'

import React, { useState } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { RefreshCw, Download, Calendar } from 'lucide-react'
import SuperAdminDashboardStatsCards from '@src/views/SuperAdminDashboard/SuperAdminDashboardStatsCards'
import TenantActivityOverview from '@src/views/SuperAdminDashboard/TenantActivityOverview'
import RecentSystemActivities from '@src/views/SuperAdminDashboard/RecentSystemActivities'
import LicenseDistributionChart from '@src/views/SuperAdminDashboard/LicenseDistributionChart'
import SystemResourceUtilization from '@src/views/SuperAdminDashboard/SystemResourceUtilization'
import UserActivityHeatmap from '@src/views/SuperAdminDashboard/UserActivityHeatmap'
import QuickActionsPanel from '@src/views/SuperAdminDashboard/QuickActionsPanel'
import AlertsAndNotifications from '@src/views/SuperAdminDashboard/AlertsAndNotifications'
import SystemStatistics from '@src/views/SuperAdminDashboard/SystemStatistics'

const SuperAdminDashboardPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)

    const isSuperAdmin = rbacService.isSuperAdmin(user)

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user || !isSuperAdmin) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, router])

    if (!user || !isSuperAdmin) {
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
            <BreadCrumb title={'Dashboard'} subTitle={'Super Admin'} />

            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        Super Admin Dashboard
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Central command center for platform health, tenant activities, and system performance
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
                        Date Range
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-12 gap-x-space mb-6">
                <SuperAdminDashboardStatsCards />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-x-space mb-6">
                {/* Left Column - Tenant Activity & Recent Activities */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <TenantActivityOverview />
                    <RecentSystemActivities />
                </div>

                {/* Right Column - Charts */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <LicenseDistributionChart />
                    <SystemResourceUtilization />
                    <UserActivityHeatmap />
                </div>
            </div>

            {/* Bottom Section - Quick Actions & Alerts */}
            <div className="grid grid-cols-12 gap-x-space mb-6">
                <QuickActionsPanel />
                <AlertsAndNotifications />
            </div>

            {/* System Statistics */}
            <div className="grid grid-cols-12 gap-x-space">
                <SystemStatistics />
            </div>
        </>
    )
}

export default SuperAdminDashboardPage

