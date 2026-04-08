'use client'

import React from 'react'
import { Building2, Key, Activity, Users, TrendingUp, ArrowRight } from 'lucide-react'
import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'
import { MOCK_COMPANIES } from '@src/data/companies'
import { MOCK_LICENSES } from '@src/data/licenses'
import { MOCK_USERS } from '@src/data/users'
import Link from 'next/link'

const SuperAdminDashboardStatsCards: React.FC = () => {
    // Calculate statistics
    const totalCompanies = MOCK_COMPANIES.length
    const activeCompanies = MOCK_COMPANIES.filter((c) => c.status === 'Active').length
    const pendingCompanies = MOCK_COMPANIES.filter((c) => c.status === 'Trial').length
    
    const totalLicenses = MOCK_LICENSES.length
    const activeLicenses = MOCK_LICENSES.filter((l) => l.status === 'Active').length
    const expiringSoon = MOCK_LICENSES.filter((l) => l.daysRemaining <= 30 && l.daysRemaining > 0).length
    const inactiveLicenses = MOCK_LICENSES.filter((l) => l.status === 'Expired' || l.status === 'Suspended').length
    const licenseUtilization = totalLicenses > 0 ? Math.round((activeLicenses / totalLicenses) * 100) : 0
    
    const totalUsers = MOCK_USERS.length
    const activeUsersToday = MOCK_USERS.filter((u) => {
        if (!u.lastLogin) return false
        const lastLogin = new Date(u.lastLogin)
        const today = new Date()
        return lastLogin.toDateString() === today.toDateString()
    }).length
    
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const newUsersThisMonth = MOCK_USERS.filter((u) => {
        const createdDate = new Date(u.createdAt)
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear
    }).length
    
    // System Health (mock data)
    const systemHealth = 98.5
    const serverUptime = 99.9
    const avgResponseTime = 142
    const databaseStatus = 'Optimal'
    
    // Mock growth percentages
    const companyGrowth = 8.5
    const userGrowth = 12.3
    const healthImprovement = 2.1

    return (
        <>
            {/* Card 1: Total Companies/Tenants */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center border-2 rounded-full text-blue-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-blue-500/20 size-12 border-blue-500 bg-blue-50 dark:bg-blue-500/10">
                            <Building2 className="size-6" />
                        </div>
                        <Link
                            href="/super-admin/companies"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                            View All
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                    <p className="mb-1 text-sm text-gray-500 dark:text-dark-500">Total Companies</p>
                    <h5 className="mb-2 text-2xl font-semibold">
                        <AnimatedCounter start={0} end={activeCompanies} duration={2000} /> Active
                    </h5>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-dark-500">
                            +{pendingCompanies} Pending
                        </span>
                        <span className="flex items-center text-xs text-green-500">
                            <TrendingUp className="size-3 mr-1" />
                            {companyGrowth}% MoM
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2: Total Active Licenses */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center border-2 rounded-full text-green-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-green-500/20 size-12 border-green-500 bg-green-50 dark:bg-green-500/10">
                            <Key className="size-6" />
                        </div>
                        <Link
                            href="/super-admin/licenses"
                            className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center gap-1">
                            Manage
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                    <p className="mb-1 text-sm text-gray-500 dark:text-dark-500">Active Licenses</p>
                    <h5 className="mb-2 text-2xl font-semibold">
                        <AnimatedCounter start={0} end={activeLicenses} duration={2000} />
                    </h5>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-dark-500">
                            {expiringSoon} Expiring Soon
                        </span>
                        <span className="text-xs text-gray-500 dark:text-dark-500">
                            {licenseUtilization}% Utilization
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 3: System Health */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center border-2 rounded-full text-purple-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-purple-500/20 size-12 border-purple-500 bg-purple-50 dark:bg-purple-500/10">
                            <Activity className="size-6" />
                        </div>
                        <Link
                            href="/super-admin/system-configuration"
                            className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                            View Logs
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                    <p className="mb-1 text-sm text-gray-500 dark:text-dark-500">System Health</p>
                    <h5 className="mb-2 text-2xl font-semibold">
                        <AnimatedCounter start={0} end={systemHealth} duration={2000} />%
                    </h5>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-dark-500">
                            {serverUptime}% Uptime
                        </span>
                        <span className="flex items-center text-xs text-green-500">
                            <TrendingUp className="size-3 mr-1" />
                            {healthImprovement}% ↑
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 4: Total Users */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center border-2 rounded-full text-orange-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-orange-500/20 size-12 border-orange-500 bg-orange-50 dark:bg-orange-500/10">
                            <Users className="size-6" />
                        </div>
                        <Link
                            href="/super-admin/user-management"
                            className="text-sm text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                            Manage
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                    <p className="mb-1 text-sm text-gray-500 dark:text-dark-500">Total Users</p>
                    <h5 className="mb-2 text-2xl font-semibold">
                        <AnimatedCounter start={0} end={totalUsers} duration={2000} />
                    </h5>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-dark-500">
                            {activeUsersToday} Active Today
                        </span>
                        <span className="flex items-center text-xs text-green-500">
                            <TrendingUp className="size-3 mr-1" />
                            {userGrowth}% MoM
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuperAdminDashboardStatsCards

