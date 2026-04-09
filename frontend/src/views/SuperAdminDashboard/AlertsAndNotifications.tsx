'use client'

import React, { useState } from 'react'
import {
    AlertTriangle,
    Key,
    Database,
    Shield,
    CheckCircle2,
    XCircle,
    Eye,
    Mail,
    RefreshCw,
} from 'lucide-react'
import { MOCK_LICENSES } from '@src/data/licenses'

interface Alert {
    id: string
    type: 'License Expiring' | 'System Performance' | 'Security' | 'Backup Failed' | 'Database'
    severity: 'Critical' | 'Warning' | 'Info'
    title: string
    message: string
    timestamp: string
    affectedEntity: string
}

const MOCK_ALERTS: Alert[] = [
    {
        id: '1',
        type: 'License Expiring',
        severity: 'Critical',
        title: 'License Expiring Soon',
        message: "License for 'ABC Manufacturing' expires in 5 days",
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
        affectedEntity: 'Company: ABC Manufacturing',
    },
    {
        id: '2',
        type: 'System Performance',
        severity: 'Warning',
        title: 'High CPU Usage',
        message: 'CPU usage exceeded 85% threshold',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        affectedEntity: 'System Server',
    },
    {
        id: '3',
        type: 'Security',
        severity: 'Critical',
        title: 'Failed Login Attempts',
        message: 'Multiple failed login attempts detected from IP: 192.168.1.100',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        affectedEntity: 'IP: 192.168.1.100',
    },
    {
        id: '4',
        type: 'Backup Failed',
        severity: 'Warning',
        title: 'Backup Failed',
        message: 'Scheduled backup failed to complete',
        timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
        affectedEntity: 'Database Backup',
    },
    {
        id: '5',
        type: 'Database',
        severity: 'Critical',
        title: 'Database Connection Issue',
        message: 'Database connection timeout detected',
        timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
        affectedEntity: 'Database Server',
    },
]

const AlertsAndNotifications: React.FC = () => {
    const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set())

    const getAlertIcon = (type: Alert['type']) => {
        switch (type) {
            case 'License Expiring':
                return <Key className="size-5" />
            case 'System Performance':
                return <AlertTriangle className="size-5" />
            case 'Security':
                return <Shield className="size-5" />
            case 'Backup Failed':
                return <Database className="size-5" />
            case 'Database':
                return <Database className="size-5" />
            default:
                return <AlertTriangle className="size-5" />
        }
    }

    const getSeverityColor = (severity: Alert['severity']) => {
        switch (severity) {
            case 'Critical':
                return 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
            case 'Warning':
                return 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20'
            default:
                return 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
        }
    }

    const getSeverityTextColor = (severity: Alert['severity']) => {
        switch (severity) {
            case 'Critical':
                return 'text-red-600 dark:text-red-400'
            case 'Warning':
                return 'text-yellow-600 dark:text-yellow-400'
            default:
                return 'text-blue-600 dark:text-blue-400'
        }
    }

    const formatTimeAgo = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)

        if (diffMins < 60) {
            return `${diffMins}m ago`
        } else if (diffHours < 24) {
            return `${diffHours}h ago`
        } else {
            return date.toLocaleDateString()
        }
    }

    const handleAcknowledge = (alertId: string) => {
        setAcknowledgedAlerts((prev) => new Set(prev).add(alertId))
    }

    const handleResolve = (alertId: string) => {
        setAcknowledgedAlerts((prev) => new Set(prev).add(alertId))
        alert(`Resolving alert: ${alertId}`)
    }

    // Get upcoming license renewals (next 30 days)
    const upcomingRenewals = MOCK_LICENSES.filter(
        (license) => license.daysRemaining <= 30 && license.daysRemaining > 0 && license.status === 'Active'
    )
        .sort((a, b) => a.daysRemaining - b.daysRemaining)
        .slice(0, 5)

    const activeAlerts = MOCK_ALERTS.filter((alert) => !acknowledgedAlerts.has(alert.id)).slice(0, 5)

    return (
        <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Critical Alerts */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <h6 className="card-title">Critical Alerts</h6>
                        <span className="badge badge-red">{activeAlerts.length}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        {activeAlerts.length === 0 ? (
                            <p className="py-4 text-sm text-center text-gray-500 dark:text-dark-500">
                                No active alerts
                            </p>
                        ) : (
                            activeAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 ${getSeverityTextColor(alert.severity)}`}>
                                            {getAlertIcon(alert.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {alert.title}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                        {alert.message}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`badge ${
                                                        alert.severity === 'Critical'
                                                            ? 'badge-red'
                                                            : alert.severity === 'Warning'
                                                              ? 'badge-yellow'
                                                              : 'badge-blue'
                                                    } text-xs shrink-0 ml-2`}>
                                                    {alert.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-dark-500 mb-2">
                                                {alert.affectedEntity} • {formatTimeAgo(alert.timestamp)}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleAcknowledge(alert.id)}
                                                    className="btn btn-sub-primary btn-xs flex items-center gap-1">
                                                    <CheckCircle2 className="size-3" />
                                                    Acknowledge
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleResolve(alert.id)}
                                                    className="btn btn-sub-primary btn-xs flex items-center gap-1">
                                                    <RefreshCw className="size-3" />
                                                    Resolve
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sub-primary btn-xs flex items-center gap-1">
                                                    <Eye className="size-3" />
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Upcoming License Renewals */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <h6 className="card-title">Upcoming License Renewals (Next 30 Days)</h6>
                        <span className="badge badge-yellow">{upcomingRenewals.length}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-3">
                        {upcomingRenewals.length === 0 ? (
                            <p className="py-4 text-sm text-center text-gray-500 dark:text-dark-500">
                                No upcoming renewals
                            </p>
                        ) : (
                            upcomingRenewals.map((license) => (
                                <div
                                    key={license.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {license.companyName}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="badge badge-purple text-xs">{license.licenseType}</span>
                                            <span
                                                className={`text-xs ${
                                                    license.daysRemaining < 15
                                                        ? 'text-red-600 dark:text-red-400'
                                                        : 'text-yellow-600 dark:text-yellow-400'
                                                }`}>
                                                {license.daysRemaining} days remaining
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs text-gray-500 dark:text-dark-500">
                                                Auto-renewal: {license.autoRenewal ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            className="btn btn-sub-primary btn-xs"
                                            onClick={() => alert(`Renew license for ${license.companyName}`)}>
                                            Renew Now
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sub-primary btn-xs"
                                            onClick={() => alert(`Contact ${license.companyName}`)}>
                                            <Mail className="size-3" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertsAndNotifications

