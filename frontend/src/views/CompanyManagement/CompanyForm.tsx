'use client'

import React, { useState, useEffect } from 'react'
import { Company, IndustryType, LicenseType } from '@src/data/companies'

interface CompanyFormProps {
    company?: Company | null
    onSave: (companyData: Partial<Company>) => void
    onCancel: () => void
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company, onSave, onCancel }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [formData, setFormData] = useState<Partial<Company>>({
        name: company?.name || '',
        industryType: company?.industryType || 'Automotive',
        description: company?.description || '',
        contactPerson: company?.contactPerson || '',
        email: company?.email || '',
        phone: company?.phone || '',
        alternativeContact: company?.alternativeContact || '',
        alternativeEmail: company?.alternativeEmail || '',
        address: company?.address || '',
        city: company?.city || '',
        state: company?.state || '',
        postalCode: company?.postalCode || '',
        country: company?.country || 'United States',
        licenseType: company?.licenseType || 'Standard',
        licenseStartDate: company?.licenseStartDate || new Date().toISOString().split('T')[0],
        licenseDuration: company?.licenseDuration || '1 year',
        autoRenewal: company?.autoRenewal ?? true,
        maxUsers: company?.maxUsers || 200,
        maxDevices: company?.maxDevices || 100,
        storageLimit: company?.storageLimit || 50,
        apiCallLimit: company?.apiCallLimit || 50000,
        timezone: company?.timezone || 'America/New_York',
        dateFormat: company?.dateFormat || 'MM/DD/YYYY',
        currency: company?.currency || 'USD',
        language: company?.language || 'English',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name?.trim()) {
            newErrors.name = 'Company name is required'
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!formData.contactPerson?.trim()) {
            newErrors.contactPerson = 'Contact person is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        onSave(formData)
    }

    const updateField = (field: keyof Company, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const tabs = [
        { id: 1, label: 'Basic Information' },
        { id: 2, label: 'Contact Details' },
        { id: 3, label: 'License Configuration' },
        { id: 4, label: 'User Limits & Access' },
        { id: 5, label: 'Initial Configuration' },
    ]

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-dark-700">
                <nav className="flex -mb-px space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-dark-500 dark:hover:text-dark-400'
                            }`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="max-h-[60vh] overflow-y-auto">
                {activeTab === 1 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                                value={formData.name || ''}
                                onChange={(e) => updateField('name', e.target.value)}
                                placeholder="Enter company name"
                            />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Company ID</label>
                            <input
                                type="text"
                                className="form-input"
                                value={company?.companyId || 'Auto-generated'}
                                disabled
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Industry Type</label>
                            <select
                                className="form-select"
                                value={formData.industryType}
                                onChange={(e) => updateField('industryType', e.target.value as IndustryType)}>
                                <option value="Automotive">Automotive</option>
                                <option value="Medical">Medical</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Pharma">Pharma</option>
                                <option value="Aerospace">Aerospace</option>
                                <option value="Textile">Textile</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Company Description</label>
                            <textarea
                                className="form-textarea"
                                rows={3}
                                value={formData.description || ''}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Enter company description"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Primary Contact Person <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.contactPerson ? 'border-red-500' : ''}`}
                                value={formData.contactPerson || ''}
                                onChange={(e) => updateField('contactPerson', e.target.value)}
                            />
                            {errors.contactPerson && (
                                <span className="text-sm text-red-500">{errors.contactPerson}</span>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                value={formData.email || ''}
                                onChange={(e) => updateField('email', e.target.value)}
                            />
                            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                className="form-input"
                                value={formData.phone || ''}
                                onChange={(e) => updateField('phone', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Alternative Contact</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.alternativeContact || ''}
                                onChange={(e) => updateField('alternativeContact', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Alternative Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={formData.alternativeEmail || ''}
                                onChange={(e) => updateField('alternativeEmail', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Address</label>
                            <textarea
                                className="form-textarea"
                                rows={2}
                                value={formData.address || ''}
                                onChange={(e) => updateField('address', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-2 text-sm font-medium">City</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.city || ''}
                                onChange={(e) => updateField('city', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-2 text-sm font-medium">State</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.state || ''}
                                onChange={(e) => updateField('state', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-2 text-sm font-medium">Postal Code</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.postalCode || ''}
                                onChange={(e) => updateField('postalCode', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Country</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.country || ''}
                                onChange={(e) => updateField('country', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">License Type</label>
                            <select
                                className="form-select"
                                value={formData.licenseType}
                                onChange={(e) => updateField('licenseType', e.target.value as LicenseType)}>
                                <option value="Basic">Basic</option>
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">License Start Date</label>
                            <input
                                type="date"
                                className="form-input"
                                value={formData.licenseStartDate || ''}
                                onChange={(e) => updateField('licenseStartDate', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">License Duration</label>
                            <select
                                className="form-select"
                                value={formData.licenseDuration}
                                onChange={(e) => updateField('licenseDuration', e.target.value)}>
                                <option value="1 month">1 month</option>
                                <option value="3 months">3 months</option>
                                <option value="6 months">6 months</option>
                                <option value="1 year">1 year</option>
                                <option value="2 years">2 years</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.autoRenewal}
                                    onChange={(e) => updateField('autoRenewal', e.target.checked)}
                                />
                                <span className="text-sm">Auto-renewal</span>
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 4 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Maximum Users</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.maxUsers || 0}
                                onChange={(e) => updateField('maxUsers', parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Maximum Devices</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.maxDevices || 0}
                                onChange={(e) => updateField('maxDevices', parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Storage Limit (GB)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.storageLimit || 0}
                                onChange={(e) => updateField('storageLimit', parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">API Call Limit (per day)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.apiCallLimit || 0}
                                onChange={(e) => updateField('apiCallLimit', parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 5 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Timezone</label>
                            <select
                                className="form-select"
                                value={formData.timezone}
                                onChange={(e) => updateField('timezone', e.target.value)}>
                                <option value="America/New_York">America/New_York</option>
                                <option value="America/Chicago">America/Chicago</option>
                                <option value="America/Denver">America/Denver</option>
                                <option value="America/Los_Angeles">America/Los_Angeles</option>
                                <option value="Europe/London">Europe/London</option>
                                <option value="Asia/Tokyo">Asia/Tokyo</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Date Format</label>
                            <select
                                className="form-select"
                                value={formData.dateFormat}
                                onChange={(e) => updateField('dateFormat', e.target.value)}>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Currency</label>
                            <select
                                className="form-select"
                                value={formData.currency}
                                onChange={(e) => updateField('currency', e.target.value)}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="INR">INR</option>
                                <option value="JPY">JPY</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Language</label>
                            <select
                                className="form-select"
                                value={formData.language}
                                onChange={(e) => updateField('language', e.target.value)}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-dark-700">
                <button type="button" className="btn btn-sub-primary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className="btn btn-sub-primary" onClick={onCancel}>
                    Save as Draft
                </button>
                <button type="submit" className="btn btn-primary">
                    Save & Activate
                </button>
            </div>
        </form>
    )
}

export default CompanyForm

