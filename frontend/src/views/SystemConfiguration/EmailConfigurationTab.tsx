'use client'

import React, { useState } from 'react'
import { Input } from '@src/components/ui/input'
import { Save, Mail, Send, CheckCircle2, FileText } from 'lucide-react'

interface EmailConfigurationData {
    smtpHost: string
    smtpPort: number
    useSslTls: boolean
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    enableEmailNotifications: boolean
    userRegistrationNotifications: boolean
    licenseExpiryWarnings: boolean
    systemAlerts: boolean
    failedLoginAttempts: boolean
    passwordChangeConfirmations: boolean
    invoiceGeneration: boolean
    backupCompletion: boolean
    performanceDegradationAlerts: boolean
}

const EmailConfigurationTab = () => {
    const [formData, setFormData] = useState<EmailConfigurationData>({
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        useSslTls: true,
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: '',
        fromName: 'Eagle Analytics',
        enableEmailNotifications: true,
        userRegistrationNotifications: true,
        licenseExpiryWarnings: true,
        systemAlerts: true,
        failedLoginAttempts: true,
        passwordChangeConfirmations: true,
        invoiceGeneration: true,
        backupCompletion: true,
        performanceDegradationAlerts: true,
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isTesting, setIsTesting] = useState(false)
    const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const updateField = (field: keyof EmailConfigurationData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving email configuration:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Email configuration saved successfully')
        }, 1000)
    }

    const handleTestEmail = async () => {
        setIsTesting(true)
        setTestStatus('idle')
        console.log('Sending test email...')
        setTimeout(() => {
            setIsTesting(false)
            setTestStatus('success')
            setTimeout(() => setTestStatus('idle'), 3000)
        }, 1500)
    }

    const emailTemplates = [
        'Welcome Email Template',
        'Password Reset Template',
        'License Expiry Warning Template',
        'License Renewal Template',
        'Invoice Email Template',
        'System Alert Template',
    ]

    return (
        <>
            {/* SMTP Settings Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Mail className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">SMTP Settings</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure email server connection settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMTP Host
                            </label>
                            <Input
                                value={formData.smtpHost}
                                onChange={(e) => updateField('smtpHost', e.target.value)}
                                placeholder="smtp.gmail.com"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMTP Port
                            </label>
                            <Input
                                type="number"
                                value={formData.smtpPort}
                                onChange={(e) => updateField('smtpPort', parseInt(e.target.value))}
                                placeholder="587"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.useSslTls}
                                    onChange={(e) => updateField('useSslTls', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Use SSL/TLS
                                </span>
                            </label>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMTP Username
                            </label>
                            <Input
                                type="email"
                                value={formData.smtpUsername}
                                onChange={(e) => updateField('smtpUsername', e.target.value)}
                                placeholder="your-email@gmail.com"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMTP Password
                            </label>
                            <Input
                                type="password"
                                value={formData.smtpPassword}
                                onChange={(e) => updateField('smtpPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                From Email
                            </label>
                            <Input
                                type="email"
                                value={formData.fromEmail}
                                onChange={(e) => updateField('fromEmail', e.target.value)}
                                placeholder="noreply@example.com"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                From Name
                            </label>
                            <Input
                                value={formData.fromName}
                                onChange={(e) => updateField('fromName', e.target.value)}
                                placeholder="Eagle Analytics"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="button"
                                onClick={handleTestEmail}
                                disabled={isTesting}
                                className="btn btn-sub-primary flex items-center gap-2">
                                <Send className="size-4" />
                                {isTesting ? 'Sending...' : 'Test Email'}
                            </button>
                            {testStatus === 'success' && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="size-4" />
                                    Test email sent successfully!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Templates Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <FileText className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Email Templates</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Manage email template designs
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        {emailTemplates.map((template) => (
                            <div
                                key={template}
                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-dark-700 dark:hover:bg-dark-850">
                                <div className="flex items-center gap-3">
                                    <Mail className="size-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {template}
                                    </span>
                                </div>
                                <button type="button" className="btn btn-sub-primary btn-sm">
                                    Edit Template
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Email Notifications Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <CheckCircle2 className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Email Notifications</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure notification preferences
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        <label className="mb-4 flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableEmailNotifications}
                                onChange={(e) => updateField('enableEmailNotifications', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Email Notifications
                            </span>
                        </label>
                        <div className="space-y-2">
                            {[
                                { key: 'userRegistrationNotifications', label: 'User registration notifications' },
                                { key: 'licenseExpiryWarnings', label: 'License expiry warnings (15, 30 days before)' },
                                { key: 'systemAlerts', label: 'System alerts' },
                                { key: 'failedLoginAttempts', label: 'Failed login attempts' },
                                { key: 'passwordChangeConfirmations', label: 'Password change confirmations' },
                                { key: 'invoiceGeneration', label: 'Invoice generation' },
                                { key: 'backupCompletion', label: 'Backup completion/failure' },
                                { key: 'performanceDegradationAlerts', label: 'Performance degradation alerts' },
                            ].map((item) => (
                                <label key={item.key} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData[item.key as keyof EmailConfigurationData] as boolean}
                                        onChange={(e) => updateField(item.key as keyof EmailConfigurationData, e.target.checked)}
                                        disabled={!formData.enableEmailNotifications}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                                </label>
                            ))}
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

export default EmailConfigurationTab
