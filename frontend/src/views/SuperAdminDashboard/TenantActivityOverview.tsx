'use client'

import React, { useState, useMemo } from 'react'
import { Building2, MoreVertical, Eye, Edit, Ban, FileText, Search, Filter } from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import { MOCK_COMPANIES, Company } from '@src/data/companies'
import { useRouter } from 'next/navigation'

const TenantActivityOverview: React.FC = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [industryFilter, setIndustryFilter] = useState<string>('')
    const [licenseFilter, setLicenseFilter] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<string>('')
    const itemsPerPage = 10

    const filteredCompanies = useMemo(() => {
        return MOCK_COMPANIES.filter((company) => {
            const matchesSearch =
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesIndustry = !industryFilter || company.industryType === industryFilter
            const matchesLicense = !licenseFilter || company.licenseType === licenseFilter
            const matchesStatus = !statusFilter || company.status === statusFilter

            return matchesSearch && matchesIndustry && matchesLicense && matchesStatus
        })
    }, [searchTerm, industryFilter, licenseFilter, statusFilter])

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage)

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            Active: 'badge-green',
            Inactive: 'badge-gray',
            Suspended: 'badge-red',
            Trial: 'badge-yellow',
        }
        return statusClasses[status as keyof typeof statusClasses] || 'badge-gray'
    }

    const getExpiryColor = (daysRemaining: number) => {
        if (daysRemaining < 15) return 'text-red-600 dark:text-red-400'
        if (daysRemaining < 30) return 'text-yellow-600 dark:text-yellow-400'
        return 'text-green-600 dark:text-green-400'
    }

    const columns = useMemo(
        () => [
            {
                header: 'Company',
                accessorKey: 'company',
                cell: ({ row }: { row: { original: Company } }) => {
                    const company = row.original
                    return (
                        <div className="flex items-center gap-3">
                            {company.logo ? (
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="size-10 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center size-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                    <Building2 className="size-5" />
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{company.name}</p>
                                <p className="text-xs text-gray-500 dark:text-dark-500">{company.companyId}</p>
                            </div>
                        </div>
                    )
                },
            },
            {
                header: 'Industry',
                accessorKey: 'industryType',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className="badge badge-blue">{row.original.industryType}</span>
                ),
            },
            {
                header: 'License Type',
                accessorKey: 'licenseType',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className="badge badge-purple">{row.original.licenseType}</span>
                ),
            },
            {
                header: 'Active Users',
                accessorKey: 'activeUsers',
                cell: ({ row }: { row: { original: Company } }) => (
                    <span className="font-medium">{row.original.activeUsers}</span>
                ),
            },
            {
                header: 'Usage',
                accessorKey: 'usage',
                cell: ({ row }: { row: { original: Company } }) => {
                    const usage = Math.round((row.original.activeUsers / row.original.maxUsers) * 100)
                    return (
                        <div className="flex items-center gap-2">
                            <div className="grow h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${
                                        usage > 80 ? 'bg-red-500' : usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min(usage, 100)}%` }}
                                />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{usage}%</span>
                        </div>
                    )
                },
            },
            {
                header: 'Last Activity',
                accessorKey: 'lastActivity',
                cell: ({ row }: { row: { original: Company } }) => {
                    const date = new Date(row.original.lastActivity)
                    const now = new Date()
                    const diffMs = now.getTime() - date.getTime()
                    const diffMins = Math.floor(diffMs / 60000)
                    const diffHours = Math.floor(diffMs / 3600000)
                    const diffDays = Math.floor(diffMs / 86400000)

                    let timeAgo = ''
                    if (diffMins < 60) {
                        timeAgo = `${diffMins}m ago`
                    } else if (diffHours < 24) {
                        timeAgo = `${diffHours}h ago`
                    } else {
                        timeAgo = `${diffDays}d ago`
                    }

                    return <span className="text-sm text-gray-600 dark:text-gray-400">{timeAgo}</span>
                },
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
                header: 'Actions',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: Company } }) => {
                    return <TenantActionCell company={row.original} />
                },
            },
        ],
        []
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const uniqueIndustries = useMemo(
        () => Array.from(new Set(MOCK_COMPANIES.map((c) => c.industryType))),
        []
    )
    const uniqueLicenseTypes = useMemo(
        () => Array.from(new Set(MOCK_COMPANIES.map((c) => c.licenseType))),
        []
    )

    return (
        <div className="col-span-12 lg:col-span-8 card">
            <div className="card-header">
                <div className="flex items-center justify-between">
                    <h6 className="card-title">Tenant Activity Overview</h6>
                    <button
                        type="button"
                        className="btn btn-sub-primary btn-sm flex items-center gap-2">
                        <Filter className="size-4" />
                        Filters
                    </button>
                </div>
            </div>
            <div className="card-body">
                {/* Filters */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                    <div className="col-span-12 md:col-span-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                                type="text"
                                className="pl-9 form-input"
                                placeholder="Search companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <select
                            className="form-select"
                            value={industryFilter}
                            onChange={(e) => setIndustryFilter(e.target.value)}>
                            <option value="">All Industries</option>
                            {uniqueIndustries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <select
                            className="form-select"
                            value={licenseFilter}
                            onChange={(e) => setLicenseFilter(e.target.value)}>
                            <option value="">All Licenses</option>
                            {uniqueLicenseTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Trial">Trial</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <TableContainer columns={columns} data={paginatedCompanies} />

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredCompanies.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

// Separate component for action cell
const TenantActionCell: React.FC<{ company: Company }> = ({ company }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

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
                                    router.push(`/super-admin/companies/${company.id}`)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800">
                                <Eye className="size-4" />
                                View Details
                            </button>
                            <button
                                onClick={() => {
                                    router.push(`/super-admin/companies/${company.id}?edit=true`)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800">
                                <Edit className="size-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    alert(`Suspend ${company.name}`)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800">
                                <Ban className="size-4" />
                                Suspend
                            </button>
                            <button
                                onClick={() => {
                                    router.push(`/super-admin/companies/${company.id}?tab=logs`)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800">
                                <FileText className="size-4" />
                                View Logs
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TenantActivityOverview

