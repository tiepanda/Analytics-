// Eagle Analytics Mock Data - Comprehensive Dataset for Industrial IoT Platform

export interface Company {
  id: number
  name: string
  industry: string
  location: string
  employeeCount: number
  status: 'active' | 'inactive'
  licenseExpiry: Date
  createdAt: Date
}

export interface User {
  id: string
  companyId: number
  name: string
  email: string
  role: 'SuperAdmin' | 'Admin' | 'Manager' | 'Operator' | 'Viewer'
  department: string
  status: 'active' | 'inactive'
  lastLogin: Date
  permissions: string[]
}

export interface Machine {
  id: string
  companyId: number
  name: string
  model: string
  type: string
  location: string
  status: 'running' | 'idle' | 'maintenance' | 'offline'
  oee: number
  efficiency: number
  lastMaintenance: Date
  nextMaintenance: Date
  energyConsumption: number
  productionRate: number
}

export interface ProductionData {
  id: string
  machineId: string
  jobId: string
  productCode: string
  operatorId: string
  shift: number
  startTime: Date
  endTime: Date
  quantityProduced: number
  quantityRejected: number
  cycleTime: number
  energyConsumed: number
  status: 'completed' | 'in_progress' | 'stopped'
}

export interface OEEData {
  id: string
  machineId: string
  date: Date
  availability: number
  performance: number
  quality: number
  oee: number
  plannedProductionTime: number
  actualProductionTime: number
  idealCycleTime: number
  totalCount: number
  goodCount: number
}

export interface EnergyData {
  id: string
  machineId: string
  timestamp: Date
  consumption: number
  unit: string
  cost: number
  peakDemand: number
  efficiency: number
}

export interface QualityData {
  id: string
  productionId: string
  inspectorId: string
  inspectionTime: Date
  defectType: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  correctiveAction: string
  status: 'open' | 'resolved' | 'escalated'
}

export interface MaintenanceData {
  id: string
  machineId: string
  type: 'preventive' | 'corrective' | 'predictive'
  technicianId: string
  scheduledDate: Date
  actualStartDate: Date
  actualEndDate: Date
  description: string
  partsUsed: string[]
  cost: number
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
}

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'ABC Manufacturing Corp',
    industry: 'Automotive',
    location: 'Detroit, MI',
    employeeCount: 500,
    status: 'active',
    licenseExpiry: new Date('2025-12-31'),
    createdAt: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'XYZ Electronics Ltd',
    industry: 'Electronics',
    location: 'Austin, TX',
    employeeCount: 300,
    status: 'active',
    licenseExpiry: new Date('2025-10-15'),
    createdAt: new Date('2023-03-20')
  },
  {
    id: 3,
    name: 'DEF Aerospace Inc',
    industry: 'Aerospace',
    location: 'Seattle, WA',
    employeeCount: 800,
    status: 'active',
    licenseExpiry: new Date('2025-08-30'),
    createdAt: new Date('2022-11-10')
  }
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-001',
    companyId: 1,
    name: 'John Smith',
    email: 'john.smith@abc.com',
    role: 'SuperAdmin',
    department: 'IT',
    status: 'active',
    lastLogin: new Date('2024-01-15T09:30:00'),
    permissions: ['all']
  },
  {
    id: 'user-002',
    companyId: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@abc.com',
    role: 'Admin',
    department: 'Operations',
    status: 'active',
    lastLogin: new Date('2024-01-15T08:15:00'),
    permissions: ['company_admin', 'user_management', 'reports']
  },
  {
    id: 'user-003',
    companyId: 1,
    name: 'Mike Davis',
    email: 'mike.davis@abc.com',
    role: 'Manager',
    department: 'Production',
    status: 'active',
    lastLogin: new Date('2024-01-15T07:45:00'),
    permissions: ['production_view', 'quality_view', 'reports_view']
  },
  {
    id: 'user-004',
    companyId: 1,
    name: 'Emily Chen',
    email: 'emily.chen@abc.com',
    role: 'Operator',
    department: 'Assembly Line',
    status: 'active',
    lastLogin: new Date('2024-01-15T06:30:00'),
    permissions: ['machine_view', 'production_entry']
  },
  {
    id: 'user-005',
    companyId: 1,
    name: 'David Wilson',
    email: 'david.wilson@abc.com',
    role: 'Viewer',
    department: 'Quality',
    status: 'active',
    lastLogin: new Date('2024-01-15T10:00:00'),
    permissions: ['read_only']
  }
]

