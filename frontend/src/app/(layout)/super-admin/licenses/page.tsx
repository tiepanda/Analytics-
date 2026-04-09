'use client'

import React, { useState, useRef } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import LicenseList from '@src/views/LicenseManagement/LicenseList'
import LicenseStatsCards from '@src/views/LicenseManagement/LicenseStatsCards'
import LicenseForm from '@src/views/LicenseManagement/LicenseForm'
import { Modal } from '@src/components/custom/modal/modal'
import { License, MOCK_LICENSES } from '@src/data/licenses'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { Upload, Download, CirclePlus, XCircle, RefreshCw } from 'lucide-react'

const LicensesPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [licenses] = useState<License[]>(MOCK_LICENSES)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isSuperAdmin = rbacService.isSuperAdmin(user)

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user || !isSuperAdmin) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, router])

    if (!user || !isSuperAdmin) {
        return null
    }

    const handleCreateLicense = () => {
        setSelectedLicense(null)
        setShowCreateModal(true)
    }

    const handleEditLicense = (license: License) => {
        setSelectedLicense(license)
        setShowEditModal(true)
    }

    const handleDeleteLicense = (license: License) => {
        setSelectedLicense(license)
        setShowDeleteModal(true)
        setDeleteConfirm('')
    }

    const handleViewLicense = (license: License) => {
        setSelectedLicense(license)
        setShowViewModal(true)
    }

    const handleRenewLicense = (license: License) => {
        // TODO: Call API to renew license
        console.log('Renewing license:', license.id)
        alert(`License ${license.licenseId} renewal process initiated`)
    }

    const handleSuspendLicense = (license: License) => {
        // TODO: Call API to suspend license
        console.log('Suspending license:', license.id)
        alert(`License ${license.licenseId} will be suspended`)
    }

    const handleRevokeLicense = (license: License) => {
        setSelectedLicense(license)
        setShowDeleteModal(true)
        setDeleteConfirm('')
    }

    const handleSaveLicense = (licenseData: Partial<License>) => {
        // TODO: Call API to save license
        console.log('Saving license:', licenseData)
        setTimeout(() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedLicense(null)
            // Refresh license list
            window.location.reload()
        }, 500)
    }

    const handleConfirmDelete = () => {
        if (deleteConfirm === selectedLicense?.licenseId) {
            // TODO: Call API to delete/revoke license
            console.log('Revoking license:', selectedLicense?.id)
            setTimeout(() => {
                setShowDeleteModal(false)
                setSelectedLicense(null)
                setDeleteConfirm('')
                // Refresh license list
                window.location.reload()
            }, 500)
        }
    }

    const handleExportLicenses = () => {
        // TODO: Implement export functionality
        console.log('Exporting licenses')
        alert('Export functionality coming soon')
    }

    const handleBulkRenew = () => {
        // TODO: Implement bulk renew functionality
        console.log('Bulk renew licenses')
        alert('Bulk renew functionality coming soon')
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const getFeatureCount = (license: License) => {
        const features = Object.values(license.features)
        return features.filter((f) => f).length
    }

    return (
        <>
            <BreadCrumb title={'License Management'} subTitle={'Super Admin'} />

            {/* Header with Title, Subtitle, and Action Buttons */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        License Management
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Manage license lifecycle, allocation, renewal, and revocation
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleBulkRenew}>
                        <RefreshCw className="size-4" />
                        Bulk Renew
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleExportLicenses}>
                        <Download className="size-4" />
                        Generate License Report
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary flex items-center gap-2 h-10"
                        onClick={handleCreateLicense}>
                        <CirclePlus className="size-4" />
                        Create New License
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mb-6">
                <LicenseStatsCards licenses={licenses} />
            </div>

            {/* License List */}
            <div className="grid grid-cols-12 gap-x-space">
                <LicenseList
                    licenses={licenses}
                    onEditLicense={handleEditLicense}
                    onDeleteLicense={handleDeleteLicense}
                    onViewLicense={handleViewLicense}
                    onRenewLicense={handleRenewLicense}
                    onSuspendLicense={handleSuspendLicense}
                    onRevokeLicense={handleRevokeLicense}
                />
            </div>

            {/* Create License Modal */}
            {showCreateModal && (
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    position="modal-center"
                    title="Create New License"
                    id="createLicenseModal"
                    size="modal-xl"
                    content={
                        <LicenseForm
                            onSave={handleSaveLicense}
                            onCancel={() => setShowCreateModal(false)}
                        />
                    }
                />
            )}

            {/* Edit License Modal */}
            {showEditModal && selectedLicense && (
                <Modal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    position="modal-center"
                    title="Edit License"
                    id="editLicenseModal"
                    size="modal-xl"
                    content={
                        <LicenseForm
                            license={selectedLicense}
                            onSave={handleSaveLicense}
                            onCancel={() => setShowEditModal(false)}
                        />
                    }
                />
            )}

            {/* View License Modal */}
            {showViewModal && selectedLicense && (
                <Modal
                    isOpen={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    position="modal-center"
                    title="License Details"
                    id="viewLicenseModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        License ID
                                    </label>
                                    <p className="text-base font-medium">{selectedLicense.licenseId}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Company
                                    </label>
                                    <p className="text-base">{selectedLicense.companyName}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        License Type
                                    </label>
                                    <span className="badge badge-purple">{selectedLicense.licenseType}</span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Status
                                    </label>
                                    <span
                                        className={`badge ${
                                            selectedLicense.status === 'Active'
                                                ? 'badge-green'
                                                : selectedLicense.status === 'Expired'
                                                  ? 'badge-red'
                                                  : selectedLicense.status === 'Suspended'
                                                    ? 'badge-orange'
                                                    : 'badge-yellow'
                                        }`}>
                                        {selectedLicense.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Start Date
                                    </label>
                                    <p className="text-base">{formatDate(selectedLicense.startDate)}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Expiry Date
                                    </label>
                                    <p className="text-base">{formatDate(selectedLicense.expiryDate)}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Days Remaining
                                    </label>
                                    <p className="text-base">
                                        {selectedLicense.daysRemaining > 0
                                            ? `${selectedLicense.daysRemaining} days`
                                            : 'Expired'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Auto-Renewal
                                    </label>
                                    <span
                                        className={`badge ${selectedLicense.autoRenewal ? 'badge-green' : 'badge-gray'}`}>
                                        {selectedLicense.autoRenewal ? 'On' : 'Off'}
                                    </span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Features Enabled
                                    </label>
                                    <p className="text-base">
                                        {getFeatureCount(selectedLicense)}/8 modules
                                    </p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Price
                                    </label>
                                    <p className="text-base">
                                        ${selectedLicense.priceOverride || selectedLicense.price}
                                    </p>
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

            {/* Delete/Revoke License Modal */}
            {showDeleteModal && selectedLicense && (
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false)
                        setDeleteConfirm('')
                    }}
                    position="modal-center"
                    title="Revoke License"
                    id="revokeLicenseModal"
                    size="modal-md"
                    content={
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <XCircle className="mt-0.5 text-red-500 shrink-0" />
                                    <div>
                                        <h6 className="font-medium text-red-600 dark:text-red-400">
                                            Warning: This action cannot be undone
                                        </h6>
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            Revoking this license will immediately suspend access for the associated
                                            company.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                Are you sure you want to revoke the license{' '}
                                <strong>{selectedLicense.licenseId}</strong>? This action cannot be undone.
                            </p>
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Type <strong>{selectedLicense.licenseId}</strong> to confirm:
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={deleteConfirm}
                                    onChange={(e) => setDeleteConfirm(e.target.value)}
                                    placeholder={selectedLicense.licenseId}
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
                                disabled={deleteConfirm !== selectedLicense.licenseId}>
                                Revoke License
                            </button>
                        </div>
                    }
                />
            )}
        </>
    )
}

export default LicensesPage

