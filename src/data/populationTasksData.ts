
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
    callSummary: {
      duration: '18 min',
      overallTone: 'distressed',
      summary: 'Matteo called in for his scheduled check-in but quickly became emotional. He reported that his depression has worsened over the past week and that he has been struggling to get out of bed most mornings. He mentioned dark thoughts but denied active suicidal ideation. He has been inconsistently taking his antidepressant and cancelled his last therapy appointment. His reported PHQ-9 this call is estimated at 14–16.',
      topicsCovered: ['Depression symptoms', 'Medication adherence', 'Sleep quality', 'Therapy cancellation', 'Safety screening'],
      aiObservations: 'Tone markedly more flat than previous calls. Increased pausing and shorter responses. Patient minimized severity when asked follow-up questions. Flagged for immediate clinical review.',
      nextStepSuggested: 'Escalate to Dr. Kim for same-day review. Confirm safety plan in place.',
    },
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
    ],
    callSummary: {
      duration: '11 min',
      overallTone: 'neutral',
      summary: 'Routine monitoring call. Matteo reported his home BP readings have been running between 135–142 systolic over the past week, above his target of 130. He attributed this partly to work stress and admitted to forgetting his Lisinopril 2–3 times this week. He did not report any headaches, chest pain, or shortness of breath. He was cooperative and engaged.',
      topicsCovered: ['BP home readings', 'Medication adherence — Lisinopril', 'Stress and lifestyle factors', 'Symptoms screen (negative)'],
      aiObservations: 'Patient tone calm and cooperative. No red-flag symptoms reported. Adherence gap is the likely driver. Education on dose consistency provided.',
      nextStepSuggested: 'Clinician review of medication adherence. Consider pill reminder setup.',
    },
    evidenceFromCall: [
      {
        text: "I've been forgetting to take my Lisinopril some mornings when I'm rushing to work.",
        timestamp: '4:15',
        importance: 'high'
      },
      {
        text: 'My home readings have been around 135–142 over 85–90 lately.',
        timestamp: '6:30',
        importance: 'high'
      }
    ]
  },
  {
    id: 'T-1003',
    title: 'Medication Adherence — Lisinopril',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    description: 'Patient reports missing Lisinopril 2–3 times per week, contributing to elevated BP',
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
    ],
    callSummary: {
      duration: '9 min',
      overallTone: 'neutral',
      summary: 'Hana AI follow-up call focused on medication routine. Matteo confirmed he misses his Lisinopril roughly 2–3 mornings per week, typically on days he leaves for work early. He has not set up a phone reminder. He acknowledged the link between missed doses and his elevated BP readings. He seemed receptive to behavior change suggestions.',
      topicsCovered: ['Lisinopril adherence pattern', 'Morning routine barriers', 'Reminder strategies', 'Connection to BP control'],
      aiObservations: 'Patient openly acknowledged adherence gap — low defensiveness. Good candidate for reminder intervention. No other medication concerns raised.',
      nextStepSuggested: 'Set up medication reminder in patient portal. Re-check adherence at next call.',
    },
    evidenceFromCall: [
      {
        text: "I miss it maybe 2–3 times a week, usually when I'm rushing out the door early.",
        timestamp: '3:20',
        importance: 'high'
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
    ],
    callSummary: {
      duration: '7 min',
      overallTone: 'neutral',
      summary: 'SMS check-in with follow-up call. Matteo reported getting about 90 minutes of exercise per week, below his 150-minute target. He cited low motivation after work and busy weekends as main barriers. He expressed mild frustration but was not disengaged. He mentioned a friend who walks with him on Saturdays, which was his only consistent exercise.',
      topicsCovered: ['Weekly exercise volume', 'Barriers to activity', 'Motivational factors', 'Social support'],
      aiObservations: 'Patient is aware of the gap and not in denial. Social accountability (walking friend) is a positive lever. Evening fatigue post-work is the primary barrier to explore.',
      nextStepSuggested: 'Discuss breaking activity into shorter 10–15 min sessions. Explore adding a second walking day with friend.',
    },
    evidenceFromCall: [
      {
        text: "I only get about 90 minutes a week. I just don't have the energy after work.",
        timestamp: '2:45',
        importance: 'medium'
      },
      {
        text: 'My friend and I walk on Saturdays — that\'s pretty much the only time I go.',
        timestamp: '4:10',
        importance: 'medium'
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
