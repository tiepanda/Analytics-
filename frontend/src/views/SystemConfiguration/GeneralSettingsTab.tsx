'use client'

import React, { useState } from 'react'
import { Input } from '@src/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@src/components/ui/select'
import { Save, Globe, Clock, DollarSign, FileText, Building2, Mail, Phone } from 'lucide-react'

interface GeneralSettingsData {
    applicationName: string
    applicationVersion: string
    companyName: string
    supportEmail: string
    supportPhone: string
    defaultTimezone: string
    defaultDateFormat: string
    defaultTimeFormat: '12-hour' | '24-hour'
    defaultCurrency: string
    defaultLanguage: string
    decimalSeparator: '.' | ','
    thousandSeparator: ',' | '.' | ' '
    sessionTimeout: number
    loginAttemptsLimit: number
    accountLockoutDuration: number
    passwordResetExpiry: number
    tokenExpiryDuration: number
    refreshTokenExpiry: number
}

const GeneralSettingsTab = () => {
    const [formData, setFormData] = useState<GeneralSettingsData>({
        applicationName: 'Eagle Analytics',
        applicationVersion: 'v2.1.5',
        companyName: '',
        supportEmail: 'support@eagleanalytics.com',
        supportPhone: '',
        defaultTimezone: 'UTC',
        defaultDateFormat: 'DD/MM/YYYY',
        defaultTimeFormat: '24-hour',
        defaultCurrency: 'USD',
        defaultLanguage: 'English',
        decimalSeparator: '.',
        thousandSeparator: ',',
        sessionTimeout: 30,
        loginAttemptsLimit: 5,
        accountLockoutDuration: 30,
        passwordResetExpiry: 24,
        tokenExpiryDuration: 60,
        refreshTokenExpiry: 7,
    })

    const [isSaving, setIsSaving] = useState(false)

    const updateField = (field: keyof GeneralSettingsData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving general settings:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Settings saved successfully')
        }, 1000)
    }

    return (
        <>
            {/* Application Information Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-primary-500 rounded-md bg-primary-500/10 size-12">
                            <Building2 className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Application Information</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure application name, version, and contact details
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Application Name
                            </label>
                            <Input
                                value={formData.applicationName}
                                onChange={(e) => updateField('applicationName', e.target.value)}
                                placeholder="Eagle Analytics"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Application Version
                            </label>
                            <Input
                                value={formData.applicationVersion}
                                disabled
                                className="bg-gray-50 dark:bg-dark-850"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Company Name
                            </label>
                            <Input
                                value={formData.companyName}
                                onChange={(e) => updateField('companyName', e.target.value)}
                                placeholder="Your Company Name"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Support Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    type="email"
                                    value={formData.supportEmail}
                                    onChange={(e) => updateField('supportEmail', e.target.value)}
                                    placeholder="support@example.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Support Phone
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    type="tel"
                                    value={formData.supportPhone}
                                    onChange={(e) => updateField('supportPhone', e.target.value)}
                                    placeholder="+1 (555) 123-4567"
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Default System Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <Globe className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Default System Settings</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Regional and localization preferences
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Timezone
                            </label>
                            <Select
                                value={formData.defaultTimezone}
                                onValueChange={(value) => updateField('defaultTimezone', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                                    <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                                    <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                                    <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Date Format
                            </label>
                            <Select
                                value={formData.defaultDateFormat}
                                onValueChange={(value) => updateField('defaultDateFormat', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Time Format
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="12-hour"
                                        checked={formData.defaultTimeFormat === '12-hour'}
                                        onChange={() => updateField('defaultTimeFormat', '12-hour')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">12-hour</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="24-hour"
                                        checked={formData.defaultTimeFormat === '24-hour'}
                                        onChange={() => updateField('defaultTimeFormat', '24-hour')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">24-hour</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Currency
                            </label>
                            <Select
                                value={formData.defaultCurrency}
                                onValueChange={(value) => updateField('defaultCurrency', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                                    <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Language
                            </label>
                            <Select
                                value={formData.defaultLanguage}
                                onValueChange={(value) => updateField('defaultLanguage', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="Arabic">Arabic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Number Format Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <DollarSign className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Number Format</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure decimal and thousand separators
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Decimal Separator
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="decimalSeparator"
                                        value="."
                                        checked={formData.decimalSeparator === '.'}
                                        onChange={() => updateField('decimalSeparator', '.')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">.</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="decimalSeparator"
                                        value=","
                                        checked={formData.decimalSeparator === ','}
                                        onChange={() => updateField('decimalSeparator', ',')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">,</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Thousand Separator
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="thousandSeparator"
                                        value=","
                                        checked={formData.thousandSeparator === ','}
                                        onChange={() => updateField('thousandSeparator', ',')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">,</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="thousandSeparator"
                                        value="."
                                        checked={formData.thousandSeparator === '.'}
                                        onChange={() => updateField('thousandSeparator', '.')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">.</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="thousandSeparator"
                                        value=" "
                                        checked={formData.thousandSeparator === ' '}
                                        onChange={() => updateField('thousandSeparator', ' ')}
                                        className="form-radio"
                                    />
                                    <span className="text-sm">Space</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Behavior Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <Clock className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">System Behavior</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure session timeouts, login limits, and token expiry
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Session Timeout (minutes)
                            </label>
                            <Input
                                type="number"
                                value={formData.sessionTimeout}
                                onChange={(e) => updateField('sessionTimeout', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Login Attempts Limit
                            </label>
                            <Input
                                type="number"
                                value={formData.loginAttemptsLimit}
                                onChange={(e) => updateField('loginAttemptsLimit', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Account Lockout Duration (minutes)
                            </label>
                            <Input
                                type="number"
                                value={formData.accountLockoutDuration}
                                onChange={(e) => updateField('accountLockoutDuration', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password Reset Expiry (hours)
                            </label>
                            <Input
                                type="number"
                                value={formData.passwordResetExpiry}
                                onChange={(e) => updateField('passwordResetExpiry', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Token Expiry Duration (minutes)
                            </label>
                            <Input
                                type="number"
                                value={formData.tokenExpiryDuration}
                                onChange={(e) => updateField('tokenExpiryDuration', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Refresh Token Expiry (days)
                            </label>
                            <Input
                                type="number"
                                value={formData.refreshTokenExpiry}
                                onChange={(e) => updateField('refreshTokenExpiry', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button Card */}
            <div className="col-span-12 card">
                <div className="card-body">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn btn-primary flex items-center gap-2">
                            <Save className="size-4" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralSettingsTab
