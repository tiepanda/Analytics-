'use client'

import React from 'react'
import { RoleData } from '@src/data/roles'
import { Users, ShieldCheck, Building2, Calendar } from 'lucide-react'

interface RoleStatisticsProps {
  roles: RoleData[]
  userCompanyId?: number
  isSuperAdmin: boolean
}

const RoleStatistics: React.FC<RoleStatisticsProps> = ({
  roles,
  userCompanyId,
  isSuperAdmin,
}) => {
  // Calculate statistics
  const totalRoles = roles.length
  const systemRoles = roles.filter((r) => r.isPredefined).length
  const customRoles = roles.filter((r) => !r.isPredefined).length
  const activeRoles = roles.filter((r) => r.isActive).length
  
  // Get unique permission count
  const allPermissions = new Set<string>()
  roles.forEach((role) => {
    role.permissions.forEach((perm) => allPermissions.add(perm))
  })
  const uniquePermissions = allPermissions.size

  // Get companies with custom roles (for SuperAdmin)
  const companiesWithCustomRoles = isSuperAdmin
    ? new Set(roles.filter((r) => !r.isPredefined && r.companyId).map((r) => r.companyId)).size
    : customRoles > 0 ? 1 : 0

  // Get last modified date
  const lastModified = roles.length > 0
    ? roles.reduce((latest, role) => {
        const roleDate = new Date(role.updatedAt)
        const latestDate = new Date(latest.updatedAt)
        return roleDate > latestDate ? role : latest
      }, roles[0])
    : null

  const lastModifiedBy = lastModified?.updatedBy || 'System'
  const lastModifiedDate = lastModified
    ? new Date(lastModified.updatedAt)
    : new Date()

  const formatRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <div className="grid grid-cols-12 gap-x-space mb-6">
      {/* Total Roles Defined */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-sm font-medium text-gray-500 dark:text-dark-500">
              Total Roles Defined
            </h6>
            <Users className="size-5 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-semibold">{totalRoles}</h4>
            <span className="text-sm text-gray-500 dark:text-dark-500">
              {systemRoles} System {systemRoles === 1 ? 'Role' : 'Roles'}
            </span>
          </div>
        </div>
      </div>

      {/* Active Permission Sets */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-sm font-medium text-gray-500 dark:text-dark-500">
              Active Permission Sets
            </h6>
            <ShieldCheck className="size-5 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-semibold">{uniquePermissions}</h4>
            <span className="text-sm text-gray-500 dark:text-dark-500">
              Permission {uniquePermissions === 1 ? 'Group' : 'Groups'}
            </span>
          </div>
        </div>
      </div>

      {/* Companies Using Custom Roles */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-sm font-medium text-gray-500 dark:text-dark-500">
              {isSuperAdmin ? 'Companies Using Custom Roles' : 'Custom Roles'}
            </h6>
            <Building2 className="size-5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-semibold">
              {isSuperAdmin ? companiesWithCustomRoles : customRoles}
            </h4>
            <span className="text-sm text-gray-500 dark:text-dark-500">
              {isSuperAdmin ? 'Companies' : customRoles === 1 ? 'Role' : 'Roles'}
            </span>
          </div>
        </div>
      </div>

      {/* Last Modified */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-sm font-medium text-gray-500 dark:text-dark-500">
              Last Modified
            </h6>
            <Calendar className="size-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">
              {formatRelativeTime(lastModifiedDate)}
            </h4>
            <span className="text-sm text-gray-500 dark:text-dark-500">
              By {lastModifiedBy}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleStatistics

