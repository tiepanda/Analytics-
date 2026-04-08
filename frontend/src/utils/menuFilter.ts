import { User } from '@src/lib/auth'
import { rbacService, UserRole } from '@src/lib/rbac'
import { menuAccessControlService } from '@src/lib/menuAccessControl'
import { MegaMenu } from '@src/dtos'
import { menu } from '@src/data/Sidebar/menu'

/**
 * Menu Filter Utility
 * Handles role-based menu filtering for sidebar
 */

/**
 * Get filtered menu based on user role
 * - SuperAdmin: Returns empty array (should use SuperAdminSidebar instead)
 * - Other roles: Filters menu based on permissions (mock mode) or backend config (API mode)
 * 
 * Behavior:
 * - When NEXT_PUBLIC_IS_API_ACTIVE=false: Uses permission-based filtering
 * - When NEXT_PUBLIC_IS_API_ACTIVE=true: Uses backend RoleMenuConfig if available, falls back to permissions
 */
export async function getFilteredMenu(user: User | null): Promise<MegaMenu[]> {
    if (!user) return []

    // SuperAdmin uses constant menu (handled separately)
    if (rbacService.isSuperAdmin(user)) {
        return [] // Empty array indicates SuperAdmin should use SuperAdminSidebar
    }

    const userRole = user.role as string
    const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

    try {
        // Try to load role menu configuration from backend (if API is active)
        let roleMenuConfig = null
        if (isApiActive) {
            roleMenuConfig = await menuAccessControlService.loadRoleMenuConfig(userRole)
        }

        // Filter menu based on role configuration and permissions
        // filterMenuByRole handles the logic:
        // - If API active + config exists: uses backend config + permission checks
        // - Otherwise: uses permission-based filtering
        const filteredMenu = menuAccessControlService.filterMenuByRole(menu, user, roleMenuConfig || undefined)

        return filteredMenu
    } catch (error) {
        console.error('Error filtering menu:', error)
        // Fallback: use permission-based filtering
        return menuAccessControlService.filterMenuByRole(menu, user, undefined)
    }
}

/**
 * Check if user should use SuperAdmin sidebar
 */
export function shouldUseSuperAdminSidebar(user: User | null): boolean {
    return rbacService.isSuperAdmin(user)
}

