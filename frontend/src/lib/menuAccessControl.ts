import { User } from './auth'
import { UserRole, rbacService, Permission, ROUTE_PERMISSIONS } from './rbac'
import { MegaMenu } from '@src/dtos'

/**
 * Menu Access Control Service
 * Handles dynamic menu filtering based on roles and permissions
 */

export interface MenuAccessRule {
    roleId: string // Role identifier (predefined or custom)
    menuItemId: string // Menu item identifier (path or unique ID)
    hasAccess: boolean // Whether role has access to this menu item
    isVisible: boolean // Whether menu item is visible in sidebar
    order?: number // Display order for menu items
}

export interface RoleMenuConfig {
    roleId: string
    roleName: string
    isPredefined: boolean // true for SuperAdmin, Admin, Manager, Operator, Viewer
    menuItems: MenuAccessRule[]
    createdAt?: Date
    updatedAt?: Date
}

/**
 * Menu Access Control Service
 * Manages menu visibility and access for different roles
 */
export class MenuAccessControlService {
    private static instance: MenuAccessControlService
    private roleMenuConfigs: Map<string, RoleMenuConfig> = new Map()
    private menuAccessCache: Map<string, Set<string>> = new Map()

    private constructor() {
        this.initializePredefinedRoles()
    }

    public static getInstance(): MenuAccessControlService {
        if (!MenuAccessControlService.instance) {
            MenuAccessControlService.instance = new MenuAccessControlService()
        }
        return MenuAccessControlService.instance
    }

    /**
     * Initialize predefined roles with default menu configurations
     * Predefined roles cannot be modified via UI, but their menu access can be configured
     */
    private initializePredefinedRoles(): void {
        const predefinedRoles = [
            UserRole.SuperAdmin,
            UserRole.Admin,
            UserRole.Manager,
            UserRole.Operator,
            UserRole.Viewer,
        ]

        predefinedRoles.forEach((role) => {
            this.roleMenuConfigs.set(role, {
                roleId: role,
                roleName: role,
                isPredefined: true,
                menuItems: [],
            })
        })
    }

    /**
     * Filter menu items based on user role and menu access configuration
     * When NEXT_PUBLIC_IS_API_ACTIVE=false, uses permission-based filtering
     * When NEXT_PUBLIC_IS_API_ACTIVE=true, uses backend RoleMenuConfig
     */
    filterMenuByRole(menu: MegaMenu[], user: User | null, roleMenuConfig?: RoleMenuConfig): MegaMenu[] {
        if (!user) return []

        const userRole = user.role as string
        const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'
        const config = roleMenuConfig || this.roleMenuConfigs.get(userRole)

        // If API is active and config exists, use backend configuration
        if (isApiActive && config && config.menuItems.length > 0) {
            return this.filterMenuItems(menu, config, user)
        }

        // If API is not active or no config, use permission-based filtering
        return this.filterMenuItemsByPermissions(menu, user)
    }

