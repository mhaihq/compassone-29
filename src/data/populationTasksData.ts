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
  lastReviewDate?: string;
  reviewFrequency?: string;
  // Evidence data for Mental Health Alert tasks
  evidenceFromCall?: {
    text: string;
    timestamp: string;
    importance: 'high' | 'medium';
  }[];
  flagReason?: string;
  cptCode?: string;
  cptDescription?: string;
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
    callDate: '2025-05-22',
    flagReason: 'Patient expressed feelings of hopelessness and mentioned thoughts of self-harm during routine check-in call. Depression screening scores indicate severe symptoms requiring immediate clinical intervention.',
    cptCode: '99484',
    cptDescription: 'Behavioral Health Integration - Care management services',
    evidenceFromCall: [
      {
        text: "I've been feeling really hopeless lately... like nothing I do matters anymore",
        timestamp: "0:32",
        importance: "high"
      },
      {
        text: "Sometimes I think everyone would be better off without me",
        timestamp: "1:15",
        importance: "high"
      },
      {
        text: "I haven't been taking my medication consistently... maybe 3 times this week",
        timestamp: "2:03",
        importance: "medium"
      },
      {
        text: "I stopped going to therapy last month, it just felt pointless",
        timestamp: "2:45",
        importance: "medium"
      }
    ]
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

  // Monthly Stability Reviews - New Task Type
  {
    id: 'T-1005',
    title: 'Monthly Stability Review',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Routine monthly check-in for mental health stability assessment and care plan updates',
    priority: 'Low',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-05-30',
    taskType: 'Monthly Stability Review',
    triggeredBy: 'System',
    lastReviewDate: '2025-04-25',
    reviewFrequency: 'Monthly'
  },
  {
    id: 'T-6001',
    title: 'Monthly Stability Review',
    patientName: 'David Wilson',
    patientId: 'P100597',
    description: 'Routine assessment for anxiety management and medication adherence review',
    priority: 'Low',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Monthly Stability Review',
    triggeredBy: 'System',
    lastReviewDate: '2025-04-20',
    reviewFrequency: 'Monthly'
  },
  {
    id: 'T-7001',
    title: 'Monthly Stability Review',
    patientName: 'Lisa Anderson',
    patientId: 'P100598',
    description: 'Scheduled check for bipolar disorder stability and medication compliance',
    priority: 'Low',
    estimatedTime: '15 min',
    status: 'in-progress',
    assignedTo: 'Dr. Sarah Wilson',
    dueDate: '2025-05-29',
    taskType: 'Monthly Stability Review',
    triggeredBy: 'System',
    lastReviewDate: '2025-04-22',
    reviewFrequency: 'Monthly'
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
