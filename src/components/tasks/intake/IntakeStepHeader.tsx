import React from 'react';
import { StepProgress } from '@/components/ui/step-progress';

interface IntakeStepHeaderProps {
  currentStep: number;
  completedSteps: number[];
}

const INTAKE_STEPS = [
  'Form Review',
  'Evidence Check',
  'Resolution Action',
  'Finalize'
];

export const IntakeStepHeader: React.FC<IntakeStepHeaderProps> = ({
  currentStep,
  completedSteps
}) => {
  return (
    <StepProgress
      currentStep={currentStep}
      completedSteps={completedSteps}
      steps={INTAKE_STEPS}
    />
  );
};
