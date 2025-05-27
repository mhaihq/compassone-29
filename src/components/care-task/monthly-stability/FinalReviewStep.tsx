
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Target } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  value?: string;
}

interface FinalReviewStepProps {
  stabilityChecklist: ChecklistItem[];
  timer: number;
  finalConfirmation: boolean;
  onConfirmationChange: (checked: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const FinalReviewStep: React.FC<FinalReviewStepProps> = ({
  stabilityChecklist,
  timer,
  finalConfirmation,
  onConfirmationChange,
  onComplete,
  onBack
}) => {
  const timeSpentMinutes = Math.floor(timer / 60);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-blue-600" size={20} />
          Step 3: Final Review
        </CardTitle>
        <p className="text-sm text-gray-600">
          Almost done! Please review the summary and confirm submission.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Assessment Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Assessment Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stabilityChecklist.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{item.label.split(' ')[0]}</span>
                <Badge className={
                  item.value === 'improved' 
                    ? 'bg-green-100 text-green-800'
                    : item.value === 'stable'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {item.value?.charAt(0).toUpperCase() + item.value?.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Time Summary */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Time Spent</span>
            <span className="text-sm text-blue-700">{timeSpentMinutes} minutes</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-medium text-blue-900">Billing Status</span>
            <Badge className="bg-green-100 text-green-800">Ready</Badge>
          </div>
        </div>

        {/* Confirmation */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="final-confirmation"
              checked={finalConfirmation}
              onCheckedChange={(checked) => onConfirmationChange(checked as boolean)}
            />
            <label 
              htmlFor="final-confirmation" 
              className="text-sm font-medium leading-none"
            >
              I confirm this assessment is accurate and ready for submission
            </label>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Back to Documentation
            </Button>
            <Button 
              onClick={onComplete}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!finalConfirmation}
            >
              Complete Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
