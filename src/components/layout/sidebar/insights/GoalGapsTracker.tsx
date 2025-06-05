
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Target, TrendingDown, Calendar } from 'lucide-react';

interface GoalGap {
  id: string;
  patientName: string;
  goalType: string;
  progress: number;
  target: number;
  daysOverdue: number;
  priority: 'critical' | 'high' | 'medium';
  nextAction: string;
  revenueImpact?: string;
}

interface GoalGapsTrackerProps {
  goals: GoalGap[];
}

export const GoalGapsTracker: React.FC<GoalGapsTrackerProps> = ({ goals }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <TrendingDown className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const criticalGoals = goals.filter(g => g.priority === 'critical').length;
  const totalRevenue = goals.reduce((sum, goal) => {
    if (goal.revenueImpact) {
      const amount = parseInt(goal.revenueImpact.replace(/[^0-9]/g, ''));
      return sum + amount;
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <Target className="w-5 h-5" />
          Goal Gaps & Overdue Items
        </h3>
        <div className="flex gap-2">
          <Badge className="bg-red-100 text-red-800">
            {criticalGoals} Critical
          </Badge>
          <Badge className="bg-orange-100 text-orange-800">
            ${totalRevenue} at Risk
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <Card key={goal.id} className={`border-l-4 ${getPriorityColor(goal.priority)}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(goal.priority)}
                  <div>
                    <h4 className="font-medium text-gray-900">{goal.patientName}</h4>
                    <p className="text-sm text-gray-600">{goal.goalType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs mb-1">
                    {goal.daysOverdue} days overdue
                  </Badge>
                  {goal.revenueImpact && (
                    <p className="text-xs text-red-600 font-medium">{goal.revenueImpact}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}% of {goal.target}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">{goal.nextAction}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {goals.length === 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">All goals on track!</p>
            <p className="text-green-600 text-sm">No overdue items to address.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
