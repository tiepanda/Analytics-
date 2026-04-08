'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import MenuConfigTree from '@src/views/MenuManagement/MenuConfigTree'
import MenuPreview from '@src/views/MenuManagement/MenuPreview'
import MenuStatsCards from '@src/views/MenuManagement/MenuStatsCards'
import { ALL_MENU_ITEMS, buildMenuTree } from '@src/data/menuItems'
import { MOCK_ROLES } from '@src/data/roles'
import { MenuAccessRule } from '@src/lib/menuAccessControl'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { Save, RefreshCw, Upload, Download, CirclePlus } from 'lucide-react'
import { exportMenuToFile, exportRoleMenuConfig, importMenuFromFile } from '@src/utils/menuExportImport'

const MenuManagementPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string>('')
    const [accessRules, setAccessRules] = useState<MenuAccessRule[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const isAdmin = rbacService.isAdmin(user)

    // Redirect if not authorized
    useEffect(() => {
        if (!user || (!isSuperAdmin && !isAdmin)) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, isAdmin, router])

    // Filter roles based on user
    const accessibleRoles = useMemo(() => {
        if (isSuperAdmin) {
            return MOCK_ROLES // SuperAdmin sees all roles
        }
        // Admin sees predefined + company roles
        return MOCK_ROLES.filter(
            (role) => role.isPredefined || role.companyId === user?.compId
        )
    }, [isSuperAdmin, user?.compId])

    // Load menu configuration when role is selected
    useEffect(() => {
        if (selectedRoleId) {
            // TODO: Load from API
            // For now, initialize with default (all access)
            const defaultRules: MenuAccessRule[] = ALL_MENU_ITEMS.map((item) => ({
                roleId: selectedRoleId,
                menuItemId: item.id,
                hasAccess: true,
                isVisible: true,
            }))
            setAccessRules(defaultRules)
            setHasChanges(false)
        }
    }, [selectedRoleId])

    const handleToggleAccess = (menuItemId: string, hasAccess: boolean) => {
        if (!selectedRoleId) return
        setAccessRules((prev) => {
            const existing = prev.find((rule) => rule.menuItemId === menuItemId)
            if (existing) {
                return prev.map((rule) =>
                    rule.menuItemId === menuItemId
                        ? { ...rule, hasAccess, isVisible: hasAccess ? rule.isVisible : false }
                        : rule
                )
            }
            return [...prev, { roleId: selectedRoleId, menuItemId, hasAccess, isVisible: hasAccess }]
        })
        setHasChanges(true)
    }

    const handleToggleVisibility = (menuItemId: string, isVisible: boolean) => {
        if (!selectedRoleId) return
        setAccessRules((prev) => {
            const existing = prev.find((rule) => rule.menuItemId === menuItemId)
            if (existing) {
                return prev.map((rule) =>
                    rule.menuItemId === menuItemId ? { ...rule, isVisible } : rule
                )
            }
            return [...prev, { roleId: selectedRoleId, menuItemId, hasAccess: true, isVisible }]
        })
        setHasChanges(true)
    }

    const handleSave = async () => {
        if (!selectedRoleId) return

        setIsSaving(true)
        try {
            // TODO: Call API to save menu configuration
            console.log('Saving menu config for role:', selectedRoleId, accessRules)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setHasChanges(false)
            // Show success message
        } catch (error) {
            console.error('Error saving menu config:', error)
            // Show error message
        } finally {
            setIsSaving(false)
        }
    }

    const handleReset = () => {
        if (selectedRoleId) {
            const defaultRules: MenuAccessRule[] = ALL_MENU_ITEMS.map((item) => ({
                roleId: selectedRoleId,
                menuItemId: item.id,
                hasAccess: true,
                isVisible: true,
            }))
            setAccessRules(defaultRules)
            setHasChanges(false)
        }
    }

    const handleExportMenu = () => {
        if (selectedRoleId) {
            const selectedRole = accessibleRoles.find((r) => r.id === selectedRoleId)
            if (selectedRole) {
                exportRoleMenuConfig(selectedRoleId, selectedRole.name, ALL_MENU_ITEMS, accessRules)
            }
        } else {
            exportMenuToFile(ALL_MENU_ITEMS, accessRules)
        }
    }

    const handleImportMenu = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const template = await importMenuFromFile(file)
            // TODO: Handle imported menu structure
            console.log('Imported menu template:', template)
            alert(`Successfully imported menu structure with ${template.menuItems.length} items`)

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            alert(`Failed to import menu: ${error instanceof Error ? error.message : 'Unknown error'}`)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const menuTree = buildMenuTree(ALL_MENU_ITEMS)

    if (!user || (!isSuperAdmin && !isAdmin)) {
        return null
    }

    return (
        <>
            <BreadCrumb title={'Menu Management'} subTitle={'Super Admin'} />

            {/* Header with Title, Subtitle, and Action Buttons */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        Menu Management
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Configure dynamic menu structures and role-based visibility
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleImportMenu}>
                        <Upload className="size-4" />
                        Import Menu Structure
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleExportMenu}>
                        <Download className="size-4" />
                        Export Configuration
                    </button>
                    {/* <button
                        type="button"
                        className="btn btn-primary flex items-center gap-2 h-10"
                        onClick={() => {
                            // TODO: Add menu item functionality
                            alert('Add Menu Item feature coming soon')
                        }}>
                        <CirclePlus className="size-4" />
                        Add Menu Item
                    </button> */}
                </div>
            </div>

            {/* Hidden file input for import */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Statistics Cards */}
            <div className="mb-6">
                <MenuStatsCards />
            </div>

            <div className="grid grid-cols-12 gap-x-space">
                {/* Role Selector */}
                <div className="col-span-12 card">
                    <div className="card-header">
                        <h6 className="card-title">Select Role</h6>
                    </div>
                    <div className="card-body">
                        <div className="flex items-center gap-3">
                            <select
                                className="form-select grow"
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}>
                                <option value="">-- Select Role --</option>
                                {accessibleRoles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name} {role.isPredefined ? '(Predefined)' : ''}
                                        {!isSuperAdmin && role.companyName && ` - ${role.companyName}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {selectedRoleId && (
                    <>
                        {/* Menu Configuration */}
                        <div className="col-span-12 lg:col-span-8 card">
                            <div className="flex items-center justify-between card-header">
                                <h6 className="card-title">Menu Configuration</h6>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-sub-primary btn-sm flex items-center gap-2 h-8"
                                        onClick={handleReset}
                                        disabled={!hasChanges}>
                                        <RefreshCw className="size-4 ltr:mr-1 rtl:ml-1" />
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm flex items-center gap-2 h-8"
                                        onClick={handleSave}
                                        disabled={isSaving || !hasChanges}>
                                        <Save className="size-4 ltr:mr-1 rtl:ml-1" />
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <MenuConfigTree
                                    menuItems={menuTree}
                                    accessRules={accessRules}
                                    onToggleAccess={handleToggleAccess}
                                    onToggleVisibility={handleToggleVisibility}
                                />
                            </div>
                        </div>

                        {/* Menu Preview */}
                        <div className="col-span-12 lg:col-span-4">
                            <MenuPreview menuItems={menuTree} accessRules={accessRules} />
                        </div>
                    </>
                )}

                {!selectedRoleId && (
                    <div className="col-span-12 card">
                        <div className="py-12 text-center card-body">
                            <p className="text-gray-500 dark:text-dark-500">
                                Please select a role to configure its menu access.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MenuManagementPage

