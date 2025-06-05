
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Clock, Users, Brain, Target, Activity, Calendar } from 'lucide-react';

interface CallAnalytics {
  callEfficiency: number;
  patientSatisfaction: number;
  clinicalObjectivesAchieved: number;
  aiAssistanceUtilization: number;
  protocolAdherence: number;
  timeAllocation: {
    assessment: number;
    intervention: number;
    planning: number;
    documentation: number;
  };
  comparisonToBaseline: {
    averageCallDuration: string;
    patientEngagement: number;
    outcomesAchieved: number;
  };
}

interface ComprehensiveCallAnalyticsProps {
  analytics: CallAnalytics;
  taskType: string;
  callDuration: string;
}

export const ComprehensiveCallAnalytics: React.FC<ComprehensiveCallAnalyticsProps> = ({
  analytics,
  taskType,
  callDuration
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Comprehensive Call Analytics
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-blue-700">
          <span>Task: {taskType}</span>
          <span>Duration: {callDuration}</span>
          <Badge variant="outline">AI-Enhanced Analysis</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(analytics.callEfficiency)}`}>
              {analytics.callEfficiency}%
            </div>
            <p className="text-sm text-gray-600">Call Efficiency</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(analytics.patientSatisfaction)}`}>
              {analytics.patientSatisfaction}%
            </div>
            <p className="text-sm text-gray-600">Patient Satisfaction</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(analytics.clinicalObjectivesAchieved)}`}>
              {analytics.clinicalObjectivesAchieved}%
            </div>
            <p className="text-sm text-gray-600">Objectives Achieved</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(analytics.aiAssistanceUtilization)}`}>
              {analytics.aiAssistanceUtilization}%
            </div>
            <p className="text-sm text-gray-600">AI Utilization</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Performance Breakdown
          </h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Protocol Adherence</span>
                <span className={`text-sm font-semibold ${getScoreColor(analytics.protocolAdherence)}`}>
                  {analytics.protocolAdherence}%
                </span>
              </div>
              <Progress 
                value={analytics.protocolAdherence} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">AI Assistance Utilization</span>
                <span className={`text-sm font-semibold ${getScoreColor(analytics.aiAssistanceUtilization)}`}>
                  {analytics.aiAssistanceUtilization}%
                </span>
              </div>
              <Progress 
                value={analytics.aiAssistanceUtilization} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Clinical Objectives</span>
                <span className={`text-sm font-semibold ${getScoreColor(analytics.clinicalObjectivesAchieved)}`}>
                  {analytics.clinicalObjectivesAchieved}%
                </span>
              </div>
              <Progress 
                value={analytics.clinicalObjectivesAchieved} 
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* Time Allocation */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time Allocation Analysis
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Assessment</span>
                <span className="text-sm font-medium">{analytics.timeAllocation.assessment}%</span>
              </div>
              <Progress value={analytics.timeAllocation.assessment} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Intervention</span>
                <span className="text-sm font-medium">{analytics.timeAllocation.intervention}%</span>
              </div>
              <Progress value={analytics.timeAllocation.intervention} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Planning</span>
                <span className="text-sm font-medium">{analytics.timeAllocation.planning}%</span>
              </div>
              <Progress value={analytics.timeAllocation.planning} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Documentation</span>
                <span className="text-sm font-medium">{analytics.timeAllocation.documentation}%</span>
              </div>
              <Progress value={analytics.timeAllocation.documentation} className="h-1" />
            </div>
          </div>
        </div>

        {/* Comparison to Baseline */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparison to Your Baseline
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-blue-700">Call Duration</p>
              <p className="font-semibold text-blue-900">{analytics.comparisonToBaseline.averageCallDuration}</p>
              <p className="text-xs text-green-600">↓ 15% improvement</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700">Patient Engagement</p>
              <p className="font-semibold text-blue-900">{analytics.comparisonToBaseline.patientEngagement}%</p>
              <p className="text-xs text-green-600">↑ 12% improvement</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700">Outcomes Achieved</p>
              <p className="font-semibold text-blue-900">{analytics.comparisonToBaseline.outcomesAchieved}%</p>
              <p className="text-xs text-green-600">↑ 8% improvement</p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Performance Insights
          </h4>
          <div className="space-y-2 text-sm text-purple-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Optimal utilization of AI-suggested questions improved patient engagement by 23%</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Patient response patterns indicate high comfort level with telehealth approach</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Call timing and structure align well with patient's communication preferences</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
