
import React from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CareTaskContent } from '@/components/care-task/CareTaskContent';

interface CareTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
}

export const CareTaskModal: React.FC<CareTaskModalProps> = ({
  isOpen,
  onClose,
  taskId
}) => {
  const handleComplete = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent width="90vw" className="max-w-none overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Care Task Details</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          {taskId && (
            <CareTaskContent 
              taskId={taskId} 
              onComplete={handleComplete}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
