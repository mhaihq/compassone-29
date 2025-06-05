
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Calendar, Plus } from 'lucide-react';
import { availableScripts, suggestedCombinations } from './constants';

interface AIFollowUpSectionProps {
  selectedScripts: string[];
  customScript: string;
  followUpDate: string;
  onScriptToggle: (scriptId: string, checked: boolean) => void;
  onCustomScriptChange: (value: string) => void;
  onFollowUpDateChange: (value: string) => void;
  onAddCustomScript: () => void;
  onSetScriptCombination: (scripts: string[]) => void;
}

export const AIFollowUpSection: React.FC<AIFollowUpSectionProps> = ({
  selectedScripts,
  customScript,
  followUpDate,
  onScriptToggle,
  onCustomScriptChange,
  onFollowUpDateChange,
  onAddCustomScript,
  onSetScriptCombination
}) => {
  return (
    <div className="space-y-4">
      {/* Script Builder */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center mr-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <h4 className="font-medium">Script Builder</h4>
          </div>
          <Badge variant="outline" className="text-purple-600">
            {selectedScripts.length} Selected
          </Badge>
        </div>
        
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-3">Available Scripts</h5>
          <div className="grid grid-cols-2 gap-3">
            {availableScripts.map((script) => (
              <div key={script.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <Checkbox 
                  id={script.id}
                  checked={selectedScripts.includes(script.id)}
                  onCheckedChange={(checked) => onScriptToggle(script.id, checked === true)}
                />
                <div className="flex-1">
                  <label htmlFor={script.id} className="text-sm font-medium cursor-pointer block">
                    {script.title}
                  </label>
                  <p className="text-xs text-gray-600">{script.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Input 
              placeholder="Add custom script..."
              value={customScript}
              onChange={(e) => onCustomScriptChange(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button onClick={onAddCustomScript}>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2">Suggested Combinations</h5>
          <div className="flex gap-2 flex-wrap">
            {suggestedCombinations.map((combo) => (
              <Button 
                key={combo.id}
                variant="outline" 
                size="sm"
                onClick={() => onSetScriptCombination(combo.scripts)}
                className="text-xs"
              >
                {combo.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Follow-up Date */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Calendar className="mr-2 text-gray-600" size={16} />
          <h4 className="font-medium">Follow-Up Date</h4>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <Input 
            value={followUpDate}
            onChange={(e) => onFollowUpDateChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
