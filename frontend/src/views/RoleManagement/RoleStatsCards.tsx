'use client'

import React from 'react'
import { Users, Lock, Building2, Calendar } from 'lucide-react'
import { RoleData } from '@src/data/roles'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'

interface RoleStatsCardsProps {
    roles: RoleData[]
}

const RoleStatsCards: React.FC<RoleStatsCardsProps> = ({ roles }) => {
    const { user } = useAuth()
    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const userCompanyId = user?.compId

    // Calculate statistics
    const totalRoles = roles.length
    const activePermissionSets = new Set(
        roles.flatMap((role) => role.permissions)
    ).size

    // Companies using custom roles (only count custom roles)
    const companiesWithCustomRoles = new Set(
        roles
            .filter((role) => !role.isPredefined && role.companyId)
            .map((role) => role.companyId!)
    ).size

    // Last modified role
    const lastModifiedRole = roles
        .sort((a, b) => {
            const dateA = new Date(a.updatedAt).getTime()
            const dateB = new Date(b.updatedAt).getTime()
            return dateB - dateA
        })[0]

    const getTimeAgo = (dateString: string): string => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
        return `${Math.floor(diffDays / 30)} months ago`
    }

    const stats = [
        {
            title: 'Total Roles Defined',
            value: totalRoles.toString(),
            description: 'System Roles',
            icon: Users,
            iconColor: 'text-purple-500',
            iconBg: 'bg-purple-100 dark:bg-purple-500/10',
        },
        {
            title: 'Active Permission Sets',
            value: activePermissionSets.toString(),
            description: 'Permission Groups',
            icon: Lock,
            iconColor: 'text-orange-500',
            iconBg: 'bg-orange-100 dark:bg-orange-500/10',
        },
        {
            title: 'Companies Using Custom Roles',
            value: companiesWithCustomRoles.toString(),
            description: 'Companies',
            icon: Building2,
            iconColor: 'text-gray-500',
            iconBg: 'bg-gray-100 dark:bg-gray-500/10',
        },
        {
            title: 'Last Modified',
            value: lastModifiedRole ? getTimeAgo(lastModifiedRole.updatedAt) : 'Never',
            description: lastModifiedRole
                ? `By ${lastModifiedRole.updatedBy || 'System'}`
                : 'No modifications',
            icon: Calendar,
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

export default RoleStatsCards

