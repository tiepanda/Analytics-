'use client'

import React, { useState, useEffect } from 'react'
import { License, LicenseType, BillingCycle } from '@src/data/licenses'
import { MOCK_COMPANIES } from '@src/data/companies'
import { LICENSE_PLANS } from '@src/data/licenses'

interface LicenseFormProps {
    license?: License | null
    onSave: (licenseData: Partial<License>) => void
    onCancel: () => void
}

const LicenseForm: React.FC<LicenseFormProps> = ({ license, onSave, onCancel }) => {
    const calculateDuration = (startDate: string, expiryDate: string): string => {
        const start = new Date(startDate)
        const expiry = new Date(expiryDate)
        const diffTime = Math.abs(expiry.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays <= 31) return '1 month'
        if (diffDays <= 93) return '3 months'
        if (diffDays <= 186) return '6 months'
        if (diffDays <= 365) return '1 year'
        return '2 years'
    }

    const [activeTab, setActiveTab] = useState(1)
    const [formData, setFormData] = useState<Partial<License & { duration?: string }>>({
        companyId: license?.companyId || '',
        licenseType: license?.licenseType || 'Standard',
        billingCycle: license?.billingCycle || 'Monthly',
        price: license?.price || 0,
        priceOverride: license?.priceOverride,
        startDate: license?.startDate || new Date().toISOString().split('T')[0],
        duration: license?.expiryDate ? calculateDuration(license.startDate, license.expiryDate) : '1 year',
        autoRenewal: license?.autoRenewal ?? true,
        renewalReminderDays: license?.renewalReminderDays || 30,
        features: license?.features || {
            oeeModule: true,
            energyModule: false,
            machineModule: false,
            reportsModule: true,
            inspectionModule: false,
            inventoryModule: false,
            maintenanceModule: false,
            hrModule: false,
        },
        maxUsers: license?.maxUsers || 200,
        maxDevices: license?.maxDevices || 100,
        storageLimit: license?.storageLimit || 50,
        apiCallLimit: license?.apiCallLimit || 50000,
        trialMode: license?.trialMode ?? false,
        trialDuration: license?.trialDuration || 30,
        gracePeriod: license?.gracePeriod || 7,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [selectedPlan, setSelectedPlan] = useState<LicenseType>(formData.licenseType as LicenseType)


    useEffect(() => {
        if (selectedPlan) {
            const plan = LICENSE_PLANS.find((p) => p.name === selectedPlan)
            if (plan) {
                setFormData((prev) => ({
                    ...prev,
                    licenseType: selectedPlan,
                    maxUsers: plan.features.maxUsers,
                    maxDevices: plan.features.maxDevices,
                    storageLimit: plan.features.storageLimit,
                    apiCallLimit: plan.features.apiCallLimit,
                    price: formData.billingCycle === 'Monthly' ? plan.monthlyPrice : plan.annualPrice,
                }))
            }
        }
    }, [selectedPlan, formData.billingCycle])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.companyId) {
            newErrors.companyId = 'Company selection is required'
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        // Calculate expiry date based on duration
        const start = new Date(formData.startDate!)
        const duration = formData.duration || '1 year'
        const expiry = new Date(start)

        if (duration === '1 month') expiry.setMonth(expiry.getMonth() + 1)
        else if (duration === '3 months') expiry.setMonth(expiry.getMonth() + 3)
        else if (duration === '6 months') expiry.setMonth(expiry.getMonth() + 6)
        else if (duration === '1 year') expiry.setFullYear(expiry.getFullYear() + 1)
        else if (duration === '2 years') expiry.setFullYear(expiry.getFullYear() + 2)

        onSave({
            ...formData,
            expiryDate: expiry.toISOString().split('T')[0],
        })
    }

    const updateField = (field: keyof (License & { duration?: string }), value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const toggleFeature = (feature: keyof License['features']) => {
        setFormData((prev) => ({
            ...prev,
            features: {
                ...prev.features!,
                [feature]: !prev.features?.[feature],
            },
        }))
    }

    const generateLicenseKey = () => {
        const prefix = 'EAGL'
        const year = new Date().getFullYear()
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        const random2 = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `${prefix}-${year}-${random}-${random2}`
    }

    const tabs = [
        { id: 1, label: 'Company Selection' },
        { id: 2, label: 'License Type' },
        { id: 3, label: 'License Duration' },
        { id: 4, label: 'Feature Access' },
        { id: 5, label: 'License Generation' },
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
                                Company <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`form-select ${errors.companyId ? 'border-red-500' : ''}`}
                                value={formData.companyId || ''}
                                onChange={(e) => updateField('companyId', e.target.value)}>
                                <option value="">-- Select Company --</option>
                                {MOCK_COMPANIES.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name} ({company.companyId})
                                    </option>
                                ))}
                            </select>
                            {errors.companyId && (
                                <span className="text-sm text-red-500">{errors.companyId}</span>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">License Plan</label>
                            <select
                                className="form-select"
                                value={selectedPlan}
                                onChange={(e) => setSelectedPlan(e.target.value as LicenseType)}>
                                {LICENSE_PLANS.map((plan) => (
                                    <option key={plan.id} value={plan.name}>
                                        {plan.name} - ${plan.monthlyPrice}/month or ${plan.annualPrice}/year
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Billing Cycle</label>
                            <div className="flex gap-4">
                                {(['Monthly', 'Quarterly', 'Annually'] as BillingCycle[]).map((cycle) => (
                                    <label key={cycle} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="billingCycle"
                                            className="form-radio"
                                            checked={formData.billingCycle === cycle}
                                            onChange={() => updateField('billingCycle', cycle)}
                                        />
                                        <span>{cycle}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Price Override (Optional)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.priceOverride || ''}
                                onChange={(e) =>
                                    updateField('priceOverride', e.target.value ? parseFloat(e.target.value) : undefined)
                                }
                                placeholder="Leave empty to use plan price"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
                                value={formData.startDate || ''}
                                onChange={(e) => updateField('startDate', e.target.value)}
                            />
                            {errors.startDate && (
                                <span className="text-sm text-red-500">{errors.startDate}</span>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Duration</label>
                            <select
                                className="form-select"
                                value={formData.duration || '1 year'}
                                onChange={(e) => updateField('duration', e.target.value)}>
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
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Renewal Reminder (days before expiry)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.renewalReminderDays || 30}
                                onChange={(e) => updateField('renewalReminderDays', parseInt(e.target.value))}
                                min="1"
                                max="90"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 4 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <h6 className="mb-3 text-sm font-medium">Module Access</h6>
                            <div className="space-y-2">
                                {Object.entries(formData.features || {}).map(([key, value]) => (
                                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={value}
                                            onChange={() => toggleFeature(key as keyof License['features'])}
                                        />
                                        <span className="text-sm">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} Module
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Max Users</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.maxUsers || 0}
                                onChange={(e) => updateField('maxUsers', parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Max Devices</label>
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
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">License Key</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="form-input font-mono"
                                    value={license?.licenseKey || generateLicenseKey()}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="btn btn-sub-primary"
                                    onClick={() => {
                                        const key = generateLicenseKey()
                                        updateField('licenseKey', key)
                                    }}>
                                    Generate New
                                </button>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.trialMode}
                                    onChange={(e) => updateField('trialMode', e.target.checked)}
                                />
                                <span className="text-sm">Trial Mode</span>
                            </label>
                        </div>
                        {formData.trialMode && (
                            <div className="col-span-12 md:col-span-6">
                                <label className="block mb-2 text-sm font-medium">Trial Duration (days)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={formData.trialDuration || 30}
                                    onChange={(e) => updateField('trialDuration', parseInt(e.target.value))}
                                    min="1"
                                    max="90"
                                />
                            </div>
                        )}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Grace Period (days after expiry)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.gracePeriod || 7}
                                onChange={(e) => updateField('gracePeriod', parseInt(e.target.value))}
                                min="0"
                                max="30"
                            />
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
                    Generate as Draft
                </button>
                <button type="submit" className="btn btn-primary">
                    Generate & Activate
                </button>
            </div>
        </form>
    )
}

export default LicenseForm

