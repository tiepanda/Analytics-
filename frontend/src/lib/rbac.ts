import { User } from './auth'

// Define the five predefined roles as per PRD
// These roles are constant and cannot be modified via UI
export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Manager = 'Manager',
  Operator = 'Operator',
  Viewer = 'Viewer'
}

// Predefined role identifiers (for validation)
export const PREDEFINED_ROLES = [
  UserRole.SuperAdmin,
  UserRole.Admin,
  UserRole.Manager,
  UserRole.Operator,
  UserRole.Viewer,
] as const

// Custom Role Interface (for dynamically created roles)
export interface CustomRole {
  id: string // Unique identifier (UUID)
  name: string // Role name (display name)
  code: string // Role code (unique identifier)
  description?: string // Role description
  companyId?: number // Company ID (null for SuperAdmin, number for company-specific roles)
  isActive: boolean // Whether role is active
  permissions: Permission[] // Assigned permissions
  createdAt: Date
  updatedAt: Date
  createdBy?: string // User ID who created this role
  updatedBy?: string // User ID who last updated this role
}

// Role type union (predefined or custom)
export type RoleIdentifier = UserRole | string // UserRole for predefined, string (UUID) for custom

// Define permissions for each module
export enum Permission {
  // Dashboard permissions
  VIEW_DASHBOARD = 'view_dashboard',
  EDIT_DASHBOARD = 'edit_dashboard',

  // OEE Module permissions
  VIEW_OEE = 'view_oee',
  EDIT_OEE = 'edit_oee',
  MANAGE_OEE = 'manage_oee',

  // Energy Module permissions
  VIEW_ENERGY = 'view_energy',
  EDIT_ENERGY = 'edit_energy',
  MANAGE_ENERGY = 'manage_energy',

  // Machine Module permissions
  VIEW_MACHINE = 'view_machine',
  EDIT_MACHINE = 'edit_machine',
  MANAGE_MACHINE = 'manage_machine',

  // Production Module permissions
  VIEW_PRODUCTION = 'view_production',
  EDIT_PRODUCTION = 'edit_production',
  MANAGE_PRODUCTION = 'manage_production',

  // Quality Module permissions
  VIEW_QUALITY = 'view_quality',
  EDIT_QUALITY = 'edit_quality',
  MANAGE_QUALITY = 'manage_quality',

  // Reports Module permissions
  VIEW_REPORTS = 'view_reports',
  EXPORT_REPORTS = 'export_reports',
  MANAGE_REPORTS = 'manage_reports',

  // User Management permissions
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  MANAGE_USERS = 'manage_users',

  // Company Management permissions
  VIEW_COMPANIES = 'view_companies',
  CREATE_COMPANIES = 'create_companies',
  EDIT_COMPANIES = 'edit_companies',
  DELETE_COMPANIES = 'delete_companies',
  MANAGE_COMPANIES = 'manage_companies',

