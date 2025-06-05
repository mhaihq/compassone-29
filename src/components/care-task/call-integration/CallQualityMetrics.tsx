
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Brain, CheckCircle, TrendingUp, AlertTriangle, PhoneCall } from 'lucide-react';

interface CallMetrics {
  duration: string;
  insightsUsed: number;
  questionsAsked: number;
  patientEngagement: number;
  callQuality: 'excellent' | 'good' | 'fair' | 'poor';
  taskCompletionRate: number;
  aiAssistanceUtilization: number;
}

interface CallQualityMetricsProps {
  metrics: CallMetrics;
  taskType: string;
}

export const CallQualityMetrics: React.FC<CallQualityMetricsProps> = ({
  metrics,
  taskType
}) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500 text-white';
      case 'good': return 'bg-blue-500 text-white';
      case 'fair': return 'bg-yellow-500 text-white';
      case 'poor': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 0.9) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 0.7) return { label: 'Good', color: 'text-blue-600' };
    if (score >= 0.5) return { label: 'Fair', color: 'text-yellow-600' };
    return { label: 'Poor', color: 'text-red-600' };
  };

  const engagement = getEngagementLevel(metrics.patientEngagement);

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Call Quality Metrics
        </CardTitle>
        <p className="text-sm text-blue-700">
          AI-analyzed performance metrics for {taskType}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Quality Score */}
        <div className="text-center space-y-2">
          <Badge className={`${getQualityColor(metrics.callQuality)} text-lg px-4 py-2`}>
            {metrics.callQuality.toUpperCase()} CALL QUALITY
          </Badge>
          <p className="text-sm text-gray-600">
            Based on AI analysis of conversation flow, insight utilization, and task completion
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Call Duration</span>
            </div>
            <p className="text-xl font-semibold">{metrics.duration}</p>
            <p className="text-xs text-gray-600">Optimal for task type</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">AI Insights Used</span>
            </div>
            <p className="text-xl font-semibold">{metrics.insightsUsed}/4</p>
            <p className="text-xs text-gray-600">{Math.round((metrics.insightsUsed / 4) * 100)}% utilization</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Task Completion</span>
            </div>
            <p className="text-xl font-semibold">{Math.round(metrics.taskCompletionRate * 100)}%</p>
            <p className="text-xs text-gray-600">Coverage of required topics</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Patient Engagement</span>
            </div>
            <p className={`text-xl font-semibold ${engagement.color}`}>
              {engagement.label}
            </p>
            <p className="text-xs text-gray-600">{Math.round(metrics.patientEngagement * 100)}% engagement score</p>
          </div>
        </div>

        {/* AI Assistance Details */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Assistant Performance
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-700">Questions Suggested:</span>
              <p className="font-medium">{metrics.questionsAsked} of 12 recommended</p>
            </div>
            <div>
              <span className="text-purple-700">AI Utilization:</span>
              <p className="font-medium">{Math.round(metrics.aiAssistanceUtilization * 100)}%</p>
            </div>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Suggestions for Next Call
          </h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Consider using more AI-suggested questions for deeper patient engagement</li>
            <li>• Review sleep pattern insights more thoroughly</li>
            <li>• Follow up on missed therapy session discussion</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
