'use client'

import React, { useState, useEffect } from 'react'
import { RoleData, PERMISSION_CATEGORIES } from '@src/data/roles'
import { Permission } from '@src/lib/rbac'

interface RoleFormProps {
    role?: RoleData | null
    onSave: (roleData: Partial<RoleData>) => void
    onCancel: () => void
    isSuperAdmin: boolean
    userCompanyId?: number
}

const RoleForm: React.FC<RoleFormProps> = ({
    role,
    onSave,
    onCancel,
    isSuperAdmin,
    userCompanyId,
}) => {
    const [name, setName] = useState(role?.name || '')
    const [code, setCode] = useState(role?.code || '')
    const [description, setDescription] = useState(role?.description || '')
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
        role?.permissions || []
    )
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Generate code from name automatically
    useEffect(() => {
        if (!role && name) {
            const generatedCode = name
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^a-z0-9_]/g, '')
            setCode(generatedCode)
        }
    }, [name, role])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!name.trim()) {
            newErrors.name = 'Role name is required'
        } else if (name.length < 3) {
            newErrors.name = 'Role name must be at least 3 characters'
        }

        if (!code.trim()) {
            newErrors.code = 'Role code is required'
        } else if (code.length < 3) {
            newErrors.code = 'Role code must be at least 3 characters'
        } else if (!/^[A-Za-z0-9_]+$/.test(code)) {
            newErrors.code = 'Role code can only contain letters, numbers, and underscores'
        }

        if (selectedPermissions.length === 0) {
            newErrors.permissions = 'At least one permission is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        onSave({
            name: name.trim(),
            code: code.trim(),
            description: description.trim() || undefined,
            permissions: selectedPermissions,
            companyId: isSuperAdmin ? undefined : userCompanyId,
            isPredefined: false,
            isActive: true,
        })
    }

    const togglePermission = (permission: Permission) => {
        setSelectedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        )
    }

    const toggleCategory = (category: typeof PERMISSION_CATEGORIES[0]) => {
        const categoryPermissions = category.permissions
        const allSelected = categoryPermissions.every((p) =>
            selectedPermissions.includes(p)
        )

        if (allSelected) {
            // Deselect all permissions in category
            setSelectedPermissions((prev) =>
                prev.filter((p) => !categoryPermissions.includes(p))
            )
        } else {
            // Select all permissions in category
            setSelectedPermissions((prev) => {
                const newPermissions = [...prev]
                categoryPermissions.forEach((p) => {
                    if (!newPermissions.includes(p)) {
                        newPermissions.push(p)
                    }
                })
                return newPermissions
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
                <label htmlFor="roleName" className="block mb-2 text-sm font-medium">
                    Role Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="roleName"
                    type="text"
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Production Lead"
                    disabled={!!role?.isPredefined}
                />
                {errors.name && (
                    <span className="text-sm text-red-500">{errors.name}</span>
                )}
            </div>

            <div className="col-span-12 md:col-span-6">
                <label htmlFor="roleCode" className="block mb-2 text-sm font-medium">
                    Role Code <span className="text-red-500">*</span>
                </label>
                <input
                    id="roleCode"
                    type="text"
                    className={`form-input ${errors.code ? 'border-red-500' : ''}`}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toLowerCase())}
                    placeholder="e.g., production_lead"
                    disabled={!!role?.isPredefined}
                />
                {errors.code && (
                    <span className="text-sm text-red-500">{errors.code}</span>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-dark-500">
                    Must be unique. Only letters, numbers, and underscores allowed.
                </p>
            </div>

            <div className="col-span-12">
                <label htmlFor="roleDescription" className="block mb-2 text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="roleDescription"
                    className="form-input"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the role's purpose and responsibilities..."
                />
            </div>

            <div className="col-span-12">
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">
                        Permissions <span className="text-red-500">*</span>
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-dark-500">
                            ({selectedPermissions.length} selected)
                        </span>
                    </label>
                    <button
                        type="button"
                        className="text-sm link link-primary"
                        onClick={() => {
                            if (selectedPermissions.length === Object.values(Permission).length) {
                                setSelectedPermissions([])
                            } else {
                                setSelectedPermissions(Object.values(Permission))
                            }
                        }}>
                        {selectedPermissions.length === Object.values(Permission).length
                            ? 'Deselect All'
                            : 'Select All'}
                    </button>
                </div>

                {errors.permissions && (
                    <div className="mb-3 text-sm text-red-500">{errors.permissions}</div>
                )}

                <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 border rounded-lg dark:border-dark-850">
                    {PERMISSION_CATEGORIES.map((category) => {
                        const categoryPermissions = category.permissions
                        const selectedCount = categoryPermissions.filter((p) =>
                            selectedPermissions.includes(p)
                        ).length
                        const allSelected = categoryPermissions.length === selectedCount

                        return (
                            <div key={category.category} className="border-b last:border-b-0 pb-4 last:pb-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.category}`}
                                            checked={allSelected}
                                            onChange={() => toggleCategory(category)}
                                            className="form-checkbox"
                                        />
                                        <label
                                            htmlFor={`category-${category.category}`}
                                            className="font-medium cursor-pointer">
                                            {category.category}
                                        </label>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-dark-500">
                                        {selectedCount}/{categoryPermissions.length}
                                    </span>
                                </div>
                                <div className="ml-6 space-y-2">
                                    {categoryPermissions.map((permission) => {
                                        const permissionKey = permission.replace(/_/g, ' ')
                                        return (
                                            <div key={permission} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`perm-${permission}`}
                                                    checked={selectedPermissions.includes(permission)}
                                                    onChange={() => togglePermission(permission)}
                                                    className="form-checkbox"
                                                />
                                                <label
                                                    htmlFor={`perm-${permission}`}
                                                    className="text-sm cursor-pointer capitalize">
                                                    {permissionKey}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex justify-end gap-3 col-span-12">
                <button type="button" className="btn btn-sub-primary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {role ? 'Update Role' : 'Create Role'}
                </button>
            </div>
        </form>
    )
}

export default RoleForm

