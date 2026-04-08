import Dexie, { Table } from 'dexie';

// Define your schema interfaces
export interface User {
  id?: number;
  name: string;
  email: string;
}

// Add more interfaces as needed for your application
export interface DashboardCache {
  id?: number;
  dashboardId: string;
  data: unknown;
  timestamp: number;
}

export interface OfflineData {
  id?: number;
  type: string;
  payload: unknown;
  timestamp: number;
}

export class AppDatabase extends Dexie {
  users!: Table<User>;
  dashboardCache!: Table<DashboardCache>;
  offlineData!: Table<OfflineData>;

  constructor() {
    super('EagleAnalyticsDB');
    
    // Define schema versions
    this.version(1).stores({
      users: '++id, name, email', // Schema definition
      dashboardCache: '++id, dashboardId, timestamp',
      offlineData: '++id, type, timestamp',
    });
  }
}

// Export single instance
export const db = new AppDatabase();

