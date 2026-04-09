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
    CreditCard,
    Calendar,
    Clock,
    Copy,
    CheckCircle,
    XCircle,
} from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import { License, LicenseStatus } from '@src/data/licenses'

interface LicenseListProps {
    licenses: License[]
    onEditLicense: (license: License) => void
    onDeleteLicense: (license: License) => void
    onViewLicense: (license: License) => void
    onRenewLicense: (license: License) => void
    onSuspendLicense: (license: License) => void
    onRevokeLicense: (license: License) => void
}

const LicenseList: React.FC<LicenseListProps> = ({
    licenses,
    onEditLicense,
    onDeleteLicense,
    onViewLicense,
    onRenewLicense,
    onSuspendLicense,
    onRevokeLicense,
}) => {
    const [filteredLicenses, setFilteredLicenses] = useState<License[]>(licenses)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedType, setSelectedType] = useState<string>('all')
    const [copiedKey, setCopiedKey] = useState<string | null>(null)
    const itemsPerPage = 10

    // Initialize filtered licenses when licenses prop changes
    React.useEffect(() => {
        setFilteredLicenses(licenses)
    }, [licenses])

    // Filter licenses
    React.useEffect(() => {
        let filtered = licenses

        // Filter by search term
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(
                (license) =>
                    license.licenseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    license.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    license.licenseKey.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter((license) => license.status === selectedStatus)
        }

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter((license) => license.licenseType === selectedType)
        }

        setFilteredLicenses(filtered)
        setCurrentPage(1)
    }, [searchTerm, selectedStatus, selectedType, licenses])

    const getStatusBadge = (status: LicenseStatus) => {
        const badges = {
            Active: 'badge-green',
            Expired: 'badge-red',
            Suspended: 'badge-orange',
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

    const getExpiryColor = (daysRemaining: number) => {
        if (daysRemaining < 0) return 'text-red-600'
        if (daysRemaining <= 15) return 'text-red-600'
        if (daysRemaining <= 30) return 'text-yellow-600'
        return 'text-green-600'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const maskLicenseKey = (key: string) => {
        const parts = key.split('-')
        if (parts.length >= 4) {
            return `${parts[0]}-XXXX-XXXX-${parts[parts.length - 1]}`
        }
        return key.substring(0, 4) + '-XXXX-XXXX-XXXX'
    }

    const copyToClipboard = (text: string, licenseId: string) => {
        navigator.clipboard.writeText(text)
        setCopiedKey(licenseId)
        setTimeout(() => setCopiedKey(null), 2000)
    }

    const getFeatureCount = (license: License) => {
        const features = Object.values(license.features)
        return features.filter((f) => f).length
    }

    const columns = useMemo(
        () => [
            {
                header: 'License ID',
                accessorKey: 'licenseId',
                cell: ({ row }: { row: { original: License } }) => (
                    <div className="flex items-center gap-2">
                        <CreditCard className="size-4 text-primary-500" />
                        <Link
                            href={`/super-admin/licenses/${row.original.id}`}
                            className="font-medium hover:text-primary-500">
                            {row.original.licenseId}
                        </Link>
                    </div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'companyName',
                cell: ({ row }: { row: { original: License } }) => (
                    <div className="flex items-center gap-2">
                        <Building2 className="size-4 text-gray-500" />
                        <span>{row.original.companyName}</span>
                    </div>
                ),
            },
            {
                header: 'License Type',
                accessorKey: 'licenseType',
                cell: ({ row }: { row: { original: License } }) => (
                    <span className={`badge ${getLicenseBadge(row.original.licenseType)}`}>
                        {row.original.licenseType}
                    </span>
                ),
            },
            {
                header: 'License Key',
                accessorKey: 'licenseKey',
                cell: ({ row }: { row: { original: License } }) => (
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{maskLicenseKey(row.original.licenseKey)}</span>
                        <button
                            onClick={() => copyToClipboard(row.original.licenseKey, row.original.id)}
                            className="btn btn-icon !size-6 btn-sub-primary"
                            title="Copy License Key">
                            {copiedKey === row.original.id ? (
                                <CheckCircle className="size-3.5 text-green-500" />
                            ) : (
                                <Copy className="size-3.5" />
                            )}
                        </button>
                    </div>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: { original: License } }) => (
                    <span className={`badge ${getStatusBadge(row.original.status)}`}>
                        {row.original.status}
                    </span>
                ),
            },
            {
                header: 'Expiry Date',
                accessorKey: 'expiryDate',
                cell: ({ row }: { row: { original: License } }) => (
                    <div className="flex items-center gap-1">
                        <Calendar className="size-4 text-gray-500" />
                        <span className={getExpiryColor(row.original.daysRemaining)}>
                            {formatDate(row.original.expiryDate)}
                        </span>
                    </div>
                ),
            },
            {
                header: 'Days Remaining',
                accessorKey: 'daysRemaining',
                cell: ({ row }: { row: { original: License } }) => (
                    <div className="flex items-center gap-1">
                        <Clock className="size-4 text-gray-500" />
                        <span className={getExpiryColor(row.original.daysRemaining)}>
                            {row.original.daysRemaining > 0
                                ? `${row.original.daysRemaining} days`
                                : row.original.daysRemaining === 0
                                  ? 'Expired'
                                  : `${Math.abs(row.original.daysRemaining)} days ago`}
                        </span>
                    </div>
                ),
            },
            {
                header: 'Auto-Renewal',
                accessorKey: 'autoRenewal',
                cell: ({ row }: { row: { original: License } }) => (
                    <span className={`badge ${row.original.autoRenewal ? 'badge-green' : 'badge-gray'}`}>
                        {row.original.autoRenewal ? 'On' : 'Off'}
                    </span>
                ),
            },
            {
                header: 'Features',
                accessorKey: 'features',
                cell: ({ row }: { row: { original: License } }) => (
                    <span className="badge badge-purple">
                        {getFeatureCount(row.original)}/8 modules
                    </span>
                ),
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: ({ row }: { row: { original: License } }) => (
                    <span className="font-medium">
                        ${row.original.priceOverride || row.original.price}
                    </span>
                ),
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: License } }) => {
                    return <LicenseActionCell license={row.original} onViewLicense={onViewLicense} onEditLicense={onEditLicense} onRenewLicense={onRenewLicense} onSuspendLicense={onSuspendLicense} onRevokeLicense={onRevokeLicense} />
                },
            },
        ],
        [
            onViewLicense,
            onEditLicense,
            onDeleteLicense,
            onRenewLicense,
            onSuspendLicense,
            onRevokeLicense,
            copiedKey,
        ]
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedLicenses = filteredLicenses.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="col-span-12 card">
            {/* ... rest of component ... */}
        </div>
    )
}

