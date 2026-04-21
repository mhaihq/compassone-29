
import { EnhancedPopulationTask } from '@/types/enhancedTask';

export type PopulationTask = EnhancedPopulationTask;

export const populationTasksData: PopulationTask[] = [
  // Matteo Grassi — full CCM picture
  {
    id: 'T-1001',
    title: 'Mental Health Monitoring',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
    priority: 'High',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2026-04-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-22',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-1001',
        timestamp: '2026-04-22T14:30:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Depression symptoms detected during routine call',
        outcome: 'success'
      }
    ],
    evidenceFromCall: [
      {
        text: 'Patient expressed feeling hopeless about future',
        timestamp: '14:32',
        importance: 'high'
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
    dueDate: '2026-04-27',
    taskType: 'Hypertension Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-22',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-1002',
        timestamp: '2026-04-22T10:15:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Elevated BP reading captured',
        outcome: 'success'
      }
    ]
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
    dueDate: '2026-04-28',
    taskType: 'Medication Adherence',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-20',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: true,
    aiStatus: 'pending',
    auditLog: [
      {
        id: 'audit-1003',
        timestamp: '2026-04-20T16:45:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Adherence concern identified',
        outcome: 'success'
      }
    ]
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
    dueDate: '2026-04-28',
    taskType: 'Lifestyle Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-20',
    module: 'Monitoring',
    channel: 'SMS',
    assignedToAI: true,
    aiStatus: 'completed',
    auditLog: [
      {
        id: 'audit-1004',
        timestamp: '2026-04-20T11:30:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Exercise goal tracking updated',
        outcome: 'success'
      }
    ]
  },
  {
    id: 'T-MSR-001',
    title: 'Monthly CCM Review',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Comprehensive monthly CCM review: chronic condition status, care plan updates, and billing readiness',
    priority: 'Medium',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2026-04-30',
    taskType: 'Monthly CCM Review',
    triggeredBy: 'Scheduled Review',
    callDate: 'N/A',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-msr-001',
        timestamp: '2026-04-01T00:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Monthly CCM review task auto-generated',
        outcome: 'success'
      }
    ]
  },

  // James Thompson — acute mental-health monitoring
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
    dueDate: '2026-04-27',
    taskType: 'Mental Health Alert',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-23',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-2001',
        timestamp: '2026-04-23T13:20:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Anxiety escalation detected',
        outcome: 'success'
      }
    ]
  },

  // Maria Rodriguez — medication management + monthly review
  {
    id: 'T-3001',
    title: 'Medication Side Effects Concern',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Reports dizziness and fatigue since mood stabilizer increase',
    priority: 'High',
    estimatedTime: '6 min',
    status: 'needs-qhp',
    dueDate: '2026-04-26',
    taskType: 'Medication Review',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-22',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-3001',
        timestamp: '2026-04-22T11:00:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Side effects reported during call',
        outcome: 'success'
      }
    ]
  },
  {
    id: 'T-MSR-002',
    title: 'Monthly CCM Review',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Monthly CCM review: medication response, chronic condition status, and care plan updates',
    priority: 'Medium',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2026-04-30',
    taskType: 'Monthly CCM Review',
    triggeredBy: 'Scheduled Review',
    callDate: 'N/A',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-msr-002',
        timestamp: '2026-04-01T00:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Monthly CCM review task auto-generated',
        outcome: 'success'
      }
    ]
  },

  // Robert Chen — trauma monitoring
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
    dueDate: '2026-04-30',
    taskType: 'Trauma Response',
    triggeredBy: 'Hana AI Coach',
    callDate: '2026-04-21',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-4001',
        timestamp: '2026-04-21T10:30:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'New PTSD trigger identified',
        outcome: 'success'
      }
    ]
  }
];
