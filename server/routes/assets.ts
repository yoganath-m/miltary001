import { RequestHandler } from "express";

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

// Mock data - replace with database queries when connected
const mockDashboardData: DashboardMetrics = {
  openingBalance: 1250,
  closingBalance: 1390,
  netMovement: 140,
  assigned: 890,
  expended: 45,
  breakdown: {
    purchases: 125,
    transferIn: 45,
    transferOut: 30,
  },
};

const mockPurchases: Purchase[] = [
  {
    id: 1,
    date: "2024-01-15",
    base: "Base Alpha",
    equipment: "M4 Rifles",
    quantity: 25,
    userId: 1,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    date: "2024-01-14",
    base: "Base Bravo",
    equipment: "Tactical Vests",
    quantity: 50,
    userId: 1,
    createdAt: "2024-01-14T14:30:00Z",
  },
  {
    id: 3,
    date: "2024-01-12",
    base: "Base Charlie",
    equipment: "Night Vision",
    quantity: 10,
    userId: 2,
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: 4,
    date: "2024-01-10",
    base: "Base Alpha",
    equipment: "Ammunition",
    quantity: 1000,
    userId: 1,
    createdAt: "2024-01-10T16:20:00Z",
  },
];

export const getDashboardMetrics: RequestHandler = (req, res) => {
  // In production, this would query the database with filters
  const { date, base, equipmentType } = req.query;

  // Apply filters to mock data (simplified)
  let filteredData = { ...mockDashboardData };

  res.json(filteredData);
};

export const getPurchases: RequestHandler = (req, res) => {
  // In production, this would query the database with pagination and filters
  res.json(mockPurchases);
};

export const createPurchase: RequestHandler = (req, res) => {
  const { base, equipmentType, quantity, date } = req.body;

  // Validate input
  if (!base || !equipmentType || !quantity || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // In production, this would insert into database
  const newPurchase: Purchase = {
    id: mockPurchases.length + 1,
    date,
    base,
    equipment: equipmentType,
    quantity: parseInt(quantity),
    userId: 1, // Would come from JWT token
    createdAt: new Date().toISOString(),
  };

  mockPurchases.unshift(newPurchase);

  res.status(201).json(newPurchase);
};

export const getTransfers: RequestHandler = (req, res) => {
  // Mock data for transfers
  const mockTransfers: Transfer[] = [
    {
      id: 1,
      fromBase: "Base Alpha",
      toBase: "Base Bravo",
      equipment: "M4 Rifles",
      quantity: 15,
      date: "2024-01-16",
      userId: 1,
      createdAt: "2024-01-16T11:00:00Z",
    },
    {
      id: 2,
      fromBase: "Base Charlie",
      toBase: "Base Alpha",
      equipment: "Night Vision",
      quantity: 5,
      date: "2024-01-15",
      userId: 2,
      createdAt: "2024-01-15T13:45:00Z",
    },
  ];

  res.json(mockTransfers);
};

export const createTransfer: RequestHandler = (req, res) => {
  const { fromBase, toBase, equipmentType, quantity, date } = req.body;

  if (!fromBase || !toBase || !equipmentType || !quantity || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (fromBase === toBase) {
    return res
      .status(400)
      .json({ error: "From and To bases cannot be the same" });
  }

  const newTransfer: Transfer = {
    id: Date.now(),
    fromBase,
    toBase,
    equipment: equipmentType,
    quantity: parseInt(quantity),
    date,
    userId: 1,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(newTransfer);
};

export const getAssignments: RequestHandler = (req, res) => {
  // Mock data for assignments
  const mockAssignments: Assignment[] = [
    {
      id: 1,
      personnelName: "Sgt. Johnson",
      asset: "M4 Rifle",
      quantity: 1,
      expended: false,
      userId: 1,
      createdAt: "2024-01-14T09:00:00Z",
    },
    {
      id: 2,
      personnelName: "Corp. Smith",
      asset: "Tactical Vest",
      quantity: 1,
      expended: false,
      userId: 1,
      createdAt: "2024-01-13T14:30:00Z",
    },
    {
      id: 3,
      personnelName: "Pvt. Williams",
      asset: "Night Vision",
      quantity: 1,
      expended: true,
      userId: 2,
      createdAt: "2024-01-12T11:15:00Z",
    },
  ];

  res.json(mockAssignments);
};

export const createAssignment: RequestHandler = (req, res) => {
  const { personnelName, asset, quantity, expended } = req.body;

  if (!personnelName || !asset || !quantity) {
    return res
      .status(400)
      .json({ error: "Personnel name, asset, and quantity are required" });
  }

  const newAssignment: Assignment = {
    id: Date.now(),
    personnelName,
    asset,
    quantity: parseInt(quantity),
    expended: Boolean(expended),
    userId: 1,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(newAssignment);
};
