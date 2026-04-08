'use client'

import React from 'react'
import { CreditCard, Clock, DollarSign, TrendingUp } from 'lucide-react'
import { License } from '@src/data/licenses'

interface LicenseStatsCardsProps {
    licenses: License[]
}

const LicenseStatsCards: React.FC<LicenseStatsCardsProps> = ({ licenses }) => {
    const totalLicenses = licenses.length
    const activeLicenses = licenses.filter((l) => l.status === 'Active').length
    const expiringThisMonth = licenses.filter((l) => {
        if (l.status !== 'Active') return false
        const expiryDate = new Date(l.expiryDate)
        const now = new Date()
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0
    }).length

    // Calculate revenue this month (simplified - sum of active licenses)
    const revenueThisMonth = licenses
        .filter((l) => l.status === 'Active')
        .reduce((sum, l) => {
            const monthlyPrice = l.billingCycle === 'Monthly' ? l.price : l.billingCycle === 'Quarterly' ? l.price / 3 : l.billingCycle === 'Annually' ? l.price / 12 : 0
            return sum + monthlyPrice
        }, 0)

    // Calculate license utilization (active licenses / total licenses)
    const licenseUtilization = totalLicenses > 0 ? Math.round((activeLicenses / totalLicenses) * 100) : 0

    const stats = [
        {
            title: 'Total Active Licenses',
            value: activeLicenses.toString(),
            description: `${totalLicenses} Total`,
            icon: CreditCard,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-500/10',
        },
        {
            title: 'Expiring This Month',
            value: expiringThisMonth.toString(),
            description: 'Licenses',
            icon: Clock,
            iconColor: 'text-yellow-500',
            iconBg: 'bg-yellow-100 dark:bg-yellow-500/10',
        },
        {
            title: 'Revenue This Month',
            value: `$${revenueThisMonth.toLocaleString()}`,
            description: 'Monthly Revenue',
            icon: DollarSign,
            iconColor: 'text-green-500',
            iconBg: 'bg-green-100 dark:bg-green-500/10',
        },
        {
            title: 'License Utilization',
            value: `${licenseUtilization}%`,
            description: 'Active Licenses',
            icon: TrendingUp,
            iconColor: 'text-purple-500',
            iconBg: 'bg-purple-100 dark:bg-purple-500/10',
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

export default LicenseStatsCards

