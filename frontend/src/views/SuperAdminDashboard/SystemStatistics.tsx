'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Database, Server, HardDrive, Users } from 'lucide-react'
import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'

interface StatItem {
    id: string
    label: string
    value: number
    unit: string
    change: number
    changeType: 'increase' | 'decrease'
    icon: React.ComponentType<{ className?: string }>
    color: string
    total?: number
}

const SystemStatistics: React.FC = () => {
    const stats: StatItem[] = [
        {
            id: 'api-calls',
            label: 'Total API Calls Today',
            value: 1200000,
            unit: 'calls',
            change: 5.3,
            changeType: 'increase',
            icon: Server,
            color: 'text-blue-600 dark:text-blue-400',
        },
        {
            id: 'database-size',
            label: 'Database Size',
            value: 478,
            unit: 'GB',
            change: 12,
            changeType: 'increase',
            icon: Database,
            color: 'text-green-600 dark:text-green-400',
        },
        {
            id: 'iot-devices',
            label: 'Total IoT Devices',
            value: 4567,
            unit: 'devices',
            change: 0,
            changeType: 'increase',
            icon: Server,
            color: 'text-purple-600 dark:text-purple-400',
        },
        {
            id: 'response-time',
            label: 'Average Response Time',
            value: 142,
            unit: 'ms',
            change: 8,
            changeType: 'decrease',
            icon: TrendingDown,
            color: 'text-green-600 dark:text-green-400',
        },
        {
            id: 'storage',
            label: 'Storage Used',
            value: 2300,
            unit: 'TB',
            total: 5000,
            change: 0,
            changeType: 'increase',
            icon: HardDrive,
            color: 'text-orange-600 dark:text-orange-400',
        },
        {
            id: 'active-sessions',
            label: 'Active Sessions',
            value: 847,
            unit: 'sessions',
            change: 0,
            changeType: 'increase',
            icon: Users,
            color: 'text-indigo-600 dark:text-indigo-400',
        },
    ]

    const formatValue = (value: number, unit: string) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`
        }
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`
        }
        return value.toString()
    }

    return (
        <div className="col-span-12 card">
            <div className="card-header">
                <h6 className="card-title">Platform Statistics Overview</h6>
            </div>
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800/50">
                                <div className={`mb-2 ${stat.color}`}>
                                    <Icon className="size-5" />
                                </div>
                                <p className="mb-2 text-xs text-center text-gray-500 dark:text-dark-500">
                                    {stat.label}
                                </p>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {stat.id === 'storage' ? (
                                            <>
                                                {formatValue(stat.value, stat.unit)} / {formatValue(stat.total || 0, stat.unit)}
                                            </>
                                        ) : (
                                            <>
                                                <AnimatedCounter
                                                    start={0}
                                                    end={stat.value}
                                                    duration={2000}
                                                />
                                                {stat.unit !== 'sessions' && stat.unit !== 'devices' && ' '}
                                                {stat.unit === 'GB' || stat.unit === 'TB' || stat.unit === 'ms'
                                                    ? stat.unit
                                                    : ''}
                                            </>
                                        )}
                                    </h5>
                                </div>
                                {stat.change !== 0 && (
                                    <div
                                        className={`flex items-center text-xs ${
                                            stat.changeType === 'increase'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}>
                                        {stat.changeType === 'increase' ? (
                                            <TrendingUp className="size-3 mr-1" />
                                        ) : (
                                            <TrendingDown className="size-3 mr-1" />
                                        )}
                                        {stat.change}%
                                        {stat.id === 'response-time' ? ' improvement' : ' from yesterday'}
                                    </div>
                                )}
                                {stat.id === 'storage' && (
                                    <div className="w-full mt-2">
                                        <div className="h-1.5 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-orange-500"
                                                style={{
                                                    width: `${(stat.value / (stat.total || 1)) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-dark-500 mt-1 text-center">
                                            {Math.round((stat.value / (stat.total || 1)) * 100)}% utilization
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SystemStatistics

