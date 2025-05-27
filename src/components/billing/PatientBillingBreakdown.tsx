
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Phone, Users, Settings } from 'lucide-react';
import { PatientBillingBreakdown as PatientBillingBreakdownType, TimeBreakdownEntry } from '@/types/billingBreakdown';

interface PatientBillingBreakdownProps {
  breakdown: PatientBillingBreakdownType;
}

export const PatientBillingBreakdown: React.FC<PatientBillingBreakdownProps> = ({ breakdown }) => {
  // Calculate action breakdown
  const actionBreakdown: TimeBreakdownEntry[] = breakdown.actions.reduce((acc, action) => {
    const existing = acc.find(item => item.action === action.name);
    if (existing) {
      existing.timeSpent += action.timeSpent;
      existing.taskCount += 1;
    } else {
      acc.push({
        action: action.name,
        category: action.category,
        timeSpent: action.timeSpent,
        percentage: 0,
        taskCount: 1
      });
    }
    return acc;
  }, [] as TimeBreakdownEntry[]);

  // Calculate percentages
  actionBreakdown.forEach(item => {
    item.percentage = breakdown.totalTime > 0 ? (item.timeSpent / breakdown.totalTime) * 100 : 0;
  });

  // Sort by time spent
  actionBreakdown.sort((a, b) => b.timeSpent - a.timeSpent);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documentation': return <FileText className="h-4 w-4" />;
      case 'patient-contact': return <Phone className="h-4 w-4" />;
      case 'care-planning': return <Users className="h-4 w-4" />;
      case 'coordination': return <Users className="h-4 w-4" />;
      case 'administrative': return <Settings className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'documentation': return 'bg-blue-100 text-blue-800';
      case 'patient-contact': return 'bg-green-100 text-green-800';
      case 'care-planning': return 'bg-purple-100 text-purple-800';
      case 'coordination': return 'bg-orange-100 text-orange-800';
      case 'administrative': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = breakdown.targetTime > 0 ? (breakdown.totalTime / breakdown.targetTime) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#1E4D36]" />
          Billing Time Breakdown - {breakdown.cptCode}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time Used</span>
            <span className="font-medium">{breakdown.totalTime}/{breakdown.targetTime} min</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-gray-500">
            {breakdown.targetTime - breakdown.totalTime > 0 
              ? `${breakdown.targetTime - breakdown.totalTime} minutes remaining`
              : 'Target time reached'
            }
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Action Breakdown</h4>
          <div className="space-y-3">
            {actionBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <span className="font-medium text-sm">{item.action}</span>
                  </div>
                  <Badge className={getCategoryColor(item.category)} variant="secondary">
                    {item.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{item.timeSpent} min</div>
                  <div className="text-xs text-gray-500">
                    {item.percentage.toFixed(1)}% • {item.taskCount} task{item.taskCount !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {actionBreakdown.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No billing actions recorded yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
