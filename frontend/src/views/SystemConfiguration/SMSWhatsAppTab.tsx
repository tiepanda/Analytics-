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
import { Save, Send, MessageSquare, Smartphone, CheckCircle2 } from 'lucide-react'

interface SMSWhatsAppData {
    enableSMSNotifications: boolean
    twilioAccountSID: string
    twilioAuthToken: string
    twilioPhoneNumber: string
    enableWhatsAppNotifications: boolean
    whatsAppProvider: 'Twilio' | 'Official API' | 'Custom'
    whatsAppPhoneNumber: string
    licenseExpiryWarnings: boolean
    criticalSystemAlerts: boolean
    securityAlerts: boolean
    backupFailures: boolean
    paymentFailures: boolean
}

const SMSWhatsAppTab = () => {
    const [formData, setFormData] = useState<SMSWhatsAppData>({
        enableSMSNotifications: false,
        twilioAccountSID: '',
        twilioAuthToken: '',
        twilioPhoneNumber: '',
        enableWhatsAppNotifications: false,
        whatsAppProvider: 'Twilio',
        whatsAppPhoneNumber: '',
        licenseExpiryWarnings: true,
        criticalSystemAlerts: true,
        securityAlerts: true,
        backupFailures: true,
        paymentFailures: true,
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isTestingSMS, setIsTestingSMS] = useState(false)
    const [isTestingWhatsApp, setIsTestingWhatsApp] = useState(false)

    const updateField = (field: keyof SMSWhatsAppData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving SMS & WhatsApp configuration:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('SMS & WhatsApp configuration saved successfully')
        }, 1000)
    }

    const handleTestSMS = async () => {
        setIsTestingSMS(true)
        setTimeout(() => {
            setIsTestingSMS(false)
            alert('Test SMS sent successfully')
        }, 1000)
    }

    const handleTestWhatsApp = async () => {
        setIsTestingWhatsApp(true)
        setTimeout(() => {
            setIsTestingWhatsApp(false)
            alert('Test WhatsApp message sent successfully')
        }, 1000)
    }

    return (
        <>
            {/* SMS Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Smartphone className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">SMS Settings (Twilio)</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure SMS notification service
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableSMSNotifications}
                                onChange={(e) => updateField('enableSMSNotifications', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable SMS Notifications
                            </span>
                        </label>
                        {formData.enableSMSNotifications && (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Twilio Account SID
                                    </label>
                                    <Input
                                        value={formData.twilioAccountSID}
                                        onChange={(e) => updateField('twilioAccountSID', e.target.value)}
                                        placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Twilio Auth Token
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.twilioAuthToken}
                                        onChange={(e) => updateField('twilioAuthToken', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Twilio Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.twilioPhoneNumber}
                                        onChange={(e) => updateField('twilioPhoneNumber', e.target.value)}
                                        placeholder="+1234567890"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleTestSMS}
                                    disabled={isTestingSMS}
                                    className="btn btn-sub-primary flex items-center gap-2">
                                    <Send className="size-4" />
                                    {isTestingSMS ? 'Sending...' : 'Test SMS'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* WhatsApp Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <MessageSquare className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">WhatsApp Settings</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure WhatsApp notification service
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableWhatsAppNotifications}
                                onChange={(e) => updateField('enableWhatsAppNotifications', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable WhatsApp Notifications
                            </span>
                        </label>
                        {formData.enableWhatsAppNotifications && (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        WhatsApp Provider
                                    </label>
                                    <Select
                                        value={formData.whatsAppProvider}
                                        onValueChange={(value: any) => updateField('whatsAppProvider', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Twilio">Twilio</SelectItem>
                                            <SelectItem value="Official API">Official API</SelectItem>
                                            <SelectItem value="Custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        WhatsApp Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.whatsAppPhoneNumber}
                                        onChange={(e) => updateField('whatsAppPhoneNumber', e.target.value)}
                                        placeholder="+1234567890"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleTestWhatsApp}
                                    disabled={isTestingWhatsApp}
                                    className="btn btn-sub-primary flex items-center gap-2">
                                    <MessageSquare className="size-4" />
                                    {isTestingWhatsApp ? 'Sending...' : 'Test WhatsApp'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Message Templates Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <MessageSquare className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Message Templates</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Customize SMS and WhatsApp templates
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <h6 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMS Template Editor
                            </h6>
                            <p className="mb-3 text-xs text-gray-500 dark:text-dark-500">
                                Available variables: {`{{company}}, {{user}}, {{license}}, {{date}}`}
                            </p>
                            <button type="button" className="btn btn-sub-primary btn-sm">
                                Edit SMS Templates
                            </button>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <h6 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                WhatsApp Template Editor
                            </h6>
                            <p className="mb-3 text-xs text-gray-500 dark:text-dark-500">
                                Available variables: {`{{company}}, {{user}}, {{license}}, {{date}}`} (with multimedia support)
                            </p>
                            <button type="button" className="btn btn-sub-primary btn-sm">
                                Edit WhatsApp Templates
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Preferences Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <CheckCircle2 className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Notification Preferences</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Select notification types for SMS and WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        {[
                            { key: 'licenseExpiryWarnings', label: 'License expiry warnings' },
                            { key: 'criticalSystemAlerts', label: 'Critical system alerts' },
                            { key: 'securityAlerts', label: 'Security alerts' },
                            { key: 'backupFailures', label: 'Backup failures' },
                            { key: 'paymentFailures', label: 'Payment failures' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 dark:border-dark-700">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData[item.key as keyof SMSWhatsAppData] as boolean}
                                        onChange={(e) => updateField(item.key as keyof SMSWhatsAppData, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">SMS</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData[item.key as keyof SMSWhatsAppData] as boolean}
                                        onChange={(e) => updateField(item.key as keyof SMSWhatsAppData, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
                                </label>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                            </div>
                        ))}
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

export default SMSWhatsAppTab