  // System Administration permissions
  SYSTEM_ADMIN = 'system_admin',
  LICENSE_MANAGEMENT = 'license_management',
  AUDIT_LOGS = 'audit_logs'
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SuperAdmin]: [
    // All permissions
    Permission.VIEW_DASHBOARD, Permission.EDIT_DASHBOARD,
    Permission.VIEW_OEE, Permission.EDIT_OEE, Permission.MANAGE_OEE,
    Permission.VIEW_ENERGY, Permission.EDIT_ENERGY, Permission.MANAGE_ENERGY,
    Permission.VIEW_MACHINE, Permission.EDIT_MACHINE, Permission.MANAGE_MACHINE,
    Permission.VIEW_PRODUCTION, Permission.EDIT_PRODUCTION, Permission.MANAGE_PRODUCTION,
    Permission.VIEW_QUALITY, Permission.EDIT_QUALITY, Permission.MANAGE_QUALITY,
    Permission.VIEW_REPORTS, Permission.EXPORT_REPORTS, Permission.MANAGE_REPORTS,
    Permission.VIEW_USERS, Permission.CREATE_USERS, Permission.EDIT_USERS, Permission.DELETE_USERS, Permission.MANAGE_USERS,
    Permission.VIEW_COMPANIES, Permission.CREATE_COMPANIES, Permission.EDIT_COMPANIES, Permission.DELETE_COMPANIES, Permission.MANAGE_COMPANIES,
    Permission.SYSTEM_ADMIN, Permission.LICENSE_MANAGEMENT, Permission.AUDIT_LOGS
  ],
  [UserRole.Admin]: [
    // Company-level permissions
    Permission.VIEW_DASHBOARD, Permission.EDIT_DASHBOARD,
    Permission.VIEW_OEE, Permission.EDIT_OEE, Permission.MANAGE_OEE,
    Permission.VIEW_ENERGY, Permission.EDIT_ENERGY, Permission.MANAGE_ENERGY,
    Permission.VIEW_MACHINE, Permission.EDIT_MACHINE, Permission.MANAGE_MACHINE,
    Permission.VIEW_PRODUCTION, Permission.EDIT_PRODUCTION, Permission.MANAGE_PRODUCTION,
    Permission.VIEW_QUALITY, Permission.EDIT_QUALITY, Permission.MANAGE_QUALITY,
    Permission.VIEW_REPORTS, Permission.EXPORT_REPORTS, Permission.MANAGE_REPORTS,
    Permission.VIEW_USERS, Permission.CREATE_USERS, Permission.EDIT_USERS, Permission.DELETE_USERS, Permission.MANAGE_USERS,
    Permission.VIEW_COMPANIES, Permission.EDIT_COMPANIES,
    Permission.AUDIT_LOGS
  ],
  [UserRole.Manager]: [
    // Department-level permissions
    Permission.VIEW_DASHBOARD, Permission.EDIT_DASHBOARD,
    Permission.VIEW_OEE, Permission.EDIT_OEE,
    Permission.VIEW_ENERGY, Permission.EDIT_ENERGY,
    Permission.VIEW_MACHINE, Permission.EDIT_MACHINE,
    Permission.VIEW_PRODUCTION, Permission.EDIT_PRODUCTION, Permission.MANAGE_PRODUCTION,
    Permission.VIEW_QUALITY, Permission.EDIT_QUALITY, Permission.MANAGE_QUALITY,
    Permission.VIEW_REPORTS, Permission.EXPORT_REPORTS,
    Permission.VIEW_USERS
  ],
  [UserRole.Operator]: [
    // Machine operation permissions
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_OEE,
    Permission.VIEW_ENERGY,
    Permission.VIEW_MACHINE, Permission.EDIT_MACHINE,
    Permission.VIEW_PRODUCTION, Permission.EDIT_PRODUCTION,
    Permission.VIEW_QUALITY, Permission.EDIT_QUALITY,
    Permission.VIEW_REPORTS
  ],
  [UserRole.Viewer]: [
    // Read-only permissions
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_OEE,
    Permission.VIEW_ENERGY,
    Permission.VIEW_MACHINE,
    Permission.VIEW_PRODUCTION,
    Permission.VIEW_QUALITY,
    Permission.VIEW_REPORTS
  ]
}

// RBAC Service class
export class RBACService {
  private static instance: RBACService

  private constructor() { }

  public static getInstance(): RBACService {
    if (!RBACService.instance) {
      RBACService.instance = new RBACService()
    }
    return RBACService.instance
  }

  // Check if user has a specific permission
  hasPermission(user: User | null, permission: Permission): boolean {
    if (!user) return false

    const userRole = user.role as string

    // Check if it's a predefined role
    if (Object.values(UserRole).includes(userRole as UserRole)) {
      return ROLE_PERMISSIONS[userRole as UserRole].includes(permission)
    }

    // For custom roles, check via API (will be implemented when backend is ready)
    // For now, return false for unknown roles
    return false
  }

  // Check if a role is predefined
  isPredefinedRole(role: string): boolean {
    return Object.values(UserRole).includes(role as UserRole)
  }

  // Check if a role can be modified (only custom roles can be modified)
  canModifyRole(role: string): boolean {
    return !this.isPredefinedRole(role)
  }

