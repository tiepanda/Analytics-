'use client'

import React, { useState, useRef, useMemo } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import RoleList from '@src/views/RoleManagement/RoleList'
import RoleForm from '@src/views/RoleManagement/RoleForm'
import RoleStatsCards from '@src/views/RoleManagement/RoleStatsCards'
import { Modal } from '@src/components/custom/modal/modal'
import { RoleData, MOCK_ROLES } from '@src/data/roles'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { AlertTriangle, XCircle, Upload, Download, CirclePlus } from 'lucide-react'
import { exportRolesToFile, importRolesFromFile, validateImportedRoles } from '@src/utils/roleExportImport'

const RolesPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [roles] = useState<RoleData[]>(MOCK_ROLES)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const isAdmin = rbacService.isAdmin(user)

    // Filter roles based on user (must be before conditional return)
    const accessibleRoles = useMemo(() => {
        if (isSuperAdmin) {
            return roles // SuperAdmin sees all roles
        }
        // Admin sees predefined + company roles
        return roles.filter(
            (role) => role.isPredefined || role.companyId === user?.compId
        )
    }, [isSuperAdmin, user?.compId, roles])

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user || (!isSuperAdmin && !isAdmin)) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, isAdmin, router])

    if (!user || (!isSuperAdmin && !isAdmin)) {
        return null
    }

    const handleCreateRole = () => {
        setSelectedRole(null)
        setShowCreateModal(true)
    }

    const handleEditRole = (role: RoleData) => {
        setSelectedRole(role)
        setShowEditModal(true)
    }

    const handleDeleteRole = (role: RoleData) => {
        setSelectedRole(role)
        setShowDeleteModal(true)
        setDeleteConfirm('')
    }

    const handleViewRole = (role: RoleData) => {
        setSelectedRole(role)
        setShowViewModal(true)
    }

    const handleSaveRole = (roleData: Partial<RoleData>) => {
        // TODO: Call API to save role
        console.log('Saving role:', roleData)
        // Simulate API call
        setTimeout(() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedRole(null)
            // Refresh role list
            window.location.reload()
        }, 500)
    }

    const handleConfirmDelete = () => {
        if (deleteConfirm === selectedRole?.name) {
            // TODO: Call API to delete role
            console.log('Deleting role:', selectedRole?.id)
            // Simulate API call
            setTimeout(() => {
                setShowDeleteModal(false)
                setSelectedRole(null)
                setDeleteConfirm('')
                // Refresh role list
                window.location.reload()
            }, 500)
        }
    }

    const isPredefined = selectedRole?.isPredefined || false
    const hasUsers = (selectedRole?.userCount || 0) > 0

    const handleExportRoles = () => {
        exportRolesToFile(accessibleRoles)
    }

    const handleImportRoles = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const template = await importRolesFromFile(file)
            const { valid, errors } = validateImportedRoles(template.roles, accessibleRoles)

            if (errors.length > 0) {
                alert(`Import errors:\n${errors.join('\n')}`)
                return
            }

            if (valid.length === 0) {
                alert('No valid roles to import')
                return
            }

            // TODO: Call API to import roles
            console.log('Importing roles:', valid)
            alert(`Successfully imported ${valid.length} role(s)`)

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            alert(`Failed to import roles: ${error instanceof Error ? error.message : 'Unknown error'}`)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <>
            <BreadCrumb title={'Roles & Permissions'} subTitle={'Super Admin'} />

            {/* Header with Title, Subtitle, and Action Buttons */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        Roles & Permissions
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Manage role hierarchy and permissions across the platform
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleImportRoles}>
                        <Upload className="size-4" />
                        Import Role from Template
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleExportRoles}>
                        <Download className="size-4" />
                        Export Roles
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary flex items-center gap-2 h-10"
                        onClick={handleCreateRole}>
                        <CirclePlus className="size-4" />
                        Create New Role
                    </button>
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
                <RoleStatsCards roles={accessibleRoles} />
            </div>

            {/* Role List */}
            <div className="grid grid-cols-12 gap-x-space">
                <RoleList
                    onCreateRole={handleCreateRole}
                    onEditRole={handleEditRole}
                    onDeleteRole={handleDeleteRole}
                    onViewRole={handleViewRole}
                    showCreateButton={false}
                />
            </div>

            {/* Create Role Modal */}
            {showCreateModal && (
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    position="modal-center"
                    title="Create New Role"
                    id="createRoleModal"
                    size="modal-xl"
                    content={
                        <RoleForm
                            onSave={handleSaveRole}
                            onCancel={() => setShowCreateModal(false)}
                            isSuperAdmin={isSuperAdmin}
                            userCompanyId={user?.compId}
                        />
                    }
                />
            )}

            {/* Edit Role Modal */}
            {showEditModal && selectedRole && (
                <Modal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    position="modal-center"
                    title="Edit Role"
                    id="editRoleModal"
                    size="modal-xl"
                    content={
                        <RoleForm
                            role={selectedRole}
                            onSave={handleSaveRole}
                            onCancel={() => setShowEditModal(false)}
                            isSuperAdmin={isSuperAdmin}
                            userCompanyId={user?.compId}
                        />
                    }
                />
            )}

            {/* View Role Modal */}
            {showViewModal && selectedRole && (
                <Modal
                    isOpen={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    position="modal-center"
                    title="Role Details"
                    id="viewRoleModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                    Role Name
                                </label>
                                <p className="text-base font-medium">{selectedRole.name}</p>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                    Code
                                </label>
                                <p className="text-base">{selectedRole.code}</p>
                            </div>
                            {selectedRole.description && (
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Description
                                    </label>
                                    <p className="text-base">{selectedRole.description}</p>
                                </div>
                            )}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                    Type
                                </label>
                                <span className="badge badge-blue">
                                    {selectedRole.isPredefined ? 'Predefined' : 'Custom'}
                                </span>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                    Permissions ({selectedRole.permissionCount})
                                </label>
                                <div className="p-3 mt-2 bg-gray-50 dark:bg-dark-850 rounded-lg max-h-60 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedRole.permissions.map((perm) => (
                                            <span
                                                key={perm}
                                                className="badge badge-purple text-xs">
                                                {perm.replace(/_/g, ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Users Assigned
                                    </label>
                                    <p className="text-base">{selectedRole.userCount || 0}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Status
                                    </label>
                                    <span
                                        className={`badge ${selectedRole.isActive ? 'badge-green' : 'badge-red'
                                            }`}>
                                        {selectedRole.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                    footer={
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowViewModal(false)}>
                            Close
                        </button>
                    }
                />
            )}

            {/* Delete Role Modal */}
            {showDeleteModal && selectedRole && (
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false)
                        setDeleteConfirm('')
                    }}
                    position="modal-center"
                    title="Delete Role"
                    id="deleteRoleModal"
                    size="modal-md"
                    content={
                        <div className="space-y-4">
                            {hasUsers ? (
                                <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <XCircle className="mt-0.5 text-red-500 shrink-0" />
                                        <div>
                                            <h6 className="font-medium text-red-600 dark:text-red-400">
                                                Cannot Delete Role
                                            </h6>
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                This role has {selectedRole.userCount} user(s) assigned to it.
                                                Please reassign users to another role before deleting.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : isPredefined ? (
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="mt-0.5 text-yellow-500 shrink-0" />
                                        <div>
                                            <h6 className="font-medium text-yellow-600 dark:text-yellow-400">
                                                Predefined Role
                                            </h6>
                                            <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                                                Predefined roles cannot be deleted. Only custom roles can be removed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Are you sure you want to delete the role{' '}
                                        <strong>{selectedRole.name}</strong>? This action cannot be undone.
                                    </p>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Type <strong>{selectedRole.name}</strong> to confirm:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={deleteConfirm}
                                            onChange={(e) => setDeleteConfirm(e.target.value)}
                                            placeholder={selectedRole.name}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    }
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-sub-primary"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    setDeleteConfirm('')
                                }}>
                                Cancel
                            </button>
                            {!hasUsers && !isPredefined && (
                                <button
                                    className="btn btn-sub-red"
                                    onClick={handleConfirmDelete}
                                    disabled={deleteConfirm !== selectedRole.name}>
                                    Delete Role
                                </button>
                            )}
                        </div>
                    }
                />
            )}
        </>
    )
}

export default RolesPage

