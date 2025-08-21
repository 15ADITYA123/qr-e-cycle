export type EWasteItemStatus = 
  | 'reported' 
  | 'pending_pickup' 
  | 'in_transit' 
  | 'recycled' 
  | 'disposed' 
  | 'reused';

export type EWasteCategory = 'recyclable' | 'reusable' | 'hazardous';

export interface EWasteItem {
  id: string;
  name: string;
  category: EWasteCategory;
  department: string;
  location: string;
  serialNo: string;
  purchaseDate: string;
  ageMonths: number;
  status: EWasteItemStatus;
  conditionNotes: string;
  currentHolder: string;
  qrCodeImage?: string;
  qrPayload: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  licenseNo: string;
  serviceRegions: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  complianceDocs: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  pointsPerItemReported: number;
  pointsPerItemRecycled: number;
  isActive: boolean;
  participantCount: number;
  itemsCollected: number;
}

export interface DepartmentScore {
  department: string;
  pointsTotal: number;
  itemsReported: number;
  itemsRecycled: number;
  lastUpdated: string;
}

export interface Pickup {
  id: string;
  vendorId: string;
  vendorName: string;
  items: EWasteItem[];
  scheduledFor: string;
  location: string;
  coordinatorId: string;
  status: 'scheduled' | 'accepted' | 'picked_up' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface AnalyticsData {
  totalItems: number;
  itemsRecycled: number;
  itemsReused: number;
  co2Saved: number; // in kg
  landfillDiverted: number; // in kg
  monthlyTrends: Array<{
    month: string;
    reported: number;
    recycled: number;
    reused: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  departmentContributions: Array<{
    department: string;
    items: number;
    points: number;
  }>;
}