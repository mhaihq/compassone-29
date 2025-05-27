import { PatientBillingBreakdown, PopulationBillingAnalytics, BillingAction, BillingSafeguard } from '@/types/billingBreakdown';

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

// Mock billing safeguard data
export const mockBillingSafeguard: BillingSafeguard = {
  taskId: 'MSR-001',
  patientId: 'P100592',
  cptCode: '99484',
  timeSpent: 25,
  clinicalNotes: {
    stabilityAssessment: 'Monthly stability review completed. Improvements noted in: mood, sleep. Stable functioning observed in: medication, functionality. Patient demonstrates overall engagement in treatment process.',
    functionalStatus: 'Functional assessment reveals: mood: improved, sleep: improved, functionality: stable. Patient maintains baseline activities of daily living with ongoing support.',
    riskFactors: 'No acute risk factors identified. Standard monitoring protocols maintained.',
    interventions: 'Continued evidence-based interventions per treatment plan. Cognitive behavioral techniques reinforced.',
    followUpPlan: 'Continue current treatment plan with monthly stability reviews. Next assessment scheduled in 4 weeks.',
    medicationReview: 'Current medications reviewed for effectiveness and adherence. No changes indicated at this time.',
    careCoordination: 'Coordinated care with primary care provider and mental health team. Communication plan maintained.'
  },
  validation: {
    isValid: true,
    errors: [],
    warnings: [],
    completionPercentage: 100,
    requiredFields: [
      { field: 'stabilityAssessment', completed: true, description: 'Detailed stability assessment (minimum 50 characters)' },
      { field: 'functionalStatus', completed: true, description: 'Functional status evaluation (minimum 30 characters)' },
      { field: 'riskFactors', completed: true, description: 'Risk factors identification (minimum 20 characters)' },
      { field: 'interventions', completed: true, description: 'Interventions and recommendations (minimum 40 characters)' },
      { field: 'followUpPlan', completed: true, description: 'Follow-up plan (minimum 30 characters)' },
      { field: 'medicationReview', completed: true, description: 'Medication review notes (minimum 20 characters)' },
      { field: 'careCoordination', completed: true, description: 'Care coordination activities (minimum 20 characters)' }
    ]
  },
  isReadyForBilling: true,
  submittedAt: new Date('2025-01-21T10:15:00'),
  submittedBy: 'Dr. Sarah Chen'
};