// Separate component for action cell to avoid useState in cell renderer
const LicenseActionCell: React.FC<{
    license: License
    onViewLicense: (license: License) => void
    onEditLicense: (license: License) => void
    onRenewLicense: (license: License) => void
    onSuspendLicense: (license: License) => void
    onRevokeLicense: (license: License) => void
}> = ({ license, onViewLicense, onEditLicense, onRenewLicense, onSuspendLicense, onRevokeLicense }) => {
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
                                    onViewLicense(license)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Eye className="size-4" />
                                View Details
                            </button>
                            <button
                                onClick={() => {
                                    onEditLicense(license)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Edit className="size-4" />
                                Edit License
                            </button>
                            <button
                                onClick={() => {
                                    onRenewLicense(license)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Clock className="size-4" />
                                Renew License
                            </button>
                            <div className="my-1 border-t border-gray-200 dark:border-dark-700" />
                            {license.status === 'Active' ? (
                                <button
                                    onClick={() => {
                                        onSuspendLicense(license)
                                        setShowDropdown(false)
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-yellow-600 hover:bg-gray-100 dark:hover:bg-dark-700">
                                    <XCircle className="size-4" />
                                    Suspend License
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        onRenewLicense(license)
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
                                    onRevokeLicense(license)
                                    setShowDropdown(false)
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 dark:hover:bg-dark-700">
                                <Trash2 className="size-4" />
                                Revoke License
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default LicenseList

