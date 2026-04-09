/**
 * Mock data for Company Dashboard
 * Based on PRD requirements and dashboard images
 */

export interface DashboardSummaryStats {
  planVsInvoice: {
    invoice: number
    plan: number
  }
  nonConformance: {
    counts: number
  }
  troubleOrder: {
    count: number
  }
}

export interface ProductionVolume {
  total: number
  ok: number
  nc: number
  scrap: number
  okPercentage: number
}

export interface MachineStatus {
  active: number
  idle: number
  maintenance: number
  others: number
  total: number
  activePercentage: number
}

export interface MachinesInProduction {
  cycle: number
  noActive: number
  total: number
  cyclePercentage: number
}

export interface DownTime {
  total: number
  maintenanceIdle: number
  noLoad: number
  maintenanceIdleHours: number
  noLoadHours: number
}

export interface OEEData {
  month: string
  ytd: number
  monthlyData: {
    month: string
    value: number
  }[]
}

export interface DownTimeLoss {
  month: string
  ytd: number
  monthlyData: {
    month: string
    hours: number
  }[]
}

export interface QualityMetrics {
  partsQuality: {
    percentage: number
    status: 'OK' | 'Warning' | 'Critical'
  }
  downTimePercentage: {
    percentage: number
    status: 'OK' | 'Warning' | 'Critical'
  }
  oeeTrend: {
    month: string
    ytd: number
    monthlyData: {
      month: string
      value: number
    }[]
  }
}

export interface PerformanceMetrics {
  cycleTimeThisMonth: {
    percentage: number
  }
  cycleTimeYTD: {
    percentage: number
  }
  netOperatingTime: {
    month: string
    ytd: number
    monthlyData: {
      month: string
      operatingTime: number
      availableTime: number
    }[]
  }
}

export interface AvailabilityMetrics {
  plannedProductionTime: {
    month: string
    ytd: number
    monthlyData: {
      month: string
      hours: number
    }[]
  }
  availabilityThisMonth: {
    percentage: number
  }
  downTimePercentageYTD: {
    percentage: number
  }
}

// Mock data
export const MOCK_DASHBOARD_SUMMARY: DashboardSummaryStats = {
  planVsInvoice: {
    invoice: 0,
    plan: 0,
  },
  nonConformance: {
    counts: 496,
  },
  troubleOrder: {
    count: 1690,
  },
}

export const MOCK_PRODUCTION_VOLUME: ProductionVolume = {
  total: 37903,
  ok: 30322,
  nc: 3790,
  scrap: 3791,
  okPercentage: 80,
}

export const MOCK_MACHINE_STATUS: MachineStatus = {
  active: 24,
  idle: 15,
  maintenance: 8,
  others: 3,
  total: 50,
  activePercentage: 48,
}

export const MOCK_MACHINES_IN_PRODUCTION: MachinesInProduction = {
  cycle: 31,
  noActive: 19,
  total: 50,
  cyclePercentage: 63,
}

export const MOCK_DOWN_TIME: DownTime = {
  total: 1855,
  maintenanceIdle: 290,
  noLoad: 1565,
  maintenanceIdleHours: 290,
  noLoadHours: 1565,
}

export const MOCK_OEE_DATA: OEEData = {
  month: 'October',
  ytd: 21,
  monthlyData: [
    { month: 'Apr', value: 15 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 20 },
    { month: 'Jul', value: 22 },
    { month: 'Aug', value: 19 },
    { month: 'Sep', value: 20 },
    { month: 'Oct', value: 24 },
  ],
}

export const MOCK_DOWN_TIME_LOSS: DownTimeLoss = {
  month: 'October',
  ytd: 9090,
  monthlyData: [
    { month: 'Apr', hours: 1200 },
    { month: 'May', hours: 1100 },
    { month: 'Jun', hours: 1300 },
    { month: 'Jul', hours: 1250 },
    { month: 'Aug', hours: 1400 },
    { month: 'Sep', hours: 1340 },
    { month: 'Oct', hours: 1500 },
  ],
}

export const MOCK_QUALITY_METRICS: QualityMetrics = {
  partsQuality: {
    percentage: 98,
    status: 'OK',
  },
  downTimePercentage: {
    percentage: 99,
    status: 'OK',
  },
  oeeTrend: {
    month: 'October',
    ytd: 595788,
    monthlyData: [
      { month: 'Apr', value: 450000 },
      { month: 'May', value: 480000 },
      { month: 'Jun', value: 510000 },
      { month: 'Jul', value: 540000 },
      { month: 'Aug', value: 520000 },
      { month: 'Sep', value: 560000 },
      { month: 'Oct', value: 595788 },
    ],
  },
}

export const MOCK_PERFORMANCE_METRICS: PerformanceMetrics = {
  cycleTimeThisMonth: {
    percentage: 92,
  },
  cycleTimeYTD: {
    percentage: 93,
  },
  netOperatingTime: {
    month: 'October',
    ytd: 595788,
    monthlyData: [
      { month: 'Apr', operatingTime: 450000, availableTime: 500000 },
      { month: 'May', operatingTime: 480000, availableTime: 520000 },
      { month: 'Jun', operatingTime: 510000, availableTime: 540000 },
      { month: 'Jul', operatingTime: 540000, availableTime: 560000 },
      { month: 'Aug', operatingTime: 520000, availableTime: 550000 },
      { month: 'Sep', operatingTime: 560000, availableTime: 580000 },
      { month: 'Oct', operatingTime: 595788, availableTime: 620000 },
    ],
  },
}

export const MOCK_AVAILABILITY_METRICS: AvailabilityMetrics = {
  plannedProductionTime: {
    month: 'October',
    ytd: 0,
    monthlyData: [
      { month: 'Apr', hours: 0 },
      { month: 'May', hours: 0 },
      { month: 'Jun', hours: 0 },
      { month: 'Jul', hours: 0 },
      { month: 'Aug', hours: 0 },
      { month: 'Sep', hours: 0 },
      { month: 'Oct', hours: 0 },
    ],
  },
  availabilityThisMonth: {
    percentage: 0,
  },
  downTimePercentageYTD: {
    percentage: 0,
  },
}

