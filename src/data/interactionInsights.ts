
export interface PatientInteractionInsights {
  communicationStyle: 'Direct' | 'Supportive' | 'Educational' | 'Motivational';
  preferredContact: 'Phone' | 'Email' | 'Text' | 'In-person';
  culturalConsiderations: string[];
  motivationalFactors: string[];
  concerns: string[];
  successStrategies: string[];
  lastUpdated: string;
}

export const defaultInteractionInsights: PatientInteractionInsights = {
  communicationStyle: 'Supportive',
  preferredContact: 'Phone',
  culturalConsiderations: [],
  motivationalFactors: [],
  concerns: [],
  successStrategies: [],
  lastUpdated: new Date().toISOString()
};

// Sample insights for Matteo Grassi
export const matteoInteractionInsights: PatientInteractionInsights = {
  communicationStyle: 'Educational',
  preferredContact: 'Email',
  culturalConsiderations: ['Italian cultural background', 'Values family input in health decisions'],
  motivationalFactors: ['Career advancement goals', 'Family health history awareness', 'Fitness achievements'],
  concerns: ['Work-life balance', 'Medication side effects', 'Exercise time constraints'],
  successStrategies: ['Detailed explanations of treatment rationale', 'Written follow-up summaries', 'Flexible scheduling'],
  lastUpdated: '2025-05-20T10:30:00Z'
};
