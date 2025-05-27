
import { PatientBillingBreakdown, PopulationBillingAnalytics, BillingAction } from '@/types/billingBreakdown';

// Mock billing actions data
export const mockBillingActions: BillingAction[] = [
  {
    id: 'action-1',
    name: 'Mental Health Assessment',
    timeSpent: 12,
    category: 'patient-contact',
    taskId: 'T-1001',
    timestamp: new Date('2025-01-20T10:30:00'),
    description: 'Conducted comprehensive mental health evaluation'
  },
  {
    id: 'action-2', 
    name: 'Treatment Plan Documentation',
    timeSpent: 8,
    category: 'documentation',
    taskId: 'T-1001',
    timestamp: new Date('2025-01-20T11:00:00'),
    description: 'Documented treatment plan and safety protocols'
  },
  {
    id: 'action-3',
    name: 'Psychiatrist Consultation',
    timeSpent: 15,
    category: 'coordination',
    taskId: 'T-1001', 
    timestamp: new Date('2025-01-20T14:00:00'),
    description: 'Coordinated emergency consultation with psychiatrist'
  },
  {
    id: 'action-4',
    name: 'Patient Follow-up Call',
    timeSpent: 6,
    category: 'patient-contact',
    taskId: 'T-1002',
    timestamp: new Date('2025-01-21T09:15:00'),
    description: 'Follow-up call regarding medication adherence'
  },
  {
    id: 'action-5',
    name: 'Care Plan Update',
    timeSpent: 4,
    category: 'care-planning',
    taskId: 'T-1002',
    timestamp: new Date('2025-01-21T09:30:00'),
    description: 'Updated care plan with medication reminders'
  }
];

// Mock patient billing breakdown
export const mockPatientBillingBreakdown: PatientBillingBreakdown = {
  patientId: 'P100592',
  patientName: 'Matteo Grassi',
  cptCode: '99484',
  totalTime: 45,
  targetTime: 50,
  actions: mockBillingActions,
  lastUpdated: new Date('2025-01-21T09:30:00')
};

// Mock population billing analytics
export const mockPopulationBillingAnalytics: PopulationBillingAnalytics = {
  totalMinutesLogged: 1248,
  averageTimePerPatient: 24.8,
  actionBreakdown: {
    documentation: 312,
    patientContact: 405,
    carePlanning: 186,
    coordination: 234,
    administrative: 111
  },
  efficiencyMetrics: {
    averageTimePerAction: 8.2,
    mostTimeConsumingAction: 'Patient Contact',
    leastTimeConsumingAction: 'Administrative Tasks'
  },
  trends: {
    weeklyTrends: [
      {
        week: 'Week 1',
        totalMinutes: 280,
        actionBreakdown: {
          documentation: 70,
          patientContact: 95,
          carePlanning: 42,
          coordination: 55,
          administrative: 18
        }
      },
      {
        week: 'Week 2', 
        totalMinutes: 320,
        actionBreakdown: {
          documentation: 85,
          patientContact: 108,
          carePlanning: 48,
          coordination: 62,
          administrative: 17
        }
      },
      {
        week: 'Week 3',
        totalMinutes: 295,
        actionBreakdown: {
          documentation: 78,
          patientContact: 98,
          carePlanning: 44,
          coordination: 58,
          administrative: 17
        }
      },
      {
        week: 'Week 4',
        totalMinutes: 353,
        actionBreakdown: {
          documentation: 79,
          patientContact: 104,
          carePlanning: 52,
          coordination: 59,
          administrative: 59
        }
      }
    ]
  }
};
