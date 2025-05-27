
import { BillingValidation, ClinicalNote } from '@/types/billingBreakdown';

export const validateBillingReadiness = (
  clinicalNotes: ClinicalNote,
  timeSpent: number,
  requiredMinutes: number = 20
): BillingValidation => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const requiredFields = [
    {
      field: 'stabilityAssessment',
      completed: clinicalNotes.stabilityAssessment.trim().length >= 50,
      description: 'Detailed stability assessment (minimum 50 characters)'
    },
    {
      field: 'functionalStatus',
      completed: clinicalNotes.functionalStatus.trim().length >= 30,
      description: 'Functional status evaluation (minimum 30 characters)'
    },
    {
      field: 'riskFactors',
      completed: clinicalNotes.riskFactors.trim().length >= 20,
      description: 'Risk factors identification (minimum 20 characters)'
    },
    {
      field: 'interventions',
      completed: clinicalNotes.interventions.trim().length >= 40,
      description: 'Interventions and recommendations (minimum 40 characters)'
    },
    {
      field: 'followUpPlan',
      completed: clinicalNotes.followUpPlan.trim().length >= 30,
      description: 'Follow-up plan (minimum 30 characters)'
    },
    {
      field: 'medicationReview',
      completed: clinicalNotes.medicationReview.trim().length >= 20,
      description: 'Medication review notes (minimum 20 characters)'
    },
    {
      field: 'careCoordination',
      completed: clinicalNotes.careCoordination.trim().length >= 20,
      description: 'Care coordination activities (minimum 20 characters)'
    }
  ];

  // Check required fields
  const incompleteFields = requiredFields.filter(field => !field.completed);
  if (incompleteFields.length > 0) {
    errors.push(`Missing required documentation: ${incompleteFields.map(f => f.description).join(', ')}`);
  }

  // Check minimum time requirement
  if (timeSpent < requiredMinutes) {
    errors.push(`Insufficient time logged: ${timeSpent} minutes (minimum ${requiredMinutes} required)`);
  }

  // Check for warnings
  if (timeSpent > requiredMinutes * 2) {
    warnings.push('Time spent significantly exceeds typical range for this service');
  }

  const completedFields = requiredFields.filter(field => field.completed).length;
  const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercentage,
    requiredFields
  };
};

export const generateClinicalNotes = (stabilityMetrics: Record<string, string>): Partial<ClinicalNote> => {
  const generateStabilityAssessment = () => {
    const metrics = Object.entries(stabilityMetrics);
    const improved = metrics.filter(([_, value]) => value === 'improved').map(([key]) => key);
    const stable = metrics.filter(([_, value]) => value === 'stable').map(([key]) => key);
    const declined = metrics.filter(([_, value]) => value === 'declined').map(([key]) => key);

    let assessment = 'Monthly stability review completed. ';
    
    if (improved.length > 0) {
      assessment += `Improvements noted in: ${improved.join(', ')}. `;
    }
    
    if (stable.length > 0) {
      assessment += `Stable functioning observed in: ${stable.join(', ')}. `;
    }
    
    if (declined.length > 0) {
      assessment += `Areas of concern requiring attention: ${declined.join(', ')}. `;
    }

    return assessment + 'Patient demonstrates overall engagement in treatment process.';
  };

  const generateFunctionalStatus = () => {
    const functionalAreas = ['mood', 'sleep', 'functionality'];
    const functionalMetrics = functionalAreas
      .filter(area => stabilityMetrics[area])
      .map(area => `${area}: ${stabilityMetrics[area]}`);
    
    return `Functional assessment reveals: ${functionalMetrics.join(', ')}. Patient maintains baseline activities of daily living with ongoing support.`;
  };

  const generateRiskFactors = () => {
    const declined = Object.entries(stabilityMetrics)
      .filter(([_, value]) => value === 'declined')
      .map(([key]) => key);
    
    if (declined.length > 0) {
      return `Risk factors identified: ${declined.join(', ')} showing decline. Monitoring protocols activated.`;
    }
    
    return 'No acute risk factors identified. Standard monitoring protocols maintained.';
  };

  return {
    stabilityAssessment: generateStabilityAssessment(),
    functionalStatus: generateFunctionalStatus(),
    riskFactors: generateRiskFactors(),
    interventions: 'Continued evidence-based interventions per treatment plan. Cognitive behavioral techniques reinforced.',
    followUpPlan: 'Continue current treatment plan with monthly stability reviews. Next assessment scheduled in 4 weeks.',
    medicationReview: 'Current medications reviewed for effectiveness and adherence. No changes indicated at this time.',
    careCoordination: 'Coordinated care with primary care provider and mental health team. Communication plan maintained.'
  };
};
