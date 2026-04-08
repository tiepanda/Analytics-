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
import { Save, HardDrive, Download, Upload, Trash2, Database, Archive } from 'lucide-react'

interface StorageBackupData {
    storageType: 'Local' | 'AWS S3' | 'Azure Blob' | 'Google Cloud'
    storagePath: string
    maxFileSize: number
    allowedFileTypes: string[]
    storageLimitPerCompany: number
    enableAutomaticBackups: boolean
    backupFrequency: 'Daily' | 'Weekly' | 'Monthly'
    backupTime: string
    backupRetention: number
    backupLocation: string
    includeFilesInBackup: boolean
    notificationOnCompletion: boolean
    notificationOnFailure: boolean
    autoVacuum: boolean
    archiveOldData: boolean
    archiveAfter: number
    dataRetentionPeriod: number
}

const StorageBackupTab = () => {
    const [formData, setFormData] = useState<StorageBackupData>({
        storageType: 'Local',
        storagePath: '/var/storage',
        maxFileSize: 50,
        allowedFileTypes: ['Images', 'Documents'],
        storageLimitPerCompany: 100,
        enableAutomaticBackups: true,
        backupFrequency: 'Daily',
        backupTime: '02:00',
        backupRetention: 30,
        backupLocation: '/var/backups',
        includeFilesInBackup: true,
        notificationOnCompletion: true,
        notificationOnFailure: true,
        autoVacuum: true,
        archiveOldData: false,
        archiveAfter: 12,
        dataRetentionPeriod: 10,
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isBackingUp, setIsBackingUp] = useState(false)

    const updateField = (field: keyof StorageBackupData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving storage & backup configuration:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Storage & backup configuration saved successfully')
        }, 1000)
    }

    const handleManualBackup = async () => {
        setIsBackingUp(true)
        setTimeout(() => {
            setIsBackingUp(false)
            alert('Backup initiated successfully')
        }, 1000)
    }

    const mockBackups = [
        { date: '2025-01-15 02:00', size: '2.5 GB', duration: '15 min', status: 'Success' },
        { date: '2025-01-14 02:00', size: '2.4 GB', duration: '14 min', status: 'Success' },
        { date: '2025-01-13 02:00', size: '2.3 GB', duration: '13 min', status: 'Success' },
    ]

    return (
        <>
            {/* File Storage Settings Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <HardDrive className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">File Storage Settings</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure file storage type and limits
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Storage Type
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Local', 'AWS S3', 'Azure Blob', 'Google Cloud'].map((type) => (
                                    <label key={type} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 dark:border-dark-700 dark:hover:bg-dark-850">
                                        <input
                                            type="radio"
                                            name="storageType"
                                            value={type}
                                            checked={formData.storageType === type}
                                            onChange={() => updateField('storageType', type)}
                                            className="form-radio"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Storage Path / Bucket Name
                            </label>
                            <Input
                                value={formData.storagePath}
                                onChange={(e) => updateField('storagePath', e.target.value)}
                                placeholder={formData.storageType === 'Local' ? '/var/storage' : 'bucket-name'}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Max File Size (MB)
                            </label>
                            <Input
                                type="number"
                                value={formData.maxFileSize}
                                onChange={(e) => updateField('maxFileSize', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Allowed File Types
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Images', 'Documents', 'Videos', 'Archives'].map((type) => (
                                    <label key={type} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.allowedFileTypes.includes(type)}
                                            onChange={(e) => {
                                                const types = e.target.checked
                                                    ? [...formData.allowedFileTypes, type]
                                                    : formData.allowedFileTypes.filter((t) => t !== type)
                                                updateField('allowedFileTypes', types)
                                            }}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Storage Limit per Company (GB)
                            </label>
                            <Input
                                type="number"
                                value={formData.storageLimitPerCompany}
                                onChange={(e) => updateField('storageLimitPerCompany', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Backup Configuration Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <Upload className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Backup Configuration</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure automatic backup settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableAutomaticBackups}
                                onChange={(e) => updateField('enableAutomaticBackups', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Automatic Backups
                            </span>
                        </label>
                        {formData.enableAutomaticBackups && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Backup Frequency
                                    </label>
                                    <Select
                                        value={formData.backupFrequency}
                                        onValueChange={(value: any) => updateField('backupFrequency', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Daily">Daily</SelectItem>
                                            <SelectItem value="Weekly">Weekly</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Backup Time
                                    </label>
                                    <Input
                                        type="time"
                                        value={formData.backupTime}
                                        onChange={(e) => updateField('backupTime', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Backup Retention (days)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.backupRetention}
                                        onChange={(e) => updateField('backupRetention', parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Backup Location
                                    </label>
                                    <Input
                                        value={formData.backupLocation}
                                        onChange={(e) => updateField('backupLocation', e.target.value)}
                                        placeholder="/var/backups"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.includeFilesInBackup}
                                            onChange={(e) => updateField('includeFilesInBackup', e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Include Files in Backup
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.notificationOnCompletion}
                                            onChange={(e) => updateField('notificationOnCompletion', e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Notification on Completion
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.notificationOnFailure}
                                            onChange={(e) => updateField('notificationOnFailure', e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Notification on Failure
                                        </span>
                                    </label>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Backup Management Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                                <Download className="size-5" />
                            </div>
                            <div>
                                <h6 className="card-title">Backup Management</h6>
                                <p className="text-sm text-gray-500 dark:text-dark-500">
                                    View and manage system backups
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleManualBackup}
                            disabled={isBackingUp}
                            className="btn btn-primary flex items-center gap-2">
                            <Upload className="size-4" />
                            {isBackingUp ? 'Backing up...' : 'Manual Backup'}
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-4 rounded-lg bg-green-50 dark:bg-green-500/10 p-3">
                        <p className="text-sm text-green-700 dark:text-green-400">
                            <strong>Last Backup:</strong> {mockBackups[0]?.date} ({mockBackups[0]?.status})
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
                            <thead className="bg-gray-50 dark:bg-dark-850">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-dark-500">
                                        Backup Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-dark-500">
                                        Size
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-dark-500">
                                        Duration
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-dark-500">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-dark-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-dark-700 dark:bg-dark-800">
                                {mockBackups.map((backup, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {backup.date}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {backup.size}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {backup.duration}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <span className="badge badge-green">{backup.status}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sub-primary btn-sm flex items-center gap-1">
                                                    <Download className="size-3" />
                                                    Download
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sub-primary btn-sm flex items-center gap-1">
                                                    <Upload className="size-3" />
                                                    Restore
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sub-red btn-sm flex items-center gap-1">
                                                    <Trash2 className="size-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Database Maintenance Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <Database className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Database Maintenance</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure database optimization and archiving
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.autoVacuum}
                                onChange={(e) => updateField('autoVacuum', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Auto-Vacuum (PostgreSQL optimization)
                            </span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.archiveOldData}
                                onChange={(e) => updateField('archiveOldData', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Archive Old Data (move old data to archive tables)
                            </span>
                        </label>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Archive After (months)
                            </label>
                            <Input
                                type="number"
                                value={formData.archiveAfter}
                                onChange={(e) => updateField('archiveAfter', parseInt(e.target.value))}
                                min={1}
                                disabled={!formData.archiveOldData}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Data Retention Period (years)
                            </label>
                            <Input
                                type="number"
                                value={formData.dataRetentionPeriod}
                                onChange={(e) => updateField('dataRetentionPeriod', parseInt(e.target.value))}
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

export default StorageBackupTab