  // Check if user has any of the specified permissions
  hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(user, permission))
  }

  // Check if user has all of the specified permissions
  hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(user, permission))
  }

  // Get user role
  getUserRole(user: User | null): UserRole | null {
    if (!user) return null
    return user.role as UserRole
  }

  // Check if user is SuperAdmin
  isSuperAdmin(user: User | null): boolean {
    return this.getUserRole(user) === UserRole.SuperAdmin
  }

  // Check if user is Admin
  isAdmin(user: User | null): boolean {
    const role = this.getUserRole(user)
    return role === UserRole.SuperAdmin || role === UserRole.Admin
  }

  // Check if user is Manager or above
  isManagerOrAbove(user: User | null): boolean {
    const role = this.getUserRole(user)
    return role === UserRole.SuperAdmin || role === UserRole.Admin || role === UserRole.Manager
  }

  // Get all permissions for a role
  getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || []
  }

  // Get user permissions
  getUserPermissions(user: User | null): Permission[] {
    const role = this.getUserRole(user)
    return role ? this.getRolePermissions(role) : []
  }
}

export const rbacService = RBACService.getInstance()

// Helper hooks for components
export const useRBAC = () => {
  return rbacService
}

// Route protection configuration
export interface RouteConfig {
  path: string
  requiredPermissions: Permission[]
  requireAny?: boolean // If true, user needs any of the permissions; if false, needs all
}

export const ROUTE_PERMISSIONS: RouteConfig[] = [
  // Dashboard
  { path: '/dashboard', requiredPermissions: [Permission.VIEW_DASHBOARD] },

  // OEE Module
  { path: '/oee/overview', requiredPermissions: [Permission.VIEW_OEE] },
  { path: '/oee/performance', requiredPermissions: [Permission.VIEW_OEE] },
  { path: '/oee/trends', requiredPermissions: [Permission.VIEW_OEE] },
  { path: '/oee/comparison', requiredPermissions: [Permission.VIEW_OEE] },

  // Energy Module
  { path: '/energy/overview', requiredPermissions: [Permission.VIEW_ENERGY] },
  { path: '/energy/plant', requiredPermissions: [Permission.VIEW_ENERGY] },
  { path: '/energy/machines', requiredPermissions: [Permission.VIEW_ENERGY] },
  { path: '/energy/reports', requiredPermissions: [Permission.VIEW_ENERGY] },

  // Machine Module
  { path: '/machines/live', requiredPermissions: [Permission.VIEW_MACHINE] },
  { path: '/machines/performance', requiredPermissions: [Permission.VIEW_MACHINE] },
  { path: '/machines/health', requiredPermissions: [Permission.VIEW_MACHINE] },
  { path: '/machines/management', requiredPermissions: [Permission.VIEW_MACHINE] },

  // Production Module
  { path: '/production/overview', requiredPermissions: [Permission.VIEW_PRODUCTION] },
  { path: '/production/quality', requiredPermissions: [Permission.VIEW_PRODUCTION] },
  { path: '/production/maintenance', requiredPermissions: [Permission.VIEW_PRODUCTION] },
  { path: '/production/inventory', requiredPermissions: [Permission.VIEW_PRODUCTION] },

  // Reports Module
  { path: '/reports/daily-production', requiredPermissions: [Permission.VIEW_REPORTS] },
  { path: '/reports/oee', requiredPermissions: [Permission.VIEW_REPORTS] },
  { path: '/reports/energy', requiredPermissions: [Permission.VIEW_REPORTS] },
  { path: '/reports/quality', requiredPermissions: [Permission.VIEW_REPORTS] },
  { path: '/reports/maintenance', requiredPermissions: [Permission.VIEW_REPORTS] },

  // Admin Module
  { path: '/admin/users', requiredPermissions: [Permission.VIEW_USERS] },
  { path: '/admin/companies', requiredPermissions: [Permission.VIEW_COMPANIES] },
  { path: '/admin/licenses', requiredPermissions: [Permission.LICENSE_MANAGEMENT] },
  { path: '/admin/settings', requiredPermissions: [Permission.SYSTEM_ADMIN] },
  { path: '/admin/audit-logs', requiredPermissions: [Permission.AUDIT_LOGS] },
]
