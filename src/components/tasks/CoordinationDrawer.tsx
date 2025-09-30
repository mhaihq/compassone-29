import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { CoordinationStepHeader } from './coordination/CoordinationStepHeader';
import { MissedAppointmentStep } from './coordination/MissedAppointmentStep';
import { PolicyCheckStep } from './coordination/PolicyCheckStep';
import { OutreachOptionsStep } from './coordination/OutreachOptionsStep';
import { CoordinationFinalizeStep } from './coordination/CoordinationFinalizeStep';

interface CoordinationDrawerProps {
  task: EnhancedPopulationTask;
  open: boolean;
  onClose: () => void;
}

export const CoordinationDrawer: React.FC<CoordinationDrawerProps> = ({ task, open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [decision, setDecision] = useState<any>(null);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MissedAppointmentStep task={task} />;
      case 2:
        return <PolicyCheckStep task={task} />;
      case 3:
        return <OutreachOptionsStep onDecisionChange={setDecision} />;
      case 4:
        return <CoordinationFinalizeStep decision={decision} />;
      default:
        return null;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-w-2xl mx-auto">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between mb-4">
            <DrawerTitle className="text-xl font-semibold">{task.title}</DrawerTitle>
            <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
              {task.priority}
            </Badge>
          </div>
          <CoordinationStepHeader
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </DrawerHeader>

        <ScrollArea className="h-[500px] px-6 py-4">
          {renderCurrentStep()}
        </ScrollArea>

        <DrawerFooter className="border-t">
          <div className="flex justify-between w-full gap-2">
            <Button
              variant="outline"
              onClick={handleBackStep}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {currentStep < 4 ? (
                <Button onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleComplete}>
                  Approve & Complete
                </Button>
              )}
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
