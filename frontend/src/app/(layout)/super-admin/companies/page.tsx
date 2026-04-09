'use client'

import React, { useState, useRef } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import CompanyList from '@src/views/CompanyManagement/CompanyList'
import CompanyStatsCards from '@src/views/CompanyManagement/CompanyStatsCards'
import CompanyForm from '@src/views/CompanyManagement/CompanyForm'
import { Modal } from '@src/components/custom/modal/modal'
import { Company, MOCK_COMPANIES } from '@src/data/companies'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import { Upload, Download, CirclePlus, XCircle, AlertTriangle } from 'lucide-react'

const CompaniesPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [companies] = useState<Company[]>(MOCK_COMPANIES)
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

    const handleCreateCompany = () => {
        setSelectedCompany(null)
        setShowCreateModal(true)
    }

    const handleEditCompany = (company: Company) => {
        setSelectedCompany(company)
        setShowEditModal(true)
    }

    const handleDeleteCompany = (company: Company) => {
        setSelectedCompany(company)
        setShowDeleteModal(true)
        setDeleteConfirm('')
    }

    const handleViewCompany = (company: Company) => {
        setSelectedCompany(company)
        setShowViewModal(true)
    }

    const handleManageUsers = (company: Company) => {
        router.push(`/super-admin/companies/${company.id}/users`)
    }

    const handleViewLicenses = (company: Company) => {
        router.push(`/super-admin/companies/${company.id}/licenses`)
    }

    const handleSuspendCompany = (company: Company) => {
        // TODO: Call API to suspend company
        console.log('Suspending company:', company.id)
        alert(`Company ${company.name} will be suspended`)
    }

    const handleActivateCompany = (company: Company) => {
        // TODO: Call API to activate company
        console.log('Activating company:', company.id)
        alert(`Company ${company.name} will be activated`)
    }

    const handleSaveCompany = (companyData: Partial<Company>) => {
        // TODO: Call API to save company
        console.log('Saving company:', companyData)
        setTimeout(() => {
            setShowCreateModal(false)
            setShowEditModal(false)
            setSelectedCompany(null)
            // Refresh company list
            window.location.reload()
        }, 500)
    }

    const handleConfirmDelete = () => {
        if (deleteConfirm === selectedCompany?.name) {
            // TODO: Call API to delete company
            console.log('Deleting company:', selectedCompany?.id)
            setTimeout(() => {
                setShowDeleteModal(false)
                setSelectedCompany(null)
                setDeleteConfirm('')
                // Refresh company list
                window.location.reload()
            }, 500)
        }
    }

    const handleExportCompanies = () => {
        // TODO: Implement export functionality
        console.log('Exporting companies')
        alert('Export functionality coming soon')
    }

    const handleImportCompanies = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // TODO: Implement import functionality
        console.log('Importing companies from file:', file.name)
        alert(`Import functionality coming soon. File: ${file.name}`)

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <>
            <BreadCrumb title={'Company Management'} subTitle={'Super Admin'} />

            {/* Header with Title, Subtitle, and Action Buttons */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        Company Management
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                        Manage tenant companies, licenses, and configurations
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleImportCompanies}>
                        <Upload className="size-4" />
                        Bulk Import
                    </button>
                    <button
                        type="button"
                        className="btn btn-sub-primary flex items-center gap-2 h-10"
                        onClick={handleExportCompanies}>
                        <Download className="size-4" />
                        Export Companies
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary flex items-center gap-2 h-10"
                        onClick={handleCreateCompany}>
                        <CirclePlus className="size-4" />
                        Add New Company
                    </button>
                </div>
            </div>

            {/* Hidden file input for import */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Statistics Cards */}
            <div className="mb-6">
                <CompanyStatsCards companies={companies} />
            </div>

            {/* Company List */}
            <div className="grid grid-cols-12 gap-x-space">
                <CompanyList
                    companies={companies}
                    onEditCompany={handleEditCompany}
                    onDeleteCompany={handleDeleteCompany}
                    onViewCompany={handleViewCompany}
                    onManageUsers={handleManageUsers}
                    onViewLicenses={handleViewLicenses}
                    onSuspendCompany={handleSuspendCompany}
                    onActivateCompany={handleActivateCompany}
                />
            </div>

            {/* Create Company Modal */}
            {showCreateModal && (
                <Modal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    position="modal-center"
                    title="Add New Company"
                    id="createCompanyModal"
                    size="modal-xl"
                    content={
                        <CompanyForm
                            onSave={handleSaveCompany}
                            onCancel={() => setShowCreateModal(false)}
                        />
                    }
                />
            )}

            {/* Edit Company Modal */}
            {showEditModal && selectedCompany && (
                <Modal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    position="modal-center"
                    title="Edit Company"
                    id="editCompanyModal"
                    size="modal-xl"
                    content={
                        <CompanyForm
                            company={selectedCompany}
                            onSave={handleSaveCompany}
                            onCancel={() => setShowEditModal(false)}
                        />
                    }
                />
            )}

            {/* View Company Modal */}
            {showViewModal && selectedCompany && (
                <Modal
                    isOpen={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    position="modal-center"
                    title="Company Details"
                    id="viewCompanyModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Company Name
                                    </label>
                                    <p className="text-base font-medium">{selectedCompany.name}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Company ID
                                    </label>
                                    <p className="text-base">{selectedCompany.companyId}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Industry Type
                                    </label>
                                    <span className="badge badge-blue">{selectedCompany.industryType}</span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        License Type
                                    </label>
                                    <span className="badge badge-purple">{selectedCompany.licenseType}</span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Contact Person
                                    </label>
                                    <p className="text-base">{selectedCompany.contactPerson}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Email
                                    </label>
                                    <p className="text-base">{selectedCompany.email}</p>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Status
                                    </label>
                                    <span
                                        className={`badge ${
                                            selectedCompany.status === 'Active'
                                                ? 'badge-green'
                                                : selectedCompany.status === 'Suspended'
                                                  ? 'badge-red'
                                                  : selectedCompany.status === 'Trial'
                                                    ? 'badge-yellow'
                                                    : 'badge-gray'
                                        }`}>
                                        {selectedCompany.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-dark-500">
                                        Active Users
                                    </label>
                                    <p className="text-base">
                                        {selectedCompany.activeUsers} / {selectedCompany.totalUsers}
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

            {/* Delete Company Modal */}
            {showDeleteModal && selectedCompany && (
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false)
                        setDeleteConfirm('')
                    }}
                    position="modal-center"
                    title="Delete Company"
                    id="deleteCompanyModal"
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
                                            Deleting this company will remove all associated data including users,
                                            machines, and production records.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                Are you sure you want to delete the company{' '}
                                <strong>{selectedCompany.name}</strong>? This action cannot be undone.
                            </p>
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Type <strong>{selectedCompany.name}</strong> to confirm:
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={deleteConfirm}
                                    onChange={(e) => setDeleteConfirm(e.target.value)}
                                    placeholder={selectedCompany.name}
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
                                disabled={deleteConfirm !== selectedCompany.name}>
                                Delete Company
                            </button>
                        </div>
                    }
                />
            )}
        </>
    )
}

export default CompaniesPage

