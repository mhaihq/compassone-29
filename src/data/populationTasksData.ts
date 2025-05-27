
export interface PopulationTask {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  status: 'needs-review' | 'in-progress' | 'needs-qhp' | 'completed';
  assignedTo?: string;
  dueDate: string;
  taskType: string;
  triggeredBy?: string;
  callDate?: string;
}

export const populationTasksData: PopulationTask[] = [
  // Matteo Grassi - High Priority Hana-triggered insights matching his hypertension and depression
  {
    id: 'T-1001',
    title: 'Mental Health Monitoring',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
    priority: 'High',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-22'
  },
  {
    id: 'T-1002',
    title: 'Blood Pressure Elevated',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Recent reading 138/88 mmHg, above target range',
    priority: 'High',
    estimatedTime: '5 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Hypertension Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-22'
  },
  {
    id: 'T-1003',
    title: 'Medication Adherence Check',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Patient reports occasional missed doses of Lisinopril',
    priority: 'Medium',
    estimatedTime: '4 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Medication Adherence',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20'
  },
  {
    id: 'T-1004',
    title: 'Exercise Goals Not Met',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Only achieving 90 min/week vs target 150 min/week',
    priority: 'Medium',
    estimatedTime: '6 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Lifestyle Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20'
  },
  {
    id: 'T-MSR-001',
    title: 'Monthly Stability Review',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Comprehensive monthly assessment of mental health stability and care plan effectiveness',
    priority: 'Medium',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-05-30',
    taskType: 'Monthly Stability Review',
    triggeredBy: 'Scheduled Review',
    callDate: 'N/A'
  },

  // Other patients - Hana-triggered insights
  {
    id: 'T-2001',
    title: 'Anxiety Spike During Calls',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'GAD-7 indicators increased, mentions panic symptoms',
    priority: 'High',
    estimatedTime: '7 min',
    status: 'in-progress',
    assignedTo: 'Dr. Sarah Wilson',
    dueDate: '2025-05-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-23'
  },
  {
    id: 'T-2002',
    title: 'Social Isolation Pattern',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'Reports avoiding social activities for 2 weeks straight',
    priority: 'Medium',
    estimatedTime: '5 min',
    status: 'needs-review',
    dueDate: '2025-05-29',
    taskType: 'Behavioral Health',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-23'
  },
  {
    id: 'T-3001',
    title: 'Medication Side Effects Concern',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Reports dizziness and fatigue since mood stabilizer increase',
    priority: 'High',
    estimatedTime: '6 min',
    status: 'needs-qhp',
    dueDate: '2025-05-26',
    taskType: 'Medication Review',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-22'
  },
  {
    id: 'T-4001',
    title: 'PTSD Trigger Identification',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    description: 'Identified new workplace trigger affecting sleep and concentration',
    priority: 'Medium',
    estimatedTime: '7 min',
    status: 'in-progress',
    assignedTo: 'Dr. Michael Brown',
    dueDate: '2025-05-30',
    taskType: 'Trauma Response',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-21'
  },
  {
    id: 'T-5001',
    title: 'Therapy Engagement Drop',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    description: 'Missed last 2 therapy sessions, reports feeling "therapy fatigue"',
    priority: 'Medium',
    estimatedTime: '4 min',
    status: 'completed',
    assignedTo: 'Nurse Kelly',
    dueDate: '2025-05-25',
    taskType: 'Care Coordination',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20'
  }
];
