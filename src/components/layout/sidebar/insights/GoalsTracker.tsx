
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock } from 'lucide-react';
import { InsightGoal } from '@/services/insightsService';

interface GoalsTrackerProps {
  goals: InsightGoal[];
}

export const GoalsTracker: React.FC<GoalsTrackerProps> = ({ goals }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36]">
          Goal Progress
        </h3>
        <Badge className="bg-red-100 text-red-800">
          {goals.length} overdue
        </Badge>
      </div>
      
      {goals.map((goal) => (
        <Card key={goal.id} className="border-l-4 border-l-red-400">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{goal.patientName}</h4>
                <p className="text-sm text-gray-600">{goal.goalType}</p>
              </div>
              <Badge className={getPriorityColor(goal.priority)}>
                {goal.priority}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {goal.daysOverdue} days overdue
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                {goal.nextAction}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
