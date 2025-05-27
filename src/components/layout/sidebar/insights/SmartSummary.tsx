
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Target
} from 'lucide-react';

interface InsightMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export const SmartSummary: React.FC = () => {
  const keyMetrics: InsightMetric[] = [
    { label: 'Weekly Efficiency', value: '+15%', trend: 'up', color: 'text-green-600' },
    { label: 'Revenue at Risk', value: '$234', trend: 'down', color: 'text-red-600' },
    { label: 'Goal Completion', value: '80%', trend: 'stable', color: 'text-blue-600' },
    { label: 'Patient Satisfaction', value: '4.8/5', trend: 'up', color: 'text-green-600' }
  ];

  const weeklyInsights = [
    {
      type: 'success',
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
      text: 'Excellent patient engagement this week with 90% response rate'
    },
    {
      type: 'warning',
      icon: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
      text: '3 patients have goals 7+ days overdue requiring attention'
    },
    {
      type: 'opportunity',
      icon: <DollarSign className="w-4 h-4 text-blue-600" />,
      text: '$144 in additional BHI revenue possible with 45 more minutes'
    },
    {
      type: 'insight',
      icon: <Brain className="w-4 h-4 text-purple-600" />,
      text: 'Tuesday afternoons show 25% higher patient engagement rates'
    }
  ];

  const nextActions = [
    { priority: 'high', action: 'Review Matteo\'s BP medication', timeEst: '10 min' },
    { priority: 'medium', action: 'Schedule 3 pending patient calls', timeEst: '30 min' },
    { priority: 'low', action: 'Update care plan templates', timeEst: '15 min' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-[#EBF4F0] to-white border-[#1E4D36]/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-[#1E4D36]" />
          <h3 className="text-lg font-semibold text-[#1E4D36]">AI Care Intelligence Summary</h3>
          <Badge className="bg-purple-100 text-purple-800">
            Updated 2 min ago
          </Badge>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{metric.label}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className={`text-lg font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Insights */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">This Week's Insights</h4>
          <div className="space-y-2">
            {weeklyInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                {insight.icon}
                <span className="text-gray-700">{insight.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Recommended Actions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Recommended Next Actions</h4>
          <div className="space-y-2">
            {nextActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-2 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    action.priority === 'high' ? 'bg-red-500' :
                    action.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm text-gray-700">{action.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{action.timeEst}</span>
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
            <Users className="w-4 h-4 mr-1" />
            View All Patients
          </Button>
        </div>

        {/* AI Confidence Score */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>AI Confidence in Recommendations</span>
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
              </div>
              <span className="font-medium">87%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
