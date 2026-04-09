'use client'

import React from 'react'
import { FileText, Folder, Building2, Calendar } from 'lucide-react'
import { ALL_MENU_ITEMS } from '@src/data/menuItems'
import { MOCK_ROLES } from '@src/data/roles'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'

const MenuStatsCards: React.FC = () => {
    const { user } = useAuth()
    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const userCompanyId = user?.compId

    // Calculate statistics
    const totalMenuItems = ALL_MENU_ITEMS.length

    // Active menu structures (roles with menu configurations)
    // For now, we'll count all roles that can have menu configs
    const accessibleRoles = isSuperAdmin
        ? MOCK_ROLES
        : MOCK_ROLES.filter(
              (role) => role.isPredefined || role.companyId === userCompanyId
          )
    const activeMenuStructures = accessibleRoles.length

    // Companies with custom menus (roles with custom configurations)
    const companiesWithCustomMenus = new Set(
        MOCK_ROLES.filter((role) => !role.isPredefined && role.companyId).map(
            (role) => role.companyId!
        )
    ).size

    // Last modified - using current date as placeholder
    const lastModified = 'Yesterday'
    const lastModifiedBy = user?.name || 'Super Admin'

    const stats = [
        {
            title: 'Total Menu Items',
            value: totalMenuItems.toString(),
            description: 'Menu Items',
            icon: FileText,
            iconColor: 'text-gray-500',
            iconBg: 'bg-gray-100 dark:bg-gray-500/10',
        },
        {
            title: 'Active Menu Structures',
            value: activeMenuStructures.toString(),
            description: 'Configurations',
            icon: Folder,
            iconColor: 'text-yellow-500',
            iconBg: 'bg-yellow-100 dark:bg-yellow-500/10',
        },
        {
            title: 'Companies with Custom Menus',
            value: companiesWithCustomMenus.toString(),
            description: 'Companies',
            icon: Building2,
            iconColor: 'text-gray-500',
            iconBg: 'bg-gray-100 dark:bg-gray-500/10',
        },
        {
            title: 'Last Modified',
            value: lastModified,
            description: `By ${lastModifiedBy}`,
            icon: Calendar,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-500/10',
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

export default MenuStatsCards

