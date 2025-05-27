
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  value?: string;
}

interface StabilityAssessmentStepProps {
  stabilityChecklist: ChecklistItem[];
  onItemChange: (id: string, value: string) => void;
  onNext: () => void;
  completedAssessments: number;
  totalAssessments: number;
}

export const StabilityAssessmentStep: React.FC<StabilityAssessmentStepProps> = ({
  stabilityChecklist,
  onItemChange,
  onNext,
  completedAssessments,
  totalAssessments
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="text-blue-600" size={20} />
          Step 1: Quick Stability Check
          <Badge className="ml-auto">
            {completedAssessments}/{totalAssessments} Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stabilityChecklist.map((item) => (
          <div key={item.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox 
                checked={item.completed}
                className="mt-1"
                disabled
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                <div className="flex gap-2">
                  {['Improved', 'Stable', 'Concerns'].map((status) => (
                    <Button
                      key={status}
                      variant={item.value === status.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      onClick={() => onItemChange(item.id, status.toLowerCase())}
                      className={
                        item.value === status.toLowerCase()
                          ? status === 'Improved' 
                            ? 'bg-green-600 hover:bg-green-700'
                            : status === 'Stable'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-yellow-600 hover:bg-yellow-700'
                          : ''
                      }
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button 
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={completedAssessments !== totalAssessments}
          >
            Continue to Documentation
            {completedAssessments !== totalAssessments && (
              <span className="ml-2 text-xs">
                ({totalAssessments - completedAssessments} remaining)
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
