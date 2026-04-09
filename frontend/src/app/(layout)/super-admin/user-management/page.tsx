'use client'

import React, { useState, useMemo } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import { Modal } from '@src/components/custom/modal/modal'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import {
    CirclePlus,
    Upload,
    Download,
    Send,
    Users,
    UserPlus,
    Activity,
    FolderTree,
    XCircle,
    AlertTriangle,
} from 'lucide-react'
import UserStatsCards from '@src/views/UserManagement/UserStatsCards'
import UserList from '@src/views/UserManagement/UserList'
import UserForm from '@src/views/UserManagement/UserForm'
import UserActivityTab from '@src/views/UserManagement/UserActivityTab'
import UserGroupsTab from '@src/views/UserManagement/UserGroupsTab'
import { User, MOCK_USERS } from '@src/data/users'

const UserManagementPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'list' | 'activity' | 'groups'>('list')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [users] = useState<User[]>(MOCK_USERS)

    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const isAdmin = rbacService.isAdmin(user)

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user || (!isSuperAdmin && !isAdmin)) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, isAdmin, router])

    if (!user || (!isSuperAdmin && !isAdmin)) {
        return null
    }

    const handleCreateUser = () => {
        setSelectedUser(null)
        setShowCreateModal(true)
    }

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setShowEditModal(true)
    }

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
        setDeleteConfirm('')
    }

    const handleViewUser = (user: User) => {
        setSelectedUser(user)
        setShowViewModal(true)
    }

    const handleResetPassword = (user: User) => {
        // TODO: Implement reset password
        alert(`Reset password for ${user.firstName} ${user.lastName}`)
    }

    const handleActivateDeactivate = (user: User) => {
        // TODO: Implement activate/deactivate
        alert(`${user.status === 'Active' ? 'Deactivate' : 'Activate'} ${user.firstName} ${user.lastName}`)
    }

    const handleSuspendUser = (user: User) => {
        // TODO: Implement suspend
        alert(`Suspend ${user.firstName} ${user.lastName}`)
    }

    const handleAssignRole = (user: User) => {
        // TODO: Implement assign role
        alert(`Assign role to ${user.firstName} ${user.lastName}`)
    }

    const handleViewActivity = (user: User) => {
        // TODO: Navigate to user activity or show modal
        alert(`View activity for ${user.firstName} ${user.lastName}`)
    }

    const handleSendNotification = (user: User) => {
        // TODO: Implement send notification
        alert(`Send notification to ${user.firstName} ${user.lastName}`)
    }

    const handleSaveUser = (userData: Partial<User>) => {
        // TODO: Call API to save user
        console.log('Saving user:', userData)
        setTimeout(() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedUser(null)
        }, 500)
    }

    const handleConfirmDelete = () => {
        if (deleteConfirm === selectedUser?.email) {
            // TODO: Call API to delete user
            console.log('Deleting user:', selectedUser?.id)
            setTimeout(() => {
                setShowDeleteModal(false)
                setSelectedUser(null)
                setDeleteConfirm('')
            }, 500)
        }
    }

    const tabs = [
        { id: 'list', label: 'User List', icon: Users },
        { id: 'activity', label: 'Activity & Monitoring', icon: Activity },
        { id: 'groups', label: 'Groups & Bulk Operations', icon: FolderTree },
    ]

    return (
        <>
            <BreadCrumb title={'User Management'} subTitle={'Super Admin'} />

            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        User Management
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Comprehensive system-wide user administration for managing users across all companies
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={() => alert('Bulk Import Users')}>
                        <Upload className="size-4" />
                        Bulk Import Users
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={() => alert('Export User List')}>
                        <Download className="size-4" />
                        Export User List
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={() => alert('Send Bulk Notification')}>
                        <Send className="size-4" />
                        Send Bulk Notification
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary flex items-center gap-2 h-10"
                        onClick={handleCreateUser}>
                        <CirclePlus className="size-4" />
                        Create New User
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mb-6">
                <UserStatsCards users={users} />
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
                <div className="border-b border-gray-200 dark:border-dark-700">
                    <nav className="flex -mb-px space-x-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id as 'list' | 'activity' | 'groups')}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-dark-500 dark:hover:text-dark-400'
                                    }`}>
                                    <Icon className="size-4" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-12 gap-x-space">
                {activeTab === 'list' && (
                    <UserList
                        users={users}
                        onViewUser={handleViewUser}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                        onResetPassword={handleResetPassword}
                        onActivateDeactivate={handleActivateDeactivate}
                        onSuspendUser={handleSuspendUser}
                        onAssignRole={handleAssignRole}
                        onViewActivity={handleViewActivity}
                        onSendNotification={handleSendNotification}
                    />
                )}
                {activeTab === 'activity' && <UserActivityTab />}
                {activeTab === 'groups' && <UserGroupsTab />}
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    position="modal-center"
                    title="Create New User"
                    id="createUserModal"
                    size="modal-xl"
                    content={<UserForm onSave={handleSaveUser} onCancel={() => setShowCreateModal(false)} />}
                />
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <Modal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    position="modal-center"
                    title="Edit User"
                    id="editUserModal"
                    size="modal-xl"
                    content={
                        <UserForm
                            user={selectedUser}
                            onSave={handleSaveUser}
                            onCancel={() => setShowEditModal(false)}
                            isEdit={true}
                        />
                    }
                />
            )}

            {/* View User Modal */}
            {showViewModal && selectedUser && (
                <Modal
                    isOpen={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    position="modal-center"
                    title="User Details"
                    id="viewUserModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                {selectedUser.avatar ? (
                                    <img
                                        src={selectedUser.avatar}
                                        alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                        className="size-16 rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center size-16 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                        {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                                    </div>
                                )}
                                <div>
                                    <h6 className="text-lg font-semibold">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </h6>
                                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                    <p className="text-sm text-gray-500">{selectedUser.userId}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Company
                                    </label>
                                    <p className="text-base">{selectedUser.companyName}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Role
                                    </label>
                                    <p className="text-base">{selectedUser.role}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Status
                                    </label>
                                    <span
                                        className={`badge ${
                                            selectedUser.status === 'Active'
                                                ? 'badge-green'
                                                : selectedUser.status === 'Suspended'
                                                  ? 'badge-red'
                                                  : 'badge-gray'
                                        }`}>
                                        {selectedUser.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        MFA Status
                                    </label>
                                    <span
                                        className={`badge ${selectedUser.mfaEnabled ? 'badge-green' : 'badge-gray'}`}>
                                        {selectedUser.mfaEnabled ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Last Login
                                    </label>
                                    <p className="text-base">
                                        {selectedUser.lastLogin
                                            ? new Date(selectedUser.lastLogin).toLocaleString()
                                            : 'Never'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Created Date
                                    </label>
                                    <p className="text-base">
                                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-sub-primary"
                                onClick={() => {
                                    handleEditUser(selectedUser)
                                    setShowViewModal(false)
                                }}>
                                Edit User
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowViewModal(false)}>
                                Close
                            </button>
                        </div>
                    }
                />
            )}

            {/* Delete User Modal */}
            {showDeleteModal && selectedUser && (
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false)
                        setDeleteConfirm('')
                    }}
                    position="modal-center"
                    title="Delete User"
                    id="deleteUserModal"
                    size="modal-md"
                    content={
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <XCircle className="mt-0.5 text-red-500 shrink-0" />
                                    <div>
                                        <h6 className="font-medium text-red-600 dark:text-red-400">
                                            Delete User Account
                                        </h6>
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            This action cannot be undone. All user data will be permanently deleted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                Are you sure you want to delete the user{' '}
                                <strong>
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </strong>{' '}
                                ({selectedUser.email})? This action cannot be undone.
                            </p>
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Type <strong>{selectedUser.email}</strong> to confirm:
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={deleteConfirm}
                                    onChange={(e) => setDeleteConfirm(e.target.value)}
                                    placeholder={selectedUser.email}
                                />
                            </div>
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
                            <button
                                className="btn btn-sub-red"
                                onClick={handleConfirmDelete}
                                disabled={deleteConfirm !== selectedUser.email}>
                                Delete User
                            </button>
                        </div>
                    }
                />
            )}
        </>
    )
}

export default UserManagementPage

