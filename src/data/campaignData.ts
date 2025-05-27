
export interface CampaignPatient {
  id: string;
  name: string;
  phone: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'declined' | 'callback-scheduled';
  lastContactDate?: string;
  nextContactDate?: string;
  contactAttempts: number;
  enrollmentDate?: string;
  notes: string;
  riskLevel: 'low' | 'medium' | 'high';
  eligibilityScore: number;
}

export interface CampaignScript {
  id: string;
  type: 'initial' | 'follow-up' | 'callback';
  title: string;
  content: string;
  duration: string;
}

export interface CampaignMetrics {
  totalPatients: number;
  contacted: number;
  enrolled: number;
  declined: number;
  pending: number;
  conversionRate: number;
  avgCallDuration: string;
  costPerEnrollment: number;
}

export interface EnhancedCampaign {
  id: number;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  priority: string;
  priorityColor: string;
  description: string;
  reached: string;
  startDate: string;
  completion: number;
  patients: CampaignPatient[];
  scripts: CampaignScript[];
  metrics: CampaignMetrics;
  billingInfo: {
    cptCode: string;
    reimbursementRate: number;
    totalRevenue: number;
    complianceStatus: 'compliant' | 'pending' | 'non-compliant';
  };
}

export const ccmCampaignData: EnhancedCampaign = {
  id: 5,
  title: 'CCM Enrollment Outreach',
  category: 'Care Management',
  status: 'In Progress',
  statusColor: 'bg-green-100 text-green-800',
  priority: 'High priority',
  priorityColor: 'bg-red-100 text-red-800',
  description: 'Voice with SMS fallback',
  reached: '45 of 156 reached',
  startDate: '5/20/2025',
  completion: 29,
  patients: [
    {
      id: 'P001',
      name: 'Robert Johnson',
      phone: '(555) 123-4567',
      status: 'enrolled',
      lastContactDate: '2025-05-26',
      contactAttempts: 2,
      enrollmentDate: '2025-05-26',
      notes: 'Successfully enrolled after explaining benefits',
      riskLevel: 'high',
      eligibilityScore: 95
    },
    {
      id: 'P002',
      name: 'Maria Santos',
      phone: '(555) 234-5678',
      status: 'callback-scheduled',
      lastContactDate: '2025-05-25',
      nextContactDate: '2025-05-28',
      contactAttempts: 1,
      notes: 'Interested but needs to discuss with family',
      riskLevel: 'medium',
      eligibilityScore: 88
    },
    {
      id: 'P003',
      name: 'David Miller',
      phone: '(555) 345-6789',
      status: 'declined',
      lastContactDate: '2025-05-24',
      contactAttempts: 3,
      notes: 'Not interested in remote monitoring',
      riskLevel: 'low',
      eligibilityScore: 72
    },
    {
      id: 'P004',
      name: 'Jennifer Adams',
      phone: '(555) 456-7890',
      status: 'contacted',
      lastContactDate: '2025-05-26',
      contactAttempts: 1,
      notes: 'Left voicemail, waiting for response',
      riskLevel: 'high',
      eligibilityScore: 92
    },
    {
      id: 'P005',
      name: 'Michael Brown',
      phone: '(555) 567-8901',
      status: 'pending',
      contactAttempts: 0,
      notes: 'High priority - multiple chronic conditions',
      riskLevel: 'high',
      eligibilityScore: 98
    }
  ],
  scripts: [
    {
      id: 'S001',
      type: 'initial',
      title: 'CCM Initial Outreach',
      content: 'Hello [Patient Name], this is [Staff Name] from Hana Clinic. I\'m calling to tell you about our Chronic Care Management program that can help you better manage your health conditions...',
      duration: '3-5 minutes'
    },
    {
      id: 'S002',
      type: 'follow-up',
      title: 'CCM Follow-up Call',
      content: 'Hi [Patient Name], I\'m following up on our previous conversation about the CCM program. Do you have any questions about the benefits we discussed?',
      duration: '2-3 minutes'
    },
    {
      id: 'S003',
      type: 'callback',
      title: 'CCM Scheduled Callback',
      content: 'Hello [Patient Name], this is [Staff Name] calling back as scheduled. I hope you\'ve had time to consider our CCM program...',
      duration: '3-4 minutes'
    }
  ],
  metrics: {
    totalPatients: 156,
    contacted: 45,
    enrolled: 12,
    declined: 8,
    pending: 111,
    conversionRate: 26.7,
    avgCallDuration: '4.2 min',
    costPerEnrollment: 18.50
  },
  billingInfo: {
    cptCode: '99490',
    reimbursementRate: 62.15,
    totalRevenue: 745.80,
    complianceStatus: 'compliant'
  }
};
