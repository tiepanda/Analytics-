'use client'

import React, { useState, useMemo } from 'react'
import { Activity, Users, AlertTriangle, Clock, MapPin, Monitor, CheckCircle2, XCircle } from 'lucide-react'
import TableContainer from '@src/components/custom/table/table'
import Pagination from '@src/components/common/Pagination'
import {
    UserActivity,
    UserSession,
    FailedLoginAttempt,
    MOCK_USER_ACTIVITIES,
    MOCK_USER_SESSIONS,
    MOCK_FAILED_LOGIN_ATTEMPTS,
} from '@src/data/users'

const UserActivityTab: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPage, setSessionsPage] = useState(1)
    const [failedLoginsPage, setFailedLoginsPage] = useState(1)
    const itemsPerPage = 10

    // Calculate statistics
    const activeSessions = MOCK_USER_SESSIONS.length
    const loginsToday = MOCK_USER_ACTIVITIES.filter(
        (a) => a.activityType === 'Login' && new Date(a.timestamp).toDateString() === new Date().toDateString()
    ).length
    const failedAttempts = MOCK_FAILED_LOGIN_ATTEMPTS.filter(
        (f) => new Date(f.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length
    const usersNeverLoggedIn = 23 // Mock value

    const stats = [
        {
            title: 'Active Sessions',
            value: activeSessions.toString(),
            description: 'concurrent sessions',
            icon: Users,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-500/10',
        },
        {
            title: 'Logins Today',
            value: loginsToday.toString(),
            description: 'logins',
            icon: Activity,
            iconColor: 'text-green-500',
            iconBg: 'bg-green-100 dark:bg-green-500/10',
        },
        {
            title: 'Failed Login Attempts',
            value: failedAttempts.toString(),
            description: 'attempts (last 24h)',
            icon: AlertTriangle,
            iconColor: 'text-orange-500',
            iconBg: 'bg-orange-100 dark:bg-orange-500/10',
        },
        {
            title: 'Users Never Logged In',
            value: usersNeverLoggedIn.toString(),
            description: 'users',
            icon: Users,
            iconColor: 'text-gray-500',
            iconBg: 'bg-gray-100 dark:bg-gray-500/10',
        },
    ]

    const getActivityTypeBadge = (type: string) => {
        const typeColors: Record<string, string> = {
            Login: 'badge-green',
            Logout: 'badge-gray',
            'Password Change': 'badge-blue',
            'Profile Update': 'badge-purple',
            'Permission Change': 'badge-orange',
            'Data Access': 'badge-indigo',
            'Data Modification': 'badge-yellow',
            'Report Generation': 'badge-pink',
            'Configuration Change': 'badge-red',
        }
        return <span className={`badge ${typeColors[type] || 'badge-gray'}`}>{type}</span>
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

    const activityColumns = useMemo(
        () => [
            {
                header: 'Timestamp',
                accessorKey: 'timestamp',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 text-gray-400" />
                        <span className="text-sm">{formatTimestamp(row.original.timestamp)}</span>
                    </div>
                ),
            },
            {
                header: 'User',
                accessorKey: 'userName',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <div>
                        <div className="font-medium">{row.original.userName}</div>
                        <div className="text-xs text-gray-500">{row.original.userEmail}</div>
                    </div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'companyName',
            },
            {
                header: 'Activity Type',
                accessorKey: 'activityType',
                cell: ({ row }: { row: { original: UserActivity } }) =>
                    getActivityTypeBadge(row.original.activityType),
            },
            {
                header: 'IP Address',
                accessorKey: 'ipAddress',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-gray-400" />
                        <span className="text-sm">{row.original.ipAddress}</span>
                    </div>
                ),
            },
            {
                header: 'Device',
                accessorKey: 'device',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <div className="flex items-center gap-2">
                        <Monitor className="size-4 text-gray-400" />
                        <span className="text-sm">{row.original.device}</span>
                    </div>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <span
                        className={`badge ${
                            row.original.status === 'Success' ? 'badge-green' : 'badge-red'
                        }`}>
                        {row.original.status}
                    </span>
                ),
            },
            {
                header: 'Actions',
                accessorKey: 'action',
                cell: ({ row }: { row: { original: UserActivity } }) => (
                    <button className="btn btn-sm btn-sub-primary">View Details</button>
                ),
            },
        ],
        []
    )

    const sessionColumns = useMemo(
        () => [
            {
                header: 'User Name',
                accessorKey: 'userName',
            },
            {
                header: 'Company',
                accessorKey: 'companyName',
            },
            {
                header: 'Session Start Time',
                accessorKey: 'sessionStartTime',
                cell: ({ row }: { row: { original: UserSession } }) => (
                    <span className="text-sm">{formatTimestamp(row.original.sessionStartTime)}</span>
                ),
            },
            {
                header: 'Last Activity',
                accessorKey: 'lastActivity',
                cell: ({ row }: { row: { original: UserSession } }) => (
                    <span className="text-sm">{formatTimestamp(row.original.lastActivity)}</span>
                ),
            },
            {
                header: 'IP Address',
                accessorKey: 'ipAddress',
            },
            {
                header: 'Device/Browser',
                accessorKey: 'device',
                cell: ({ row }: { row: { original: UserSession } }) => (
                    <div>
                        <div className="text-sm">{row.original.device}</div>
                        {row.original.browser && (
                            <div className="text-xs text-gray-500">{row.original.browser}</div>
                        )}
                    </div>
                ),
            },
            {
                header: 'Location',
                accessorKey: 'location',
            },
            {
                header: 'Actions',
                accessorKey: 'action',
                cell: () => (
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-sub-primary">View Details</button>
                        <button className="btn btn-sm btn-sub-red">Terminate</button>
                    </div>
                ),
            },
        ],
        []
    )

    const failedLoginColumns = useMemo(
        () => [
            {
                header: 'Timestamp',
                accessorKey: 'timestamp',
                cell: ({ row }: { row: { original: FailedLoginAttempt } }) => (
                    <span className="text-sm">{formatTimestamp(row.original.timestamp)}</span>
                ),
            },
            {
                header: 'Email/Username',
                accessorKey: 'email',
            },
            {
                header: 'IP Address',
                accessorKey: 'ipAddress',
            },
            {
                header: 'Reason',
                accessorKey: 'reason',
                cell: ({ row }: { row: { original: FailedLoginAttempt } }) => (
                    <span className="badge badge-orange">{row.original.reason}</span>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: { original: FailedLoginAttempt } }) => (
                    <span
                        className={`badge ${
                            row.original.status === 'Blocked' ? 'badge-red' : 'badge-gray'
                        }`}>
                        {row.original.status}
                    </span>
                ),
            },
            {
                header: 'Actions',
                accessorKey: 'action',
                cell: () => (
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-sub-primary">Unlock Account</button>
                        <button className="btn btn-sm btn-sub-primary">Reset Password</button>
                        <button className="btn btn-sm btn-sub-red">Block IP</button>
                    </div>
                ),
            },
        ],
        []
    )

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedActivities = MOCK_USER_ACTIVITIES.slice(startIndex, startIndex + itemsPerPage)

    const sessionsStartIndex = (sessionsPage - 1) * itemsPerPage
    const paginatedSessions = MOCK_USER_SESSIONS.slice(sessionsStartIndex, sessionsStartIndex + itemsPerPage)

    const failedLoginsStartIndex = (failedLoginsPage - 1) * itemsPerPage
    const paginatedFailedLogins = MOCK_FAILED_LOGIN_ATTEMPTS.slice(
        failedLoginsStartIndex,
        failedLoginsStartIndex + itemsPerPage
    )

    return (
        <div className="grid grid-cols-12 gap-x-space">
            {/* Activity Overview Cards */}
            <div className="col-span-12 mb-6">
                <div className="grid grid-cols-12 gap-x-space">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3 card">
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-3">
                                        <h6 className="text-sm font-medium text-gray-600 dark:text-dark-400">
                                            {stat.title}
                                        </h6>
                                        <div
                                            className={`flex items-center justify-center size-10 rounded-lg ${stat.iconBg}`}>
                                            <IconComponent className={`size-5 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                    <h4 className="mb-1 text-2xl font-semibold">{stat.value}</h4>
                                    <p className="text-sm text-gray-500 dark:text-dark-500">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recent User Activities */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <h6 className="card-title">Recent User Activities</h6>
                </div>
                <div className="pt-0 card-body">
                    <TableContainer
                        isSearch={false}
                        isPagination={false}
                        columns={activityColumns}
                        data={paginatedActivities}
                        divClass="overflow-x-auto table-box"
                        tableClass="table whitespace-nowrap"
                        thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
                        tbodyClass="pt-0"
                        isTableFooter={false}
                    />
                    {MOCK_USER_ACTIVITIES.length > 0 && (
                        <Pagination
                            totalItems={MOCK_USER_ACTIVITIES.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <h6 className="card-title">Active Sessions</h6>
                </div>
                <div className="pt-0 card-body">
                    <TableContainer
                        isSearch={false}
                        isPagination={false}
                        columns={sessionColumns}
                        data={paginatedSessions}
                        divClass="overflow-x-auto table-box"
                        tableClass="table whitespace-nowrap"
                        thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
                        tbodyClass="pt-0"
                        isTableFooter={false}
                    />
                    {MOCK_USER_SESSIONS.length > 0 && (
                        <Pagination
                            totalItems={MOCK_USER_SESSIONS.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={sessionsPage}
                            onPageChange={setSessionsPage}
                        />
                    )}
                </div>
            </div>

            {/* Failed Login Attempts */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <h6 className="card-title">Failed Login Attempts</h6>
                </div>
                <div className="pt-0 card-body">
                    <TableContainer
                        isSearch={false}
                        isPagination={false}
                        columns={failedLoginColumns}
                        data={paginatedFailedLogins}
                        divClass="overflow-x-auto table-box"
                        tableClass="table whitespace-nowrap"
                        thClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
                        tbodyClass="pt-0"
                        isTableFooter={false}
                    />
                    {MOCK_FAILED_LOGIN_ATTEMPTS.length > 0 && (
                        <Pagination
                            totalItems={MOCK_FAILED_LOGIN_ATTEMPTS.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={failedLoginsPage}
                            onPageChange={setFailedLoginsPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserActivityTab

