import React, { useState } from 'react';
import { Calendar, Phone, User, Edit3, AlertTriangle, Plus, PhoneCall } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { TaskCallIntegration } from './TaskCallIntegration';
import { TaskCallContext } from '@/types/taskCallIntegration';

interface FollowUpStepProps {
  taskContext?: TaskCallContext;
}

export const FollowUpStep: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  const [selectedAction, setSelectedAction] = useState('ai-followup');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [customScript, setCustomScript] = useState('');
  const [escalationReason, setEscalationReason] = useState('');
  const [followUpDate, setFollowUpDate] = useState('May 27, 2025');
  const [showCallInterface, setShowCallInterface] = useState(false);

  const handleScriptToggle = (scriptId: string, checked: boolean) => {
    if (checked) {
      setSelectedScripts(prev => [...prev, scriptId]);
    } else {
      setSelectedScripts(prev => prev.filter(id => id !== scriptId));
    }
  };

  const handleStartCall = () => {
    setShowCallInterface(true);
  };

  const handleCallComplete = () => {
    setShowCallInterface(false);
    // Task will be updated through the call integration
  };

  const availableScripts = [
    { id: 'phq9', title: 'PHQ-9 Check-In', description: 'Mental health assessment' },
    { id: 'medication', title: 'Medication Adherence', description: 'Check medication compliance' },
    { id: 'symptom', title: 'Symptom Follow-Up', description: 'Review current symptoms' },
    { id: 'lab', title: 'Lab Results Discussion', description: 'Review lab test results' },
    { id: 'wellness', title: 'General Wellness Check', description: 'General health check-in' },
    { id: 'sleep', title: 'Sleep Assessment', description: 'Review sleep patterns' },
    { id: 'dietary', title: 'Dietary Check', description: 'Nutrition and diet review' },
    { id: 'activity', title: 'Physical Activity', description: 'Exercise and mobility assessment' }
  ];

  const suggestedCombinations = [
    { id: 'mental-health', label: 'Mental Health Focus', scripts: ['phq9', 'symptom', 'sleep'] },
    { id: 'medication-review', label: 'Medication Review', scripts: ['medication', 'symptom', 'lab'] },
    { id: 'wellness-check', label: 'Wellness Check', scripts: ['wellness', 'dietary', 'activity'] }
  ];

  if (showCallInterface && taskContext) {
    return (
      <TaskCallIntegration
        taskContext={taskContext}
        onCallComplete={handleCallComplete}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 text-blue-500" size={20} />
          Set up the next steps for this patient
        </CardTitle>
        {taskContext && (
          <div className="text-sm text-gray-600">
            Task: {taskContext.taskTitle} • Patient: {taskContext.patientName}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What happens next section */}
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="mr-2 text-blue-500" size={16} />
            <h3 className="font-medium">What happens next?</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center text-red-600 mb-3">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span className="font-medium">What should happen next?</span>
            </div>
            
            <RadioGroup value={selectedAction} onValueChange={setSelectedAction} className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="call-now" id="call-now" />
                <Phone size={16} className="text-gray-600" />
                <label htmlFor="call-now" className="cursor-pointer">I will call the patient now</label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 bg-purple-50 border-purple-200">
                <RadioGroupItem value="ai-followup" id="ai-followup" />
                <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <label htmlFor="ai-followup" className="cursor-pointer">AI should follow up later</label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="manual-followup" id="manual-followup" />
                <Calendar size={16} className="text-gray-600" />
                <label htmlFor="manual-followup" className="cursor-pointer">I will follow up later</label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="escalate" id="escalate" />
                <Edit3 size={16} className="text-gray-600" />
                <label htmlFor="escalate" className="cursor-pointer">Escalate to clinician</label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Content based on selection */}
        {selectedAction === 'call-now' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <Button 
              className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleStartCall}
              disabled={!taskContext}
            >
              <PhoneCall className="mr-2" size={16} />
              Start Task-Integrated Call
            </Button>
            <p className="text-sm text-blue-700">
              This will launch the AI-enhanced call interface with task context and pre-call insights.
            </p>
            
            <div className="mt-4">
              <h4 className="font-medium text-blue-800 mb-2">Call Suggestions</h4>
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-blue-700">Conversation Starters</h5>
                  <ul className="text-sm text-blue-600 ml-4 space-y-1">
                    <li>• Hello, this is [Your Name] from [Practice Name]. How are you feeling today?</li>
                    <li>• I'm calling to follow up on your recent visit. Do you have a few minutes to talk?</li>
                    <li>• I wanted to check in about your medication and see how it's working for you.</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-blue-700">Key Topics to Cover</h5>
                  <ul className="text-sm text-blue-600 ml-4 space-y-1">
                    <li>• Medication adherence and any side effects</li>
                    <li>• Changes in symptoms since last conversation</li>
                    <li>• Follow-up questions about recent lab results</li>
                    <li>• Any new concerns or questions about their care plan</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-blue-700">Closing the Call</h5>
                  <ul className="text-sm text-blue-600 ml-4 space-y-1">
                    <li>• Summarize key points and next steps</li>
                    <li>• Confirm patient understanding of any instructions</li>
                    <li>• Set expectations for the next follow-up</li>
                    <li>• Ask if they have any remaining questions or concerns</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                <strong>Pro tip:</strong> This call will be automatically documented and integrated with the task system.
              </div>
            </div>
          </div>
        )}

        {selectedAction === 'ai-followup' && (
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
                        onCheckedChange={(checked) => handleScriptToggle(script.id, checked as boolean)}
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
                    onChange={(e) => setCustomScript(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <Button 
                    onClick={() => {
                      if (customScript.trim()) {
                        setCustomScript('');
                      }
                    }}
                  >
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
                      onClick={() => setSelectedScripts(combo.scripts)}
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
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {selectedAction === 'escalate' && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <AlertTriangle className="mr-2 text-orange-600" size={16} />
              <h4 className="font-medium text-orange-800">Escalation Reason</h4>
            </div>
            
            <Textarea 
              placeholder="Explain why this needs clinical attention..."
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
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
        )}
      </CardContent>
    </Card>
  );
};
