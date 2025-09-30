import React from 'react';
import { Card } from '@/components/ui/card';
import { StepProgress } from '@/components/ui/step-progress';
import { Clock } from 'lucide-react';

interface MonitoringStepHeaderProps {
  timer: number;
  formatTime: (seconds: number) => string;
  currentStep: 'assessment' | 'evidence' | 'decision' | 'finalize';
}

export const MonitoringStepHeader: React.FC<MonitoringStepHeaderProps> = ({
  timer,
  formatTime,
  currentStep
}) => {
  const steps = [
    { id: 'assessment', label: 'Risk Assessment' },
    { id: 'evidence', label: 'Evidence Review' },
    { id: 'decision', label: 'Care Decision' },
    { id: 'finalize', label: 'Finalize' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <Card className="p-4 bg-emerald-50 border-emerald-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span className="text-sm font-medium text-emerald-900">
            Time Elapsed: {formatTime(timer)}
          </span>
        </div>
        <span className="text-xs text-emerald-700">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>
      
      <StepProgress 
        steps={steps.map(s => s.label)} 
        currentStep={currentStepIndex + 1}
        completedSteps={Array.from({ length: currentStepIndex }, (_, i) => i + 1)}
      />
    </Card>
  );
};
