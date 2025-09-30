import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, User } from 'lucide-react';
import { OutcomeChips } from '@/components/tasks/coordination/OutcomeChips';

interface MonitoringFinalizeStepProps {
  timer: number;
  finalConfirmation: boolean;
  onConfirmationChange: (checked: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const MonitoringFinalizeStep: React.FC<MonitoringFinalizeStepProps> = ({
  timer,
  finalConfirmation,
  onConfirmationChange,
  onComplete,
  onBack
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Final Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold text-emerald-900">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-emerald-700">Time Spent</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-900">3</div>
              <div className="text-xs text-blue-700">Evidence Items</div>
            </div>

            <div className="text-center p-4 bg-violet-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-violet-600" />
              <div className="text-2xl font-bold text-violet-900">1</div>
              <div className="text-xs text-violet-700">Decision Made</div>
            </div>
          </div>

          {/* Outcome Summary */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Review Outcome</h4>
            <OutcomeChips outcomes={[
              { type: 'fixed', label: 'Risk Assessed' },
              { type: 'pushed', label: 'Care Plan Updated' }
            ]} />
          </div>

          {/* Confirmation Checkbox */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="final-confirmation"
                checked={finalConfirmation}
                onCheckedChange={(checked) => onConfirmationChange(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="final-confirmation"
                className="text-sm text-amber-900 cursor-pointer flex-1"
              >
                I confirm that all clinical information has been reviewed accurately and the decision is appropriate for this patient's care.
              </label>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Next Steps</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Patient will be notified via preferred channel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>EHR will be updated with clinical notes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Follow-up tasks will be generated if needed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button
          onClick={onComplete}
          disabled={!finalConfirmation}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Complete Review
        </Button>
      </div>
    </div>
  );
};
