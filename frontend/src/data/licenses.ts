import { LicenseType } from './companies'

// Re-export LicenseType for use in other modules
export type { LicenseType } from './companies'

export type LicenseStatus = 'Active' | 'Expired' | 'Suspended' | 'Trial'
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Annually' | 'Custom'

export interface License {
    id: string
    licenseId: string
    companyId: string
    companyName: string
    licenseType: LicenseType
    licenseKey: string
    status: LicenseStatus
    startDate: string
    expiryDate: string
    daysRemaining: number
    autoRenewal: boolean
    renewalReminderDays: number
    billingCycle: BillingCycle
    price: number
    priceOverride?: number
    features: {
        oeeModule: boolean
        energyModule: boolean
        machineModule: boolean
        reportsModule: boolean
        inspectionModule: boolean
        inventoryModule: boolean
        maintenanceModule: boolean
        hrModule: boolean
    }
    maxUsers: number
    maxDevices: number
    storageLimit: number // GB
    apiCallLimit: number // per day
    currentUsers: number
    currentDevices: number
    storageUsed: number // GB
    apiCallsToday: number
    trialMode: boolean
    trialDuration?: number // days
    gracePeriod: number // days
    createdAt: string
    updatedAt: string
    lastRenewalDate?: string
}

export interface LicensePlan {
    id: string
    name: LicenseType
    monthlyPrice: number
    annualPrice: number
    features: {
        maxUsers: number
        maxDevices: number
        storageLimit: number
        apiCallLimit: number
        modules: string[]
        support: string[]
    }
    description: string
}

export const LICENSE_PLANS: LicensePlan[] = [
    {
        id: '1',
        name: 'Basic',
        monthlyPrice: 99,
        annualPrice: 990,
        features: {
            maxUsers: 50,
            maxDevices: 20,
            storageLimit: 10,
            apiCallLimit: 10000,
            modules: ['OEE Module', 'Basic Reports'],
            support: ['Email Support'],
        },
        description: 'Perfect for small manufacturing setups',
    },
    {
        id: '2',
        name: 'Standard',
        monthlyPrice: 299,
        annualPrice: 2990,
        features: {
            maxUsers: 200,
            maxDevices: 100,
            storageLimit: 50,
            apiCallLimit: 50000,
            modules: ['OEE Module', 'Energy Module', 'Machine Module', 'Advanced Reports'],
            support: ['Email Support', 'Phone Support'],
        },
        description: 'Ideal for growing manufacturing operations',
    },
    {
        id: '3',
        name: 'Premium',
        monthlyPrice: 799,
        annualPrice: 7990,
        features: {
            maxUsers: 1000,
            maxDevices: 500,
            storageLimit: 250,
            apiCallLimit: 100000,
            modules: [
                'OEE Module',
                'Energy Module',
                'Machine Module',
                'Inspection Module',
                'Inventory Module',
                'Maintenance Module',
                'HR Module',
                'Advanced Analytics',
            ],
            support: ['Email Support', 'Phone Support', 'Priority Support', 'WhatsApp Integration'],
        },
        description: 'Comprehensive solution for large enterprises',
    },
    {
        id: '4',
        name: 'Enterprise',
        monthlyPrice: 0, // Custom pricing
        annualPrice: 0,
        features: {
            maxUsers: 999999,
            maxDevices: 999999,
            storageLimit: 999999,
            apiCallLimit: 999999,
            modules: ['All Modules', 'White-label Option', 'Custom Integrations', 'Dedicated Server'],
            support: ['24/7 Dedicated Support', 'SLA Guarantees', 'On-premise Deployment'],
        },
        description: 'Fully customizable for enterprise needs',
    },
]

