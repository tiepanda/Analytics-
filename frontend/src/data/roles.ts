import { UserRole, Permission } from '@src/lib/rbac'
import { CustomRole } from '@src/lib/rbac'

// Mock data for roles (will be replaced with API data)
export interface RoleData {
    id: string
    name: string
    code: string
    description?: string
    companyId?: number
    companyName?: string
    isPredefined: boolean
    isActive: boolean
    permissions: Permission[]
    permissionCount: number
    userCount?: number
    createdAt: string
    updatedAt: string
    updatedBy?: string
}

export const MOCK_ROLES: RoleData[] = [
    {
        id: '1',
        name: 'SuperAdmin',
        code: 'SuperAdmin',
        description: 'System-wide administrator with full access',
        isPredefined: true,
        isActive: true,
        permissions: Object.values(Permission),
        permissionCount: Object.values(Permission).length,
        userCount: 2,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '2',
        name: 'Admin',
        code: 'Admin',
        description: 'Company-level administrator',
        isPredefined: true,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.EDIT_DASHBOARD,
            Permission.VIEW_OEE,
            Permission.EDIT_OEE,
            Permission.MANAGE_OEE,
            Permission.VIEW_ENERGY,
            Permission.EDIT_ENERGY,
            Permission.MANAGE_ENERGY,
            Permission.VIEW_MACHINE,
            Permission.EDIT_MACHINE,
            Permission.MANAGE_MACHINE,
            Permission.VIEW_PRODUCTION,
            Permission.EDIT_PRODUCTION,
            Permission.MANAGE_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.MANAGE_QUALITY,
            Permission.VIEW_REPORTS,
            Permission.EXPORT_REPORTS,
            Permission.MANAGE_REPORTS,
            Permission.VIEW_USERS,
            Permission.CREATE_USERS,
            Permission.EDIT_USERS,
            Permission.DELETE_USERS,
            Permission.MANAGE_USERS,
            Permission.VIEW_COMPANIES,
            Permission.EDIT_COMPANIES,
            Permission.AUDIT_LOGS,
        ],
        permissionCount: 29,
        userCount: 5,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '3',
        name: 'Manager',
        code: 'Manager',
        description: 'Department-level manager',
        isPredefined: true,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.EDIT_DASHBOARD,
            Permission.VIEW_OEE,
            Permission.EDIT_OEE,
            Permission.VIEW_ENERGY,
            Permission.EDIT_ENERGY,
            Permission.VIEW_MACHINE,
            Permission.EDIT_MACHINE,
            Permission.VIEW_PRODUCTION,
            Permission.EDIT_PRODUCTION,
            Permission.MANAGE_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.MANAGE_QUALITY,
            Permission.VIEW_REPORTS,
            Permission.EXPORT_REPORTS,
            Permission.VIEW_USERS,
        ],
        permissionCount: 17,
        userCount: 12,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '4',
        name: 'Operator',
        code: 'Operator',
        description: 'Machine operator with operational permissions',
        isPredefined: true,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.VIEW_OEE,
            Permission.VIEW_ENERGY,
            Permission.VIEW_MACHINE,
            Permission.EDIT_MACHINE,
            Permission.VIEW_PRODUCTION,
            Permission.EDIT_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.VIEW_REPORTS,
        ],
        permissionCount: 10,
        userCount: 25,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '5',
        name: 'Viewer',
        code: 'Viewer',
        description: 'Read-only access role',
        isPredefined: true,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.VIEW_OEE,
            Permission.VIEW_ENERGY,
            Permission.VIEW_MACHINE,
            Permission.VIEW_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.VIEW_REPORTS,
        ],
        permissionCount: 7,
        userCount: 8,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '6',
        name: 'Production Lead',
        code: 'production_lead',
        description: 'Custom role for production team leads',
        companyId: 1,
        companyName: 'ABC Manufacturing',
        isPredefined: false,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.VIEW_PRODUCTION,
            Permission.EDIT_PRODUCTION,
            Permission.MANAGE_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.VIEW_REPORTS,
            Permission.EXPORT_REPORTS,
        ],
        permissionCount: 8,
        userCount: 3,
        createdAt: '2024-03-15',
        updatedAt: '2024-03-20',
        updatedBy: 'Super Admin',
    },
    {
        id: '7',
        name: 'Quality Inspector',
        code: 'quality_inspector',
        description: 'Custom role for quality control staff',
        companyId: 1,
        companyName: 'ABC Manufacturing',
        isPredefined: false,
        isActive: true,
        permissions: [
            Permission.VIEW_DASHBOARD,
            Permission.VIEW_PRODUCTION,
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.VIEW_REPORTS,
        ],
        permissionCount: 5,
        userCount: 4,
        createdAt: '2024-03-16',
        updatedAt: '2024-03-16',
        updatedBy: 'Super Admin',
    },
]

// All available permissions grouped by category
export const PERMISSION_CATEGORIES = [
    {
        category: 'Dashboard',
        permissions: [Permission.VIEW_DASHBOARD, Permission.EDIT_DASHBOARD],
    },
    {
        category: 'OEE Module',
        permissions: [Permission.VIEW_OEE, Permission.EDIT_OEE, Permission.MANAGE_OEE],
    },
    {
        category: 'Energy Module',
        permissions: [
            Permission.VIEW_ENERGY,
            Permission.EDIT_ENERGY,
            Permission.MANAGE_ENERGY,
        ],
    },
    {
        category: 'Machine Module',
        permissions: [
            Permission.VIEW_MACHINE,
            Permission.EDIT_MACHINE,
            Permission.MANAGE_MACHINE,
        ],
    },
    {
        category: 'Production Module',
        permissions: [
            Permission.VIEW_PRODUCTION,
            Permission.EDIT_PRODUCTION,
            Permission.MANAGE_PRODUCTION,
        ],
    },
    {
        category: 'Quality Module',
        permissions: [
            Permission.VIEW_QUALITY,
            Permission.EDIT_QUALITY,
            Permission.MANAGE_QUALITY,
        ],
    },
    {
        category: 'Reports Module',
        permissions: [
            Permission.VIEW_REPORTS,
            Permission.EXPORT_REPORTS,
            Permission.MANAGE_REPORTS,
        ],
    },
    {
        category: 'User Management',
        permissions: [
            Permission.VIEW_USERS,
            Permission.CREATE_USERS,
            Permission.EDIT_USERS,
            Permission.DELETE_USERS,
            Permission.MANAGE_USERS,
        ],
    },
    {
        category: 'Company Management',
        permissions: [
            Permission.VIEW_COMPANIES,
            Permission.CREATE_COMPANIES,
            Permission.EDIT_COMPANIES,
            Permission.DELETE_COMPANIES,
            Permission.MANAGE_COMPANIES,
        ],
    },
    {
        category: 'System Administration',
        permissions: [
            Permission.SYSTEM_ADMIN,
            Permission.LICENSE_MANAGEMENT,
            Permission.AUDIT_LOGS,
        ],
    },
]