// Mock Machines
export const mockMachines: Machine[] = [
  {
    id: 'mach-001',
    companyId: 1,
    name: 'CNC Milling Machine A1',
    model: 'DMG Mori DMU 50',
    type: 'CNC Mill',
    location: 'Line 1, Station 3',
    status: 'running',
    oee: 85.2,
    efficiency: 92.1,
    lastMaintenance: new Date('2024-01-01'),
    nextMaintenance: new Date('2024-02-01'),
    energyConsumption: 15.5,
    productionRate: 120
  },
  {
    id: 'mach-002',
    companyId: 1,
    name: 'Injection Molding B2',
    model: 'Arburg 470E',
    type: 'Injection Molder',
    location: 'Line 2, Station 1',
    status: 'running',
    oee: 78.9,
    efficiency: 88.5,
    lastMaintenance: new Date('2023-12-15'),
    nextMaintenance: new Date('2024-01-15'),
    energyConsumption: 25.3,
    productionRate: 95
  },
  {
    id: 'mach-003',
    companyId: 1,
    name: 'Assembly Robot C1',
    model: 'Fanuc CR-35iA',
    type: 'Industrial Robot',
    location: 'Line 3, Station 2',
    status: 'idle',
    oee: 92.4,
    efficiency: 96.2,
    lastMaintenance: new Date('2024-01-05'),
    nextMaintenance: new Date('2024-02-05'),
    energyConsumption: 8.2,
    productionRate: 180
  },
  {
    id: 'mach-004',
    companyId: 1,
    name: 'Quality Scanner D1',
    model: 'Keyence XM-5000',
    type: 'Quality Scanner',
    location: 'Quality Lab',
    status: 'maintenance',
    oee: 67.8,
    efficiency: 74.3,
    lastMaintenance: new Date('2024-01-10'),
    nextMaintenance: new Date('2024-01-20'),
    energyConsumption: 3.1,
    productionRate: 0
  }
]

// Mock OEE Data (Last 30 days)
export const mockOEEDataset: OEEData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    id: `oee-${i + 1}`,
    machineId: 'mach-001',
    date,
    availability: 85 + Math.random() * 10,
    performance: 88 + Math.random() * 8,
    quality: 92 + Math.random() * 6,
    oee: 0, // Will be calculated
    plannedProductionTime: 480, // 8 hours
    actualProductionTime: 420 + Math.random() * 40,
    idealCycleTime: 45,
    totalCount: 480 + Math.floor(Math.random() * 50),
    goodCount: 0 // Will be calculated
  }
}).map(item => ({
  ...item,
  oee: (item.availability * item.performance * item.quality) / 10000,
  goodCount: Math.floor(item.totalCount * (item.quality / 100))
}))

// Mock Energy Data (Last 24 hours, hourly)
export const mockEnergyDataset: EnergyData[] = Array.from({ length: 24 }, (_, i) => {
  const timestamp = new Date()
  timestamp.setHours(timestamp.getHours() - (23 - i))

  return {
    id: `energy-${i + 1}`,
    machineId: 'mach-001',
    timestamp,
    consumption: 12 + Math.random() * 8,
    unit: 'kWh',
    cost: 0, // Will be calculated
    peakDemand: 18 + Math.random() * 5,
    efficiency: 85 + Math.random() * 10
  }
}).map(item => ({
  ...item,
  cost: item.consumption * 0.12 // $0.12 per kWh
}))

