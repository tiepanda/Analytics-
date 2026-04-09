import { Company } from './companies'

export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'Pending Activation' | 'Locked'
export type UserRole = 
    | 'Super Admin' 
    | 'Company Admin' 
    | 'Manager' 
    | 'Supervisor' 
    | 'Operator' 
    | 'Quality Inspector' 
    | 'Maintenance Technician' 
    | 'Viewer' 
    | 'Custom'
export type ActivityType = 
    | 'Login' 
    | 'Logout' 
    | 'Password Change' 
    | 'Profile Update' 
    | 'Permission Change' 
    | 'Data Access' 
    | 'Data Modification' 
    | 'Report Generation' 
    | 'Configuration Change'
export type MFAMethod = 'Email OTP' | 'SMS OTP' | 'Authenticator App'
export type NotificationPreference = 'Email' | 'SMS' | 'WhatsApp' | 'In-App' | 'Push'

export interface User {
    id: string
    userId: string // e.g., USR-2025-001234
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
    employeeId?: string
    companyId: string
    companyName: string
    role: UserRole
    department?: string
    section?: string
    reportingManagerId?: string
    reportingManagerName?: string
    status: UserStatus
    mfaEnabled: boolean
    mfaMethods?: MFAMethod[]
    lastLogin?: string
    lastLoginIp?: string
    lastLoginDevice?: string
    createdAt: string
    updatedAt: string
    createdBy?: string
    updatedBy?: string
    // Preferences
    defaultLanguage?: string
    defaultTimezone?: string
    dateFormat?: string
    timeFormat?: '12-hour' | '24-hour'
    notificationPreferences?: NotificationPreference[]
    // Additional info
    employeeStartDate?: string
    employeeEndDate?: string
    notes?: string
    tags?: string[]
    // Session settings
    allowConcurrentSessions?: boolean
    maxConcurrentSessions?: number
    sessionTimeoutOverride?: number
    // Access level (read-only, based on role)
    accessLevel?: string
}

export interface UserActivity {
    id: string
    userId: string
    userName: string
    userEmail: string
    companyId: string
    companyName: string
    activityType: ActivityType
    timestamp: string
    ipAddress: string
    device: string
    location?: string
    status: 'Success' | 'Failed'
    details?: string
}

export interface UserSession {
    id: string
    userId: string
    userName: string
    companyId: string
    companyName: string
    sessionStartTime: string
    lastActivity: string
    ipAddress: string
    device: string
    browser?: string
    location?: string
}

export interface FailedLoginAttempt {
    id: string
    timestamp: string
    email: string
    ipAddress: string
    reason: 'Invalid password' | 'Account locked' | 'MFA failed'
    status: 'Blocked' | 'Unblocked'
}

export interface UserGroup {
    id: string
    name: string
    description?: string
    type: 'Predefined' | 'Custom'
    memberIds: string[]
    criteria?: {
        company?: string[]
        role?: UserRole[]
        department?: string[]
        status?: UserStatus[]
        tags?: string[]
    }
    createdAt: string
    updatedAt: string
}

