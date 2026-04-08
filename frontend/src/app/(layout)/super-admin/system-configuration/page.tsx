'use client'

import React, { useState } from 'react'
import BreadCrumb from '@src/components/common/BreadCrumb'
import { useAuth } from '@src/contexts/AuthContext'
import { rbacService } from '@src/lib/rbac'
import { useRouter } from 'next/navigation'
import {
    Settings,
    Mail,
    MessageSquare,
    HardDrive,
    Shield,
    Plug,
    Zap,
    Bell,
} from 'lucide-react'
import GeneralSettingsTab from '@src/views/SystemConfiguration/GeneralSettingsTab'
import EmailConfigurationTab from '@src/views/SystemConfiguration/EmailConfigurationTab'
import SMSWhatsAppTab from '@src/views/SystemConfiguration/SMSWhatsAppTab'
import StorageBackupTab from '@src/views/SystemConfiguration/StorageBackupTab'
import SecuritySettingsTab from '@src/views/SystemConfiguration/SecuritySettingsTab'
import IntegrationSettingsTab from '@src/views/SystemConfiguration/IntegrationSettingsTab'
import PerformanceOptimizationTab from '@src/views/SystemConfiguration/PerformanceOptimizationTab'
import NotificationSettingsTab from '@src/views/SystemConfiguration/NotificationSettingsTab'

const SystemConfigurationPage = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>('general')

    const isSuperAdmin = rbacService.isSuperAdmin(user)

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user || !isSuperAdmin) {
            router.push('/dashboard')
        }
    }, [user, isSuperAdmin, router])

    if (!user || !isSuperAdmin) {
        return null
    }

    const tabs = [
        { id: 'general', label: 'General Settings', icon: Settings },
        { id: 'email', label: 'Email Configuration', icon: Mail },
        { id: 'sms-whatsapp', label: 'SMS & WhatsApp', icon: MessageSquare },
        { id: 'storage', label: 'Storage & Backup', icon: HardDrive },
        { id: 'security', label: 'Security Settings', icon: Shield },
        { id: 'integration', label: 'Integration Settings', icon: Plug },
        { id: 'performance', label: 'Performance', icon: Zap },
        { id: 'notification', label: 'Notification Settings', icon: Bell },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettingsTab />
            case 'email':
                return <EmailConfigurationTab />
            case 'sms-whatsapp':
                return <SMSWhatsAppTab />
            case 'storage':
                return <StorageBackupTab />
            case 'security':
                return <SecuritySettingsTab />
            case 'integration':
                return <IntegrationSettingsTab />
            case 'performance':
                return <PerformanceOptimizationTab />
            case 'notification':
                return <NotificationSettingsTab />
            default:
                return <GeneralSettingsTab />
        }
    }

    return (
        <>
            <BreadCrumb title={'System Configuration'} subTitle={'Super Admin'} />

            {/* Header */}
            <div className="mb-6">
                <h6 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    System Configuration
                </h6>
                <p className="text-sm text-gray-500 dark:text-dark-500">
                    Centralized system-wide configuration management for application behavior, integrations, and global settings
                </p>
            </div>

            {/* Main Content with Vertical Sidebar Tabs */}
            <div className="grid grid-cols-12 gap-x-space">
                {/* Vertical Sidebar Tabs */}
                <div className="col-span-12 lg:col-span-3">
                    <div className="card sticky top-4">
                        <div className="card-body p-0">
                            <nav className="flex flex-col space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${activeTab === tab.id
                                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500 font-medium'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-850 hover:text-primary-600 dark:hover:text-primary-400'
                                                }`}>
                                            <Icon className="size-5 shrink-0" />
                                            <span className="text-sm">{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Tab Content - Modern Grid Layout */}
                <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
                    <div className="grid grid-cols-12 gap-x-space">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SystemConfigurationPage