export const MOCK_LICENSES: License[] = [
    {
        id: '1',
        licenseId: 'LIC-2025-001234',
        companyId: 'COMP-001',
        companyName: 'ABC Manufacturing Inc.',
        licenseType: 'Premium',
        licenseKey: 'EAGL-2025-ABCD-1234-EFGH',
        status: 'Active',
        startDate: '2024-01-15',
        expiryDate: '2025-01-15',
        daysRemaining: 36,
        autoRenewal: true,
        renewalReminderDays: 30,
        billingCycle: 'Annually',
        price: 7990,
        features: {
            oeeModule: true,
            energyModule: true,
            machineModule: true,
            reportsModule: true,
            inspectionModule: true,
            inventoryModule: true,
            maintenanceModule: true,
            hrModule: true,
        },
        maxUsers: 1000,
        maxDevices: 500,
        storageLimit: 250,
        apiCallLimit: 100000,
        currentUsers: 245,
        currentDevices: 120,
        storageUsed: 125.5,
        apiCallsToday: 45230,
        trialMode: false,
        gracePeriod: 7,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-12-10T14:30:00Z',
        lastRenewalDate: '2024-01-15',
    },
    {
        id: '2',
        licenseId: 'LIC-2025-001235',
        companyId: 'COMP-002',
        companyName: 'XYZ Electronics Ltd.',
        licenseType: 'Standard',
        licenseKey: 'EAGL-2025-WXYZ-5678-IJKL',
        status: 'Active',
        startDate: '2024-02-01',
        expiryDate: '2024-08-01',
        daysRemaining: 234,
        autoRenewal: false,
        renewalReminderDays: 30,
        billingCycle: 'Quarterly',
        price: 897,
        features: {
            oeeModule: true,
            energyModule: true,
            machineModule: true,
            reportsModule: true,
            inspectionModule: false,
            inventoryModule: false,
            maintenanceModule: false,
            hrModule: false,
        },
        maxUsers: 200,
        maxDevices: 100,
        storageLimit: 50,
        apiCallLimit: 50000,
        currentUsers: 85,
        currentDevices: 45,
        storageUsed: 28.3,
        apiCallsToday: 23450,
        trialMode: false,
        gracePeriod: 7,
        createdAt: '2024-02-01T08:00:00Z',
        updatedAt: '2024-12-09T09:15:00Z',
    },
    {
        id: '3',
        licenseId: 'LIC-2025-001236',
        companyId: 'COMP-003',
        companyName: 'MedTech Solutions',
        licenseType: 'Enterprise',
        licenseKey: 'EAGL-2025-ENTR-PRSE-2024',
        status: 'Active',
        startDate: '2024-03-10',
        expiryDate: '2026-03-10',
        daysRemaining: 456,
        autoRenewal: true,
        renewalReminderDays: 60,
        billingCycle: 'Annually',
        price: 50000,
        priceOverride: 50000,
        features: {
            oeeModule: true,
            energyModule: true,
            machineModule: true,
            reportsModule: true,
            inspectionModule: true,
            inventoryModule: true,
            maintenanceModule: true,
            hrModule: true,
        },
        maxUsers: 5000,
        maxDevices: 2000,
        storageLimit: 1000,
        apiCallLimit: 500000,
        currentUsers: 1200,
        currentDevices: 600,
        storageUsed: 450.8,
        apiCallsToday: 125000,
        trialMode: false,
        gracePeriod: 14,
        createdAt: '2024-03-10T09:00:00Z',
        updatedAt: '2024-12-10T16:45:00Z',
        lastRenewalDate: '2024-03-10',
    },
    {
        id: '4',
        licenseId: 'LIC-2025-001237',
        companyId: 'COMP-004',
        companyName: 'FoodPro Industries',
        licenseType: 'Basic',
        licenseKey: 'EAGL-2025-TRIL-2024-ABCD',
        status: 'Trial',
        startDate: '2024-04-20',
        expiryDate: '2024-07-20',
        daysRemaining: 0,
        autoRenewal: false,
        renewalReminderDays: 7,
        billingCycle: 'Monthly',
        price: 99,
        features: {
            oeeModule: true,
            energyModule: false,
            machineModule: false,
            reportsModule: true,
            inspectionModule: false,
            inventoryModule: false,
            maintenanceModule: false,
            hrModule: false,
        },
        maxUsers: 50,
        maxDevices: 20,
        storageLimit: 10,
        apiCallLimit: 10000,
        currentUsers: 12,
        currentDevices: 8,
        storageUsed: 3.2,
        apiCallsToday: 2450,
        trialMode: true,
        trialDuration: 90,
        gracePeriod: 3,
        createdAt: '2024-04-20T10:00:00Z',
        updatedAt: '2024-12-08T11:20:00Z',
    },
    {
        id: '5',
        licenseId: 'LIC-2024-001200',
        companyId: 'COMP-005',
        companyName: 'PharmaGlobal Corp',
        licenseType: 'Premium',
        licenseKey: 'EAGL-2024-EXPR-2024-EFGH',
        status: 'Expired',
        startDate: '2023-05-05',
        expiryDate: '2024-05-05',
        daysRemaining: -219,
        autoRenewal: false,
        renewalReminderDays: 30,
        billingCycle: 'Annually',
        price: 7990,
        features: {
            oeeModule: true,
            energyModule: true,
            machineModule: true,
            reportsModule: true,
            inspectionModule: true,
            inventoryModule: true,
            maintenanceModule: true,
            hrModule: true,
        },
        maxUsers: 1000,
        maxDevices: 500,
        storageLimit: 250,
        apiCallLimit: 100000,
        currentUsers: 0,
        currentDevices: 0,
        storageUsed: 0,
        apiCallsToday: 0,
        trialMode: false,
        gracePeriod: 7,
        createdAt: '2023-05-05T08:00:00Z',
        updatedAt: '2024-11-25T10:00:00Z',
    },
]