// Generate mock users
const generateMockUsers = (): User[] => {
    const companies = ['COMP-001', 'COMP-002', 'COMP-003', 'COMP-004', 'COMP-005']
    const companyNames = ['TechCorp Industries', 'Global Manufacturing', 'Precision Systems', 'Advanced Solutions', 'Innovation Labs']
    const roles: UserRole[] = ['Super Admin', 'Company Admin', 'Manager', 'Supervisor', 'Operator', 'Quality Inspector', 'Maintenance Technician', 'Viewer']
    const statuses: UserStatus[] = ['Active', 'Active', 'Active', 'Inactive', 'Suspended', 'Pending Activation', 'Locked']
    const departments = ['Production', 'Quality', 'Maintenance', 'Engineering', 'Operations', 'Management']
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Patricia', 'Richard', 'Jennifer', 'Joseph', 'Linda']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor']

    const users: User[] = []
    let userIdCounter = 1

    // Create Super Admin
    users.push({
        id: '1',
        userId: 'USR-2025-000001',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@eagleanalytics.com',
        phone: '+1-555-0001',
        companyId: 'SYSTEM',
        companyName: 'System',
        role: 'Super Admin',
        status: 'Active',
        mfaEnabled: true,
        mfaMethods: ['Email OTP', 'Authenticator App'],
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        lastLoginIp: '192.168.1.100',
        lastLoginDevice: 'Chrome on Windows',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        defaultLanguage: 'English',
        defaultTimezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24-hour',
        notificationPreferences: ['Email', 'In-App', 'Push'],
        allowConcurrentSessions: true,
        maxConcurrentSessions: 5,
    })

    // Generate other users
    for (let i = 0; i < 50; i++) {
        const companyIndex = i % companies.length
        const role = roles[Math.floor(Math.random() * roles.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const department = departments[Math.floor(Math.random() * departments.length)]
        
        userIdCounter++
        const userId = `USR-2025-${String(userIdCounter).padStart(6, '0')}`
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companyNames[companyIndex].toLowerCase().replace(/\s+/g, '')}.com`

        const user: User = {
            id: String(i + 2),
            userId,
            firstName,
            lastName,
            email,
            phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            companyId: companies[companyIndex],
            companyName: companyNames[companyIndex],
            role,
            department,
            status,
            mfaEnabled: Math.random() > 0.5,
            mfaMethods: Math.random() > 0.5 ? ['Email OTP'] : undefined,
            lastLogin: status === 'Active' && Math.random() > 0.2 
                ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
            lastLoginIp: status === 'Active' ? `192.168.1.${Math.floor(Math.random() * 255)}` : undefined,
            lastLoginDevice: status === 'Active' ? ['Chrome on Windows', 'Safari on macOS', 'Firefox on Linux'][Math.floor(Math.random() * 3)] : undefined,
            createdAt: new Date(2024, 0, 1 + Math.floor(Math.random() * 365)).toISOString(),
            updatedAt: new Date(2024, 0, 1 + Math.floor(Math.random() * 365)).toISOString(),
            defaultLanguage: 'English',
            defaultTimezone: 'America/New_York',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: Math.random() > 0.5 ? '12-hour' : '24-hour',
            notificationPreferences: ['Email', 'In-App'],
            employeeStartDate: new Date(2023, 0, 1 + Math.floor(Math.random() * 365)).toISOString(),
            tags: ['Production', 'Quality', 'Maintenance'].slice(0, Math.floor(Math.random() * 3)),
        }

        users.push(user)
    }

    return users
}

export const MOCK_USERS: User[] = generateMockUsers()

// Generate mock activities
export const generateMockActivities = (users: User[]): UserActivity[] => {
    const activities: UserActivity[] = []
    const activityTypes: ActivityType[] = ['Login', 'Logout', 'Password Change', 'Profile Update', 'Permission Change', 'Data Access', 'Data Modification', 'Report Generation', 'Configuration Change']
    
    users.forEach((user) => {
        if (user.status === 'Active' && user.lastLogin) {
            // Generate 1-5 activities per active user
            const activityCount = Math.floor(Math.random() * 5) + 1
            for (let i = 0; i < activityCount; i++) {
                const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
                const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
                
                activities.push({
                    id: `${user.id}-${i}`,
                    userId: user.id,
                    userName: `${user.firstName} ${user.lastName}`,
                    userEmail: user.email,
                    companyId: user.companyId,
                    companyName: user.companyName,
                    activityType,
                    timestamp,
                    ipAddress: user.lastLoginIp || `192.168.1.${Math.floor(Math.random() * 255)}`,
                    device: user.lastLoginDevice || 'Unknown',
                    location: 'New York, US',
                    status: Math.random() > 0.1 ? 'Success' : 'Failed',
                })
            }
        }
    })

    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export const MOCK_USER_ACTIVITIES: UserActivity[] = generateMockActivities(MOCK_USERS)

// Generate mock sessions
export const generateMockSessions = (users: User[]): UserSession[] => {
    const sessions: UserSession[] = []
    
    users.forEach((user) => {
        if (user.status === 'Active' && user.lastLogin) {
            // Generate 0-2 active sessions per user
            const sessionCount = Math.floor(Math.random() * 3)
            for (let i = 0; i < sessionCount; i++) {
                const sessionStart = new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000).toISOString()
                const lastActivity = new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString()
                
                sessions.push({
                    id: `${user.id}-session-${i}`,
                    userId: user.id,
                    userName: `${user.firstName} ${user.lastName}`,
                    companyId: user.companyId,
                    companyName: user.companyName,
                    sessionStartTime: sessionStart,
                    lastActivity,
                    ipAddress: user.lastLoginIp || `192.168.1.${Math.floor(Math.random() * 255)}`,
                    device: user.lastLoginDevice || 'Unknown',
                    browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
                    location: 'New York, US',
                })
            }
        }
    })

    return sessions
}

export const MOCK_USER_SESSIONS: UserSession[] = generateMockSessions(MOCK_USERS)

// Generate mock failed login attempts
export const MOCK_FAILED_LOGIN_ATTEMPTS: FailedLoginAttempt[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        email: 'user@example.com',
        ipAddress: '192.168.1.50',
        reason: 'Invalid password',
        status: 'Unblocked',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        email: 'admin@example.com',
        ipAddress: '192.168.1.51',
        reason: 'Account locked',
        status: 'Blocked',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        email: 'test@example.com',
        ipAddress: '192.168.1.52',
        reason: 'MFA failed',
        status: 'Unblocked',
    },
]

// Predefined user groups
const now = new Date().toISOString()
export const PREDEFINED_USER_GROUPS: UserGroup[] = [
    {
        id: 'all-users',
        name: 'All Users',
        type: 'Predefined',
        memberIds: MOCK_USERS.map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'super-admins',
        name: 'Super Admins',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.role === 'Super Admin').map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'company-admins',
        name: 'Company Admins',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.role === 'Company Admin').map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'managers',
        name: 'Managers',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.role === 'Manager').map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'operators',
        name: 'Operators',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.role === 'Operator').map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'inactive-users',
        name: 'Inactive Users',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.status === 'Inactive').map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'users-requiring-attention',
        name: 'Users Requiring Attention',
        type: 'Predefined',
        memberIds: MOCK_USERS.filter(u => u.status === 'Locked' || !u.lastLogin).map(u => u.id),
        createdAt: now,
        updatedAt: now,
    },
]

