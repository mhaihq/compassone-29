
import { EnhancedPopulationTask } from '@/types/enhancedTask';

export type PopulationTask = EnhancedPopulationTask;

export const populationTasksData: PopulationTask[] = [
  // Assessment Intake Tasks
  {
    id: 'T-ADHD-INTAKE-001',
    title: 'ADHD Assessment Intake',
    patientName: 'Sarah Martinez',
    patientId: 'P-12345',
    description: 'Collect screening forms, consent, and baseline data for ADHD assessment',
    priority: 'High',
    estimatedTime: '15 min',
    status: 'needs-review',
    dueDate: '2025-09-25',
    taskType: 'Assessment Intake',
    triggeredBy: 'Intake Process',
    callDate: 'N/A',
    module: 'Intake',
    channel: 'Email',
    assignedToAI: true,
    aiStatus: 'pending',
    type: 'intake',
    subtype: 'adhd-assessment',
    auditLog: [
      {
        id: 'audit-adhd-intake-001',
        timestamp: '2025-09-24T09:00:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'ADHD assessment intake initiated',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-adhd-001',
        name: 'ADHD Screening Questionnaire',
        type: 'medical-history',
        status: 'pending'
      },
      {
        id: 'doc-adhd-002',
        name: 'Assessment Consent Form',
        type: 'consent',
        status: 'pending'
      },
      {
        id: 'doc-adhd-003',
        name: 'Insurance Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-09-24'
      },
      {
        id: 'doc-adhd-004',
        name: 'Baseline Behavioral Assessment',
        type: 'medical-history',
        status: 'missing'
      }
    ],
    billingOpportunities: [
      {
        id: 'opp-adhd-intake-001',
        title: 'ADHD Screening & Evaluation Package',
        description: 'Comprehensive ADHD assessment including intake, screening, and follow-up consultation',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 450,
        pricingModel: 'package',
        conversionLikelihood: 'high',
        reasoning: 'Patient seeking ADHD assessment with insurance coverage, high likelihood of completing full evaluation package',
        suggestedActions: [
          'Complete intake documentation',
          'Schedule assessment appointment',
          'Verify insurance coverage for psychological testing'
        ]
      }
    ]
  },
  {
    id: 'T-ALZ-INTAKE-001',
    title: "Alzheimer's Assessment Intake",
    patientName: 'Robert Thompson',
    patientId: 'P-67890',
    description: "Gather baseline cognitive screening and family history for Alzheimer's assessment",
    priority: 'High',
    estimatedTime: '18 min',
    status: 'in-progress',
    dueDate: '2025-09-26',
    taskType: 'Assessment Intake',
    triggeredBy: 'Intake Process',
    callDate: 'N/A',
    module: 'Intake',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    type: 'intake',
    subtype: 'alzheimer-assessment',
    auditLog: [
      {
        id: 'audit-alz-intake-001',
        timestamp: '2025-09-24T10:30:00Z',
        actor: 'Intake Coordinator',
        actorType: 'Staff',
        action: "Alzheimer's assessment intake initiated",
        outcome: 'success'
      },
      {
        id: 'audit-alz-intake-002',
        timestamp: '2025-09-25T14:00:00Z',
        actor: 'Intake Coordinator',
        actorType: 'Staff',
        action: 'Family contacted for medical history',
        details: 'Spoke with daughter regarding patient history',
        outcome: 'success'
      }
    ],
    intakeDocuments: [
      {
        id: 'doc-alz-001',
        name: 'Mini-Mental State Examination (MMSE)',
        type: 'medical-history',
        status: 'completed',
        uploadedDate: '2025-09-25'
      },
      {
        id: 'doc-alz-002',
        name: 'Cognitive Assessment Consent',
        type: 'consent',
        status: 'completed',
        uploadedDate: '2025-09-24'
      },
      {
        id: 'doc-alz-003',
        name: 'Family Medical History',
        type: 'medical-history',
        status: 'pending'
      },
      {
        id: 'doc-alz-004',
        name: 'Medicare Coverage Verification',
        type: 'insurance',
        status: 'completed',
        uploadedDate: '2025-09-24'
      },
      {
        id: 'doc-alz-005',
        name: 'Caregiver Information Form',
        type: 'other',
        status: 'pending'
      }
    ],
    billingOpportunities: [
      {
        id: 'opp-alz-intake-001',
        title: 'Comprehensive Memory Care Evaluation',
        description: 'Complete cognitive assessment package with follow-up care coordination',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 580,
        pricingModel: 'package',
        conversionLikelihood: 'high',
        reasoning: 'Family is actively engaged and seeking comprehensive evaluation, Medicare coverage confirmed',
        suggestedActions: [
          'Complete family history documentation',
          'Schedule comprehensive cognitive testing',
          'Coordinate with memory care specialist'
        ]
      }
    ]
  },
  // Assessment Review Tasks
  {
    id: 'T-ADHD-001',
    title: 'ADHD Assessment Review',
    patientName: 'Sarah Martinez',
    patientId: 'P-12345',
    description: 'Review completed ADHD assessment and approve for EHR submission',
    priority: 'Medium',
    estimatedTime: '10 min',
    status: 'needs-review',
    dueDate: '2025-09-30',
    taskType: 'Assessment Review',
    triggeredBy: 'Assessment Completion',
    callDate: 'N/A',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    type: 'assessment-review',
    subtype: 'adhd',
    auditLog: [
      {
        id: 'audit-adhd-001',
        timestamp: '2025-09-28T14:30:00Z',
        actor: 'System',
        actorType: 'System',
        action: 'ADHD assessment completed',
        outcome: 'success'
      }
    ],
    billingOpportunities: [
      {
        id: 'opp-adhd-001',
        title: 'Psychological Testing Evaluation',
        description: 'CPT 96130 - Psychological testing evaluation services',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 285,
        pricingModel: 'one-time',
        conversionLikelihood: 'high',
        reasoning: 'Comprehensive ADHD assessment completed, ready for billing submission',
        suggestedActions: [
          'Review and approve assessment',
          'Submit to EHR for documentation',
          'Schedule follow-up for treatment initiation'
        ]
      }
    ]
  },
  {
    id: 'T-ALZ-001',
    title: "Alzheimer's Assessment Review",
    patientName: 'Robert Thompson',
    patientId: 'P-67890',
    description: "Review completed Alzheimer's cognitive assessment and approve for EHR submission",
    priority: 'High',
    estimatedTime: '12 min',
    status: 'needs-review',
    dueDate: '2025-09-29',
    taskType: 'Assessment Review',
    triggeredBy: 'Assessment Completion',
    callDate: 'N/A',
    module: 'Monitoring',
    channel: 'Call',
    assignedToAI: false,
    aiStatus: null,
    type: 'assessment-review',
    subtype: 'alzheimer',
    auditLog: [
      {
        id: 'audit-alz-001',
        timestamp: '2025-09-28T10:15:00Z',
        actor: 'System',
        actorType: 'System',
        action: "Alzheimer's assessment completed",
        outcome: 'success'
      }
    ],
    billingOpportunities: [
      {
        id: 'opp-alz-001',
        title: 'Neurobehavioral Status Exam',
        description: 'CPT 96116 - Comprehensive cognitive assessment',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 340,
        pricingModel: 'one-time',
        conversionLikelihood: 'high',
        reasoning: 'Complete cognitive assessment for Alzheimer\'s evaluation, ready for billing',
        suggestedActions: [
          'Review cognitive assessment results',
          'Approve and submit to EHR',
          'Coordinate with memory care specialist'
        ]
      }
    ]
  },
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
    ],
    billingOpportunities: [
      {
        id: 'opp-1001-1',
        title: 'Premium Mental Health Support Package',
        description: 'Comprehensive mental health program including weekly check-ins, 24/7 crisis support, and medication optimization.',
        category: 'mental-health',
        priority: 'high',
        estimatedRevenue: 600,
        pricingModel: 'monthly',
        conversionLikelihood: 'high',
        reasoning: 'Patient is experiencing acute depression symptoms and would benefit from intensive support beyond standard care. High engagement history suggests strong conversion potential.',
        suggestedActions: [
          'Present during next clinical review appointment',
          'Emphasize 24/7 crisis support given current symptoms',
          'Offer first month at 20% discount to encourage enrollment'
        ]
      },
      {
        id: 'opp-1001-2',
        title: 'Stress Management Intensive Program',
        description: 'Personalized 8-week program addressing stress triggers with weekly coaching sessions.',
        category: 'wellness-prevention',
        priority: 'medium',
        estimatedRevenue: 400,
        pricingModel: 'package',
        conversionLikelihood: 'medium',
        reasoning: 'Depression often correlates with stress. Patient has multiple chronic conditions that could benefit from structured stress management.',
        suggestedActions: [
          'Bundle with mental health package for better value',
          'Share success stories from similar patients'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-1002-1',
        title: 'Home Blood Pressure Monitoring Program',
        description: 'Connected blood pressure monitor with daily tracking, trend analysis, and automated alerts to your care team.',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 180,
        pricingModel: 'monthly',
        conversionLikelihood: 'high',
        reasoning: 'Patient has elevated BP requiring close monitoring. Home monitoring program would provide better data for treatment optimization.',
        suggestedActions: [
          'Present as proactive solution to prevent complications',
          'Emphasize convenience of home monitoring',
          'Highlight potential to reduce in-person visits'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-1003-1',
        title: 'Medication Management Concierge Service',
        description: 'Home medication delivery, automated reminders, and monthly adherence coaching to ensure optimal medication compliance.',
        category: 'convenience',
        priority: 'high',
        estimatedRevenue: 150,
        pricingModel: 'monthly',
        conversionLikelihood: 'high',
        reasoning: 'Patient is already struggling with adherence. Convenience service would directly address the problem and improve health outcomes.',
        suggestedActions: [
          'Emphasize improved health outcomes and convenience',
          'Offer first month free trial to demonstrate value',
          'Highlight potential cost savings from preventing complications'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-1004-1',
        title: 'Personal Fitness Coaching Package',
        description: 'Virtual personal trainer with customized workout plans, weekly video sessions, and progress tracking to help reach exercise goals.',
        category: 'wellness-prevention',
        priority: 'medium',
        estimatedRevenue: 300,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Patient struggling to meet exercise goals. Personalized coaching would provide accountability and structure.',
        suggestedActions: [
          'Frame as investment in long-term health',
          'Offer 2-week trial to build engagement',
          'Share success stories from similar patients'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-msr-001-1',
        title: 'Advanced Mental Health Analytics Package',
        description: 'Comprehensive mental health tracking with AI-powered trend analysis, predictive alerts, and monthly detailed stability reports.',
        category: 'mental-health',
        priority: 'medium',
        estimatedRevenue: 450,
        pricingModel: 'monthly',
        conversionLikelihood: 'high',
        reasoning: 'Patient with depression history would benefit from proactive monitoring and data-driven insights to prevent future episodes.',
        suggestedActions: [
          'Present during stability review as proactive care enhancement',
          'Emphasize early warning system for mood changes',
          'Share data showing reduced hospitalization rates with tracking'
        ]
      },
      {
        id: 'opp-msr-001-2',
        title: 'Behavioral Health Concierge Service',
        description: 'Priority access to care team, same-day appointment availability, and dedicated care coordinator for mental health needs.',
        category: 'convenience',
        priority: 'medium',
        estimatedRevenue: 350,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Given ongoing mental health management needs, quick access to support can prevent crisis situations.',
        suggestedActions: [
          'Position as peace of mind for both patient and family',
          'Highlight reduced wait times and continuity of care'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-2001-1',
        title: 'Anxiety Mastery Program',
        description: 'Intensive 12-week anxiety management program with weekly therapy, breathing techniques training, and 24/7 text support.',
        category: 'mental-health',
        priority: 'high',
        estimatedRevenue: 800,
        pricingModel: 'package',
        conversionLikelihood: 'high',
        reasoning: 'Acute anxiety escalation indicates patient needs more intensive support than current care provides. Program directly addresses panic symptoms.',
        suggestedActions: [
          'Present immediately given high severity',
          'Emphasize panic symptom reduction success rates',
          'Offer payment plan for affordability'
        ]
      },
      {
        id: 'opp-2001-2',
        title: 'After-Hours Crisis Access',
        description: 'Priority access to crisis counselor during evenings and weekends when anxiety symptoms typically peak.',
        category: 'convenience',
        priority: 'medium',
        estimatedRevenue: 200,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Panic symptoms often occur outside business hours. Patient would benefit from knowing support is always available.',
        suggestedActions: [
          'Bundle with anxiety program for comprehensive care',
          'Share testimonials from patients with similar profiles'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-2002-1',
        title: 'Group Therapy & Social Skills Program',
        description: 'Structured group therapy sessions and social skills training to help overcome isolation patterns and build connections.',
        category: 'mental-health',
        priority: 'medium',
        estimatedRevenue: 350,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Social isolation is a key concern. Group therapy provides structured social interaction in a safe, therapeutic environment.',
        suggestedActions: [
          'Emphasize safe, supportive environment',
          'Highlight proven success with social anxiety',
          'Offer trial session to reduce commitment anxiety'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-3001-1',
        title: 'Medication Optimization & Genetic Testing',
        description: 'Comprehensive medication review with pharmacogenomic testing to identify optimal medications with minimal side effects.',
        category: 'specialized-wellness',
        priority: 'high',
        estimatedRevenue: 500,
        pricingModel: 'one-time',
        conversionLikelihood: 'high',
        reasoning: 'Patient experiencing significant side effects from current medication. Genetic testing would provide personalized insights to find better alternatives.',
        suggestedActions: [
          'Present as solution to current side effect problems',
          'Explain how testing prevents future medication trials',
          'Emphasize one-time cost with long-term benefits'
        ]
      },
      {
        id: 'opp-3001-2',
        title: 'Premium Medication Monitoring',
        description: 'Weekly medication check-ins with rapid adjustments and expedited provider access for side effect management.',
        category: 'specialized-wellness',
        priority: 'medium',
        estimatedRevenue: 250,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Close monitoring during medication changes could prevent prolonged side effects and improve outcomes.',
        suggestedActions: [
          'Position as safety net during medication adjustments',
          'Offer until stable on new medication'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-4001-1',
        title: 'EMDR Therapy Intensive Program',
        description: 'Specialized EMDR (Eye Movement Desensitization and Reprocessing) therapy for trauma processing with dedicated trauma therapist.',
        category: 'mental-health',
        priority: 'high',
        estimatedRevenue: 900,
        pricingModel: 'package',
        conversionLikelihood: 'high',
        reasoning: 'New PTSD trigger identified requiring specialized intervention. EMDR is evidence-based treatment for trauma processing.',
        suggestedActions: [
          'Present as specialized solution for workplace triggers',
          'Emphasize evidence-based effectiveness for PTSD',
          'Offer flexible scheduling around work commitments'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-5001-1',
        title: 'Flexible Therapy Scheduling Package',
        description: 'Priority scheduling with extended hours (evenings and weekends) and same-day appointment availability to prevent therapy fatigue.',
        category: 'convenience',
        priority: 'medium',
        estimatedRevenue: 200,
        pricingModel: 'monthly',
        conversionLikelihood: 'medium',
        reasoning: 'Patient experiencing therapy fatigue partially due to scheduling conflicts. Flexible scheduling would improve engagement.',
        suggestedActions: [
          'Present as solution to prevent future missed sessions',
          'Emphasize convenience and flexibility',
          'Offer trial month to demonstrate value'
        ]
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
    ],
    billingOpportunities: [
      {
        id: 'opp-6001-1',
        title: 'White Glove Onboarding Service',
        description: 'Dedicated enrollment specialist handles all paperwork, insurance verification, and appointment scheduling for seamless start to care.',
        category: 'convenience',
        priority: 'medium',
        estimatedRevenue: 150,
        pricingModel: 'one-time',
        conversionLikelihood: 'medium',
        reasoning: 'New patient struggling with enrollment paperwork. White glove service would reduce friction and ensure successful onboarding.',
        suggestedActions: [
          'Present as solution to current enrollment challenges',
          'Emphasize time savings and stress reduction',
          'Offer as one-time fee for hassle-free start'
        ]
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
