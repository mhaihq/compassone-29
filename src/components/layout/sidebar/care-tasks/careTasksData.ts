
import { CareTask, CptCodeData, CptCodeInfo } from './types';

// CPT code data with descriptions
export const cptCodeInfo: Record<string, CptCodeInfo> = {
  '99490': {
    description: 'Chronic Care Management',
    requirements: '2+ chronic conditions, 20 min/month',
    rateInfo: 'Medicare: ~$42/month'
  },
  '99484': {
    description: 'Behavioral Health Integration',
    requirements: 'Mental/behavioral condition, 20 min/month',
    rateInfo: 'Medicare: ~$48/month'
  }
};

// Task data grouped by CPT codes - matching population tasks for Matteo Grassi
export const careTasksData: CptCodeData = {
  '99490': [
    {
      id: 'T-1002',
      title: 'Blood Pressure Elevated',
      description: 'Recent reading 138/88 mmHg, above target range',
      category: 'Vitals',
      categoryColor: 'blue',
      minutes: 5,
      insight: 'Flagged by Hana AI Coach during May 22 call - need medication adjustment review',
      status: 'urgent'
    },
    {
      id: 'T-1003', 
      title: 'Medication Adherence Check',
      description: 'Patient reports occasional missed doses of Lisinopril',
      category: 'Medication',
      categoryColor: 'yellow',
      minutes: 4,
      insight: 'Reported during Hana call on May 20 - affecting BP control',
      status: 'pending'
    },
    {
      id: 'T-1004',
      title: 'Exercise Goals Not Met',
      description: 'Only achieving 90 min/week vs target 150 min/week',
      category: 'Assessment',
      categoryColor: 'green',
      minutes: 6,
      insight: 'Mentioned during Hana call - motivation and time management issues',
      status: 'pending'
    }
  ],
  '99484': [
    {
      id: 'T-1001',
      title: 'Mental Health Monitoring',
      description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
      category: 'Mental-health',
      categoryColor: 'pink',
      minutes: 12,
      insight: 'High Alert triggered by Hana AI Coach - immediate clinical review required for depression management',
      status: 'urgent'
    },
    {
      id: 'T-1005',
      title: 'Monthly Stability Review',
      description: 'Routine monthly check-in for mental health stability assessment and care plan updates',
      category: 'Monthly Review',
      categoryColor: 'purple',
      minutes: 15,
      insight: 'Scheduled compliance review for BHI billing - last review 04/25, due monthly for ongoing care coordination',
      status: 'pending'
    }
  ]
};

export const totalRequiredMinutes = {
  '99490': 20,
  '99484': 20
};

export const completedMinutes = {
  '99490': 8,
  '99484': 5
};
