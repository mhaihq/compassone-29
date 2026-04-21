
import { CareTask, CptCodeData, CptCodeInfo } from './types';

// CPT code data with descriptions
export const cptCodeInfo: Record<string, CptCodeInfo> = {
  '99490': {
    description: 'CCM — Non-complex',
    requirements: '2+ chronic conditions, 20 min/month, non-physician staff',
    rateInfo: 'Medicare: ~$42/month'
  },
  '99439': {
    description: 'CCM — Non-complex add-on (each additional 20 min)',
    requirements: 'Billed with 99490; each additional 20 min block',
    rateInfo: 'Medicare: ~$38/add-on'
  },
  '99491': {
    description: 'CCM — Physician/QHP direct care, 30 min',
    requirements: 'Physician or QHP provides ≥30 min directly',
    rateInfo: 'Medicare: ~$84/month'
  },
  '99487': {
    description: 'CCM — Complex, 60 min',
    requirements: '2+ chronic conditions, moderate/high complexity, 60 min/month',
    rateInfo: 'Medicare: ~$92/month'
  },
  '99489': {
    description: 'CCM — Complex add-on (each additional 30 min)',
    requirements: 'Billed with 99487; each additional 30 min block',
    rateInfo: 'Medicare: ~$45/add-on'
  },
  'G0506': {
    description: 'CCM — Initiating visit (comprehensive assessment)',
    requirements: 'First CCM month only; face-to-face or telehealth',
    rateInfo: 'Medicare: ~$64 (one-time)'
  },
  'G0556': {
    description: 'APCM — Level I (low complexity)',
    requirements: 'Low-complexity APCM patient; any time spent',
    rateInfo: 'Medicare: ~$15/month'
  },
  'G0557': {
    description: 'APCM — Level II (moderate complexity)',
    requirements: 'Moderate-complexity APCM patient; any time spent',
    rateInfo: 'Medicare: ~$50/month'
  },
  'G0558': {
    description: 'APCM — Level III (high complexity / multiple conditions)',
    requirements: 'High-complexity or ≥2 chronic conditions; any time spent',
    rateInfo: 'Medicare: ~$110/month'
  },
  'G0568': {
    description: 'APCM — Level I add-on (30 min physician)',
    requirements: 'Billed with G0556; ≥30 min physician/QHP time',
    rateInfo: 'Medicare: ~$65/add-on'
  },
  'G0569': {
    description: 'APCM — Level II add-on (30 min physician)',
    requirements: 'Billed with G0557; ≥30 min physician/QHP time',
    rateInfo: 'Medicare: ~$65/add-on'
  },
  'G0570': {
    description: 'APCM — Level III add-on (30 min physician)',
    requirements: 'Billed with G0558; ≥30 min physician/QHP time',
    rateInfo: 'Medicare: ~$65/add-on'
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
      status: 'urgent',
      evidenceFromCall: [
        {
          text: "I've been forgetting to take my blood pressure medication some mornings when I'm rushing to work.",
          timestamp: "2:15",
          importance: "high"
        },
        {
          text: "My home readings have been around 135-140 over 85-90 lately.",
          timestamp: "4:30",
          importance: "high"
        }
      ],
      audioUrl: "#",
      transcript: "AI: How has your blood pressure been this week?\nPatient: I've been forgetting to take my blood pressure medication some mornings when I'm rushing to work.\nAI: That's concerning. What have your home readings been?\nPatient: My home readings have been around 135-140 over 85-90 lately. I know it's higher than it should be.",
      suggestedActions: [
        { id: 'action-1', text: 'Review medication timing and set up reminders', default: true },
        { id: 'action-2', text: 'Schedule blood pressure recheck in 1 week', default: true },
        { id: 'action-3', text: 'Discuss lifestyle modifications (diet, exercise, stress)', default: false }
      ]
    },
    {
      id: 'T-1003', 
      title: 'Medication Adherence Check',
      description: 'Patient reports occasional missed doses of Lisinopril',
      category: 'Medication',
      categoryColor: 'yellow',
      minutes: 4,
      insight: 'Reported during Hana call on May 20 - affecting BP control',
      status: 'pending',
      evidenceFromCall: [
        {
          text: "Sometimes I forget to take my Lisinopril in the morning, especially on busy days.",
          timestamp: "1:30",
          importance: "medium"
        },
        {
          text: "I'd say I miss it maybe 2-3 times a week.",
          timestamp: "3:45",
          importance: "high"
        }
      ],
      audioUrl: "#",
      transcript: "AI: How consistent are you with taking your Lisinopril?\nPatient: Sometimes I forget to take my Lisinopril in the morning, especially on busy days.\nAI: Can you estimate how often this happens?\nPatient: I'd say I miss it maybe 2-3 times a week.",
      suggestedActions: [
        { id: 'action-1', text: 'Set up medication reminders on phone', default: true },
        { id: 'action-2', text: 'Use pill organizer for weekly tracking', default: true },
        { id: 'action-3', text: 'Review importance of consistent dosing', default: false }
      ]
    },
    {
      id: 'T-1004',
      title: 'Exercise Goals Not Met',
      description: 'Only achieving 90 min/week vs target 150 min/week',
      category: 'Assessment',
      categoryColor: 'green',
      minutes: 6,
      insight: 'Mentioned during Hana call - motivation and time management issues',
      status: 'pending',
      evidenceFromCall: [
        {
          text: "I'm only getting about 90 minutes of exercise per week instead of the 150 we talked about.",
          timestamp: "5:20",
          importance: "medium"
        },
        {
          text: "I just don't have the motivation after work, and weekends fill up fast.",
          timestamp: "6:15",
          importance: "medium"
        }
      ],
      audioUrl: "#",
      transcript: "AI: How are you doing with your exercise goals?\nPatient: I'm only getting about 90 minutes of exercise per week instead of the 150 we talked about.\nAI: What do you think is getting in the way?\nPatient: I just don't have the motivation after work, and weekends fill up fast.",
      suggestedActions: [
        { id: 'action-1', text: 'Break exercise into 10-15 minute sessions', default: true },
        { id: 'action-2', text: 'Schedule specific exercise times in calendar', default: true },
        { id: 'action-3', text: 'Find accountability partner or join group activity', default: false }
      ]
    }
  ],
  '99491': [
    {
      id: 'T-1001',
      title: 'Comorbid Depression — Physician Review',
      description: 'Depression symptoms worsening; physician direct review required (CCM 99491)',
      category: 'Mental-health',
      categoryColor: 'pink',
      minutes: 12,
      insight: 'High Alert triggered by Hana AI Coach — immediate clinical review required',
      status: 'urgent',
      evidenceFromCall: [
        {
          text: "My depression has gotten significantly worse over the past week. I'm having trouble getting out of bed.",
          timestamp: "2:45",
          importance: "high"
        },
        {
          text: "I haven't been taking my antidepressant regularly because I don't think it's working anymore.",
          timestamp: "4:15",
          importance: "high"
        }
      ],
      audioUrl: "#",
      transcript: "AI: How have you been feeling since our last check-in?\nPatient: My depression has gotten significantly worse. I'm having trouble getting out of bed.\nAI: Can you tell me more about your medication?\nPatient: I haven't been taking my antidepressant regularly because I don't think it's working anymore.",
      suggestedActions: [
        { id: 'action-1', text: 'Physician-direct review of depression management plan', default: true },
        { id: 'action-2', text: 'Reassess antidepressant efficacy and adherence', default: true },
        { id: 'action-3', text: 'Coordinate urgent therapy session within 48 hours', default: true },
        { id: 'action-4', text: 'Safety screening (PHQ-9)', default: true }
      ]
    },
    {
      id: 'T-MSR-001',
      title: 'Monthly CCM Stability Review',
      description: 'Physician-led monthly assessment of chronic condition stability and care plan effectiveness',
      category: 'Monthly-review',
      categoryColor: 'purple',
      minutes: 15,
      insight: 'Scheduled monthly review — physician/QHP must document ≥30 min for 99491',
      status: 'pending',
      taskType: 'monthly-stability-review'
    }
  ]
};

export const totalRequiredMinutes: Record<string, number> = {
  '99490': 20,
  '99439': 20,
  '99491': 30,
  '99487': 60,
  '99489': 30,
  'G0556': 0,
  'G0557': 0,
  'G0558': 0
};

export const completedMinutes: Record<string, number> = {
  '99490': 8,
  '99439': 0,
  '99491': 0,
  '99487': 0
};
