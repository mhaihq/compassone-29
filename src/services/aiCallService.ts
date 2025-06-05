
// AI-powered call intelligence service
export interface PreCallInsight {
  id: string;
  type: 'risk_factor' | 'medication_change' | 'missed_appointment' | 'positive_trend' | 'concern';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  confidence: number;
  suggestedTalkingPoints: string[];
}

export interface CallTranscriptSegment {
  id: string;
  timestamp: string;
  speaker: 'patient' | 'clinician';
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'concerning';
  keyPoints: string[];
  citations: string[];
}

export interface AICallSummary {
  id: string;
  patientId: string;
  callId: string;
  duration: string;
  outcome: string;
  keyFindings: string[];
  actionItems: Array<{
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    assignedTo?: string;
  }>;
  riskAssessment: {
    overall: 'low' | 'medium' | 'high' | 'critical';
    factors: string[];
    recommendations: string[];
  };
  nextSteps: string[];
  citations: Array<{
    id: string;
    text: string;
    timestamp: string;
    context: string;
  }>;
}

export const generatePreCallInsights = async (patientId: string): Promise<PreCallInsight[]> => {
  // Mock AI-generated insights - would connect to actual AI service
  const insights: PreCallInsight[] = [
    {
      id: 'insight-1',
      type: 'medication_change',
      title: 'Recent Medication Adjustment',
      description: 'Patient started new antidepressant 2 weeks ago - check for side effects and adherence',
      priority: 'high',
      source: 'EHR medication history',
      confidence: 0.92,
      suggestedTalkingPoints: [
        'How are you feeling since starting the new medication?',
        'Any side effects you\'ve noticed?',
        'Are you taking it consistently?'
      ]
    },
    {
      id: 'insight-2',
      type: 'positive_trend',
      title: 'Improved Mood Tracking',
      description: 'Patient mood scores have improved 30% over the past month',
      priority: 'medium',
      source: 'Hana mood tracking data',
      confidence: 0.87,
      suggestedTalkingPoints: [
        'I noticed your mood tracking has been more positive lately',
        'What changes have you made that are helping?',
        'How can we maintain this progress?'
      ]
    },
    {
      id: 'insight-3',
      type: 'concern',
      title: 'Sleep Pattern Disruption',
      description: 'Sleep quality scores declined in the past week',
      priority: 'medium',
      source: 'Wearable device data',
      confidence: 0.78,
      suggestedTalkingPoints: [
        'How has your sleep been lately?',
        'Any changes in your routine or stress levels?',
        'Are you following your sleep hygiene plan?'
      ]
    }
  ];

  return insights;
};

export const processRealTimeTranscription = async (audioChunk: Blob): Promise<CallTranscriptSegment> => {
  // Mock real-time transcription - would connect to speech-to-text service
  return {
    id: `segment-${Date.now()}`,
    timestamp: new Date().toISOString(),
    speaker: 'patient',
    text: 'I\'ve been feeling much better since we increased my medication dose.',
    sentiment: 'positive',
    keyPoints: ['medication effectiveness', 'dosage adjustment', 'symptom improvement'],
    citations: ['medication increase', 'feeling better']
  };
};

export const generateCallSummary = async (
  patientId: string, 
  transcript: CallTranscriptSegment[], 
  callDuration: string
): Promise<AICallSummary> => {
  // Mock AI summary generation - would use NLP to analyze transcript
  return {
    id: `summary-${Date.now()}`,
    patientId,
    callId: `call-${Date.now()}`,
    duration: callDuration,
    outcome: 'Successful check-in with positive progress noted',
    keyFindings: [
      'Patient reports significant improvement in mood and energy',
      'Medication adherence is excellent at 95%+',
      'Sleep quality has stabilized',
      'Work stress levels are decreasing'
    ],
    actionItems: [
      {
        id: 'action-1',
        text: 'Continue current medication dosage for 4 more weeks',
        priority: 'medium',
        dueDate: '2025-07-03'
      },
      {
        id: 'action-2',
        text: 'Schedule follow-up therapy session',
        priority: 'high',
        dueDate: '2025-06-12'
      }
    ],
    riskAssessment: {
      overall: 'low',
      factors: ['stable mood', 'good medication adherence'],
      recommendations: ['maintain current treatment plan', 'monitor for continued stability']
    },
    nextSteps: [
      'Continue current medication regimen',
      'Monitor mood and sleep patterns',
      'Follow up in 4 weeks'
    ],
    citations: [
      {
        id: 'cite-1',
        text: 'Patient reports feeling much better since medication increase',
        timestamp: '2:45',
        context: 'Medication effectiveness discussion'
      },
      {
        id: 'cite-2',
        text: 'Taking medication consistently every morning',
        timestamp: '4:15',
        context: 'Adherence confirmation'
      }
    ]
  };
};

export const extractActionItems = (transcript: CallTranscriptSegment[]): Array<{
  text: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
}> => {
  // Mock action item extraction from transcript
  return [
    {
      text: 'Schedule blood work to check medication levels',
      priority: 'high',
      confidence: 0.89
    },
    {
      text: 'Provide patient with stress management resources',
      priority: 'medium',
      confidence: 0.76
    }
  ];
};
