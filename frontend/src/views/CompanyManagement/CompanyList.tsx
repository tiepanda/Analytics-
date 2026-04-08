'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import {
    Edit,
    Trash2,
    Eye,
    Search,
    Building2,
    MoreVertical,
    Users,
    Calendar,
    Clock,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import { Company, CompanyStatus } from '@src/data/companies'

interface CompanyListProps {
    companies: Company[]
    onEditCompany: (company: Company) => void
    onDeleteCompany: (company: Company) => void
    onViewCompany: (company: Company) => void
    onManageUsers: (company: Company) => void
    onViewLicenses: (company: Company) => void
    onSuspendCompany: (company: Company) => void
    onActivateCompany: (company: Company) => void
}

const CompanyList: React.FC<CompanyListProps> = ({
    companies,
    onEditCompany,
    onDeleteCompany,
    onViewCompany,
    onManageUsers,
    onViewLicenses,
    onSuspendCompany,
    onActivateCompany,
}) => {
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
    const itemsPerPage = 10

    // Initialize filtered companies when companies prop changes
    React.useEffect(() => {
        setFilteredCompanies(companies)
    }, [companies])

    // Filter companies
    React.useEffect(() => {
        let filtered = companies

        // Filter by search term
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(
                (company) =>
                    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    company.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    company.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter((company) => company.status === selectedStatus)
        }

        // Filter by industry
        if (selectedIndustry !== 'all') {
            filtered = filtered.filter((company) => company.industryType === selectedIndustry)
        }

        setFilteredCompanies(filtered)
        setCurrentPage(1)
    }, [searchTerm, selectedStatus, selectedIndustry, companies])

    const getStatusBadge = (status: CompanyStatus) => {
        const badges = {
            Active: 'badge-green',
            Inactive: 'badge-gray',
            Suspended: 'badge-red',
            Trial: 'badge-yellow',
        }
        return badges[status] || 'badge-gray'
    }

    const getLicenseBadge = (licenseType: string) => {
        const badges = {
            Basic: 'badge-blue',
            Standard: 'badge-purple',
            Premium: 'badge-orange',
            Enterprise: 'badge-green',
        }
        return badges[licenseType as keyof typeof badges] || 'badge-gray'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const getTimeAgo = (dateString: string): string => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffHours < 1) return 'Just now'
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
        return `${Math.floor(diffDays / 30)} months ago`
    }

    const columns = useMemo(
        () => [
            {
                header: 'Company',
                accessorKey: 'name',
                cell: ({ row }: { row: { original: Company } }) => (
                    <div className="flex items-center gap-3">
                        {row.original.logo ? (
                            <img
                                src={row.original.logo}
                                alt={row.original.name}
                                className="size-10 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-dark-850">
                                <Building2 className="size-5 text-gray-500" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/super-admin/companies/${row.original.id}`}
                                    className="font-medium hover:text-primary-500">
                                    {row.original.name}
                                </Link>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-dark-500">
                                {row.original.companyId}
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Industry',
                accessorKey: 'industryType',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className="badge badge-blue">{row.original.industryType}</span>
                ),
            },
            {
                header: 'Contact',
                accessorKey: 'contactPerson',
                cell: ({ row }: { row: { original: Company } }) => (
                    <div>
                        <div className="font-medium">{row.original.contactPerson}</div>
                        <div className="text-xs text-gray-500 dark:text-dark-500">
                            {row.original.email}
                        </div>
                    </div>
                ),
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
            },
            {
                header: 'License',
                accessorKey: 'licenseType',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className={`badge ${getLicenseBadge(row.original.licenseType)}`}>
                        {row.original.licenseType}
                    </span>
                ),
            },
            {
                header: 'Users',
                accessorKey: 'activeUsers',
                cell: ({ row }: { row: { original: Company } }) => (
                    <div className="flex items-center gap-1">
                        <Users className="size-4 text-gray-500" />
                        <span>{row.original.activeUsers}</span>
                        <span className="text-gray-500">/</span>
                        <span className="text-gray-500">{row.original.totalUsers}</span>
                    </div>
                ),
            },
            {
                header: 'Onboarded',
                accessorKey: 'onboardedDate',
                cell: ({ row }: { row: { original: Company } }) => (
                    <div className="flex items-center gap-1">
                        <Calendar className="size-4 text-gray-500" />
                        <span>{formatDate(row.original.onboardedDate)}</span>
                    </div>
                ),
            },
            {
                header: 'Last Activity',
                accessorKey: 'lastActivity',
                cell: ({ row }: { row: { original: Company } }) => (
                    <div className="flex items-center gap-1">
                        <Clock className="size-4 text-gray-500" />
                        <span className="text-sm">{getTimeAgo(row.original.lastActivity)}</span>
                    </div>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className={`badge ${getStatusBadge(row.original.status)}`}>
                        {row.original.status}
                    </span>
                ),
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: Company } }) => {
                    return <CompanyActionCell company={row.original} onEditCompany={onEditCompany} onDeleteCompany={onDeleteCompany} onViewCompany={onViewCompany} onManageUsers={onManageUsers} onViewLicenses={onViewLicenses} onSuspendCompany={onSuspendCompany} onActivateCompany={onActivateCompany} />
                },
            },
        ],
        [onEditCompany, onDeleteCompany, onViewCompany, onManageUsers, onViewLicenses, onSuspendCompany, onActivateCompany]
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="col-span-12 card">
            <div className="grid grid-cols-12 lg:items-center card-header gap-space">
                <div className="col-span-12 lg:col-span-3">
                    <h6 className="card-title">Companies ({filteredCompanies.length})</h6>
                </div>
                <div className="col-span-12 lg:col-start-7 lg:col-span-6 2xl:col-span-4 2xl:col-start-9">
                    <div className="flex items-center gap-space">
                        <div className="relative group/form grow">
                            <input
                                type="text"
                                className="pl-9 form-input group-[&.right]/form:pr-9 group-[&.right]/form:pl-4"
                                placeholder="Search companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 left-3 group-[&.right]/form:right-3 group-[&.right]/form:left-auto focus:outline-hidden">
                                <Search className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-dark-700">
                <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                    <select
                        className="form-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Trial">Trial</option>
                    </select>
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                    <select
                        className="form-select"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}>
                        <option value="all">All Industries</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Medical">Medical</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Pharma">Pharma</option>
                    </select>
                </div>
            </div>
            <div className="pt-0 card-body">
                <TableContainer
                    isSearch={false}
                    isPagination={false}
                    columns={columns}
                    data={paginatedCompanies}
                    divClass="overflow-x-auto table-box"
                    tableClass="table whitespace-nowrap"
                    thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500 cursor-pointer"
                    tbodyClass="pt-0"
                    isTableFooter={false}
                />
                {filteredCompanies.length > 0 && (
                    <Pagination
                        totalItems={filteredCompanies.length}
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
const CompanyActionCell: React.FC<{
    company: Company
    onEditCompany: (company: Company) => void
    onDeleteCompany: (company: Company) => void
    onViewCompany: (company: Company) => void
    onManageUsers: (company: Company) => void
    onViewLicenses: (company: Company) => void
    onSuspendCompany: (company: Company) => void
    onActivateCompany: (company: Company) => void
}> = ({ company, onEditCompany, onDeleteCompany, onViewCompany, onManageUsers, onViewLicenses, onSuspendCompany, onActivateCompany }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="btn btn-icon !size-8 btn-sub-primary">
                <MoreVertical className="size-4" />
            </button>
            {showDropdown && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 z-20 mt-1 w-48 bg-white dark:bg-dark-850 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700">
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    onViewCompany(company)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Eye className="size-4" />
                                View Details
                            </button>
                            <button
                                onClick={() => {
                                    onEditCompany(company)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Edit className="size-4" />
                                Edit Company
                            </button>
                            <button
                                onClick={() => {
                                    onManageUsers(company)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Users className="size-4" />
                                Manage Users
                            </button>
                            <button
                                onClick={() => {
                                    onViewLicenses(company)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Building2 className="size-4" />
                                View Licenses
                            </button>
                            <div className="my-1 border-t border-gray-200 dark:border-dark-700" />
                            {company.status === 'Active' ? (
                                <button
                                    onClick={() => {
                                        onSuspendCompany(company)
                                        setShowDropdown(false)
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-yellow-600 hover:bg-gray-100 dark:hover:bg-dark-700">
                                    <AlertTriangle className="size-4" />
                                    Suspend
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        onActivateCompany(company)
                                        setShowDropdown(false)
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-gray-100 dark:hover:bg-dark-700">
                                    <CheckCircle className="size-4" />
                                    Activate
                                </button>
                            )}
                            <div className="my-1 border-t border-gray-200 dark:border-dark-700" />
                            <button
                                onClick={() => {
                                    onDeleteCompany(company)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Trash2 className="size-4" />
                                Delete Company
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CompanyList

