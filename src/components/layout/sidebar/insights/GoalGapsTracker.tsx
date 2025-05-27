
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';

interface GoalGap {
  id: string;
  patientName: string;
  goalType: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  priority: 'critical' | 'high' | 'medium';
  daysOverdue: number;
  revenueImpact?: number;
  nextAction: string;
}

const goalGaps: GoalGap[] = [
  {
    id: 'G1',
    patientName: 'Matteo Grassi',
    goalType: 'Blood Pressure Control',
    currentValue: 138,
    targetValue: 130,
    unit: 'mmHg systolic',
    priority: 'critical',
    daysOverdue: 14,
    revenueImpact: 42,
    nextAction: 'Medication adjustment needed'
  },
  {
    id: 'G2',
    patientName: 'Matteo Grassi',
    goalType: 'Exercise Minutes',
    currentValue: 90,
    targetValue: 150,
    unit: 'min/week',
    priority: 'high',
    daysOverdue: 7,
    nextAction: 'Motivation coaching session'
  },
  {
    id: 'G3',
    patientName: 'Sarah Chen',
    goalType: 'A1C Level',
    currentValue: 7.2,
    targetValue: 7.0,
    unit: '%',
    priority: 'medium',
    daysOverdue: 21,
    revenueImpact: 48,
    nextAction: 'Dietary consultation'
  }
];

export const GoalGapsTracker: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const calculateProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100);
  };

  const totalRevenueAtRisk = goalGaps
    .filter(gap => gap.revenueImpact)
    .reduce((sum, gap) => sum + (gap.revenueImpact || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <Target className="w-5 h-5" />
          Goal Gaps & Revenue Risk
        </h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-100 text-red-800">
            ${totalRevenueAtRisk} at risk
          </Badge>
          <Badge className="bg-[#1E4D36] text-white">
            {goalGaps.length} gaps
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {goalGaps.map((gap) => (
          <Card key={gap.id} className="border-l-4 border-l-red-400">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(gap.priority)}
                  <div>
                    <h4 className="font-medium text-gray-900">{gap.patientName}</h4>
                    <p className="text-sm text-gray-600">{gap.goalType}</p>
                  </div>
                </div>
                <Badge className={getPriorityColor(gap.priority)}>
                  {gap.priority}
                </Badge>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress to Goal</span>
                  <span className="font-medium">
                    {gap.currentValue} / {gap.targetValue} {gap.unit}
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(gap.currentValue, gap.targetValue)} 
                  className="h-2"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {gap.daysOverdue} days overdue
                </span>
                {gap.revenueImpact && (
                  <span className="flex items-center gap-1 text-red-600">
                    <DollarSign className="w-3 h-3" />
                    ${gap.revenueImpact}/month at risk
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">{gap.nextAction}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#1E4D36]" />
            <h4 className="font-medium text-[#1E4D36]">Quick Win Opportunity</h4>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Prioritize Matteo's blood pressure goal - it's 14 days overdue and represents $42/month in CCM revenue risk.
          </p>
          <Button size="sm" className="bg-[#1E4D36] hover:bg-[#2A6349] text-white">
            Review Matteo's Care Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
