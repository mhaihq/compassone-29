
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { CallQualityMetrics } from '../call-integration/CallQualityMetrics';
import { SourceCitationSystem } from '../call-integration/SourceCitationSystem';
import { EHRIntegration } from '../call-integration/EHRIntegration';
import { AICallSummary } from '@/services/aiCallService';

interface PostCallSummaryProps {
  callSummary: AICallSummary;
  taskId: string;
  onViewAnalytics: () => void;
  onReturnToTasks: () => void;
  onEHRSubmit: (ehrData: unknown) => void;
}

export const PostCallSummary: React.FC<PostCallSummaryProps> = ({
  callSummary,
  taskId,
  onViewAnalytics,
  onReturnToTasks,
  onEHRSubmit
}) => {
  const mockMetrics = {
    duration: '14:32',
    insightsUsed: 3,
    questionsAsked: 8,
    patientEngagement: 0.89,
    callQuality: 'excellent' as const,
    taskCompletionRate: 0.92,
    aiAssistanceUtilization: 0.87
  };

  const mockCitations = [
    {
      id: 'cite-1',
      timestamp: '3:45',
      patientQuote: 'I\'ve been feeling much better since we increased my medication dose',
      clinicianResponse: 'That\'s great to hear. Any side effects you\'ve noticed?',
      context: 'Medication effectiveness discussion',
      evidenceType: 'verbal' as const,
      relevantInsight: 'Recent medication increase showing positive response',
      confidence: 0.92
    },
    {
      id: 'cite-2',
      timestamp: '7:12',
      patientQuote: 'My sleep has been much more consistent, usually 7-8 hours now',
      clinicianResponse: 'Excellent improvement in sleep patterns',
      context: 'Sleep quality assessment',
      evidenceType: 'clinical_observation' as const,
      relevantInsight: 'Sleep pattern improvement aligns with treatment goals',
      confidence: 0.88
    }
  ];

  return (
    <div className="space-y-6">
      {/* Call Completion Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-600" />
            Call Completed - AI Analysis Complete
          </CardTitle>
          <p className="text-sm text-green-700">
            Comprehensive documentation and analysis ready for review
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex gap-2">
            <Button onClick={onViewAnalytics} variant="outline" className="flex-1">
              <Brain className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button onClick={onReturnToTasks} variant="outline" className="flex-1">
              Return to Tasks
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call Quality Metrics */}
      <CallQualityMetrics 
        metrics={mockMetrics}
        taskType="Monthly Stability Review"
      />

      {/* Source Citations */}
      <SourceCitationSystem
        citations={mockCitations}
        callDuration="14:32"
      />

      {/* EHR Integration */}
      <EHRIntegration
        callSummary={callSummary}
        taskId={taskId}
        onEHRSubmit={onEHRSubmit}
      />
    </div>
  );
};