    /**
     * Filter MainMenu items (children of MegaMenu) based on backend configuration
     */
    private filterMainMenuItems(menuItems: import('@src/dtos').MainMenu[], config: RoleMenuConfig, user: User): import('@src/dtos').MainMenu[] {
        return menuItems
            .map((item) => {
                // First check permissions
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Then check backend configuration
                const menuItemId = item.id || item.link || item.lang || item.title
                const accessRule = config.menuItems.find((rule) => rule.menuItemId === menuItemId)

                if (accessRule && !accessRule.hasAccess) {
                    return null
                }

                if (accessRule && !accessRule.isVisible) {
                    return null
                }

                // Process sub-children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredSubChildren = this.filterSubMenuItems(item.children, config, user)
                    if (filteredSubChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredSubChildren,
                    }
                }

                return item
            })
            .filter((item): item is import('@src/dtos').MainMenu => item !== null)
    }

    /**
     * Filter SubMenu items (children of MainMenu) based on backend configuration
     */
    private filterSubMenuItems(menuItems: import('@src/dtos').SubMenu[], config: RoleMenuConfig, user: User): import('@src/dtos').SubMenu[] {
        return menuItems
            .map((item) => {
                // First check permissions
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Then check backend configuration
                const menuItemId = item.id || item.link || item.lang || item.title
                const accessRule = config.menuItems.find((rule) => rule.menuItemId === menuItemId)

                if (accessRule && !accessRule.hasAccess) {
                    return null
                }

                if (accessRule && !accessRule.isVisible) {
                    return null
                }

                // Process nested children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredNestedChildren = this.filterSubMenuItems(item.children, config, user)
                    if (filteredNestedChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredNestedChildren,
                    }
                }

                return item
            })
            .filter((item): item is import('@src/dtos').SubMenu => item !== null)
    }

    /**
     * Filter menu items recursively based on role configuration (backend mode)
     */
    private filterMenuItems(menu: MegaMenu[], config: RoleMenuConfig, user: User): MegaMenu[] {
        return menu
            .map((item) => {
                // Separators are always shown
                if (item.separator) {
                    return item
                }

                // First check permissions (even in backend mode, permissions are the base security)
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Then check backend configuration
                const menuItemId = item.id || item.link || item.lang || item.title
                const accessRule = config.menuItems.find((rule) => rule.menuItemId === menuItemId)

                // If rule exists and access is denied, exclude item
                if (accessRule && !accessRule.hasAccess) {
                    return null
                }

                // If rule exists and item is not visible, exclude item
                if (accessRule && !accessRule.isVisible) {
                    return null
                }

                // Process children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredChildren = this.filterMainMenuItems(item.children, config, user)
                    // If all children are filtered out, hide parent too
                    if (filteredChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredChildren,
                    }
                }

                // Include item if it has access or no rule exists
                return item
            })
            .filter((item): item is MegaMenu => item !== null)
    }

    /**
     * Filter menu items based on RBAC permissions (mock/static mode)
     */
    private filterMenuItemsByPermissions(menu: MegaMenu[], user: User): MegaMenu[] {
        return menu
            .map((item) => {
                // Separators are always shown
                if (item.separator) {
                    return item
                }

                // Check if user has required permissions
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Process children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredChildren = this.filterMainMenuItemsByPermissions(item.children, user)
                    // If all children are filtered out, hide parent too
                    if (filteredChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredChildren,
                    }
                }

                return item
            })
            .filter((item): item is MegaMenu => item !== null)
    }

    /**
     * Filter MainMenu items (children of MegaMenu) by permissions
     */
    private filterMainMenuItemsByPermissions(menuItems: import('@src/dtos').MainMenu[], user: User): import('@src/dtos').MainMenu[] {
        return menuItems
            .map((item) => {
                // Check if user has required permissions
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Process sub-children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredSubChildren = this.filterSubMenuItemsByPermissions(item.children, user)
                    // If all sub-children are filtered out, hide parent too
                    if (filteredSubChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredSubChildren,
                    }
                }

                return item
            })
            .filter((item): item is import('@src/dtos').MainMenu => item !== null)
    }

    /**
     * Filter SubMenu items (children of MainMenu) by permissions
     */
    private filterSubMenuItemsByPermissions(menuItems: import('@src/dtos').SubMenu[], user: User): import('@src/dtos').SubMenu[] {
        return menuItems
            .map((item) => {
                // Check if user has required permissions
                if (!this.hasMenuPermission(item, user)) {
                    return null
                }

                // Process nested children recursively if they exist
                if (item.children && item.children.length > 0) {
                    const filteredNestedChildren = this.filterSubMenuItemsByPermissions(item.children, user)
                    // If all nested children are filtered out, hide parent too
                    if (filteredNestedChildren.length === 0) {
                        return null
                    }
                    return {
                        ...item,
                        children: filteredNestedChildren,
                    }
                }

                return item
            })
            .filter((item): item is import('@src/dtos').SubMenu => item !== null)
    }

    /**
     * Check if user has permission to access a menu item
     * Works with MegaMenu, MainMenu, and SubMenu (they all have permission fields)
     */
    private hasMenuPermission(
        item: MegaMenu | import('@src/dtos').MainMenu | import('@src/dtos').SubMenu,
        user: User
    ): boolean {
        // Check explicit menu item permissions
        if (item.requiredPermissions && item.requiredPermissions.length > 0) {
            return rbacService.hasAnyPermission(user, item.requiredPermissions)
        }

        // Check single permission field
        if (item.permission) {
            return rbacService.hasPermission(user, item.permission)
        }

        // Fallback to route permissions if menu item has a link
        if (item.link && item.link !== '#') {
            const routeConfig = ROUTE_PERMISSIONS.find((r) => r.path === item.link)
            if (routeConfig && routeConfig.requiredPermissions.length > 0) {
                return rbacService.hasAnyPermission(user, routeConfig.requiredPermissions)
            }
        }

        // Default: allow if no permission requirements (backward compatibility)
        return true
    }

    /**
     * Get default menu configuration for predefined roles
     * This is a fallback when no custom configuration exists
     * Now uses permission-based filtering instead of returning all items
     */
    private getDefaultMenuForRole(role: UserRole, menu: MegaMenu[], user: User | null): MegaMenu[] {
        // For SuperAdmin, return empty (they have their own constant menu)
        if (role === UserRole.SuperAdmin) {
            return []
        }

        // For other roles, filter by permissions
        if (user) {
            return this.filterMenuItemsByPermissions(menu, user)
        }

        // Fallback: return empty if no user
        return []
    }

    /**
     * Load role menu configuration from API
     * This should be called when user logs in or when menu configuration is updated
     */
    async loadRoleMenuConfig(roleId: string): Promise<RoleMenuConfig | null> {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/roles/${roleId}/menu-config`)
            // const config = await response.json()
            // this.roleMenuConfigs.set(roleId, config)
            // return config

            // For now, return cached config
            return this.roleMenuConfigs.get(roleId) || null
        } catch (error) {
            console.error('Failed to load role menu config:', error)
            return null
        }
    }

    /**
     * Save role menu configuration to API
     */
    async saveRoleMenuConfig(config: RoleMenuConfig): Promise<boolean> {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/roles/${config.roleId}/menu-config`, {
            //   method: 'POST',
            //   body: JSON.stringify(config),
            // })
            // if (response.ok) {
            //   this.roleMenuConfigs.set(config.roleId, config)
            //   this.clearCache(config.roleId)
            //   return true
            // }

            // For now, just update local cache
            this.roleMenuConfigs.set(config.roleId, config)
            this.clearCache(config.roleId)
            return true
        } catch (error) {
            console.error('Failed to save role menu config:', error)
            return false
        }
    }

    /**
     * Check if user has access to a specific menu item
     * Checks both permissions and backend configuration
     */
    hasMenuAccess(user: User | null, menuItemId: string, menuItem?: MegaMenu | import('@src/dtos').MainMenu | import('@src/dtos').SubMenu): boolean {
        if (!user) return false

        // First check permissions if menu item is provided
        if (menuItem && !this.hasMenuPermission(menuItem, user)) {
            return false
        }

        const userRole = user.role as string
        const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'
        const config = this.roleMenuConfigs.get(userRole)

        // If API is active and config exists, check backend configuration
        if (isApiActive && config && config.menuItems.length > 0) {
            const accessRule = config.menuItems.find((rule) => rule.menuItemId === menuItemId)
            return accessRule ? accessRule.hasAccess && accessRule.isVisible : true
        }

        // If no backend config or API not active, permission check is sufficient
        return true
    }

    /**
     * Get all menu items that a role can access
     */
    getAccessibleMenuItems(roleId: string): string[] {
        const config = this.roleMenuConfigs.get(roleId)
        if (!config) return []

        return config.menuItems
            .filter((rule) => rule.hasAccess && rule.isVisible)
            .map((rule) => rule.menuItemId)
    }

    /**
     * Clear cache for a specific role
     */
    private clearCache(roleId: string): void {
        this.menuAccessCache.delete(roleId)
    }

    /**
     * Clear all caches
     */
    clearAllCache(): void {
        this.menuAccessCache.clear()
    }

    /**
     * Get role menu configuration
     */
    getRoleMenuConfig(roleId: string): RoleMenuConfig | undefined {
        return this.roleMenuConfigs.get(roleId)
    }

    /**
     * Set role menu configuration (for local updates before saving)
     */
    setRoleMenuConfig(config: RoleMenuConfig): void {
        this.roleMenuConfigs.set(config.roleId, config)
        this.clearCache(config.roleId)
    }
}

export const menuAccessControlService = MenuAccessControlService.getInstance()

