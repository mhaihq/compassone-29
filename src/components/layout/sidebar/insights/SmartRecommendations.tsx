
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, ArrowRight, AlertTriangle } from 'lucide-react';

export const SmartRecommendations: React.FC = () => {
  const recommendations = [
    {
      id: 'r1',
      title: 'Focus on Matteo\'s Blood Pressure',
      description: 'Goal is 14 days overdue and represents high revenue risk.',
      priority: 'high' as const,
      action: 'Schedule medication review',
      impact: '$42/month revenue + better outcomes'
    },
    {
      id: 'r2',
      title: 'Schedule 2 Patient Calls',
      description: 'Two patients haven\'t been contacted this week.',
      priority: 'medium' as const,
      action: 'Book Tuesday afternoon slots',
      impact: 'Maintain 95% engagement rate'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <Target className="w-5 h-5" />
          Smart Recommendations
        </h3>
        <Badge className="bg-[#1E4D36] text-white">
          {recommendations.length} Actions
        </Badge>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Card key={rec.id} className={`border-l-4 border-l-red-400 ${getPriorityColor(rec.priority)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                  <p className="text-xs text-gray-600 italic mb-3">{rec.impact}</p>
                  <Button size="sm" variant="outline" className="text-xs">
                    {rec.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
