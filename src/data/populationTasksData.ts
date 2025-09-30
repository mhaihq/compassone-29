
import { EnhancedPopulationTask } from '@/types/enhancedTask';

export type PopulationTask = EnhancedPopulationTask;

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
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-1001',
        timestamp: '2025-05-22T14:30:00Z',
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
    dueDate: '2025-05-27',
    taskType: 'Hypertension Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-22',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-1002',
        timestamp: '2025-05-22T10:15:00Z',
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
    dueDate: '2025-05-28',
    taskType: 'Medication Adherence',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: true,
    aiStatus: 'pending',
    auditLog: [
      {
        id: 'audit-1003',
        timestamp: '2025-05-20T16:45:00Z',
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
    dueDate: '2025-05-28',
    taskType: 'Lifestyle Management',
    triggeredBy: 'Hana AI Coach',
    callDate: '2025-05-20',
    module: 'Monitoring',
    channel: 'SMS',
    assignedToAI: true,
    aiStatus: 'completed',
    auditLog: [
      {
        id: 'audit-1004',
        timestamp: '2025-05-20T11:30:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Exercise goal tracking updated',
        outcome: 'success'
      },
      {
        id: 'audit-1004-2',
        timestamp: '2025-05-21T09:15:00Z',
        actor: 'AI Agent',
        actorType: 'AI',
        action: 'Motivational SMS sent to patient',
        outcome: 'success'
      }
    ]
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
    callDate: 'N/A',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-msr-001',
        timestamp: '2025-05-01T00:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Monthly review task auto-generated',
        outcome: 'success'
      }
    ]
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
    callDate: '2025-05-23',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-2001',
        timestamp: '2025-05-23T13:20:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Anxiety escalation detected',
        outcome: 'success'
      },
      {
        id: 'audit-2001-2',
        timestamp: '2025-05-23T14:00:00Z',
        actor: 'Dr. Sarah Wilson',
        actorType: 'Staff',
        action: 'Task assigned to clinician for review',
        outcome: 'success'
      }
    ]
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
    callDate: '2025-05-23',
    module: 'Coordination',
    channel: 'Email',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-2002',
        timestamp: '2025-05-23T15:45:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Social isolation pattern identified',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-2002',
        type: 'Follow-up',
        provider: 'Therapist Johnson',
        status: 'pending',
        notes: 'Schedule therapy session to address social withdrawal'
      }
    ]
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
    callDate: '2025-05-22',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-3001',
        timestamp: '2025-05-22T11:00:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Side effects reported during call',
        outcome: 'success'
      },
      {
        id: 'audit-3001-2',
        timestamp: '2025-05-22T11:30:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Escalated to QHP for medication review',
        outcome: 'success'
      }
    ]
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
    callDate: '2025-05-21',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-4001',
        timestamp: '2025-05-21T10:30:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'New PTSD trigger identified',
        outcome: 'success'
      },
      {
        id: 'audit-4001-2',
        timestamp: '2025-05-21T14:00:00Z',
        actor: 'Dr. Michael Brown',
        actorType: 'Staff',
        action: 'Began trauma-informed intervention planning',
        outcome: 'success'
      }
    ]
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
    callDate: '2025-05-20',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-5001',
        timestamp: '2025-05-20T09:00:00Z',
        actor: 'Hana AI Coach',
        actorType: 'AI',
        action: 'Therapy engagement concern detected',
        outcome: 'success'
      },
      {
        id: 'audit-5001-2',
        timestamp: '2025-05-24T13:00:00Z',
        actor: 'Nurse Kelly',
        actorType: 'Staff',
        action: 'Called patient, rescheduled therapy with different time slot',
        outcome: 'success'
      },
      {
        id: 'audit-5001-3',
        timestamp: '2025-05-25T10:00:00Z',
        actor: 'Patient',
        actorType: 'Patient',
        action: 'Attended rescheduled therapy session',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-5001',
        type: 'Follow-up',
        provider: 'Therapist Martinez',
        scheduledDate: '2025-05-25T10:00:00Z',
        status: 'completed',
        notes: 'Patient attended, re-engaged with treatment plan'
      }
    ]
  },
  {
    id: 'T-6001',
    title: 'Missing Insurance Card',
    patientName: 'Emily Carter',
    patientId: 'P100597',
    description: 'New patient enrollment blocked - insurance documentation incomplete',
    priority: 'High',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Documentation',
    triggeredBy: 'Intake Process',
    module: 'Intake',
    channel: 'Email',
    assignedToAI: true,
    aiStatus: 'in-progress',
    auditLog: [
      {
        id: 'audit-6001',
        timestamp: '2025-05-26T08:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Enrollment blocked due to missing documents',
        outcome: 'success'
      },
      {
        id: 'audit-6001-2',
        timestamp: '2025-05-26T09:00:00Z',
        actor: 'AI Agent',
        actorType: 'AI',
        action: 'Automated email sent requesting insurance card',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-6001-1',
        name: 'Insurance Card (Front)',
        type: 'insurance',
        status: 'missing'
      },
      {
        id: 'doc-6001-2',
        name: 'Insurance Card (Back)',
        type: 'insurance',
        status: 'missing'
      },
      {
        id: 'doc-6001-3',
        name: 'Consent Form',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-05-25'
      }
    ]
  },
  {
    id: 'T-6002',
    title: 'Consent Forms Pending',
    patientName: 'David Miller',
    patientId: 'P100598',
    description: 'Treatment consent and HIPAA authorization forms need signatures',
    priority: 'High',
    estimatedTime: '8 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Documentation',
    triggeredBy: 'Intake Process',
    module: 'Intake',
    channel: 'SMS',
    assignedToAI: true,
    aiStatus: 'pending',
    auditLog: [
      {
        id: 'audit-6002',
        timestamp: '2025-05-26T10:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Consent forms generated and sent',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-6002-1',
        name: 'Treatment Consent',
        type: 'consent',
        status: 'missing'
      },
      {
        id: 'doc-6002-2',
        name: 'HIPAA Authorization',
        type: 'consent',
        status: 'missing'
      },
      {
        id: 'doc-6002-3',
        name: 'Insurance Card',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-25'
      }
    ]
  },
  {
    id: 'T-6003',
    title: 'Initial Assessment Scheduling',
    patientName: 'Lisa Anderson',
    patientId: 'P100599',
    description: 'New patient needs initial psychiatric evaluation scheduled',
    priority: 'Medium',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-05-29',
    taskType: 'Scheduling',
    triggeredBy: 'Intake Process',
    module: 'Intake',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-6003',
        timestamp: '2025-05-26T14:00:00Z',
        actor: 'Intake Coordinator',
        actorType: 'Staff',
        action: 'Patient intake completed, ready for scheduling',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-6003-1',
        name: 'Insurance Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-6003-2',
        name: 'Consent Forms',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-05-26'
      }
    ]
  },
  {
    id: 'T-6004',
    title: 'Prior Authorization Required',
    patientName: 'Michael Foster',
    patientId: 'P100600',
    description: 'Insurance requires prior auth for BHI services',
    priority: 'High',
    estimatedTime: '15 min',
    status: 'in-progress',
    assignedTo: 'Billing Team',
    dueDate: '2025-05-28',
    taskType: 'Insurance',
    triggeredBy: 'Intake Process',
    module: 'Intake',
    channel: 'Email',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-6004',
        timestamp: '2025-05-26T11:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Prior auth requirement detected',
        outcome: 'success'
      },
      {
        id: 'audit-6004-2',
        timestamp: '2025-05-26T13:00:00Z',
        actor: 'Billing Team',
        actorType: 'Staff',
        action: 'Prior auth request submitted to insurance',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-6004-1',
        name: 'Prior Auth Form',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-26'
      }
    ]
  },
  {
    id: 'T-7001',
    title: 'Specialist Referral Needed',
    patientName: 'Jennifer White',
    patientId: 'P100601',
    description: 'Patient requires referral to addiction specialist',
    priority: 'High',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Referral',
    triggeredBy: 'Care Team',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-7001',
        timestamp: '2025-05-25T15:00:00Z',
        actor: 'Dr. Sarah Wilson',
        actorType: 'Staff',
        action: 'Referral request initiated',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-7001',
        type: 'Referral',
        provider: 'Addiction Specialist',
        status: 'pending',
        notes: 'Urgent referral for substance use disorder treatment'
      }
    ]
  },
  {
    id: 'T-7002',
    title: 'Lab Work Coordination',
    patientName: 'Thomas Baker',
    patientId: 'P100602',
    description: 'Schedule bloodwork before medication adjustment',
    priority: 'Medium',
    estimatedTime: '8 min',
    status: 'needs-review',
    dueDate: '2025-05-29',
    taskType: 'Lab Order',
    triggeredBy: 'Provider',
    module: 'Coordination',
    channel: 'Email',
    assignedToAI: true,
    aiStatus: 'pending',
    auditLog: [
      {
        id: 'audit-7002',
        timestamp: '2025-05-26T09:00:00Z',
        actor: 'Dr. Michael Brown',
        actorType: 'Staff',
        action: 'Lab order placed',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-7002',
        type: 'Procedure',
        provider: 'Quest Diagnostics',
        status: 'pending',
        notes: 'Metabolic panel required before lithium dose increase'
      }
    ]
  },
  {
    id: 'T-7003',
    title: 'Transportation Assistance',
    patientName: 'Patricia Green',
    patientId: 'P100603',
    description: 'Patient needs ride to group therapy sessions',
    priority: 'Medium',
    estimatedTime: '6 min',
    status: 'in-progress',
    assignedTo: 'Care Coordinator',
    dueDate: '2025-05-30',
    taskType: 'Resource',
    triggeredBy: 'Patient Request',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-7003',
        timestamp: '2025-05-26T10:30:00Z',
        actor: 'Patient',
        actorType: 'Patient',
        action: 'Transportation barrier reported',
        outcome: 'success'
      },
      {
        id: 'audit-7003-2',
        timestamp: '2025-05-26T14:00:00Z',
        actor: 'Care Coordinator',
        actorType: 'Staff',
        action: 'Contacted community transport services',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-7003',
        type: 'Follow-up',
        provider: 'Community Transport',
        status: 'pending',
        notes: 'Arrange weekly transportation for group therapy'
      }
    ]
  },
  {
    id: 'T-7004',
    title: 'Prescription Transfer',
    patientName: 'Kevin Martinez',
    patientId: 'P100604',
    description: 'Coordinate prescription transfer from previous provider',
    priority: 'High',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Medication',
    triggeredBy: 'Transition of Care',
    module: 'Coordination',
    channel: 'Email',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-7004',
        timestamp: '2025-05-26T08:30:00Z',
        actor: 'Nurse Kelly',
        actorType: 'Staff',
        action: 'Request sent to previous provider',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-7004',
        type: 'Follow-up',
        provider: 'Previous Psychiatrist',
        status: 'pending',
        notes: 'Obtain medication history and active prescriptions'
      }
    ]
  },
  {
    id: 'T-7005',
    title: 'Care Plan Update Meeting',
    patientName: 'Angela Davis',
    patientId: 'P100605',
    description: 'Schedule multidisciplinary team meeting for care plan review',
    priority: 'Medium',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2025-05-31',
    taskType: 'Care Planning',
    triggeredBy: 'Scheduled Review',
    module: 'Coordination',
    channel: 'Email',
    assignedToAI: false,
    aiStatus: null,
    auditLog: [
      {
        id: 'audit-7005',
        timestamp: '2025-05-26T12:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Quarterly care plan review due',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-7005',
        type: 'Follow-up',
        provider: 'Care Team',
        status: 'pending',
        notes: 'Review treatment progress and adjust care plan as needed'
      }
    ]
  }
];
