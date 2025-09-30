
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Target, Clock } from 'lucide-react';

interface WeeklySummaryProps {
  highlight: string;
  nextActions: Array<{
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
    timeEstimate: string;
  }>;
}

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ 
  highlight, 
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

  return (
    <Card className="bg-gradient-to-br from-[#f5f5f5] to-white border-[#1a1a1a]/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#1a1a1a]" />
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Week Summary</h3>
          <Badge className="bg-green-100 text-green-800">
            Excellent
          </Badge>
        </div>

        <p className="text-gray-700 mb-6">{highlight}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Next Priority Actions</h4>
          <div className="space-y-2">
            {nextActions.map((action) => (
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

        <div className="flex gap-2">
          <Button size="sm" className="bg-[#1a1a1a] hover:bg-[#333333] text-white flex-1">
            <Target className="w-4 h-4 mr-1" />
            Start Priority Tasks
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            View All Patients
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
