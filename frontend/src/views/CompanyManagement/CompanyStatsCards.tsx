'use client'

import React from 'react'
import { Building2, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import { Company } from '@src/data/companies'

interface CompanyStatsCardsProps {
    companies: Company[]
}

const CompanyStatsCards: React.FC<CompanyStatsCardsProps> = ({ companies }) => {
    const totalCompanies = companies.length
    const activeCompanies = companies.filter((c) => c.status === 'Active').length
    const suspendedCompanies = companies.filter((c) => c.status === 'Suspended').length
    const trialCompanies = companies.filter((c) => c.status === 'Trial').length
    const pendingOnboarding = companies.filter((c) => c.status === 'Trial').length

    // Calculate companies added this month
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const companiesThisMonth = companies.filter((c) => {
        const createdDate = new Date(c.createdAt)
        return (
            createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear
        )
    }).length

    const stats = [
        {
            title: 'Total Companies',
            value: totalCompanies.toString(),
            description: `${activeCompanies} Active`,
            icon: Building2,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-500/10',
        },
        {
            title: 'Pending Onboarding',
            value: pendingOnboarding.toString(),
            description: 'Requests',
            icon: Clock,
            iconColor: 'text-yellow-500',
            iconBg: 'bg-yellow-100 dark:bg-yellow-500/10',
        },
        {
            title: 'Suspended Companies',
            value: suspendedCompanies.toString(),
            description: 'Suspended',
            icon: AlertTriangle,
            iconColor: 'text-red-500',
            iconBg: 'bg-red-100 dark:bg-red-500/10',
        },
        {
            title: 'Companies Added This Month',
            value: `+${companiesThisMonth}`,
            description: 'New',
            icon: TrendingUp,
            iconColor: 'text-green-500',
            iconBg: 'bg-green-100 dark:bg-green-500/10',
        },
    ]

    return (
        <div className="grid grid-cols-12 gap-x-space">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                    <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3 card">
                        <div className="card-body">
                            <div className="flex items-center justify-between mb-3">
                                <h6 className="text-sm font-medium text-gray-600 dark:text-dark-400">
                                    {stat.title}
                                </h6>
                                <div
                                    className={`flex items-center justify-center size-10 rounded-lg ${stat.iconBg}`}>
                                    <IconComponent className={`size-5 ${stat.iconColor}`} />
                                </div>
                            </div>
                            <h4 className="mb-1 text-2xl font-semibold">{stat.value}</h4>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                {stat.description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CompanyStatsCards

