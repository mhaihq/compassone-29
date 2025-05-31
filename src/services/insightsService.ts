
export interface InsightMetric {
  id: string;
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  color: 'green' | 'red' | 'blue' | 'yellow';
}

export interface InsightRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
}

export interface InsightGoal {
  id: string;
  patientName: string;
  goalType: string;
  progress: number;
  target: number;
  daysOverdue: number;
  priority: 'critical' | 'high' | 'medium';
  nextAction: string;
}

export interface InsightOptimization {
  id: string;
  activity: string;
  currentTime: number;
  optimalTime: number;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
  savings?: number;
}

export interface InsightsData {
  metrics: InsightMetric[];
  recommendations: InsightRecommendation[];
  goals: InsightGoal[];
  optimizations: InsightOptimization[];
  summary: {
    weeklyHighlight: string;
    nextActions: Array<{
      id: string;
      text: string;
      priority: 'high' | 'medium' | 'low';
      timeEstimate: string;
    }>;
  };
}

// Simplified mock data
export const getInsightsData = (): InsightsData => ({
  metrics: [
    {
      id: 'patients',
      label: 'Patients Engaged',
      value: 5,
      trend: 'up',
      change: '+25%',
      color: 'green'
    },
    {
      id: 'completion',
      label: 'Goal Completion',
      value: '80%',
      trend: 'stable',
      change: '4 of 5 targets',
      color: 'blue'
    },
    {
      id: 'efficiency',
      label: 'Time Efficiency',
      value: '90%',
      trend: 'up',
      change: '+15% vs last week',
      color: 'green'
    },
    {
      id: 'revenue',
      label: 'Revenue at Risk',
      value: '$234',
      trend: 'down',
      change: '3 patients need attention',
      color: 'red'
    }
  ],
  recommendations: [
    {
      id: 'r1',
      title: 'Focus on Matteo\'s Blood Pressure',
      description: 'Goal is 14 days overdue and represents high revenue risk.',
      priority: 'high',
      action: 'Schedule medication review',
      impact: '$42/month revenue + better outcomes'
    },
    {
      id: 'r2',
      title: 'Schedule 2 Patient Calls',
      description: 'Two patients haven\'t been contacted this week.',
      priority: 'medium',
      action: 'Book Tuesday afternoon slots',
      impact: 'Maintain 95% engagement rate'
    },
    {
      id: 'r3',
      title: 'Optimize Documentation Time',
      description: 'Use quick templates to save 5 minutes per session.',
      priority: 'low',
      action: 'Review template library',
      impact: '30 min/week time savings'
    }
  ],
  goals: [
    {
      id: 'g1',
      patientName: 'Matteo Grassi',
      goalType: 'Blood Pressure Control',
      progress: 85,
      target: 100,
      daysOverdue: 14,
      priority: 'critical',
      nextAction: 'Medication adjustment needed'
    },
    {
      id: 'g2',
      patientName: 'Sarah Chen',
      goalType: 'A1C Level',
      progress: 72,
      target: 100,
      daysOverdue: 7,
      priority: 'high',
      nextAction: 'Dietary consultation'
    }
  ],
  optimizations: [
    {
      id: 'o1',
      activity: 'Patient Calls',
      currentTime: 25,
      optimalTime: 28,
      impact: 'high',
      suggestion: 'Increase by 3 minutes for better outcomes'
    },
    {
      id: 'o2',
      activity: 'Documentation',
      currentTime: 18,
      optimalTime: 13,
      impact: 'medium',
      suggestion: 'Use templates for routine follow-ups',
      savings: 5
    }
  ],
  summary: {
    weeklyHighlight: 'Great week! You supported 5 patients and achieved 80% goal completion with 15% better efficiency.',
    nextActions: [
      {
        id: 'a1',
        text: 'Review Matteo\'s blood pressure medication',
        priority: 'high',
        timeEstimate: '10 min'
      },
      {
        id: 'a2',
        text: 'Schedule 2 pending patient calls',
        priority: 'medium',
        timeEstimate: '30 min'
      }
    ]
  }
});
