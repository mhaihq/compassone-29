
import React from 'react';
import { Phone, Calendar, Edit3 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FollowUpActionSelectorProps {
  selectedAction: string;
  onActionChange: (action: string) => void;
}

export const FollowUpActionSelector: React.FC<FollowUpActionSelectorProps> = ({
  selectedAction,
  onActionChange
}) => {
  return (
    <div>
      <div className="flex items-center text-red-600 mb-3">
        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
        <span className="font-medium">What should happen next?</span>
      </div>
      
      <RadioGroup value={selectedAction} onValueChange={onActionChange} className="space-y-3">
        <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="call-now" id="call-now" />
          <Phone size={16} className="text-gray-600" />
          <label htmlFor="call-now" className="cursor-pointer">I will call the patient now</label>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 bg-purple-50 border-purple-200 cursor-pointer">
          <RadioGroupItem value="ai-followup" id="ai-followup" />
          <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <label htmlFor="ai-followup" className="cursor-pointer">AI should follow up later</label>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="manual-followup" id="manual-followup" />
          <Calendar size={16} className="text-gray-600" />
          <label htmlFor="manual-followup" className="cursor-pointer">I will follow up later</label>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="escalate" id="escalate" />
          <Edit3 size={16} className="text-gray-600" />
          <label htmlFor="escalate" className="cursor-pointer">Escalate to clinician</label>
        </div>
      </RadioGroup>
    </div>
  );
};
