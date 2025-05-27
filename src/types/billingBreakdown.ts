
export interface BillingAction {
  id: string;
  name: string;
  timeSpent: number; // in minutes
  category: 'documentation' | 'patient-contact' | 'care-planning' | 'coordination' | 'administrative';
  taskId?: string;
  timestamp: Date;
  description?: string;
}

export interface PatientBillingBreakdown {
  patientId: string;
  patientName: string;
  cptCode: string;
  totalTime: number;
  targetTime: number;
  actions: BillingAction[];
  lastUpdated: Date;
}

export interface PopulationBillingAnalytics {
  totalMinutesLogged: number;
  averageTimePerPatient: number;
  actionBreakdown: Record<string, number>;
  efficiencyMetrics: {
    averageTimePerAction: number;
    mostTimeConsumingAction: string;
    leastTimeConsumingAction: string;
  };
  trends: {
    weeklyTrends: Array<{
      week: string;
      totalMinutes: number;
      actionBreakdown: Record<string, number>;
    }>;
  };
}

export interface TimeBreakdownEntry {
  action: string;
  category: string;
  timeSpent: number;
  percentage: number;
  taskCount: number;
}

// New billing safeguard types
export interface ClinicalNote {
  stabilityAssessment: string;
  functionalStatus: string;
  riskFactors: string;
  interventions: string;
  followUpPlan: string;
  medicationReview: string;
  careCoordination: string;
}

export interface BillingValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completionPercentage: number;
  requiredFields: {
    field: string;
    completed: boolean;
    description: string;
  }[];
}

export interface BillingSafeguard {
  taskId: string;
  patientId: string;
  cptCode: string;
  timeSpent: number;
  clinicalNotes: ClinicalNote;
  validation: BillingValidation;
  isReadyForBilling: boolean;
  submittedAt?: Date;
  submittedBy?: string;
}
