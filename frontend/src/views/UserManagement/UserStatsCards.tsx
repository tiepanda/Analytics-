'use client'

import React from 'react'
import { Users, UserCheck, UserPlus, AlertCircle } from 'lucide-react'
import { User } from '@src/data/users'

interface UserStatsCardsProps {
    users: User[]
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({ users }) => {
    // Calculate statistics
    const totalUsers = users.length
    const activeUsers = users.filter((u) => u.status === 'Active').length
    const activePercentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : '0'
    
    // New users this month
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const newUsersThisMonth = users.filter((u) => {
        const createdDate = new Date(u.createdAt)
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear
    }).length

    // Users requiring attention (locked or expired passwords)
    const usersRequiringAttention = users.filter(
        (u) => u.status === 'Locked' || !u.lastLogin
    ).length

    const stats = [
        {
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            description: 'across all companies',
            icon: Users,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-500/10',
        },
        {
            title: 'Active Users',
            value: activeUsers.toLocaleString(),
            description: `${activePercentage}% active`,
            icon: UserCheck,
            iconColor: 'text-green-500',
            iconBg: 'bg-green-100 dark:bg-green-500/10',
        },
        {
            title: 'New Users This Month',
            value: `+${newUsersThisMonth}`,
            description: 'new users',
            icon: UserPlus,
            iconColor: 'text-purple-500',
            iconBg: 'bg-purple-100 dark:bg-purple-500/10',
        },
        {
            title: 'Users Requiring Attention',
            value: usersRequiringAttention.toString(),
            description: 'locked/expired passwords',
            icon: AlertCircle,
            iconColor: 'text-orange-500',
            iconBg: 'bg-orange-100 dark:bg-orange-500/10',
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

export default UserStatsCards

