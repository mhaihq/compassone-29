import { EnhancedPopulationTask } from '@/types/enhancedTask';

export type PopulationTask = EnhancedPopulationTask;

export const populationTasksData: PopulationTask[] = [
  // Intake Tasks
  {
    id: 'T-INT-001',
    title: 'Intake Complete – Review & Push',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'AI completed all intake fields, waiting for staff confirmation and EHR push',
    priority: 'Medium',
    estimatedTime: '8 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Intake Review',
    triggeredBy: 'AI Intake Agent',
    module: 'Intake',
    channel: 'Email',
    assignedToAI: true,
    aiStatus: 'completed',
    auditLog: [
      {
        id: 'audit-int-001-1',
        timestamp: '2025-05-26T09:15:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Completed all intake field collection via automated forms',
        outcome: 'success'
      },
      {
        id: 'audit-int-001-2',
        timestamp: '2025-05-26T09:20:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Verified patient demographics and insurance information',
        outcome: 'success'
      },
      {
        id: 'audit-int-001-3',
        timestamp: '2025-05-26T09:25:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Awaiting staff review before EHR writeback',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-int-001-1',
        name: 'Patient Demographics',
        type: 'other',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-int-001-2',
        name: 'Insurance Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-int-001-3',
        name: 'Medical History',
        type: 'medical-history',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-int-001-4',
        name: 'Consent Forms',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-05-26'
      }
    ]
  },
  {
    id: 'T-INT-002',
    title: 'Resolve Intake Blocker – Insurance Invalid',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    description: 'Insurance card unreadable, AI failed verification, patient confirmation needed',
    priority: 'High',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Insurance Verification',
    triggeredBy: 'AI Intake Agent',
    module: 'Intake',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: 'failed',
    auditLog: [
      {
        id: 'audit-int-002-1',
        timestamp: '2025-05-25T14:30:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Attempted OCR scan of insurance card',
        outcome: 'failure',
        details: 'Image quality too low, card details unreadable'
      },
      {
        id: 'audit-int-002-2',
        timestamp: '2025-05-25T14:35:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Sent automated request for higher quality image',
        outcome: 'success'
      },
      {
        id: 'audit-int-002-3',
        timestamp: '2025-05-26T08:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Escalated to staff - no patient response after 24h',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-int-002-1',
        name: 'Insurance Card (Front)',
        type: 'insurance',
        status: 'pending',
        uploadedDate: '2025-05-25'
      },
      {
        id: 'doc-int-002-2',
        name: 'Insurance Card (Back)',
        type: 'insurance',
        status: 'missing'
      },
      {
        id: 'doc-int-002-3',
        name: 'Consent Forms',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-05-25'
      }
    ]
  },
  {
    id: 'T-INT-003',
    title: 'Resolve Intake Blocker – Consent Missing',
    patientName: 'David Martinez',
    patientId: 'P100598',
    description: 'Patient completed forms but digital consent signature not captured',
    priority: 'High',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Consent Collection',
    triggeredBy: 'AI Intake Agent',
    module: 'Intake',
    channel: 'SMS',
    assignedToAI: false,
    aiStatus: 'failed',
    auditLog: [
      {
        id: 'audit-int-003-1',
        timestamp: '2025-05-26T11:00:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Sent digital consent form via secure link',
        outcome: 'success'
      },
      {
        id: 'audit-int-003-2',
        timestamp: '2025-05-26T11:30:00Z',
        actor: 'Patient',
        actorType: 'Patient',
        action: 'Opened form and completed all fields',
        outcome: 'success'
      },
      {
        id: 'audit-int-003-3',
        timestamp: '2025-05-26T11:32:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Signature submission failed - technical error',
        outcome: 'failure',
        details: 'Browser compatibility issue with signature pad'
      },
      {
        id: 'audit-int-003-4',
        timestamp: '2025-05-26T12:00:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Sent SMS with alternative signature method',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-int-003-1',
        name: 'Treatment Consent',
        type: 'consent',
        status: 'pending'
      },
      {
        id: 'doc-int-003-2',
        name: 'HIPAA Authorization',
        type: 'consent',
        status: 'pending'
      },
      {
        id: 'doc-int-003-3',
        name: 'Insurance Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-25'
      },
      {
        id: 'doc-int-003-4',
        name: 'Medical History',
        type: 'medical-history',
        status: 'completed',
        uploadedDate: '2025-05-26'
      }
    ]
  },
  {
    id: 'T-INT-004',
    title: 'EHR Writeback Failure',
    patientName: 'Emma Williams',
    patientId: 'P100600',
    description: 'AI completed intake but EHR rejected coverage resource, retry required',
    priority: 'Medium',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'EHR Integration',
    triggeredBy: 'AI Intake Agent',
    module: 'Intake',
    channel: 'Email',
    assignedToAI: false,
    aiStatus: 'failed',
    auditLog: [
      {
        id: 'audit-int-004-1',
        timestamp: '2025-05-26T10:00:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Completed patient intake data collection',
        outcome: 'success'
      },
      {
        id: 'audit-int-004-2',
        timestamp: '2025-05-26T10:05:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Attempted EHR writeback via FHIR API',
        outcome: 'failure',
        details: 'Coverage resource rejected - invalid payer reference'
      },
      {
        id: 'audit-int-004-3',
        timestamp: '2025-05-26T10:10:00Z',
        actor: 'AI Intake Agent',
        actorType: 'AI',
        action: 'Retry attempt with corrected payer ID',
        outcome: 'failure',
        details: 'EHR validation error - coverage period mismatch'
      },
      {
        id: 'audit-int-004-4',
        timestamp: '2025-05-26T10:15:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Escalated to staff for manual review',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-int-004-1',
        name: 'Patient Demographics',
        type: 'other',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-int-004-2',
        name: 'Insurance Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-05-26'
      },
      {
        id: 'doc-int-004-3',
        name: 'Consent Forms',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-05-26'
      }
    ]
  },

  // Coordination Tasks
  {
    id: 'T-COORD-001',
    title: 'No-Show: Action Needed',
    patientName: 'James Thompson',
    patientId: 'P100593',
    description: 'Missed appointment today, AI unable to finalize reschedule or fee handling',
    priority: 'High',
    estimatedTime: '20 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'No-Show Management',
    triggeredBy: 'AI Coordination Agent',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: 'failed',
    auditLog: [
      {
        id: 'audit-coord-001-1',
        timestamp: '2025-05-26T09:15:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'No-show detected for 9:00 AM appointment',
        outcome: 'success'
      },
      {
        id: 'audit-coord-001-2',
        timestamp: '2025-05-26T09:30:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Attempted automated outreach via SMS',
        outcome: 'success'
      },
      {
        id: 'audit-coord-001-3',
        timestamp: '2025-05-26T10:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Patient responded, attempted to reschedule',
        outcome: 'failure',
        details: 'No available slots match patient preferences'
      },
      {
        id: 'audit-coord-001-4',
        timestamp: '2025-05-26T10:15:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Attempted to apply no-show fee per policy',
        outcome: 'failure',
        details: 'Patient requested fee waiver, requires staff approval'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-coord-001-1',
        type: 'Initial Consultation',
        provider: 'Dr. Sarah Wilson',
        scheduledDate: '2025-05-26T09:00:00Z',
        status: 'cancelled',
        notes: 'Patient no-show, attempted reschedule unsuccessful'
      }
    ]
  },
  {
    id: 'T-COORD-002',
    title: 'Late Cancellation – Backfill Slot',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    description: 'Patient cancelled <24h, AI could not fill from waitlist, slot open for action',
    priority: 'Medium',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-05-27',
    taskType: 'Schedule Optimization',
    triggeredBy: 'AI Coordination Agent',
    module: 'Coordination',
    channel: 'SMS',
    assignedToAI: false,
    aiStatus: 'failed',
    auditLog: [
      {
        id: 'audit-coord-002-1',
        timestamp: '2025-05-26T15:30:00Z',
        actor: 'Patient',
        actorType: 'Patient',
        action: 'Cancelled appointment scheduled for 2025-05-27 10:00 AM',
        outcome: 'success'
      },
      {
        id: 'audit-coord-002-2',
        timestamp: '2025-05-26T15:32:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Late cancellation detected (<24h notice)',
        outcome: 'success'
      },
      {
        id: 'audit-coord-002-3',
        timestamp: '2025-05-26T15:35:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Searched waitlist for available patients',
        outcome: 'success',
        details: 'Found 3 waitlisted patients'
      },
      {
        id: 'audit-coord-002-4',
        timestamp: '2025-05-26T15:40:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Sent automated offers to waitlisted patients',
        outcome: 'failure',
        details: 'All 3 patients unable to accept short-notice appointment'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-coord-002-1',
        type: 'Follow-up',
        provider: 'Therapist Martinez',
        scheduledDate: '2025-05-27T10:00:00Z',
        status: 'cancelled',
        notes: 'Late cancellation, slot still available'
      }
    ]
  },
  {
    id: 'T-COORD-003',
    title: 'Referral Loop Open',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    description: 'Referral sent 5 days ago, no specialist appointment confirmed, report outstanding',
    priority: 'Medium',
    estimatedTime: '18 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Referral Management',
    triggeredBy: 'AI Coordination Agent',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: 'in-progress',
    auditLog: [
      {
        id: 'audit-coord-003-1',
        timestamp: '2025-05-21T11:00:00Z',
        actor: 'Dr. Michael Brown',
        actorType: 'Staff',
        action: 'Created referral to cardiology specialist',
        outcome: 'success'
      },
      {
        id: 'audit-coord-003-2',
        timestamp: '2025-05-21T11:15:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Sent referral documentation to specialist office',
        outcome: 'success'
      },
      {
        id: 'audit-coord-003-3',
        timestamp: '2025-05-23T09:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Follow-up check: No appointment scheduled yet',
        outcome: 'success'
      },
      {
        id: 'audit-coord-003-4',
        timestamp: '2025-05-24T14:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Automated reminder sent to specialist office',
        outcome: 'success'
      },
      {
        id: 'audit-coord-003-5',
        timestamp: '2025-05-26T10:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Escalated to staff - 5 days without confirmation',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-coord-003-1',
        type: 'Referral',
        provider: 'Dr. James Cardiology Specialist',
        status: 'pending',
        notes: 'Referral sent 5 days ago, awaiting specialist appointment confirmation'
      }
    ]
  },
  {
    id: 'T-COORD-004',
    title: 'Therapy Engagement Drop',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    description: 'Missed 2 sessions, AI flagged engagement risk, outreach incomplete',
    priority: 'Medium',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-05-28',
    taskType: 'Care Engagement',
    triggeredBy: 'AI Coordination Agent',
    module: 'Coordination',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: 'in-progress',
    auditLog: [
      {
        id: 'audit-coord-004-1',
        timestamp: '2025-05-20T09:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'First therapy session missed',
        outcome: 'success'
      },
      {
        id: 'audit-coord-004-2',
        timestamp: '2025-05-20T10:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Sent automated follow-up SMS',
        outcome: 'success'
      },
      {
        id: 'audit-coord-004-3',
        timestamp: '2025-05-23T09:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Second therapy session missed',
        outcome: 'success'
      },
      {
        id: 'audit-coord-004-4',
        timestamp: '2025-05-23T11:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Engagement risk flagged, attempted phone outreach',
        outcome: 'failure',
        details: 'No answer, left voicemail'
      },
      {
        id: 'audit-coord-004-5',
        timestamp: '2025-05-24T14:00:00Z',
        actor: 'AI Coordination Agent',
        actorType: 'AI',
        action: 'Follow-up email sent with re-engagement resources',
        outcome: 'success'
      },
      {
        id: 'audit-coord-004-6',
        timestamp: '2025-05-26T09:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'Escalated to care coordinator - no patient response',
        outcome: 'success'
      }
    ],
    coordinationAppointments: [
      {
        id: 'appt-coord-004-1',
        type: 'Follow-up',
        provider: 'Therapist Martinez',
        scheduledDate: '2025-05-20T14:00:00Z',
        status: 'cancelled',
        notes: 'Patient no-show'
      },
      {
        id: 'appt-coord-004-2',
        type: 'Follow-up',
        provider: 'Therapist Martinez',
        scheduledDate: '2025-05-23T14:00:00Z',
        status: 'cancelled',
        notes: 'Patient no-show, engagement concern'
      }
    ]
  }
];
