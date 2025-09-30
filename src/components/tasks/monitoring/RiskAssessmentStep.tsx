import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';

interface RiskAssessmentStepProps {
  task: EnhancedPopulationTask;
  onNext: () => void;
}

export const RiskAssessmentStep: React.FC<RiskAssessmentStepProps> = ({
  task,
  onNext
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Why This Was Flagged
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span>Task Type</span>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {task.taskType}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Priority Level</span>
              </div>
              <Badge className={`${
                task.priority === 'High' ? 'bg-severity-high' : 'bg-severity-medium'
              } text-white border-0`}>
                {task.priority}
              </Badge>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Triggered By</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {task.triggeredBy}
              </Badge>
              <span className="text-xs text-muted-foreground">
                via {task.channel}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700">
          Review Evidence →
        </Button>
      </div>
    </div>
  );
};
