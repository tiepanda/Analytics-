'use client'

import React, { useState, useEffect, useMemo } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import MenuConfigTree from '@src/views/MenuManagement/MenuConfigTree'
import MenuPreview from '@src/views/MenuManagement/MenuPreview'
import { ALL_MENU_ITEMS, buildMenuTree } from '@src/data/menuItems'
import { MOCK_ROLES } from '@src/data/roles'
import { MenuAccessRule } from '@src/lib/menuAccessControl'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { Save, RefreshCw } from 'lucide-react'

const AdminMenuManagementPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string>('')
    const [accessRules, setAccessRules] = useState<MenuAccessRule[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const isAdmin = rbacService.isAdmin(user)

    // Redirect if not authorized
    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/dashboard')
        }
    }, [user, isAdmin, router])

    // Filter roles - Admin sees predefined + company roles only
    const accessibleRoles = useMemo(() => {
        return MOCK_ROLES.filter(
            (role) => role.isPredefined || role.companyId === user?.compId
        )
    }, [user?.compId])

    // Load menu configuration when role is selected
    useEffect(() => {
        if (selectedRoleId) {
            // TODO: Load from API
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
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setHasChanges(false)
        } catch (error) {
            console.error('Error saving menu config:', error)
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

    const menuTree = buildMenuTree(ALL_MENU_ITEMS)

    if (!user || !isAdmin) {
        return null
    }

    return (
        <>
            <BreadCrumb title={'Menu Management'} subTitle={'Admin'} />
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
                                        {role.companyName && ` - ${role.companyName}`}
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
                                        className="btn btn-sub-primary btn-sm"
                                        onClick={handleReset}
                                        disabled={!hasChanges}>
                                        <RefreshCw className="size-4" />
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={handleSave}
                                        disabled={isSaving || !hasChanges}>
                                        <Save className="size-4" />
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

export default AdminMenuManagementPage

