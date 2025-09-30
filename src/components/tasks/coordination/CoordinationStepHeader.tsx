import React from 'react';
import { StepProgress } from '@/components/ui/step-progress';

interface CoordinationStepHeaderProps {
  currentStep: number;
  completedSteps: number[];
}

const COORDINATION_STEPS = [
  'Missed Appointment',
  'Policy Check',
  'Outreach Options',
  'Finalize'
];

export const CoordinationStepHeader: React.FC<CoordinationStepHeaderProps> = ({
  currentStep,
  completedSteps
}) => {
  return (
    <StepProgress
      currentStep={currentStep}
      completedSteps={completedSteps}
      steps={COORDINATION_STEPS}
    />
  );
};
