
import { Script, ScriptCombination } from './types';

export const availableScripts: Script[] = [
  {
    id: 'medication-reminder',
    title: 'Medication Reminder',
    description: 'Remind patient about medication schedule'
  },
  {
    id: 'appointment-followup',
    title: 'Appointment Follow-up',
    description: 'Follow up on recent appointment'
  },
  {
    id: 'symptom-check',
    title: 'Symptom Check',
    description: 'Check on current symptoms and status'
  },
  {
    id: 'care-plan-review',
    title: 'Care Plan Review',
    description: 'Review and discuss care plan progress'
  }
];

export const suggestedCombinations: ScriptCombination[] = [
  {
    id: 'routine-checkup',
    label: 'Routine Check-up',
    scripts: ['symptom-check', 'medication-reminder']
  },
  {
    id: 'post-appointment',
    label: 'Post-Appointment',
    scripts: ['appointment-followup', 'care-plan-review']
  },
  {
    id: 'medication-focus',
    label: 'Medication Focus',
    scripts: ['medication-reminder']
  }
];
