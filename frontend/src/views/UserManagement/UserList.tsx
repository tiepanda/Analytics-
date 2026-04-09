'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { Edit, Trash2, Eye, MoreVertical, Search, CheckSquare, Square, Building2, Shield, Clock, CheckCircle2, XCircle, AlertTriangle, Lock } from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import { User, UserStatus, UserRole } from '@src/data/users'
import { MOCK_COMPANIES } from '@src/data/companies'

interface UserListProps {
    users: User[]
    onViewUser: (user: User) => void
    onEditUser: (user: User) => void
    onDeleteUser: (user: User) => void
    onResetPassword: (user: User) => void
    onActivateDeactivate: (user: User) => void
    onSuspendUser: (user: User) => void
    onAssignRole: (user: User) => void
    onViewActivity: (user: User) => void
    onSendNotification: (user: User) => void
}

const UserList: React.FC<UserListProps> = ({
    users,
    onViewUser,
    onEditUser,
    onDeleteUser,
    onResetPassword,
    onActivateDeactivate,
    onSuspendUser,
    onAssignRole,
    onViewActivity,
    onSendNotification,
}) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<{
        company?: string
        role?: UserRole | 'All'
        status?: UserStatus | 'All'
        department?: string
        mfaStatus?: 'All' | 'Enabled' | 'Disabled'
    }>({
        company: 'All',
        role: 'All',
        status: 'All',
        department: 'All',
        mfaStatus: 'All',
    })
    const itemsPerPage = 10

    // Get unique values for filters
    const companies = useMemo(() => ['All', ...Array.from(new Set(users.map(u => u.companyName)))], [users])
    const roles = useMemo(() => ['All', ...Array.from(new Set(users.map(u => u.role)))], [users])
    const statuses = useMemo(() => ['All', ...Array.from(new Set(users.map(u => u.status)))], [users])
    const departments = useMemo(() => ['All', ...Array.from(new Set(users.map(u => u.department).filter(Boolean)))], [users])

    // Filter users
    useEffect(() => {
        let filtered = [...users]

        // Search filter
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase()
            filtered = filtered.filter(
                (user) =>
                    user.firstName.toLowerCase().includes(searchLower) ||
                    user.lastName.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower) ||
                    user.userId.toLowerCase().includes(searchLower) ||
                    user.companyName.toLowerCase().includes(searchLower)
            )
        }

        // Company filter
        if (filters.company && filters.company !== 'All') {
            filtered = filtered.filter((user) => user.companyName === filters.company)
        }

        // Role filter
        if (filters.role && filters.role !== 'All') {
            filtered = filtered.filter((user) => user.role === filters.role)
        }

        // Status filter
        if (filters.status && filters.status !== 'All') {
            filtered = filtered.filter((user) => user.status === filters.status)
        }

        // Department filter
        if (filters.department && filters.department !== 'All') {
            filtered = filtered.filter((user) => user.department === filters.department)
        }

        // MFA filter
        if (filters.mfaStatus && filters.mfaStatus !== 'All') {
            if (filters.mfaStatus === 'Enabled') {
                filtered = filtered.filter((user) => user.mfaEnabled)
            } else {
                filtered = filtered.filter((user) => !user.mfaEnabled)
            }
        }

        setFilteredUsers(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [searchTerm, filters, users])

    const getStatusBadge = (status: UserStatus) => {
        const statusConfig = {
            Active: { className: 'badge-green', icon: CheckCircle2 },
            Inactive: { className: 'badge-gray', icon: XCircle },
            Suspended: { className: 'badge-red', icon: AlertTriangle },
            'Pending Activation': { className: 'badge-yellow', icon: Clock },
            Locked: { className: 'badge-orange', icon: Lock },
        }
        const config = statusConfig[status] || statusConfig.Inactive
        const Icon = config.icon
        return (
            <span className={`badge ${config.className} flex items-center gap-1`}>
                <Icon className="size-3" />
                {status}
            </span>
        )
    }

    const getRoleBadge = (role: UserRole) => {
        const roleColors: Record<string, string> = {
            'Super Admin': 'badge-purple',
            'Company Admin': 'badge-blue',
            'Manager': 'badge-green',
            'Supervisor': 'badge-yellow',
            'Operator': 'badge-gray',
            'Quality Inspector': 'badge-orange',
            'Maintenance Technician': 'badge-indigo',
            'Viewer': 'badge-gray',
            'Custom': 'badge-pink',
        }
        return <span className={`badge ${roleColors[role] || 'badge-gray'}`}>{role}</span>
    }

    const formatLastLogin = (lastLogin?: string) => {
        if (!lastLogin) return 'Never'
        const date = new Date(lastLogin)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / (1000 * 60))
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffMins < 60) return `${diffMins} minutes ago`
        if (diffHours < 24) return `${diffHours} hours ago`
        if (diffDays < 7) return `${diffDays} days ago`
        return date.toLocaleDateString()
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

    const handleSelectAll = () => {
        if (selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0) {
            setSelectedUsers(new Set())
        } else {
            setSelectedUsers(new Set(paginatedUsers.map(u => u.id)))
        }
    }

    const handleSelectUser = (userId: string) => {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(userId)) {
            newSelected.delete(userId)
        } else {
            newSelected.add(userId)
        }
        setSelectedUsers(newSelected)
    }

    const columns = useMemo(
        () => [
            {
                header: () => (
                    <div className="flex items-center">
                        <button
                            onClick={handleSelectAll}
                            className="flex items-center justify-center">
                            {selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0 ? (
                                <CheckSquare className="size-4 text-primary-500" />
                            ) : (
                                <Square className="size-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                ),
                accessorKey: 'checkbox',
                cell: ({ row }: { row: { original: User } }) => (
                    <button
                        onClick={() => handleSelectUser(row.original.id)}
                        className="flex items-center justify-center">
                        {selectedUsers.has(row.original.id) ? (
                            <CheckSquare className="size-4 text-primary-500" />
                        ) : (
                            <Square className="size-4 text-gray-400" />
                        )}
                    </button>
                ),
            },
            {
                header: 'User ID',
                accessorKey: 'userId',
                cell: ({ row }: { row: { original: User } }) => (
                    <span className="text-sm font-medium">{row.original.userId}</span>
                ),
            },
            {
                header: 'User',
                accessorKey: 'name',
                cell: ({ row }: { row: { original: User } }) => {
                    const user = row.original
                    return (
                        <div className="flex items-center gap-3">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="size-8 rounded-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center size-8 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                            )}
                            <div>
                                <button
                                    onClick={() => onViewUser(user)}
                                    className="font-medium text-left hover:text-primary-500">
                                    {user.firstName} {user.lastName}
                                </button>
                                <p className="text-xs text-gray-500 dark:text-dark-500">{user.email}</p>
                            </div>
                        </div>
                    )
                },
            },
            {
                header: 'Company',
                accessorKey: 'companyName',
                cell: ({ row }: { row: { original: User } }) => (
                    <div className="flex items-center gap-2">
                        <Building2 className="size-4 text-gray-500" />
                        <button
                            onClick={() => {/* Navigate to company */}}
                            className="hover:text-primary-500">
                            {row.original.companyName}
                        </button>
                    </div>
                ),
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: ({ row }: { row: { original: User } }) => getRoleBadge(row.original.role),
            },
            {
                header: 'Department',
                accessorKey: 'department',
                cell: ({ row }: { row: { original: User } }) => (
                    <span className="text-sm">{row.original.department || '-'}</span>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: { original: User } }) => getStatusBadge(row.original.status),
            },
            {
                header: 'Last Login',
                accessorKey: 'lastLogin',
                cell: ({ row }: { row: { original: User } }) => (
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 text-gray-400" />
                        <span className="text-sm">{formatLastLogin(row.original.lastLogin)}</span>
                    </div>
                ),
            },
            {
                header: 'MFA',
                accessorKey: 'mfaEnabled',
                cell: ({ row }: { row: { original: User } }) => (
                    <span className={`badge ${row.original.mfaEnabled ? 'badge-green' : 'badge-gray'}`}>
                        {row.original.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                ),
            },
            {
                header: 'Created',
                accessorKey: 'createdAt',
                cell: ({ row }: { row: { original: User } }) => (
                    <span className="text-sm">
                        {new Date(row.original.createdAt).toLocaleDateString()}
                    </span>
                ),
            },
            {
                header: 'Actions',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: User } }) => {
                    return <UserActionCell user={row.original} onViewUser={onViewUser} onEditUser={onEditUser} onDeleteUser={onDeleteUser} onResetPassword={onResetPassword} onActivateDeactivate={onActivateDeactivate} onSuspendUser={onSuspendUser} onAssignRole={onAssignRole} onViewActivity={onViewActivity} onSendNotification={onSendNotification} />
                },
            },
        ],
        [selectedUsers, paginatedUsers, onViewUser, onEditUser, onDeleteUser, onResetPassword, onActivateDeactivate, onSuspendUser, onAssignRole, onViewActivity, onSendNotification]
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="col-span-12 card">
            <div className="grid grid-cols-12 lg:items-center card-header gap-space">
                <div className="col-span-12 lg:col-span-3">
                    <h6 className="card-title">Users ({filteredUsers.length})</h6>
                </div>
                <div className="col-span-12 lg:col-start-7 lg:col-span-6 2xl:col-span-4 2xl:col-start-9">
                    <div className="flex items-center gap-space">
                        <div className="relative group/form grow">
                            <input
                                type="text"
                                className="pl-9 form-input group-[&.right]/form:pr-9 group-[&.right]/form:pl-4"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 left-3 group-[&.right]/form:right-3 group-[&.right]/form:left-auto focus:outline-hidden">
                                <Search className="size-4" />
                            </button>
                        </div>
                        <button
                            type="button"
                            className="btn btn-sub-primary shrink-0"
                            onClick={() => setShowFilters(!showFilters)}>
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="p-4 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-850">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Company</label>
                            <select
                                className="form-select"
                                value={filters.company || 'All'}
                                onChange={(e) => setFilters({ ...filters, company: e.target.value })}>
                                {companies.map((company) => (
                                    <option key={company} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Role</label>
                            <select
                                className="form-select"
                                value={filters.role || 'All'}
                                onChange={(e) => setFilters({ ...filters, role: e.target.value as UserRole | 'All' })}>
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Status</label>
                            <select
                                className="form-select"
                                value={filters.status || 'All'}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value as UserStatus | 'All' })}>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Department</label>
                            <select
                                className="form-select"
                                value={filters.department || 'All'}
                                onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">MFA Status</label>
                            <select
                                className="form-select"
                                value={filters.mfaStatus || 'All'}
                                onChange={(e) => setFilters({ ...filters, mfaStatus: e.target.value as 'All' | 'Enabled' | 'Disabled' })}>
                                <option value="All">All</option>
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Actions */}
            {selectedUsers.size > 0 && (
                <div className="p-4 border-b border-gray-200 dark:border-dark-700 bg-primary-50 dark:bg-primary-900/20">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {selectedUsers.size} user(s) selected
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="btn btn-sm btn-sub-primary">Activate Selected</button>
                            <button className="btn btn-sm btn-sub-primary">Deactivate Selected</button>
                            <button className="btn btn-sm btn-sub-primary">Suspend Selected</button>
                            <button className="btn btn-sm btn-sub-primary">Assign Role</button>
                            <button className="btn btn-sm btn-sub-primary">Send Notification</button>
                            <button className="btn btn-sm btn-sub-primary">Export Selected</button>
                            <button className="btn btn-sm btn-sub-red">Delete Selected</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-0 card-body">
                <TableContainer
                    isSearch={false}
                    isPagination={false}
                    columns={columns}
                    data={paginatedUsers}
                    divClass="overflow-x-auto table-box"
                    tableClass="table whitespace-nowrap"
                    thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500 cursor-pointer"
                    tbodyClass="pt-0"
                    isTableFooter={false}
                />
                {filteredUsers.length > 0 && (
                    <Pagination
                        totalItems={filteredUsers.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}

// Separate component for action cell to avoid useState in cell renderer
const UserActionCell: React.FC<{
    user: User
    onViewUser: (user: User) => void
    onEditUser: (user: User) => void
    onDeleteUser: (user: User) => void
    onResetPassword: (user: User) => void
    onActivateDeactivate: (user: User) => void
    onSuspendUser: (user: User) => void
    onAssignRole: (user: User) => void
    onViewActivity: (user: User) => void
    onSendNotification: (user: User) => void
}> = ({ user, onViewUser, onEditUser, onDeleteUser, onResetPassword, onActivateDeactivate, onSuspendUser, onAssignRole, onViewActivity, onSendNotification }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="btn btn-icon !size-8 btn-sub-primary">
                <MoreVertical className="size-4" />
            </button>
            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 z-20 mt-1 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700">
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    onViewUser(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Eye className="size-4" />
                                View Details
                            </button>
                            <button
                                onClick={() => {
                                    onEditUser(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Edit className="size-4" />
                                Edit User
                            </button>
                            <button
                                onClick={() => {
                                    onResetPassword(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Shield className="size-4" />
                                Reset Password
                            </button>
                            <button
                                onClick={() => {
                                    onActivateDeactivate(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                {user.status === 'Active' ? (
                                    <>
                                        <XCircle className="size-4" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="size-4" />
                                        Activate
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    onSuspendUser(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <AlertTriangle className="size-4" />
                                Suspend User
                            </button>
                            <button
                                onClick={() => {
                                    onAssignRole(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Shield className="size-4" />
                                Assign Role
                            </button>
                            <button
                                onClick={() => {
                                    onViewActivity(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Clock className="size-4" />
                                View Activity Log
                            </button>
                            <button
                                onClick={() => {
                                    onSendNotification(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-850">
                                <Eye className="size-4" />
                                Send Notification
                            </button>
                            <hr className="my-1 border-gray-200 dark:border-dark-700" />
                            <button
                                onClick={() => {
                                    onDeleteUser(user)
                                    setShowMenu(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                                <Trash2 className="size-4" />
                                Delete User
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserList

