'use client'

import React, { useState } from 'react'
import {
    LogIn,
    Key,
    Settings,
    AlertTriangle,
    Shield,
    CheckCircle2,
    Clock,
    XCircle,
    Info,
} from 'lucide-react'

type ActivityType = 'Login' | 'License Update' | 'Config Change' | 'Error' | 'Security' | 'Info'
type Severity = 'Info' | 'Warning' | 'Critical'

interface SystemActivity {
    id: string
    timestamp: string
    type: ActivityType
    user: string
    description: string
    affectedEntity: string
    severity: Severity
}

const MOCK_ACTIVITIES: SystemActivity[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        type: 'Login',
        user: 'admin@eagle.com',
        description: 'User logged in successfully',
        affectedEntity: 'User: admin@eagle.com',
        severity: 'Info',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        type: 'License Update',
        user: 'System',
        description: "License renewed for 'ABC Manufacturing'",
        affectedEntity: 'Company: ABC Manufacturing',
        severity: 'Info',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        type: 'Config Change',
        user: 'superadmin@eagle.com',
        description: 'System configuration updated',
        affectedEntity: 'System Settings',
        severity: 'Warning',
    },
    {
        id: '4',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        type: 'Security',
        user: 'System',
        description: 'Failed login attempt detected',
        affectedEntity: 'IP: 192.168.1.100',
        severity: 'Warning',
    },
    {
        id: '5',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        type: 'Error',
        user: 'System',
        description: 'Database connection timeout',
        affectedEntity: 'Database Server',
        severity: 'Critical',
    },
    {
        id: '6',
        timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
        type: 'License Update',
        user: 'System',
        description: "New company 'XYZ Electronics' onboarded",
        affectedEntity: 'Company: XYZ Electronics',
        severity: 'Info',
    },
    {
        id: '7',
        timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
        type: 'Config Change',
        user: 'admin@eagle.com',
        description: 'Email configuration updated',
        affectedEntity: 'Email Settings',
        severity: 'Info',
    },
    {
        id: '8',
        timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
        type: 'Security',
        user: 'System',
        description: 'Suspicious activity detected',
        affectedEntity: 'User: user@example.com',
        severity: 'Critical',
    },
]

const RecentSystemActivities: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const filteredActivities = MOCK_ACTIVITIES.filter((activity) => {
        if (activeFilter === 'all') return true
        if (activeFilter === 'user') return activity.type === 'Login'
        if (activeFilter === 'system') return activity.type === 'Error' || activity.type === 'Config Change'
        if (activeFilter === 'security') return activity.type === 'Security'
        if (activeFilter === 'config') return activity.type === 'Config Change'
        return true
    })

    const getActivityIcon = (type: ActivityType) => {
        switch (type) {
            case 'Login':
                return <LogIn className="size-4" />
            case 'License Update':
                return <Key className="size-4" />
            case 'Config Change':
                return <Settings className="size-4" />
            case 'Error':
                return <XCircle className="size-4" />
            case 'Security':
                return <Shield className="size-4" />
            default:
                return <Info className="size-4" />
        }
    }

    const getSeverityBadge = (severity: Severity) => {
        const badgeClasses = {
            Info: 'badge-blue',
            Warning: 'badge-yellow',
            Critical: 'badge-red',
        }
        return badgeClasses[severity] || 'badge-gray'
    }

    const formatTimeAgo = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)

        if (diffMins < 60) {
            return `${diffMins} minutes ago`
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`
        } else {
            return date.toLocaleDateString()
        }
    }

    const filters = [
        { id: 'all', label: 'All Activities' },
        { id: 'user', label: 'User Activities' },
        { id: 'system', label: 'System Events' },
        { id: 'security', label: 'Security Alerts' },
        { id: 'config', label: 'Configuration Changes' },
    ]

    return (
        <div className="col-span-12 lg:col-span-8 card">
            <div className="card-header">
                <h6 className="card-title">Recent System Activities</h6>
            </div>
            <div className="card-body">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 dark:border-dark-700 pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                activeFilter === filter.id
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                            }`}>
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {filteredActivities.slice(0, 10).map((activity, index) => (
                        <div key={activity.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex items-center justify-center size-8 rounded-full ${
                                        activity.severity === 'Critical'
                                            ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                            : activity.severity === 'Warning'
                                              ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                              : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                    }`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                {index < filteredActivities.length - 1 && (
                                    <div className="w-0.5 h-full bg-gray-200 dark:bg-dark-700 mt-2" />
                                )}
                            </div>
                            <div className="flex-1 pb-4">
                                <div className="flex items-start justify-between mb-1">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {activity.description}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-dark-500 mt-1">
                                            {activity.affectedEntity}
                                        </p>
                                    </div>
                                    <span className={`badge ${getSeverityBadge(activity.severity)} text-xs`}>
                                        {activity.severity}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-500">
                                    <Clock className="size-3" />
                                    <span>{formatTimeAgo(activity.timestamp)}</span>
                                    <span>•</span>
                                    <span>{activity.user}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentSystemActivities

