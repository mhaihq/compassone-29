
import { Script, ScriptCombination, MockAnalytics } from './followUpTypes';

export const DEFAULT_FOLLOW_UP_DATE = 'May 27, 2025';

export const FOLLOW_UP_ACTIONS = {
  CALL_NOW: 'call-now',
  AI_FOLLOW_UP: 'ai-followup',
  MANUAL_FOLLOW_UP: 'manual-followup',
  ESCALATE: 'escalate',
} as const;

export const CALL_PHASES = {
  PRE_CALL: 'pre-call',
  ACTIVE: 'active',
  POST_CALL: 'post-call',
} as const;

export const PRIORITY_COLORS = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
} as const;

export const availableScripts: Script[] = [
  {
    id: 'medication-reminder',
    title: 'Medication Reminder',
    description: 'Remind patient about medication schedule',
    category: 'medication'
  },
  {
    id: 'appointment-followup',
    title: 'Appointment Follow-up',
    description: 'Follow up on recent appointment',
    category: 'appointment'
  },
  {
    id: 'symptom-check',
    title: 'Symptom Check',
    description: 'Check on current symptoms and status',
    category: 'assessment'
  },
  {
    id: 'care-plan-review',
    title: 'Care Plan Review',
    description: 'Review and discuss care plan progress',
    category: 'review'
  }
];

export const suggestedCombinations: ScriptCombination[] = [
  {
    id: 'routine-checkup',
    label: 'Routine Check-up',
    scripts: ['symptom-check', 'medication-reminder'],
    description: 'Standard patient wellness check'
  },
  {
    id: 'post-appointment',
    label: 'Post-Appointment',
    scripts: ['appointment-followup', 'care-plan-review'],
    description: 'Follow-up after clinical visit'
  },
  {
    id: 'medication-focus',
    label: 'Medication Focus',
    scripts: ['medication-reminder'],
    description: 'Focused medication adherence check'
  }
];

export const mockAnalytics: MockAnalytics = {
  callEfficiency: 94,
  patientSatisfaction: 89,
  clinicalObjectivesAchieved: 92,
  aiAssistanceUtilization: 87,
  protocolAdherence: 96,
  timeAllocation: {
    assessment: 35,
    intervention: 40,
    planning: 20,
    documentation: 5
  },
  comparisonToBaseline: {
    averageCallDuration: '12:45 avg',
    patientEngagement: 89,
    outcomesAchieved: 92
  }
};

export const DEFAULT_TASK_CONTEXT = {
  taskId: 'demo-task-001',
  taskTitle: 'Monthly Stability Review',
  taskType: 'Monthly Stability Review',
  patientId: 'PAT-001',
  patientName: 'Sarah Johnson',
  priority: 'Medium' as const,
  dueDate: '2025-06-07',
  assignedTo: 'Dr. Smith',
  status: 'in_progress'
};
