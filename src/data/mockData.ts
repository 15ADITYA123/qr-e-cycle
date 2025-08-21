import { EWasteItem, Vendor, Campaign, DepartmentScore, Pickup, AnalyticsData } from '@/types';

// Mock E-Waste Items
export const mockEWasteItems: EWasteItem[] = [
  {
    id: '1',
    name: 'Dell Inspiron Laptop',
    category: 'recyclable',
    department: 'Computer Science',
    location: 'Lab 301, CS Building',
    serialNo: 'DL5021XP',
    purchaseDate: '2019-08-15',
    ageMonths: 65,
    status: 'reported',
    conditionNotes: 'Screen damaged, motherboard functional',
    currentHolder: 'Prof. Kumar',
    qrPayload: 'ITEM:1',
    createdAt: '2024-08-15T10:30:00Z',
    updatedAt: '2024-08-15T10:30:00Z'
  },
  {
    id: '2', 
    name: 'HP LaserJet Printer',
    category: 'reusable',
    department: 'Administration',
    location: 'Office 205, Admin Block',
    serialNo: 'HP2021LJ',
    purchaseDate: '2021-03-20',
    ageMonths: 41,
    status: 'in_transit',
    conditionNotes: 'Working condition, needs toner replacement',
    currentHolder: 'Admin Staff',
    qrPayload: 'ITEM:2',
    createdAt: '2024-08-10T14:20:00Z',
    updatedAt: '2024-08-20T09:15:00Z'
  },
  {
    id: '3',
    name: 'Damaged CRT Monitor',
    category: 'hazardous',
    department: 'Physics',
    location: 'Lab 102, Physics Block',
    serialNo: 'SM1998CRT',
    purchaseDate: '2018-01-10',
    ageMonths: 80,
    status: 'recycled',
    conditionNotes: 'Contains lead, requires special disposal',
    currentHolder: 'EcoRecycle Solutions',
    qrPayload: 'ITEM:3', 
    createdAt: '2024-07-25T08:45:00Z',
    updatedAt: '2024-08-18T16:30:00Z'
  }
];

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'EcoRecycle Solutions',
    licenseNo: 'ER2024001',
    serviceRegions: ['North Delhi', 'Central Delhi'],
    contactName: 'Rajesh Gupta',
    contactEmail: 'contact@ecorecycle.in',
    contactPhone: '+91 98765 43210',
    complianceDocs: ['CPCB Certificate', 'E-Waste License'],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'v2',
    name: 'Green Earth Recyclers',
    licenseNo: 'GER2024002',
    serviceRegions: ['South Delhi', 'East Delhi'],
    contactName: 'Priya Sharma',
    contactEmail: 'info@greenearth.co.in',
    contactPhone: '+91 87654 32109',
    complianceDocs: ['ISO 14001', 'State Pollution Board License'],
    isActive: true,
    createdAt: '2024-02-20T00:00:00Z'
  }
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'c1',
    title: 'Campus Clean-Up Drive 2024',
    description: 'Join us in making our campus more sustainable! Report old electronics and earn points for your department.',
    startDate: '2024-08-01',
    endDate: '2024-09-30',
    pointsPerItemReported: 10,
    pointsPerItemRecycled: 25,
    isActive: true,
    participantCount: 145,
    itemsCollected: 67
  },
  {
    id: 'c2',
    title: 'E-Waste Awareness Week',
    description: 'Educational workshops on proper e-waste disposal and environmental impact.',
    startDate: '2024-09-15',
    endDate: '2024-09-22',
    pointsPerItemReported: 15,
    pointsPerItemRecycled: 30,
    isActive: true,
    participantCount: 89,
    itemsCollected: 23
  }
];

// Mock Department Scores
export const mockDepartmentScores: DepartmentScore[] = [
  {
    department: 'Computer Science',
    pointsTotal: 450,
    itemsReported: 18,
    itemsRecycled: 12,
    lastUpdated: '2024-08-20T12:00:00Z'
  },
  {
    department: 'Electronics Engineering',
    pointsTotal: 380,
    itemsReported: 15,
    itemsRecycled: 10,
    lastUpdated: '2024-08-19T15:30:00Z'
  },
  {
    department: 'Physics',
    pointsTotal: 320,
    itemsReported: 12,
    itemsRecycled: 8,
    lastUpdated: '2024-08-18T10:20:00Z'
  }
];

// Mock Pickups
export const mockPickups: Pickup[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    vendorName: 'EcoRecycle Solutions',
    items: [mockEWasteItems[0], mockEWasteItems[2]],
    scheduledFor: '2024-08-25T10:00:00Z',
    location: 'Main Campus Gate',
    coordinatorId: 'coord1',
    status: 'scheduled',
    notes: 'Special handling required for CRT monitor',
    createdAt: '2024-08-20T14:30:00Z'
  }
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  totalItems: 147,
  itemsRecycled: 89,
  itemsReused: 34,
  co2Saved: 234.5,
  landfillDiverted: 1567.8,
  monthlyTrends: [
    { month: 'May', reported: 12, recycled: 8, reused: 3 },
    { month: 'Jun', reported: 18, recycled: 12, reused: 4 },
    { month: 'Jul', reported: 25, recycled: 15, reused: 8 },
    { month: 'Aug', reported: 32, recycled: 20, reused: 9 }
  ],
  categoryBreakdown: [
    { category: 'Recyclable', count: 89, percentage: 60.5 },
    { category: 'Reusable', count: 34, percentage: 23.1 },
    { category: 'Hazardous', count: 24, percentage: 16.4 }
  ],
  departmentContributions: [
    { department: 'Computer Science', items: 32, points: 450 },
    { department: 'Electronics', items: 28, points: 380 },
    { department: 'Physics', items: 25, points: 320 },
    { department: 'Mathematics', items: 18, points: 240 }
  ]
};