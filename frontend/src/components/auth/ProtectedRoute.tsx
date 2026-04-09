'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { rbacService, Permission } from '../../lib/rbac'
import { Card, CardContent } from '../ui/card'
import { AlertTriangle, Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions: Permission[]
  requireAny?: boolean
  fallbackPath?: string
  showAccessDenied?: boolean
}

export default function ProtectedRoute({
  children,
  requiredPermissions,
  requireAny = false,
  fallbackPath = '/dashboard',
  showAccessDenied = true
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isLoading) {
      let accessGranted = false

      if (requireAny) {
        accessGranted = rbacService.hasAnyPermission(user, requiredPermissions)
      } else {
        accessGranted = rbacService.hasAllPermissions(user, requiredPermissions)
      }

      setHasAccess(accessGranted)

      if (!accessGranted && !user) {
        router.push('/auth/login')
      } else if (!accessGranted) {
        router.push(fallbackPath)
      }
    }
  }, [user, isLoading, requiredPermissions, requireAny, fallbackPath, router])

  if (isLoading || hasAccess === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    if (!showAccessDenied) {
      return null
    }

    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You don&apos;t have permission to access this resource.
              </p>
              <p className="text-sm text-muted-foreground">
                Required permissions: {requiredPermissions.join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

// Higher-order component for protecting routes
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions: Permission[],
  requireAny = false,
  fallbackPath = '/dashboard'
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        requiredPermissions={requiredPermissions}
        requireAny={requireAny}
        fallbackPath={fallbackPath}
      >
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

// Hook for checking permissions in components
export function usePermissionCheck() {
  const { user } = useAuth()

  const hasPermission = (permission: Permission) => {
    return rbacService.hasPermission(user, permission)
  }

  const hasAnyPermission = (permissions: Permission[]) => {
    return rbacService.hasAnyPermission(user, permissions)
  }

  const hasAllPermissions = (permissions: Permission[]) => {
    return rbacService.hasAllPermissions(user, permissions)
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole: rbacService.getUserRole(user),
    isSuperAdmin: rbacService.isSuperAdmin(user),
    isAdmin: rbacService.isAdmin(user),
    isManagerOrAbove: rbacService.isManagerOrAbove(user)
  }
}