// Mock Production Data (Last 7 days)
export const mockProductionDataset: ProductionData[] = Array.from({ length: 50 }, (_, i) => {
  const startTime = new Date()
  startTime.setDate(startTime.getDate() - Math.floor(Math.random() * 7))
  startTime.setHours(6 + Math.floor(Math.random() * 16)) // 6 AM to 10 PM

  const cycleTime = 45 + Math.random() * 15
  const quantityProduced = Math.floor((8 * 3600) / cycleTime) // Based on 8-hour shift

  return {
    id: `prod-${i + 1}`,
    machineId: ['mach-001', 'mach-002', 'mach-003'][Math.floor(Math.random() * 3)],
    jobId: `JOB-${String(1000 + i).padStart(4, '0')}`,
    productCode: `PRD-${String(100 + Math.floor(Math.random() * 50)).padStart(3, '0')}`,
    operatorId: ['user-004', 'user-005'][Math.floor(Math.random() * 2)],
    shift: Math.floor(Math.random() * 3) + 1,
    startTime,
    endTime: new Date(startTime.getTime() + 8 * 60 * 60 * 1000), // 8 hours later
    quantityProduced,
    quantityRejected: Math.floor(quantityProduced * (Math.random() * 0.05)), // 0-5% rejection rate
    cycleTime,
    energyConsumed: quantityProduced * 0.15, // 0.15 kWh per unit
    status: (['completed', 'completed', 'completed', 'in_progress'] as const)[Math.floor(Math.random() * 4)]
  }
})

// Mock Quality Data
export const mockQualityDataset: QualityData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `quality-${i + 1}`,
  productionId: `prod-${Math.floor(Math.random() * 50) + 1}`,
  inspectorId: 'user-005',
  inspectionTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
  defectType: ['Dimensional', 'Surface Finish', 'Material', 'Assembly', 'Functional'][Math.floor(Math.random() * 5)],
  severity: (['low', 'medium', 'high', 'critical'] as const)[Math.floor(Math.random() * 4)],
  description: 'Quality inspection finding details',
  correctiveAction: 'Implemented corrective measures',
  status: (['resolved', 'open', 'escalated'] as const)[Math.floor(Math.random() * 3)]
}))

// Mock Maintenance Data
export const mockMaintenanceDataset: MaintenanceData[] = Array.from({ length: 15 }, (_, i) => {
  const scheduledDate = new Date()
  scheduledDate.setDate(scheduledDate.getDate() - Math.floor(Math.random() * 30))

  return {
    id: `maint-${i + 1}`,
    machineId: ['mach-001', 'mach-002', 'mach-003', 'mach-004'][Math.floor(Math.random() * 4)],
    type: (['preventive', 'corrective', 'predictive'] as const)[Math.floor(Math.random() * 3)],
    technicianId: 'user-003',
    scheduledDate,
    actualStartDate: new Date(scheduledDate.getTime() - Math.random() * 24 * 60 * 60 * 1000),
    actualEndDate: new Date(scheduledDate.getTime() + (1 + Math.random() * 7) * 24 * 60 * 60 * 1000),
    description: 'Routine maintenance and inspection',
    partsUsed: ['Oil Filter', 'Bearing', 'Seal', 'Lubricant'],
    cost: 150 + Math.random() * 500,
    status: (['completed', 'scheduled', 'in_progress'] as const)[Math.floor(Math.random() * 3)]
  }
})

// Dashboard Summary Data
export const getDashboardSummary = (companyId: number) => {
  const companyMachines = mockMachines.filter(m => m.companyId === companyId)
  const activeMachines = companyMachines.filter(m => m.status === 'running').length
  const totalMachines = companyMachines.length

  const todayProduction = mockProductionDataset
    .filter(p => new Date(p.startTime).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.quantityProduced, 0)

  const todayEnergy = mockEnergyDataset
    .reduce((sum, e) => sum + e.consumption, 0)

  const avgOEE = mockOEEDataset
    .slice(-7) // Last 7 days
    .reduce((sum, o) => sum + o.oee, 0) / 7

  return {
    totalMachines,
    activeMachines,
    todayProduction,
    todayEnergy,
    avgOEE: Math.round(avgOEE * 100) / 100,
    alertsCount: 7, // Mock alerts
    efficiency: 83.1,
    quality: 96.4
  }
}

// Export all mock data
export const eagleAnalyticsData = {
  companies: mockCompanies,
  users: mockUsers,
  machines: mockMachines,
  oeeData: mockOEEDataset,
  energyData: mockEnergyDataset,
  productionData: mockProductionDataset,
  qualityData: mockQualityDataset,
  maintenanceData: mockMaintenanceDataset,
  getDashboardSummary
}
