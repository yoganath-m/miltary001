export interface DashboardMetrics {
  openingBalance: number;
  closingBalance: number;
  netMovement: number;
  assigned: number;
  expended: number;
  breakdown: {
    purchases: number;
    transferIn: number;
    transferOut: number;
  };
}

export interface Purchase {
  id: number;
  date: string;
  base: string;
  equipment: string;
  quantity: number;
  userId: number;
  createdAt: string;
}

export interface Transfer {
  id: number;
  fromBase: string;
  toBase: string;
  equipment: string;
  quantity: number;
  date: string;
  userId: number;
  createdAt: string;
}

export interface Assignment {
  id: number;
  personnelName: string;
  asset: string;
  quantity: number;
  expended: boolean;
  userId: number;
  createdAt: string;
}

export interface CreatePurchaseRequest {
  base: string;
  equipmentType: string;
  quantity: number;
  date: string;
}

export interface CreateTransferRequest {
  fromBase: string;
  toBase: string;
  equipmentType: string;
  quantity: number;
  date: string;
}

export interface CreateAssignmentRequest {
  personnelName: string;
  asset: string;
  quantity: number;
  expended: boolean;
}

export interface DashboardFilters {
  date?: string;
  base?: string;
  equipmentType?: string;
}

// User roles for RBAC
export type UserRole = 'admin' | 'commander' | 'logistics';

export interface User {
  id: number;
  username: string;
  role: UserRole;
  base?: string; // Commanders are associated with a specific base
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}
