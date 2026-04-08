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
import { Save, Bell, Plus, Trash2, AlertTriangle, TrendingUp, Users } from 'lucide-react'

interface NotificationSettingsData {
    enableInAppNotifications: boolean
    enableEmailNotifications: boolean
    enableSMSNotifications: boolean
    enableWhatsAppNotifications: boolean
    enablePushNotifications: boolean
    cpuUsageAlert: number
    memoryUsageAlert: number
    diskUsageAlert: number
    databaseConnectionAlert: boolean
    apiResponseTimeAlert: number
    licenseExpiryWarningDays: number[]
    sendReminderTo: {
        companyAdmin: boolean
        superAdmin: boolean
        billingContact: boolean
    }
    customRules: Array<{
        id: string
        name: string
        condition: string
        threshold: number
        actions: string[]
    }>
}

const NotificationSettingsTab = () => {
    const [formData, setFormData] = useState<NotificationSettingsData>({
        enableInAppNotifications: true,
        enableEmailNotifications: true,
        enableSMSNotifications: false,
        enableWhatsAppNotifications: false,
        enablePushNotifications: false,
        cpuUsageAlert: 80,
        memoryUsageAlert: 85,
        diskUsageAlert: 90,
        databaseConnectionAlert: true,
        apiResponseTimeAlert: 2000,
        licenseExpiryWarningDays: [30, 15, 7, 1],
        sendReminderTo: {
            companyAdmin: true,
            superAdmin: true,
            billingContact: true,
        },
        customRules: [],
    })

    const [isSaving, setIsSaving] = useState(false)
    const [showRuleBuilder, setShowRuleBuilder] = useState(false)
    const [newRule, setNewRule] = useState({
        name: '',
        condition: 'Greater than',
        threshold: 0,
        actions: [] as string[],
    })

    const updateField = (field: keyof NotificationSettingsData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving notification settings:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Notification settings saved successfully')
        }, 1000)
    }

    const handleAddRule = () => {
        if (newRule.name && newRule.threshold > 0) {
            const rule = {
                id: Date.now().toString(),
                ...newRule,
            }
            updateField('customRules', [...formData.customRules, rule])
            setNewRule({ name: '', condition: 'Greater than', threshold: 0, actions: [] })
            setShowRuleBuilder(false)
        }
    }

    const handleDeleteRule = (id: string) => {
        updateField(
            'customRules',
            formData.customRules.filter((rule) => rule.id !== id)
        )
    }

    return (
        <>
            {/* Global Notification Preferences Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Bell className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Global Notification Preferences</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Enable or disable notification channels
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
                        {[
                            { key: 'enableInAppNotifications', label: 'In-App Notifications' },
                            { key: 'enableEmailNotifications', label: 'Email Notifications' },
                            { key: 'enableSMSNotifications', label: 'SMS Notifications' },
                            { key: 'enableWhatsAppNotifications', label: 'WhatsApp Notifications' },
                            { key: 'enablePushNotifications', label: 'Push Notifications' },
                        ].map((item) => (
                            <label key={item.key} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 dark:border-dark-700 dark:hover:bg-dark-850">
                                <input
                                    type="checkbox"
                                    checked={formData[item.key as keyof NotificationSettingsData] as boolean}
                                    onChange={(e) => updateField(item.key as keyof NotificationSettingsData, e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Alert Thresholds Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-red-500 rounded-md bg-red-500/10 size-12">
                            <AlertTriangle className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">System Alert Thresholds</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure system resource alert limits
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                CPU Usage Alert (%)
                            </label>
                            <Input
                                type="number"
                                value={formData.cpuUsageAlert}
                                onChange={(e) => updateField('cpuUsageAlert', parseInt(e.target.value))}
                                min={0}
                                max={100}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Memory Usage Alert (%)
                            </label>
                            <Input
                                type="number"
                                value={formData.memoryUsageAlert}
                                onChange={(e) => updateField('memoryUsageAlert', parseInt(e.target.value))}
                                min={0}
                                max={100}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Disk Usage Alert (%)
                            </label>
                            <Input
                                type="number"
                                value={formData.diskUsageAlert}
                                onChange={(e) => updateField('diskUsageAlert', parseInt(e.target.value))}
                                min={0}
                                max={100}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                API Response Time Alert (milliseconds)
                            </label>
                            <Input
                                type="number"
                                value={formData.apiResponseTimeAlert}
                                onChange={(e) => updateField('apiResponseTimeAlert', parseInt(e.target.value))}
                                min={0}
                            />
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.databaseConnectionAlert}
                                onChange={(e) => updateField('databaseConnectionAlert', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Database Connection Alert
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* License Alert Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <TrendingUp className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">License Alert Settings</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure license expiry warnings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                License Expiry Warning Days
                            </label>
                            <Input
                                value={formData.licenseExpiryWarningDays.join(', ')}
                                onChange={(e) => {
                                    const days = e.target.value
                                        .split(',')
                                        .map((d) => parseInt(d.trim()))
                                        .filter((d) => !isNaN(d))
                                    updateField('licenseExpiryWarningDays', days)
                                }}
                                placeholder="30, 15, 7, 1"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-dark-500">
                                Enter comma-separated days (e.g., 30, 15, 7, 1)
                            </p>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Send Reminder To
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.sendReminderTo.companyAdmin}
                                        onChange={(e) =>
                                            updateField('sendReminderTo', {
                                                ...formData.sendReminderTo,
                                                companyAdmin: e.target.checked,
                                            })
                                        }
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Company Admin</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.sendReminderTo.superAdmin}
                                        onChange={(e) =>
                                            updateField('sendReminderTo', {
                                                ...formData.sendReminderTo,
                                                superAdmin: e.target.checked,
                                            })
                                        }
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Super Admin</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.sendReminderTo.billingContact}
                                        onChange={(e) =>
                                            updateField('sendReminderTo', {
                                                ...formData.sendReminderTo,
                                                billingContact: e.target.checked,
                                            })
                                        }
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Billing Contact</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Alert Rules Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                                <Users className="size-5" />
                            </div>
                            <div>
                                <h6 className="card-title">Custom Alert Rules</h6>
                                <p className="text-sm text-gray-500 dark:text-dark-500">
                                    Create custom notification rules
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowRuleBuilder(!showRuleBuilder)}
                            className="btn btn-sub-primary flex items-center gap-2">
                            <Plus className="size-4" />
                            Add Custom Rule
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    {showRuleBuilder && (
                        <div className="mb-4 rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <h6 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Rule Builder
                            </h6>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Rule Name
                                    </label>
                                    <Input
                                        value={newRule.name}
                                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                                        placeholder="Custom Rule Name"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Condition
                                    </label>
                                    <Select
                                        value={newRule.condition}
                                        onValueChange={(value) => setNewRule({ ...newRule, condition: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Greater than">Greater than</SelectItem>
                                            <SelectItem value="Less than">Less than</SelectItem>
                                            <SelectItem value="Equals">Equals</SelectItem>
                                            <SelectItem value="Not equals">Not equals</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Threshold
                                    </label>
                                    <Input
                                        type="number"
                                        value={newRule.threshold}
                                        onChange={(e) => setNewRule({ ...newRule, threshold: parseInt(e.target.value) })}
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Actions
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Email', 'SMS', 'WhatsApp', 'In-App'].map((action) => (
                                            <label key={action} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={newRule.actions.includes(action)}
                                                    onChange={(e) => {
                                                        const actions = e.target.checked
                                                            ? [...newRule.actions, action]
                                                            : newRule.actions.filter((a) => a !== action)
                                                        setNewRule({ ...newRule, actions })
                                                    }}
                                                    className="form-checkbox"
                                                />
                                                <span className="text-xs text-gray-700 dark:text-gray-300">{action}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowRuleBuilder(false)
                                            setNewRule({ name: '', condition: 'Greater than', threshold: 0, actions: [] })
                                        }}
                                        className="btn btn-sub-primary">
                                        Cancel
                                    </button>
                                    <button type="button" onClick={handleAddRule} className="btn btn-primary">
                                        Add Rule
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.customRules.length > 0 ? (
                        <div className="space-y-2">
                            {formData.customRules.map((rule) => (
                                <div
                                    key={rule.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {rule.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-dark-500">
                                            {rule.condition} {rule.threshold} - Actions: {rule.actions.join(', ')}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteRule(rule.id)}
                                        className="btn btn-sub-red btn-sm flex items-center gap-1">
                                        <Trash2 className="size-3" />
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-gray-200 p-8 text-center dark:border-dark-700">
                            <Bell className="mx-auto mb-2 size-8 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                No custom alert rules configured. Click &quot;Add Custom Rule&quot; to create one.
                            </p>
                        </div>
                    )}
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

export default NotificationSettingsTab
