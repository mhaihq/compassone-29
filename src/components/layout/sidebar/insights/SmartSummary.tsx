
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Clock, CheckCircle2 } from 'lucide-react';

interface SmartSummaryProps {
  weeklyHighlight: string;
  metrics: {
    patientsEngaged: number;
    goalCompletion: number;
    timeEfficiency: number;
    revenueAtRisk: number;
  };
  nextActions: Array<{
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
    timeEstimate: string;
  }>;
}

export const SmartSummary: React.FC<SmartSummaryProps> = ({ 
  weeklyHighlight, 
  metrics, 
  nextActions 
}) => {
  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceStatus = () => {
    const avgScore = (metrics.goalCompletion + metrics.timeEfficiency) / 2;
    if (avgScore >= 85) return { label: 'Excellent', color: 'bg-green-100 text-green-800', icon: CheckCircle2 };
    if (avgScore >= 70) return { label: 'Good', color: 'bg-blue-100 text-blue-800', icon: TrendingUp };
    return { label: 'Needs Focus', color: 'bg-yellow-100 text-yellow-800', icon: Target };
  };

  const status = getPerformanceStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="bg-gradient-to-br from-[#EBF4F0] to-white border-[#1E4D36]/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-[#1E4D36]" />
          <h3 className="text-lg font-semibold text-[#1E4D36]">AI Care Intelligence Summary</h3>
          <Badge className={status.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Patients</span>
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
            <p className="text-lg font-bold text-gray-900">{metrics.patientsEngaged}</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Goal Rate</span>
              <Target className="w-3 h-3 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-gray-900">{metrics.goalCompletion}%</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Efficiency</span>
              <Clock className="w-3 h-3 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-gray-900">{metrics.timeEfficiency}%</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Revenue Risk</span>
              <TrendingUp className="w-3 h-3 text-red-600" />
            </div>
            <p className="text-lg font-bold text-red-600">${metrics.revenueAtRisk}</p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#1E4D36]" />
            Weekly Insight
          </h4>
          <p className="text-sm text-gray-700">{weeklyHighlight}</p>
        </div>

        {/* Next Priority Actions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Next Priority Actions</h4>
          <div className="space-y-2">
            {nextActions.slice(0, 3).map((action) => (
              <div key={action.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityDot(action.priority)}`}></div>
                  <span className="text-sm text-gray-700">{action.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{action.timeEstimate}</span>
                  <Clock className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="bg-[#1E4D36] hover:bg-[#2A6349] text-white flex-1">
            <Target className="w-4 h-4 mr-1" />
            Start Priority Tasks
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
