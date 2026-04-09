'use client'

import React from 'react'
import {
    Building2,
    FileText,
    Bell,
    Database,
    CheckCircle2,
    Settings,
    ArrowRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuickAction {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    action: () => void
    color: string
}

const QuickActionsPanel: React.FC = () => {
    const router = useRouter()

    const actions: QuickAction[] = [
        {
            id: 'onboard-company',
            label: 'Onboard New Company',
            icon: Building2,
            description: 'Register a new tenant company',
            action: () => router.push('/super-admin/companies?action=create'),
            color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
        },
        {
            id: 'generate-report',
            label: 'Generate System Report',
            icon: FileText,
            description: 'Create comprehensive system report',
            action: () => alert('Generate System Report'),
            color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20',
        },
        {
            id: 'broadcast-notification',
            label: 'Broadcast Notification',
            icon: Bell,
            description: 'Send notification to all users',
            action: () => alert('Broadcast Notification'),
            color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
        },
        {
            id: 'backup-database',
            label: 'Backup Database',
            icon: Database,
            description: 'Create manual database backup',
            action: () => alert('Backup Database'),
            color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
        },
        {
            id: 'pending-approvals',
            label: 'Review Pending Approvals',
            icon: CheckCircle2,
            description: 'View pending company approvals',
            action: () => router.push('/super-admin/companies?status=Trial'),
            color: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
        },
        {
            id: 'system-settings',
            label: 'Configure System Settings',
            icon: Settings,
            description: 'Manage system configuration',
            action: () => router.push('/super-admin/system-configuration'),
            color: 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20',
        },
    ]

    return (
        <div className="col-span-12 lg:col-span-6 card">
            <div className="card-header">
                <h6 className="card-title">Quick Actions</h6>
            </div>
            <div className="card-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {actions.map((action) => {
                        const Icon = action.icon
                        return (
                            <button
                                key={action.id}
                                type="button"
                                onClick={action.action}
                                className={`group relative flex flex-col items-start gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md hover:scale-[1.02] ${action.color}`}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-dark-800">
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold">{action.label}</p>
                                            <p className="text-xs opacity-75 mt-0.5">{action.description}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuickActionsPanel

