'use client'

import React, { useState, useEffect } from 'react'
import { User, UserRole, UserStatus, MFAMethod, NotificationPreference } from '@src/data/users'
import { MOCK_COMPANIES } from '@src/data/companies'
import { Upload, X } from 'lucide-react'

interface UserFormProps {
    user?: User | null
    onSave: (userData: Partial<User>) => void
    onCancel: () => void
    isEdit?: boolean
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel, isEdit = false }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [formData, setFormData] = useState<Partial<User>>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        userId: user?.userId || '',
        employeeId: user?.employeeId || '',
        companyId: user?.companyId || '',
        companyName: user?.companyName || '',
        role: user?.role || 'Operator',
        department: user?.department || '',
        section: user?.section || '',
        reportingManagerId: user?.reportingManagerId || '',
        status: user?.status || 'Pending Activation',
        mfaEnabled: user?.mfaEnabled || false,
        mfaMethods: user?.mfaMethods || [],
        allowConcurrentSessions: user?.allowConcurrentSessions ?? true,
        maxConcurrentSessions: user?.maxConcurrentSessions || 3,
        sessionTimeoutOverride: user?.sessionTimeoutOverride,
        defaultLanguage: user?.defaultLanguage || 'English',
        defaultTimezone: user?.defaultTimezone || 'America/New_York',
        dateFormat: user?.dateFormat || 'MM/DD/YYYY',
        timeFormat: user?.timeFormat || '12-hour',
        notificationPreferences: user?.notificationPreferences || ['Email', 'In-App'],
        employeeStartDate: user?.employeeStartDate || '',
        employeeEndDate: user?.employeeEndDate || '',
        notes: user?.notes || '',
        tags: user?.tags || [],
    })
    const [password, setPassword] = useState('')
    const [autoGeneratePassword, setAutoGeneratePassword] = useState(false)
    const [requirePasswordChange, setRequirePasswordChange] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Get departments based on selected company
    const departments = formData.companyId
        ? ['Production', 'Quality', 'Maintenance', 'Engineering', 'Operations', 'Management']
        : []

    // Get available roles
    const roles: UserRole[] = [
        'Super Admin',
        'Company Admin',
        'Manager',
        'Supervisor',
        'Operator',
        'Quality Inspector',
        'Maintenance Technician',
        'Viewer',
        'Custom',
    ]

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName?.trim()) {
            newErrors.firstName = 'First name is required'
        }

        if (!formData.lastName?.trim()) {
            newErrors.lastName = 'Last name is required'
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!formData.companyId) {
            newErrors.companyId = 'Company is required'
        }

        if (!formData.role) {
            newErrors.role = 'Role is required'
        }

        if (!isEdit && !autoGeneratePassword && !password) {
            newErrors.password = 'Password is required or enable auto-generate'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        const userData: Partial<User> = {
            ...formData,
            ...(password && !autoGeneratePassword ? { password } : {}),
        }

        onSave(userData)
    }

    const updateField = (field: keyof User, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        
        // Update company name when company ID changes
        if (field === 'companyId') {
            const company = MOCK_COMPANIES.find((c) => c.id === value)
            if (company) {
                setFormData((prev) => ({ ...prev, companyName: company.name }))
            }
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB')
                return
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Only JPG and PNG images are allowed')
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const toggleMfaMethod = (method: MFAMethod) => {
        const currentMethods = formData.mfaMethods || []
        if (currentMethods.includes(method)) {
            setFormData({
                ...formData,
                mfaMethods: currentMethods.filter((m) => m !== method),
            })
        } else {
            setFormData({
                ...formData,
                mfaMethods: [...currentMethods, method],
            })
        }
    }

    const toggleNotificationPreference = (pref: NotificationPreference) => {
        const currentPrefs = formData.notificationPreferences || []
        if (currentPrefs.includes(pref)) {
            setFormData({
                ...formData,
                notificationPreferences: currentPrefs.filter((p) => p !== pref),
            })
        } else {
            setFormData({
                ...formData,
                notificationPreferences: [...currentPrefs, pref],
            })
        }
    }

    const tabs = [
        { id: 1, label: 'Basic Information' },
        { id: 2, label: 'Company & Role' },
        { id: 3, label: 'Access & Permissions' },
        { id: 4, label: 'Authentication' },
        { id: 5, label: 'User Preferences' },
        { id: 6, label: 'Additional Information' },
    ]

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-dark-700">
                <nav className="flex -mb-px space-x-4 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
                {/* Section 1: Basic Information */}
                {activeTab === 1 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Profile Picture</label>
                            <div className="flex items-center gap-4">
                                {avatarPreview ? (
                                    <div className="relative">
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar"
                                            className="size-20 rounded-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setAvatarPreview(null)}
                                            className="absolute -top-1 -right-1 flex items-center justify-center size-6 bg-red-500 text-white rounded-full hover:bg-red-600">
                                            <X className="size-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center size-20 rounded-full bg-gray-100 dark:bg-dark-850">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                                <div>
                                    <label className="btn btn-sub-primary cursor-pointer">
                                        <Upload className="size-4 ltr:mr-2 rtl:ml-2" />
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            onChange={handleAvatarUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="mt-1 text-xs text-gray-500">Max 2MB, JPG or PNG</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                                value={formData.firstName || ''}
                                onChange={(e) => updateField('firstName', e.target.value)}
                                placeholder="Enter first name"
                            />
                            {errors.firstName && (
                                <span className="text-sm text-red-500">{errors.firstName}</span>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                                value={formData.lastName || ''}
                                onChange={(e) => updateField('lastName', e.target.value)}
                                placeholder="Enter last name"
                            />
                            {errors.lastName && (
                                <span className="text-sm text-red-500">{errors.lastName}</span>
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
                                placeholder="user@example.com"
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
                                placeholder="+1-555-0000"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">User ID</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.userId || 'Auto-generated'}
                                onChange={(e) => updateField('userId', e.target.value)}
                                placeholder="USR-2025-001234"
                                disabled={!!user?.userId}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Employee ID</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.employeeId || ''}
                                onChange={(e) => updateField('employeeId', e.target.value)}
                                placeholder="Optional, company-specific"
                            />
                        </div>
                    </div>
                )}

                {/* Section 2: Company & Role Assignment */}
                {activeTab === 2 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Company <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`form-select ${errors.companyId ? 'border-red-500' : ''}`}
                                value={formData.companyId || ''}
                                onChange={(e) => updateField('companyId', e.target.value)}>
                                <option value="">Select company</option>
                                {MOCK_COMPANIES.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {errors.companyId && (
                                <span className="text-sm text-red-500">{errors.companyId}</span>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`form-select ${errors.role ? 'border-red-500' : ''}`}
                                value={formData.role || ''}
                                onChange={(e) => updateField('role', e.target.value as UserRole)}>
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Department</label>
                            <select
                                className="form-select"
                                value={formData.department || ''}
                                onChange={(e) => updateField('department', e.target.value)}
                                disabled={!formData.companyId}>
                                <option value="">Select department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Section</label>
                            <select
                                className="form-select"
                                value={formData.section || ''}
                                onChange={(e) => updateField('section', e.target.value)}
                                disabled={!formData.department}>
                                <option value="">Select section</option>
                                {formData.department && (
                                    <>
                                        <option value="Section A">Section A</option>
                                        <option value="Section B">Section B</option>
                                        <option value="Section C">Section C</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Reporting Manager</label>
                            <select
                                className="form-select"
                                value={formData.reportingManagerId || ''}
                                onChange={(e) => updateField('reportingManagerId', e.target.value)}
                                disabled={!formData.companyId}>
                                <option value="">Select manager</option>
                                {/* TODO: Populate with managers from same company */}
                            </select>
                        </div>
                    </div>
                )}

                {/* Section 3: Access & Permissions */}
                {activeTab === 3 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4">
                                {(['Active', 'Inactive', 'Pending Activation'] as UserStatus[]).map(
                                    (status) => (
                                        <label key={status} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={formData.status === status}
                                                onChange={(e) =>
                                                    updateField('status', e.target.value as UserStatus)
                                                }
                                                className="form-radio"
                                            />
                                            <span>{status}</span>
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Access Level</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.accessLevel || `Based on ${formData.role} role`}
                                disabled
                            />
                            <p className="mt-1 text-xs text-gray-500">Read-only, based on assigned role</p>
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Custom Permissions</label>
                            <div className="p-4 bg-gray-50 dark:bg-dark-850 rounded-lg">
                                <p className="text-sm text-gray-500">
                                    Custom permissions can be configured after user creation based on role
                                    capabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 4: Authentication Settings */}
                {activeTab === 4 && (
                    <div className="grid grid-cols-12 gap-4">
                        {!isEdit && (
                            <>
                                <div className="col-span-12">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoGeneratePassword}
                                            onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm font-medium">Auto-generate password</span>
                                    </label>
                                </div>
                                {!autoGeneratePassword && (
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                        />
                                        {errors.password && (
                                            <span className="text-sm text-red-500">{errors.password}</span>
                                        )}
                                        <div className="mt-1">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded ${
                                                            password.length >= level * 2
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-200 dark:bg-dark-700'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Password strength</p>
                                        </div>
                                    </div>
                                )}
                                <div className="col-span-12">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={requirePasswordChange}
                                            onChange={(e) => setRequirePasswordChange(e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm font-medium">
                                            Require password change on first login
                                        </span>
                                    </label>
                                </div>
                            </>
                        )}
                        <div className="col-span-12">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.mfaEnabled || false}
                                    onChange={(e) => updateField('mfaEnabled', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm font-medium">Enable Multi-Factor Authentication</span>
                            </label>
                        </div>
                        {formData.mfaEnabled && (
                            <div className="col-span-12">
                                <label className="block mb-2 text-sm font-medium">MFA Methods</label>
                                <div className="space-y-2">
                                    {(['Email OTP', 'SMS OTP', 'Authenticator App'] as MFAMethod[]).map(
                                        (method) => (
                                            <label
                                                key={method}
                                                className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.mfaMethods?.includes(method) || false}
                                                    onChange={() => toggleMfaMethod(method)}
                                                    className="form-checkbox"
                                                />
                                                <span>{method}</span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="col-span-12">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.allowConcurrentSessions || false}
                                    onChange={(e) => updateField('allowConcurrentSessions', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm font-medium">Allow concurrent sessions</span>
                            </label>
                        </div>
                        {formData.allowConcurrentSessions && (
                            <div className="col-span-12 md:col-span-6">
                                <label className="block mb-2 text-sm font-medium">
                                    Max Concurrent Sessions
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={formData.maxConcurrentSessions || 3}
                                    onChange={(e) =>
                                        updateField('maxConcurrentSessions', parseInt(e.target.value) || 3)
                                    }
                                    min={1}
                                    max={10}
                                />
                            </div>
                        )}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">
                                Session Timeout Override (minutes)
                            </label>
                            <input
                                type="number"
                                className="form-input"
                                value={formData.sessionTimeoutOverride || ''}
                                onChange={(e) =>
                                    updateField('sessionTimeoutOverride', parseInt(e.target.value) || undefined)
                                }
                                placeholder="Leave empty for default"
                            />
                        </div>
                    </div>
                )}

                {/* Section 5: User Preferences */}
                {activeTab === 5 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Default Language</label>
                            <select
                                className="form-select"
                                value={formData.defaultLanguage || 'English'}
                                onChange={(e) => updateField('defaultLanguage', e.target.value)}>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Chinese">Chinese</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Default Timezone</label>
                            <select
                                className="form-select"
                                value={formData.defaultTimezone || 'America/New_York'}
                                onChange={(e) => updateField('defaultTimezone', e.target.value)}>
                                <option value="America/New_York">America/New_York (EST)</option>
                                <option value="America/Chicago">America/Chicago (CST)</option>
                                <option value="America/Denver">America/Denver (MST)</option>
                                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                                <option value="UTC">UTC</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Date Format</label>
                            <select
                                className="form-select"
                                value={formData.dateFormat || 'MM/DD/YYYY'}
                                onChange={(e) => updateField('dateFormat', e.target.value)}>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Time Format</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="12-hour"
                                        checked={formData.timeFormat === '12-hour'}
                                        onChange={(e) => updateField('timeFormat', e.target.value)}
                                        className="form-radio"
                                    />
                                    <span>12-hour</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="24-hour"
                                        checked={formData.timeFormat === '24-hour'}
                                        onChange={(e) => updateField('timeFormat', e.target.value)}
                                        className="form-radio"
                                    />
                                    <span>24-hour</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Notification Preferences</label>
                            <div className="space-y-2">
                                {(['Email', 'SMS', 'WhatsApp', 'In-App', 'Push'] as NotificationPreference[]).map(
                                    (pref) => (
                                        <label key={pref} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.notificationPreferences?.includes(pref) || false}
                                                onChange={() => toggleNotificationPreference(pref)}
                                                className="form-checkbox"
                                            />
                                            <span>{pref} notifications</span>
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 6: Additional Information */}
                {activeTab === 6 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Employee Start Date</label>
                            <input
                                type="date"
                                className="form-input"
                                value={formData.employeeStartDate || ''}
                                onChange={(e) => updateField('employeeStartDate', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2 text-sm font-medium">Employee End Date</label>
                            <input
                                type="date"
                                className="form-input"
                                value={formData.employeeEndDate || ''}
                                onChange={(e) => updateField('employeeEndDate', e.target.value)}
                                placeholder="If applicable"
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Notes</label>
                            <textarea
                                className="form-textarea"
                                rows={4}
                                value={formData.notes || ''}
                                onChange={(e) => updateField('notes', e.target.value)}
                                placeholder="Internal notes about user"
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-2 text-sm font-medium">Tags</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.tags?.join(', ') || ''}
                                onChange={(e) =>
                                    updateField(
                                        'tags',
                                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                                    )
                                }
                                placeholder="Comma-separated tags (e.g., Production, Quality, Maintenance)"
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
                {!isEdit ? (
                    <>
                        <button type="submit" className="btn btn-primary">
                            Create User
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Create & Send Welcome Email
                        </button>
                    </>
                ) : (
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                )}
            </div>
        </form>
    )
}

export default UserForm

