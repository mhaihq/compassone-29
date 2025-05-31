
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Target, Users, CheckCircle2 } from 'lucide-react';

export const SmartSummary: React.FC = () => {
  const keyMetrics = [
    { label: 'Weekly Efficiency', value: '+15%', color: 'text-green-600' },
    { label: 'Revenue at Risk', value: '$234', color: 'text-red-600' },
    { label: 'Goal Completion', value: '80%', color: 'text-blue-600' },
    { label: 'Patient Satisfaction', value: '4.8/5', color: 'text-green-600' }
  ];

  const insights = [
    'Excellent patient engagement this week with 90% response rate',
    '3 patients have goals 7+ days overdue requiring attention',
    '$144 in additional revenue possible with 45 more minutes',
    'Tuesday afternoons show 25% higher patient engagement rates'
  ];

  return (
    <Card className="bg-gradient-to-br from-[#EBF4F0] to-white border-[#1E4D36]/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-[#1E4D36]" />
          <h3 className="text-lg font-semibold text-[#1E4D36]">AI Care Summary</h3>
          <Badge className="bg-purple-100 text-purple-800">
            Live
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
              <div className={`text-lg font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">This Week's Insights</h4>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{insight}</span>
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
      </CardContent>
    </Card>
  );
};
