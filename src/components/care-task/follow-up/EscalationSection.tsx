
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';

interface EscalationSectionProps {
  escalationReason: string;
  onEscalationReasonChange: (value: string) => void;
}

export const EscalationSection: React.FC<EscalationSectionProps> = ({
  escalationReason,
  onEscalationReasonChange
}) => {
  return (
    <div className="bg-orange-50 p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <AlertTriangle className="mr-2 text-orange-600" size={16} />
        <h4 className="font-medium text-orange-800">Escalation Reason</h4>
      </div>
      
      <Textarea 
        placeholder="Explain why this needs clinical attention..."
        value={escalationReason}
        onChange={(e) => onEscalationReasonChange(e.target.value)}
        className="mb-4 min-h-[100px]"
      />
      
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="attach-conversation" defaultChecked />
        <label htmlFor="attach-conversation" className="text-sm">
          📎 Attach conversation soundbite + transcript
        </label>
      </div>
      
      <Button className="w-full bg-orange-600 hover:bg-orange-700">
        <AlertTriangle className="mr-2" size={16} />
        Create Escalation Task
      </Button>
    </div>
  );
};
