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
import { Save, Zap, Trash2, Database, Gauge, Activity, BarChart3 } from 'lucide-react'

interface PerformanceOptimizationData {
    enableRedisCache: boolean
    redisHost: string
    redisPort: number
    redisPassword: string
    cacheTTL: number
    cacheStrategy: 'Lazy Loading' | 'Write-Through' | 'Write-Behind'
    enableQueryCaching: boolean
    connectionPoolSize: number
    connectionTimeout: number
    commandTimeout: number
    enableLazyLoading: boolean
    enableQueryLogging: boolean
    slowQueryThreshold: number
    enableResponseCompression: boolean
    enableStaticFileCaching: boolean
    cacheDuration: number
    enableCDN: boolean
    cdnURL: string
    logLevel: 'Debug' | 'Info' | 'Warning' | 'Error' | 'Critical'
    enablePerformanceMonitoring: boolean
    enableApplicationInsights: boolean
    applicationInsightsKey: string
}

const PerformanceOptimizationTab = () => {
    const [formData, setFormData] = useState<PerformanceOptimizationData>({
        enableRedisCache: false,
        redisHost: 'localhost',
        redisPort: 6379,
        redisPassword: '',
        cacheTTL: 3600,
        cacheStrategy: 'Lazy Loading',
        enableQueryCaching: true,
        connectionPoolSize: 100,
        connectionTimeout: 30,
        commandTimeout: 300,
        enableLazyLoading: true,
        enableQueryLogging: false,
        slowQueryThreshold: 1000,
        enableResponseCompression: true,
        enableStaticFileCaching: true,
        cacheDuration: 7,
        enableCDN: false,
        cdnURL: '',
        logLevel: 'Info',
        enablePerformanceMonitoring: true,
        enableApplicationInsights: false,
        applicationInsightsKey: '',
    })

    const [isSaving, setIsSaving] = useState(false)

    const updateField = (field: keyof PerformanceOptimizationData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving performance optimization settings:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Performance optimization settings saved successfully')
        }, 1000)
    }

    const handleClearCache = () => {
        console.log('Clearing cache...')
        alert('Cache cleared successfully')
    }

    return (
        <>
            {/* Caching Configuration Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Zap className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Caching Configuration</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure Redis cache settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableRedisCache}
                                onChange={(e) => updateField('enableRedisCache', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Redis Cache
                            </span>
                        </label>
                        {formData.enableRedisCache && (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Redis Host
                                    </label>
                                    <Input
                                        value={formData.redisHost}
                                        onChange={(e) => updateField('redisHost', e.target.value)}
                                        placeholder="localhost"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Redis Port
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.redisPort}
                                        onChange={(e) => updateField('redisPort', parseInt(e.target.value))}
                                        placeholder="6379"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Cache TTL (seconds)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.cacheTTL}
                                        onChange={(e) => updateField('cacheTTL', parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Cache Strategy
                                    </label>
                                    <Select
                                        value={formData.cacheStrategy}
                                        onValueChange={(value: any) => updateField('cacheStrategy', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select strategy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Lazy Loading">Lazy Loading</SelectItem>
                                            <SelectItem value="Write-Through">Write-Through</SelectItem>
                                            <SelectItem value="Write-Behind">Write-Behind</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClearCache}
                                    className="btn btn-sub-primary flex items-center gap-2">
                                    <Trash2 className="size-4" />
                                    Clear Cache
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Database Optimization Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <Database className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Database Optimization</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure database performance settings
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.enableQueryCaching}
                                    onChange={(e) => updateField('enableQueryCaching', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Query Caching</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.enableLazyLoading}
                                    onChange={(e) => updateField('enableLazyLoading', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Lazy Loading</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.enableQueryLogging}
                                    onChange={(e) => updateField('enableQueryLogging', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Query Logging</span>
                            </label>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Connection Pool Size
                            </label>
                            <Input
                                type="number"
                                value={formData.connectionPoolSize}
                                onChange={(e) => updateField('connectionPoolSize', parseInt(e.target.value))}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Slow Query Threshold (milliseconds)
                            </label>
                            <Input
                                type="number"
                                value={formData.slowQueryThreshold}
                                onChange={(e) => updateField('slowQueryThreshold', parseInt(e.target.value))}
                                min={1}
                                disabled={!formData.enableQueryLogging}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Performance Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <Gauge className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Application Performance</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure response compression and CDN
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableResponseCompression}
                                onChange={(e) => updateField('enableResponseCompression', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Enable Response Compression (GZIP)
                            </span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableStaticFileCaching}
                                onChange={(e) => updateField('enableStaticFileCaching', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Enable Static File Caching
                            </span>
                        </label>
                        {formData.enableStaticFileCaching && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cache Duration (days)
                                </label>
                                <Input
                                    type="number"
                                    value={formData.cacheDuration}
                                    onChange={(e) => updateField('cacheDuration', parseInt(e.target.value))}
                                    min={1}
                                />
                            </div>
                        )}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableCDN}
                                onChange={(e) => updateField('enableCDN', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable CDN</span>
                        </label>
                        {formData.enableCDN && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    CDN URL
                                </label>
                                <Input
                                    value={formData.cdnURL}
                                    onChange={(e) => updateField('cdnURL', e.target.value)}
                                    placeholder="https://cdn.example.com"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Monitoring & Logging Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <Activity className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Monitoring & Logging</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure performance monitoring
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Log Level
                            </label>
                            <Select
                                value={formData.logLevel}
                                onValueChange={(value: any) => updateField('logLevel', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select log level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Debug">Debug</SelectItem>
                                    <SelectItem value="Info">Info</SelectItem>
                                    <SelectItem value="Warning">Warning</SelectItem>
                                    <SelectItem value="Error">Error</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enablePerformanceMonitoring}
                                onChange={(e) => updateField('enablePerformanceMonitoring', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Enable Performance Monitoring
                            </span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableApplicationInsights}
                                onChange={(e) => updateField('enableApplicationInsights', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Enable Application Insights
                            </span>
                        </label>
                        {formData.enableApplicationInsights && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Application Insights Key
                                </label>
                                <Input
                                    value={formData.applicationInsightsKey}
                                    onChange={(e) => updateField('applicationInsightsKey', e.target.value)}
                                    placeholder="insights-key"
                                />
                            </div>
                        )}
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

export default PerformanceOptimizationTab
