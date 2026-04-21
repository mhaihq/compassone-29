import { useState } from 'react';
import { Check, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TaskOutcomeActions } from '@/components/care-task/TaskOutcomeActions';
import { emptyTaskOutcome, type TaskOutcome } from '@/types/taskOutcome';

interface FinalizeStepProps {
  task: {
    cptCode?: string;
    cptDescription?: string;
  };
  timer: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onFinalize: (outcome: TaskOutcome) => void;
  formatTime: (seconds: number) => string;
}

export const FinalizeStep: React.FC<FinalizeStepProps> = ({
  task,
  timer,
  isTimerRunning,
  onToggleTimer,
  onFinalize,
  formatTime,
}) => {
  const [outcome, setOutcome] = useState<TaskOutcome>(emptyTaskOutcome);
  const completeLabel = outcome.countsForBilling
    ? 'Complete and Add to Billing'
    : 'Complete';

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          <Check className="mr-2 text-green-500" size={18} />
          Finalize
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-gray-900">Time Summary</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50 text-blue-800 border-blue-200 font-mono text-sm px-2 py-1">
                {formatTime(timer)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={onToggleTimer}
              >
                {isTimerRunning ? (
                  <><Pause size={12} className="mr-1" /> Pause</>
                ) : (
                  <><Play size={12} className="mr-1" /> Resume</>
                )}
              </Button>
            </div>
          </div>

          {task.cptCode && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-50 text-purple-800 border-purple-200 font-mono text-xs px-2 py-0.5">
                    {task.cptCode}
                  </Badge>
                  <span className="text-xs text-gray-600">{task.cptDescription}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatTime(timer)}/20 min
                </span>
              </div>
              <Progress value={(timer / (20 * 60)) * 100} className="h-1.5" />
            </div>
          )}
        </div>

        <TaskOutcomeActions outcome={outcome} onChange={setOutcome} />

        <Button
          className="w-full bg-green-600 hover:bg-green-700 h-9"
          onClick={() => onFinalize(outcome)}
        >
          <Check className="mr-2" size={14} />
          {completeLabel}
        </Button>
      </CardContent>
    </Card>
  );
};
