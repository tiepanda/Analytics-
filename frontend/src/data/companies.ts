export type CompanyStatus = 'Active' | 'Inactive' | 'Suspended' | 'Trial'
export type IndustryType = 'Automotive' | 'Medical' | 'Electronics' | 'Food Processing' | 'Pharma' | 'Aerospace' | 'Textile' | 'Other'
export type LicenseType = 'Basic' | 'Standard' | 'Premium' | 'Enterprise'

export interface Company {
    id: string
    companyId: string
    name: string
    industryType: IndustryType
    logo?: string
    description?: string
    contactPerson: string
    email: string
    phone: string
    alternativeContact?: string
    alternativeEmail?: string
    address?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    licenseType: LicenseType
    licenseStartDate: string
    licenseDuration: string
    autoRenewal: boolean
    maxUsers: number
    maxDevices: number
    storageLimit: number // GB
    apiCallLimit: number // per day
    timezone: string
    dateFormat: string
    currency: string
    language: string
    status: CompanyStatus
    activeUsers: number
    totalUsers: number
    totalMachines: number
    totalProducts: number
    totalAssets: number
    totalProductions: number // this month
    onboardedDate: string
    lastActivity: string
    createdAt: string
    updatedAt: string
}

export const MOCK_COMPANIES: Company[] = [
    {
        id: '1',
        companyId: 'COMP-001',
        name: 'ABC Manufacturing Inc.',
        industryType: 'Automotive',
        logo: '/images/companies/abc-logo.png',
        description: 'Leading automotive parts manufacturer',
        contactPerson: 'John Smith',
        email: 'john.smith@abcmanufacturing.com',
        phone: '+1-555-0101',
        alternativeContact: 'Jane Doe',
        alternativeEmail: 'jane.doe@abcmanufacturing.com',
        address: '123 Industrial Blvd',
        city: 'Detroit',
        state: 'Michigan',
        postalCode: '48201',
        country: 'United States',
        licenseType: 'Premium',
        licenseStartDate: '2024-01-15',
        licenseDuration: '1 year',
        autoRenewal: true,
        maxUsers: 1000,
        maxDevices: 500,
        storageLimit: 250,
        apiCallLimit: 100000,
        timezone: 'America/Detroit',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'English',
        status: 'Active',
        activeUsers: 245,
        totalUsers: 250,
        totalMachines: 120,
        totalProducts: 450,
        totalAssets: 200,
        totalProductions: 12500,
        onboardedDate: '2024-01-15',
        lastActivity: '2024-12-10T14:30:00Z',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-12-10T14:30:00Z',
    },
    {
        id: '2',
        companyId: 'COMP-002',
        name: 'XYZ Electronics Ltd.',
        industryType: 'Electronics',
        logo: '/images/companies/xyz-logo.png',
        description: 'Consumer electronics manufacturer',
        contactPerson: 'Sarah Johnson',
        email: 'sarah.j@xyzelectronics.com',
        phone: '+1-555-0202',
        address: '456 Tech Park',
        city: 'San Jose',
        state: 'California',
        postalCode: '95110',
        country: 'United States',
        licenseType: 'Standard',
        licenseStartDate: '2024-02-01',
        licenseDuration: '6 months',
        autoRenewal: false,
        maxUsers: 200,
        maxDevices: 100,
        storageLimit: 50,
        apiCallLimit: 50000,
        timezone: 'America/Los_Angeles',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'English',
        status: 'Active',
        activeUsers: 85,
        totalUsers: 90,
        totalMachines: 45,
        totalProducts: 200,
        totalAssets: 80,
        totalProductions: 5600,
        onboardedDate: '2024-02-01',
        lastActivity: '2024-12-09T09:15:00Z',
        createdAt: '2024-02-01T08:00:00Z',
        updatedAt: '2024-12-09T09:15:00Z',
    },
    {
        id: '3',
        companyId: 'COMP-003',
        name: 'MedTech Solutions',
        industryType: 'Medical',
        contactPerson: 'Dr. Michael Chen',
        email: 'm.chen@medtech.com',
        phone: '+1-555-0303',
        address: '789 Medical Plaza',
        city: 'Boston',
        state: 'Massachusetts',
        postalCode: '02115',
        country: 'United States',
        licenseType: 'Enterprise',
        licenseStartDate: '2024-03-10',
        licenseDuration: '2 years',
        autoRenewal: true,
        maxUsers: 5000,
        maxDevices: 2000,
        storageLimit: 1000,
        apiCallLimit: 500000,
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'English',
        status: 'Active',
        activeUsers: 1200,
        totalUsers: 1250,
        totalMachines: 600,
        totalProducts: 1500,
        totalAssets: 500,
        totalProductions: 45000,
        onboardedDate: '2024-03-10',
        lastActivity: '2024-12-10T16:45:00Z',
        createdAt: '2024-03-10T09:00:00Z',
        updatedAt: '2024-12-10T16:45:00Z',
    },
    {
        id: '4',
        companyId: 'COMP-004',
        name: 'FoodPro Industries',
        industryType: 'Food Processing',
        contactPerson: 'Robert Williams',
        email: 'r.williams@foodpro.com',
        phone: '+1-555-0404',
        address: '321 Food Court',
        city: 'Chicago',
        state: 'Illinois',
        postalCode: '60601',
        country: 'United States',
        licenseType: 'Basic',
        licenseStartDate: '2024-04-20',
        licenseDuration: '3 months',
        autoRenewal: false,
        maxUsers: 50,
        maxDevices: 20,
        storageLimit: 10,
        apiCallLimit: 10000,
        timezone: 'America/Chicago',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'English',
        status: 'Trial',
        activeUsers: 12,
        totalUsers: 15,
        totalMachines: 8,
        totalProducts: 50,
        totalAssets: 20,
        totalProductions: 800,
        onboardedDate: '2024-04-20',
        lastActivity: '2024-12-08T11:20:00Z',
        createdAt: '2024-04-20T10:00:00Z',
        updatedAt: '2024-12-08T11:20:00Z',
    },
    {
        id: '5',
        companyId: 'COMP-005',
        name: 'PharmaGlobal Corp',
        industryType: 'Pharma',
        contactPerson: 'Emily Davis',
        email: 'e.davis@pharmaglobal.com',
        phone: '+1-555-0505',
        address: '654 Pharma Drive',
        city: 'New Jersey',
        state: 'New Jersey',
        postalCode: '07030',
        country: 'United States',
        licenseType: 'Premium',
        licenseStartDate: '2024-05-05',
        licenseDuration: '1 year',
        autoRenewal: true,
        maxUsers: 1000,
        maxDevices: 500,
        storageLimit: 250,
        apiCallLimit: 100000,
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'English',
        status: 'Suspended',
        activeUsers: 0,
        totalUsers: 180,
        totalMachines: 90,
        totalProducts: 300,
        totalAssets: 120,
        totalProductions: 0,
        onboardedDate: '2024-05-05',
        lastActivity: '2024-11-25T10:00:00Z',
        createdAt: '2024-05-05T08:00:00Z',
        updatedAt: '2024-11-25T10:00:00Z',
    },
]

