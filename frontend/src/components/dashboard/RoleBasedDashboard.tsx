'use client'

import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { rbacService, UserRole, Permission } from '../../lib/rbac'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import {
  Activity,
  Zap,
  Cog,
  TrendingUp,
  Settings,
  Users,
  Building2,
  FileText,
  AlertTriangle,
  BarChart3
} from 'lucide-react'

interface DashboardCard {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  permissions: Permission[]
  badge?: string
  color: string
}

const DASHBOARD_CARDS: Record<UserRole, DashboardCard[]> = {
  [UserRole.SuperAdmin]: [
    {
      title: 'System Overview',
      description: 'Complete system performance and analytics',
      href: '/dashboard',
      icon: <Activity className="h-8 w-8" />,
      permissions: [Permission.VIEW_DASHBOARD],
      color: 'text-blue-600'
    },
    {
      title: 'OEE Analytics',
      description: 'Overall Equipment Effectiveness monitoring',
      href: '/oee/overview',
      icon: <TrendingUp className="h-8 w-8" />,
      permissions: [Permission.VIEW_OEE],
      color: 'text-green-600'
    },
    {
      title: 'Energy Management',
      description: 'Energy consumption and optimization',
      href: '/energy/overview',
      icon: <Zap className="h-8 w-8" />,
      permissions: [Permission.VIEW_ENERGY],
      color: 'text-yellow-600'
    },
    {
      title: 'Machine Monitoring',
      description: 'Real-time machine status and health',
      href: '/machines/live',
      icon: <Cog className="h-8 w-8" />,
      permissions: [Permission.VIEW_MACHINE],
      color: 'text-orange-600'
    },
    {
      title: 'Production Control',
      description: 'Production planning and execution',
      href: '/production/overview',
      icon: <BarChart3 className="h-8 w-8" />,
      permissions: [Permission.VIEW_PRODUCTION],
      color: 'text-purple-600'
    },
    {
      title: 'Reports & Analytics',
      description: 'Comprehensive reporting system',
      href: '/reports/daily-production',
      icon: <FileText className="h-8 w-8" />,
      permissions: [Permission.VIEW_REPORTS],
      color: 'text-indigo-600'
    },
    {
      title: 'User Management',
      description: 'System-wide user administration',
      href: '/admin/users',
      icon: <Users className="h-8 w-8" />,
      permissions: [Permission.MANAGE_USERS],
      color: 'text-teal-600'
    },
    {
      title: 'Company Management',
      description: 'Multi-tenant company administration',
      href: '/admin/companies',
      icon: <Building2 className="h-8 w-8" />,
      permissions: [Permission.MANAGE_COMPANIES],
      color: 'text-pink-600'
    },
    {
      title: 'System Settings',
      description: 'Global system configuration',
      href: '/admin/settings',
      icon: <Settings className="h-8 w-8" />,
      permissions: [Permission.SYSTEM_ADMIN],
      color: 'text-gray-600'
    }
  ],
  [UserRole.Admin]: [
    {
      title: 'Company Dashboard',
      description: 'Company-wide performance overview',
      href: '/dashboard',
      icon: <Activity className="h-8 w-8" />,
      permissions: [Permission.VIEW_DASHBOARD],
      color: 'text-blue-600'
    },
    {
      title: 'OEE Monitoring',
      description: 'Equipment effectiveness analytics',
      href: '/oee/overview',
      icon: <TrendingUp className="h-8 w-8" />,
      permissions: [Permission.VIEW_OEE],
      color: 'text-green-600'
    },
    {
      title: 'Energy Analytics',
      description: 'Energy consumption monitoring',
      href: '/energy/overview',
      icon: <Zap className="h-8 w-8" />,
      permissions: [Permission.VIEW_ENERGY],
      color: 'text-yellow-600'
    },
    {
      title: 'Machine Management',
      description: 'Machine status and maintenance',
      href: '/machines/live',
      icon: <Cog className="h-8 w-8" />,
      permissions: [Permission.VIEW_MACHINE],
      color: 'text-orange-600'
    },
    {
      title: 'Production Oversight',
      description: 'Production planning and control',
      href: '/production/overview',
      icon: <BarChart3 className="h-8 w-8" />,
      permissions: [Permission.VIEW_PRODUCTION],
      color: 'text-purple-600'
    },
    {
      title: 'Quality Control',
      description: 'Quality assurance and compliance',
      href: '/production/quality',
      icon: <AlertTriangle className="h-8 w-8" />,
      permissions: [Permission.VIEW_QUALITY],
      color: 'text-red-600'
    },
    {
      title: 'Reports Center',
      description: 'Business intelligence and reporting',
      href: '/reports/daily-production',
      icon: <FileText className="h-8 w-8" />,
      permissions: [Permission.VIEW_REPORTS],
      color: 'text-indigo-600'
    },
    {
      title: 'User Administration',
      description: 'Company user management',
      href: '/admin/users',
      icon: <Users className="h-8 w-8" />,
      permissions: [Permission.MANAGE_USERS],
      color: 'text-teal-600'
    }
  ],
  [UserRole.Manager]: [
    {
      title: 'Department Dashboard',
      description: 'Department performance metrics',
      href: '/dashboard',
      icon: <Activity className="h-8 w-8" />,
      permissions: [Permission.VIEW_DASHBOARD],
      color: 'text-blue-600'
    },
    {
      title: 'OEE Performance',
      description: 'Equipment effectiveness tracking',
      href: '/oee/overview',
      icon: <TrendingUp className="h-8 w-8" />,
      permissions: [Permission.VIEW_OEE],
      color: 'text-green-600'
    },
    {
      title: 'Energy Usage',
      description: 'Department energy consumption',
      href: '/energy/overview',
      icon: <Zap className="h-8 w-8" />,
      permissions: [Permission.VIEW_ENERGY],
      color: 'text-yellow-600'
    },
    {
      title: 'Machine Status',
      description: 'Machine performance monitoring',
      href: '/machines/live',
      icon: <Cog className="h-8 w-8" />,
      permissions: [Permission.VIEW_MACHINE],
      color: 'text-orange-600'
    },
    {
      title: 'Production Management',
      description: 'Production scheduling and tracking',
      href: '/production/overview',
      icon: <BarChart3 className="h-8 w-8" />,
      permissions: [Permission.VIEW_PRODUCTION],
      color: 'text-purple-600'
    },
    {
      title: 'Quality Assurance',
      description: 'Quality control and inspection',
      href: '/production/quality',
      icon: <AlertTriangle className="h-8 w-8" />,
      permissions: [Permission.VIEW_QUALITY],
      color: 'text-red-600'
    },
    {
      title: 'Department Reports',
      description: 'Performance and productivity reports',
      href: '/reports/daily-production',
      icon: <FileText className="h-8 w-8" />,
      permissions: [Permission.VIEW_REPORTS],
      color: 'text-indigo-600'
    }
  ],
  [UserRole.Operator]: [
    {
      title: 'My Dashboard',
      description: 'Personal performance overview',
      href: '/dashboard',
      icon: <Activity className="h-8 w-8" />,
      permissions: [Permission.VIEW_DASHBOARD],
      color: 'text-blue-600'
    },
    {
      title: 'Machine Operations',
      description: 'Assigned machine status and controls',
      href: '/machines/live',
      icon: <Cog className="h-8 w-8" />,
      permissions: [Permission.VIEW_MACHINE],
      color: 'text-orange-600'
    },
    {
      title: 'Production Tasks',
      description: 'Current production assignments',
      href: '/production/overview',
      icon: <BarChart3 className="h-8 w-8" />,
      permissions: [Permission.VIEW_PRODUCTION],
      color: 'text-purple-600'
    },
    {
      title: 'Quality Checks',
      description: 'Quality inspection tasks',
      href: '/production/quality',
      icon: <AlertTriangle className="h-8 w-8" />,
      permissions: [Permission.VIEW_QUALITY],
      color: 'text-red-600'
    }
  ],
  [UserRole.Viewer]: [
    {
      title: 'Dashboard',
      description: 'System performance overview',
      href: '/dashboard',
      icon: <Activity className="h-8 w-8" />,
      permissions: [Permission.VIEW_DASHBOARD],
      color: 'text-blue-600'
    },
    {
      title: 'OEE Metrics',
      description: 'Equipment effectiveness overview',
      href: '/oee/overview',
      icon: <TrendingUp className="h-8 w-8" />,
      permissions: [Permission.VIEW_OEE],
      color: 'text-green-600'
    },
    {
      title: 'Energy Monitoring',
      description: 'Energy consumption trends',
      href: '/energy/overview',
      icon: <Zap className="h-8 w-8" />,
      permissions: [Permission.VIEW_ENERGY],
      color: 'text-yellow-600'
    },
    {
      title: 'Machine Status',
      description: 'Current machine conditions',
      href: '/machines/live',
      icon: <Cog className="h-8 w-8" />,
      permissions: [Permission.VIEW_MACHINE],
      color: 'text-orange-600'
    },
    {
      title: 'Reports',
      description: 'Available system reports',
      href: '/reports/daily-production',
      icon: <FileText className="h-8 w-8" />,
      permissions: [Permission.VIEW_REPORTS],
      color: 'text-indigo-600'
    }
  ]
}

export default function RoleBasedDashboard() {
  const { user } = useAuth()
  const userRole = rbacService.getUserRole(user)

  if (!userRole || !DASHBOARD_CARDS[userRole]) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Error</h2>
              <p className="text-muted-foreground">
                Unable to determine user role or dashboard configuration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const accessibleCards = DASHBOARD_CARDS[userRole].filter(card =>
    rbacService.hasAnyPermission(user, card.permissions)
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to Eagle Analytics</h1>
        <p className="text-muted-foreground">
          Your role: <Badge variant="secondary">{userRole}</Badge>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accessibleCards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className={`inline-flex p-3 rounded-lg bg-muted ${card.color}`}>
                  {card.icon}
                </div>
                <CardTitle className="flex items-center justify-between">
                  {card.title}
                  {card.badge && (
                    <Badge variant="outline" className="ml-2">
                      {card.badge}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Click to access →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {accessibleCards.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Access</h2>
              <p className="text-muted-foreground">
                You don&apos;t have access to any dashboard modules. Please contact your administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
