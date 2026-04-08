'use client'

import React, { useState } from 'react'
import { Input } from '@src/components/ui/input'
import { Save, Shield, Lock, Key, Users, Globe, FileLock, CheckCircle2 } from 'lucide-react'

interface SecuritySettingsData {
    enableMFA: boolean
    mfaMethods: {
        emailOTP: boolean
        smsOTP: boolean
        authenticatorApp: boolean
    }
    forceMFAForSuperAdmin: boolean
    forceMFAForAllUsers: boolean
    minimumPasswordLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSpecialCharacters: boolean
    passwordExpiry: number
    preventPasswordReuse: number
    passwordStrengthMeter: boolean
    allowConcurrentSessions: boolean
    maxConcurrentSessions: number
    idleSessionTimeout: number
    absoluteSessionTimeout: number
    rememberMeDuration: number
    enableIPWhitelisting: boolean
    whitelistedIPs: string
    enableIPBlacklisting: boolean
    blacklistedIPs: string
    blockSuspiciousActivities: boolean
    databaseEncryption: boolean
    fileEncryption: boolean
    logRetentionPeriod: number
    gdprComplianceMode: boolean
    hipaaComplianceMode: boolean
    iso27001Compliance: boolean
}

const SecuritySettingsTab = () => {
    const [formData, setFormData] = useState<SecuritySettingsData>({
        enableMFA: false,
        mfaMethods: {
            emailOTP: true,
            smsOTP: true,
            authenticatorApp: true,
        },
        forceMFAForSuperAdmin: false,
        forceMFAForAllUsers: false,
        minimumPasswordLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
        passwordExpiry: 0,
        preventPasswordReuse: 5,
        passwordStrengthMeter: true,
        allowConcurrentSessions: true,
        maxConcurrentSessions: 3,
        idleSessionTimeout: 30,
        absoluteSessionTimeout: 12,
        rememberMeDuration: 30,
        enableIPWhitelisting: false,
        whitelistedIPs: '',
        enableIPBlacklisting: false,
        blacklistedIPs: '',
        blockSuspiciousActivities: false,
        databaseEncryption: false,
        fileEncryption: false,
        logRetentionPeriod: 5,
        gdprComplianceMode: false,
        hipaaComplianceMode: false,
        iso27001Compliance: false,
    })

    const [isSaving, setIsSaving] = useState(false)

    const updateField = (field: keyof SecuritySettingsData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const updateMfaMethod = (method: keyof SecuritySettingsData['mfaMethods'], value: boolean) => {
        setFormData((prev) => ({
            ...prev,
            mfaMethods: { ...prev.mfaMethods, [method]: value },
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving security settings:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Security settings saved successfully')
        }, 1000)
    }

    return (
        <>
            {/* Authentication Security Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Shield className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Authentication Security</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure multi-factor authentication
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableMFA}
                                onChange={(e) => updateField('enableMFA', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Multi-Factor Authentication (MFA)
                            </span>
                        </label>
                        {formData.enableMFA && (
                            <div className="ml-6 space-y-2 rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    MFA Methods:
                                </p>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.mfaMethods.emailOTP}
                                        onChange={(e) => updateMfaMethod('emailOTP', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Email OTP</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.mfaMethods.smsOTP}
                                        onChange={(e) => updateMfaMethod('smsOTP', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">SMS OTP</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.mfaMethods.authenticatorApp}
                                        onChange={(e) => updateMfaMethod('authenticatorApp', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Authenticator App
                                    </span>
                                </label>
                            </div>
                        )}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.forceMFAForSuperAdmin}
                                onChange={(e) => updateField('forceMFAForSuperAdmin', e.target.checked)}
                                disabled={!formData.enableMFA}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Force MFA for Super Admin
                            </span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.forceMFAForAllUsers}
                                onChange={(e) => updateField('forceMFAForAllUsers', e.target.checked)}
                                disabled={!formData.enableMFA}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Force MFA for All Users
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Password Policy Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <Key className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Password Policy</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure password requirements
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Minimum Password Length
                            </label>
                            <Input
                                type="number"
                                value={formData.minimumPasswordLength}
                                onChange={(e) => updateField('minimumPasswordLength', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password Expiry (days) - 0 for no expiry
                            </label>
                            <Input
                                type="number"
                                value={formData.passwordExpiry}
                                onChange={(e) => updateField('passwordExpiry', parseInt(e.target.value))}
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Prevent Password Reuse (last X passwords)
                            </label>
                            <Input
                                type="number"
                                value={formData.preventPasswordReuse}
                                onChange={(e) => updateField('preventPasswordReuse', parseInt(e.target.value))}
                                min={0}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.requireUppercase}
                                    onChange={(e) => updateField('requireUppercase', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Require Uppercase</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.requireLowercase}
                                    onChange={(e) => updateField('requireLowercase', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Require Lowercase</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.requireNumbers}
                                    onChange={(e) => updateField('requireNumbers', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Require Numbers</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.requireSpecialCharacters}
                                    onChange={(e) => updateField('requireSpecialCharacters', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Require Special Characters
                                </span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.passwordStrengthMeter}
                                    onChange={(e) => updateField('passwordStrengthMeter', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Password Strength Meter
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session Management Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <Users className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Session Management</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure session timeouts and limits
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.allowConcurrentSessions}
                                onChange={(e) => updateField('allowConcurrentSessions', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Allow Concurrent Sessions
                            </span>
                        </label>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Max Concurrent Sessions per User
                            </label>
                            <Input
                                type="number"
                                value={formData.maxConcurrentSessions}
                                onChange={(e) => updateField('maxConcurrentSessions', parseInt(e.target.value))}
                                min={1}
                                disabled={!formData.allowConcurrentSessions}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Idle Session Timeout (minutes)
                            </label>
                            <Input
                                type="number"
                                value={formData.idleSessionTimeout}
                                onChange={(e) => updateField('idleSessionTimeout', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Absolute Session Timeout (hours)
                            </label>
                            <Input
                                type="number"
                                value={formData.absoluteSessionTimeout}
                                onChange={(e) => updateField('absoluteSessionTimeout', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Remember Me Duration (days)
                            </label>
                            <Input
                                type="number"
                                value={formData.rememberMeDuration}
                                onChange={(e) => updateField('rememberMeDuration', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* IP & Access Control Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <Globe className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">IP & Access Control</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure IP whitelisting and blacklisting
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableIPWhitelisting}
                                onChange={(e) => updateField('enableIPWhitelisting', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable IP Whitelisting
                            </span>
                        </label>
                        {formData.enableIPWhitelisting && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Whitelisted IPs (one IP per line or CIDR notation)
                                </label>
                                <textarea
                                    value={formData.whitelistedIPs}
                                    onChange={(e) => updateField('whitelistedIPs', e.target.value)}
                                    rows={4}
                                    className="form-textarea"
                                    placeholder="192.168.1.1&#10;10.0.0.0/8"
                                />
                            </div>
                        )}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableIPBlacklisting}
                                onChange={(e) => updateField('enableIPBlacklisting', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable IP Blacklisting
                            </span>
                        </label>
                        {formData.enableIPBlacklisting && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Blacklisted IPs (one IP per line)
                                </label>
                                <textarea
                                    value={formData.blacklistedIPs}
                                    onChange={(e) => updateField('blacklistedIPs', e.target.value)}
                                    rows={4}
                                    className="form-textarea"
                                    placeholder="192.168.1.100"
                                />
                            </div>
                        )}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.blockSuspiciousActivities}
                                onChange={(e) => updateField('blockSuspiciousActivities', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Block Suspicious Activities
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Data Encryption Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-red-500 rounded-md bg-red-500/10 size-12">
                            <Lock className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Data Encryption</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure encryption settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Encryption at Rest:</strong> AES-256 (enabled by default)
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Encryption in Transit:</strong> TLS 1.3 (enabled by default)
                            </p>
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.databaseEncryption}
                                onChange={(e) => updateField('databaseEncryption', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Database Encryption</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.fileEncryption}
                                onChange={(e) => updateField('fileEncryption', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                File Encryption (encrypt uploaded files)
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Audit & Compliance Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-indigo-500 rounded-md bg-indigo-500/10 size-12">
                            <FileLock className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Audit & Compliance</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure compliance and audit settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Enable Audit Logging:</strong> Always on (display only)
                            </p>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Log Retention Period (years)
                            </label>
                            <Input
                                type="number"
                                value={formData.logRetentionPeriod}
                                onChange={(e) => updateField('logRetentionPeriod', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.gdprComplianceMode}
                                    onChange={(e) => updateField('gdprComplianceMode', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    GDPR Compliance Mode
                                </span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.hipaaComplianceMode}
                                    onChange={(e) => updateField('hipaaComplianceMode', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    HIPAA Compliance Mode
                                </span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.iso27001Compliance}
                                    onChange={(e) => updateField('iso27001Compliance', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">ISO 27001 Compliance</span>
                            </label>
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

export default SecuritySettingsTab
