'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Eye, Shield, Search, CirclePlus, Building2 } from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import { RoleData, MOCK_ROLES } from '@src/data/roles'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'

interface RoleListProps {
    onCreateRole: () => void
    onEditRole: (role: RoleData) => void
    onDeleteRole: (role: RoleData) => void
    onViewRole: (role: RoleData) => void
    showCreateButton?: boolean
}

const RoleList: React.FC<RoleListProps> = ({
    onCreateRole,
    onEditRole,
    onDeleteRole,
    onViewRole,
    showCreateButton = true,
}) => {
    const { user } = useAuth()
    const [roles] = useState<RoleData[]>(MOCK_ROLES)
    const [filteredRoles, setFilteredRoles] = useState<RoleData[]>(MOCK_ROLES)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    const isSuperAdmin = rbacService.isSuperAdmin(user)
    const userCompanyId = user?.compId

    // Filter roles based on user role
    const accessibleRoles = useMemo(() => {
        if (isSuperAdmin) {
            return roles // SuperAdmin sees all roles
        }
        // Admin sees predefined roles + company-specific roles
        return roles.filter(
            (role) => role.isPredefined || role.companyId === userCompanyId
        )
    }, [roles, isSuperAdmin, userCompanyId])

    // Filter by search term
    React.useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredRoles(accessibleRoles)
        } else {
            const filtered = accessibleRoles.filter(
                (role) =>
                    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredRoles(filtered)
        }
    }, [searchTerm, accessibleRoles])

    const columns = useMemo(
        () => [
            {
                header: 'Role Name',
                accessorKey: 'name',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <div className="flex items-center gap-2">
                        <Shield className="size-4 text-primary-500" />
                        <span className="font-medium">{row.original.name}</span>
                        {row.original.isPredefined && (
                            <span className="badge badge-blue">Predefined</span>
                        )}
                    </div>
                ),
            },
            {
                header: 'Code',
                accessorKey: 'code',
            },
            {
                header: 'Description',
                accessorKey: 'description',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <span className="text-gray-500 dark:text-dark-500">
                        {row.original.description || '-'}
                    </span>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'companyName',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <div className="flex items-center gap-2">
                        {row.original.companyId ? (
                            <>
                                <Building2 className="size-4 text-gray-500" />
                                <span>{row.original.companyName || `Company ${row.original.companyId}`}</span>
                            </>
                        ) : (
                            <span className="text-gray-500 dark:text-dark-500">System-wide</span>
                        )}
                    </div>
                ),
            },
            {
                header: 'Permissions',
                accessorKey: 'permissionCount',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <span className="badge badge-purple">
                        {row.original.permissionCount} permissions
                    </span>
                ),
            },
            {
                header: 'Users',
                accessorKey: 'userCount',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <span>{row.original.userCount || 0}</span>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'isActive',
                cell: ({ row }: { row: { original: RoleData } }) => (
                    <span
                        className={`badge ${row.original.isActive ? 'badge-green' : 'badge-red'
                            }`}>
                        {row.original.isActive ? 'Active' : 'Inactive'}
                    </span>
                ),
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: RoleData } }) => {
                    const role = row.original
                    const canEdit = !role.isPredefined // Only custom roles can be edited
                    const canDelete = !role.isPredefined && (role.userCount || 0) === 0 // Only custom roles without users

                    return (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onViewRole(role)}
                                className="btn btn-icon !size-8 btn-sub-primary"
                                title="View Details">
                                <Eye className="size-3.5" />
                            </button>
                            {canEdit && (
                                <button
                                    onClick={() => onEditRole(role)}
                                    className="btn btn-icon !size-8 btn-sub-primary"
                                    title="Edit Role">
                                    <Edit className="size-3.5" />
                                </button>
                            )}
                            {canDelete && (
                                <button
                                    onClick={() => onDeleteRole(role)}
                                    className="btn btn-icon !size-8 btn-sub-red"
                                    title="Delete Role">
                                    <Trash2 className="size-3.5" />
                                </button>
                            )}
                        </div>
                    )
                },
            },
        ],
        [onViewRole, onEditRole, onDeleteRole]
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="col-span-12 card">
            <div className="grid grid-cols-12 lg:items-center card-header gap-space">
                <div className="col-span-12 lg:col-span-3">
                    <h6 className="card-title">Roles ({filteredRoles.length})</h6>
                </div>
                <div className="col-span-12 lg:col-start-7 lg:col-span-6 2xl:col-span-4 2xl:col-start-9">
                    <div className="flex items-center gap-space">
                        <div className="relative group/form grow">
                            <input
                                type="text"
                                className="pl-9 form-input group-[&.right]/form:pr-9 group-[&.right]/form:pl-4"
                                placeholder="Search roles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 left-3 group-[&.right]/form:right-3 group-[&.right]/form:left-auto focus:outline-hidden">
                                <Search className="size-4" />
                            </button>
                        </div>
                        {showCreateButton && (
                            <button
                                type="button"
                                className="btn btn-primary shrink-0"
                                onClick={onCreateRole}>
                                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                                Create Role
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-0 card-body">
                <TableContainer
                    isSearch={false}
                    isPagination={false}
                    columns={columns}
                    data={paginatedRoles}
                    divClass="overflow-x-auto table-box"
                    tableClass="table whitespace-nowrap"
                    thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500 cursor-pointer"
                    tbodyClass="pt-0"
                    isTableFooter={false}
                />
                {filteredRoles.length > 0 && (
                    <Pagination
                        totalItems={filteredRoles.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}

export default RoleList

