
import { CareTask, CptCodeData, CptCodeInfo } from './types';

// CPT code data with descriptions
export const cptCodeInfo: Record<string, CptCodeInfo> = {
  '99490': {
    description: 'Chronic Care Management',
    requirements: '2+ chronic conditions, 20 min/month',
    rateInfo: 'Medicare: ~$42/month'
  },
  '99484': {
    description: 'Behavioral Health Integration',
    requirements: 'Mental/behavioral condition, 20 min/month',
    rateInfo: 'Medicare: ~$48/month'
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
  '99484': [
    {
      id: 'T-1001',
      title: 'Mental Health Monitoring',
      description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
      category: 'Mental-health',
      categoryColor: 'pink',
      minutes: 12,
      insight: 'High Alert triggered by Hana AI Coach - immediate clinical review required for depression management',
      status: 'urgent',
      evidenceFromCall: [
        {
          text: "My depression has gotten significantly worse over the past week. I'm having trouble getting out of bed and I've been having some really dark thoughts.",
          timestamp: "2:45",
          importance: "high"
        },
        {
          text: "I haven't been taking my antidepressant regularly because I don't think it's working anymore. What's the point?",
          timestamp: "4:15",
          importance: "high"
        },
        {
          text: "I cancelled my therapy appointment this week because I just couldn't face it. Everything feels overwhelming.",
          timestamp: "6:30",
          importance: "high"
        }
      ],
      audioUrl: "#",
      transcript: "AI: How have you been feeling since our last check-in?\nPatient: My depression has gotten significantly worse over the past week. I'm having trouble getting out of bed and I've been having some really dark thoughts.\nAI: I'm concerned about what you're telling me. Can you tell me more about your medication?\nPatient: I haven't been taking my antidepressant regularly because I don't think it's working anymore. What's the point?\nAI: It's important that we address this. How have you been managing your therapy sessions?\nPatient: I cancelled my therapy appointment this week because I just couldn't face it. Everything feels overwhelming.",
      suggestedActions: [
        { id: 'action-1', text: 'Immediate mental health crisis assessment and safety planning', default: true },
        { id: 'action-2', text: 'Emergency consultation with psychiatrist for medication review', default: true },
        { id: 'action-3', text: 'Coordinate urgent therapy session within 24-48 hours', default: true },
        { id: 'action-4', text: 'Implement enhanced monitoring protocol with daily check-ins', default: true },
        { id: 'action-5', text: 'Assess need for higher level of care (IOP/PHP)', default: false }
      ]
    },
    {
      id: 'T-MSR-001',
      title: 'Monthly Stability Review',
      description: 'Comprehensive monthly assessment of mental health stability and care plan effectiveness',
      category: 'Monthly-review',
      categoryColor: 'purple',
      minutes: 15,
      insight: 'Scheduled monthly review to assess patient stability trends and adjust care plan as needed',
      status: 'pending',
      taskType: 'monthly-stability-review'
    }
  ]
};

export const totalRequiredMinutes = {
  '99490': 20,
  '99484': 20
};

export const completedMinutes = {
  '99490': 8,
  '99484': 5
};
