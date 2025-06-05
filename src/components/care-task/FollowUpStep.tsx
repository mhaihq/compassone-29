import React, { useState } from 'react';
import { Calendar, Phone, User, Edit3, AlertTriangle, Plus, PhoneCall, Brain, Sparkles, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { TaskCallIntegration } from './TaskCallIntegration';
import { TaskPreCallIntelligence } from './call-integration/TaskPreCallIntelligence';
import { CallQualityMetrics } from './call-integration/CallQualityMetrics';
import { SourceCitationSystem } from './call-integration/SourceCitationSystem';
import { EHRIntegration } from './call-integration/EHRIntegration';
import { ComprehensiveCallAnalytics } from './call-integration/ComprehensiveCallAnalytics';
import { TaskCallContext } from '@/types/taskCallIntegration';
import { AICallSummary, generateCallSummary } from '@/services/aiCallService';
import { useToast } from '@/hooks/use-toast';

interface FollowUpStepProps {
  taskContext?: TaskCallContext;
}

// Available scripts for AI follow-up
const availableScripts = [
  {
    id: 'medication-reminder',
    title: 'Medication Reminder',
    description: 'Remind patient about medication schedule'
  },
  {
    id: 'appointment-followup',
    title: 'Appointment Follow-up',
    description: 'Follow up on recent appointment'
  },
  {
    id: 'symptom-check',
    title: 'Symptom Check',
    description: 'Check on current symptoms and status'
  },
  {
    id: 'care-plan-review',
    title: 'Care Plan Review',
    description: 'Review and discuss care plan progress'
  }
];

// Suggested script combinations
const suggestedCombinations = [
  {
    id: 'routine-checkup',
    label: 'Routine Check-up',
    scripts: ['symptom-check', 'medication-reminder']
  },
  {
    id: 'post-appointment',
    label: 'Post-Appointment',
    scripts: ['appointment-followup', 'care-plan-review']
  },
  {
    id: 'medication-focus',
    label: 'Medication Focus',
    scripts: ['medication-reminder']
  }
];

export const FollowUpStep: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  const [selectedAction, setSelectedAction] = useState('ai-followup');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [customScript, setCustomScript] = useState('');
  const [escalationReason, setEscalationReason] = useState('');
  const [followUpDate, setFollowUpDate] = useState('May 27, 2025');
  const [showCallInterface, setShowCallInterface] = useState(false);
  const [showPreCallIntel, setShowPreCallIntel] = useState(false);
  const [callCompleted, setCallCompleted] = useState(false);
  const [callSummary, setCallSummary] = useState<AICallSummary | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();

  // Create a default task context if none is provided
  const defaultTaskContext: TaskCallContext = {
    taskId: 'demo-task-001',
    taskTitle: 'Monthly Stability Review',
    taskType: 'Monthly Stability Review',
    patientId: 'PAT-001',
    patientName: 'Sarah Johnson',
    priority: 'Medium',
    dueDate: '2025-06-07',
    assignedTo: 'Dr. Smith',
    status: 'in_progress'
  };

  const activeTaskContext = taskContext || defaultTaskContext;

  const handleScriptToggle = (scriptId: string, checked: boolean) => {
    if (checked) {
      setSelectedScripts(prev => [...prev, scriptId]);
    } else {
      setSelectedScripts(prev => prev.filter(id => id !== scriptId));
    }
  };

  const handleStartPreCallIntel = () => {
    console.log('Starting pre-call intelligence...');
    setShowPreCallIntel(true);
  };

  const handleStartCall = () => {
    console.log('Starting direct call...');
    setShowPreCallIntel(false);
    setShowCallInterface(true);
  };

  const handleCallComplete = async () => {
    console.log('Call completed, generating summary...');
    setShowCallInterface(false);
    setCallCompleted(true);
    
    // Generate comprehensive call summary
    const summary = await generateCallSummary(activeTaskContext.patientId, [], '14:32');
    setCallSummary(summary);
    
    toast({
      title: "Call Completed Successfully",
      description: "AI analysis complete. Comprehensive documentation ready for review."
    });
  };

  const handleViewAnalytics = () => {
    console.log('Viewing analytics...');
    setShowAnalytics(true);
  };

  const handleEHRSubmit = (ehrData: any) => {
    console.log('EHR data submitted:', ehrData);
    toast({
      title: "Documentation Submitted",
      description: "Call documentation has been successfully submitted to the EHR system."
    });
  };

  // Mock analytics data
  const mockAnalytics = {
    callEfficiency: 94,
    patientSatisfaction: 89,
    clinicalObjectivesAchieved: 92,
    aiAssistanceUtilization: 87,
    protocolAdherence: 96,
    timeAllocation: {
      assessment: 35,
      intervention: 40,
      planning: 20,
      documentation: 5
    },
    comparisonToBaseline: {
      averageCallDuration: '12:45 avg',
      patientEngagement: 89,
      outcomesAchieved: 92
    }
  };

  const mockMetrics = {
    duration: '14:32',
    insightsUsed: 3,
    questionsAsked: 8,
    patientEngagement: 0.89,
    callQuality: 'excellent' as const,
    taskCompletionRate: 0.92,
    aiAssistanceUtilization: 0.87
  };

  const mockCitations = [
    {
      id: 'cite-1',
      timestamp: '3:45',
      patientQuote: 'I\'ve been feeling much better since we increased my medication dose',
      clinicianResponse: 'That\'s great to hear. Any side effects you\'ve noticed?',
      context: 'Medication effectiveness discussion',
      evidenceType: 'verbal' as const,
      relevantInsight: 'Recent medication increase showing positive response',
      confidence: 0.92
    },
    {
      id: 'cite-2',
      timestamp: '7:12',
      patientQuote: 'My sleep has been much more consistent, usually 7-8 hours now',
      clinicianResponse: 'Excellent improvement in sleep patterns',
      context: 'Sleep quality assessment',
      evidenceType: 'clinical_observation' as const,
      relevantInsight: 'Sleep pattern improvement aligns with treatment goals',
      confidence: 0.88
    }
  ];

  // Show Pre-Call Intelligence
  if (showPreCallIntel) {
    return (
      <div className="space-y-6">
        <TaskPreCallIntelligence
          taskContext={activeTaskContext}
          onStartCall={handleStartCall}
        />
        <Button 
          variant="outline" 
          onClick={() => setShowPreCallIntel(false)}
          className="w-full"
        >
          Back to Follow-up Options
        </Button>
      </div>
    );
  }

  // Show Call Interface
  if (showCallInterface) {
    return (
      <TaskCallIntegration
        taskContext={activeTaskContext}
        onCallComplete={handleCallComplete}
      />
    );
  }

  // Show Analytics View
  if (showAnalytics && callSummary) {
    return (
      <div className="space-y-6">
        <ComprehensiveCallAnalytics
          analytics={mockAnalytics}
          taskType={activeTaskContext.taskType}
          callDuration="14:32"
        />
        <Button 
          variant="outline" 
          onClick={() => setShowAnalytics(false)}
          className="w-full"
        >
          Back to Summary
        </Button>
      </div>
    );
  }

  // Show Post-Call Summary and Documentation
  if (callCompleted && callSummary) {
    return (
      <div className="space-y-6">
        {/* Call Completion Header */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-green-600" />
              Call Completed - AI Analysis Complete
            </CardTitle>
            <p className="text-sm text-green-700">
              Comprehensive documentation and analysis ready for review
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <Button onClick={handleViewAnalytics} variant="outline" className="flex-1">
                <Brain className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button onClick={() => setCallCompleted(false)} variant="outline" className="flex-1">
                Return to Tasks
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call Quality Metrics */}
        <CallQualityMetrics 
          metrics={mockMetrics}
          taskType={activeTaskContext.taskType}
        />

        {/* Source Citations */}
        <SourceCitationSystem
          citations={mockCitations}
          callDuration="14:32"
        />

        {/* EHR Integration */}
        <EHRIntegration
          callSummary={callSummary}
          taskId={activeTaskContext.taskId}
          onEHRSubmit={handleEHRSubmit}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 text-blue-500" size={20} />
          Set up the next steps for this patient
        </CardTitle>
        <div className="text-sm text-gray-600">
          Task: {activeTaskContext.taskTitle} • Patient: {activeTaskContext.patientName}
        </div>
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
        </div>

        {/* Content based on selection */}
        {selectedAction === 'call-now' && (
          <div className="space-y-6">
            {/* Enhanced Careco AI Features Highlight */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">Careco AI-Enhanced Calling</h3>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Full AI Suite
                </Badge>
              </div>
              <p className="text-purple-800 mb-4">
                Complete AI-powered calling experience with pre-call intelligence, real-time assistance, and comprehensive post-call documentation.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-800">Pre-call intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-800">Real-time transcription</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">Source citations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-800">EHR integration</span>
                </div>
              </div>
            </div>

            {/* Enhanced Call Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Call Time</p>
                    <p className="text-lg font-semibold">12 min</p>
                    <p className="text-xs text-green-600">↓ 30% with Careco AI</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">AI Intelligence</p>
                    <p className="text-lg font-semibold">Ready</p>
                    <p className="text-xs text-purple-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      4 insights available
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-lg font-semibold">96%</p>
                    <p className="text-xs text-green-600">Task completion rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Call Actions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="space-y-4">
                <Button 
                  className="w-full mb-2 bg-purple-600 hover:bg-purple-700 h-12 text-lg relative z-10"
                  onClick={handleStartPreCallIntel}
                >
                  <Brain className="mr-2" size={20} />
                  Start with AI Pre-Call Intelligence
                  <Badge className="ml-2 bg-purple-500 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                </Button>
                
                <Button 
                  className="w-full bg-[#1E4D36] hover:bg-[#2A6349] h-12 text-lg relative z-10"
                  onClick={handleStartCall}
                  variant="outline"
                >
                  <PhoneCall className="mr-2" size={20} />
                  Direct Call (Skip Intelligence)
                </Button>
              </div>
              
              <p className="text-sm text-blue-700 text-center mt-4">
                Get AI-powered insights about the patient and task before your call, or jump straight into the enhanced calling interface.
              </p>
            </div>

            {/* Careco Features Showcase */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Pre-Call Intelligence</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Task-specific patient insights</li>
                  <li>• Medication alerts & changes</li>
                  <li>• Behavioral pattern analysis</li>
                  <li>• Suggested conversation topics</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Live Call Assistant</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Real-time transcription</li>
                  <li>• AI conversation guidance</li>
                  <li>• Automatic note-taking</li>
                  <li>• Task progress tracking</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Post-Call Documentation</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Automatic SOAP notes</li>
                  <li>• Source citations & evidence</li>
                  <li>• Call quality analytics</li>
                  <li>• EHR integration ready</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Task Integration</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Automatic task updates</li>
                  <li>• Follow-up scheduling</li>
                  <li>• Outcome documentation</li>
                  <li>• Care plan integration</li>
                </ul>
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
                        onCheckedChange={(checked) => handleScriptToggle(script.id, checked === true)}
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
