import React, { useState } from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { Calendar, Clock, Phone, Mail, MessageSquare, CheckCircle, XCircle, DollarSign, AlertTriangle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScriptBuilder } from './ScriptBuilder';
import { TaskOutcomeActions } from '@/components/care-task/TaskOutcomeActions';
import { emptyTaskOutcome, type TaskOutcome } from '@/types/taskOutcome';

interface CoordinationDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

const STEPS = [
  'Missed Appointment',
  'Policy Check',
  'Outreach Options',
  'Finalize'
];

const SCRIPT_TEMPLATES = [
  { id: 'reschedule', title: 'Reschedule Outreach', description: 'Friendly reminder to reschedule' },
  { id: 'payment', title: 'Payment Request', description: 'Request payment for missed appointment' },
  { id: 'engagement', title: 'Engagement Nudge', description: 'Re-engage inactive patient' },
  { id: 'verify', title: 'Contact Verification', description: 'Verify contact information' }
];

const SCRIPT_COMBINATIONS = [
  { id: 'gentle', label: 'Gentle Follow-up', scripts: ['reschedule', 'verify'], description: 'Soft approach for reschedule' },
  { id: 'standard', label: 'Standard Policy', scripts: ['reschedule', 'payment'], description: 'Standard no-show protocol' },
  { id: 'urgent', label: 'Urgent Re-engagement', scripts: ['engagement', 'verify'], description: 'For at-risk patients' }
];

export const CoordinationDrawer: React.FC<CoordinationDrawerProps> = ({ task, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<string>('');
  const [feeWaiverReason, setFeeWaiverReason] = useState('');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<TaskOutcome>(emptyTaskOutcome);

  const handleScriptToggle = (scriptId: string, checked: boolean) => {
    setSelectedScripts(prev => 
      checked ? [...prev, scriptId] : prev.filter(id => id !== scriptId)
    );
  };

  const canProceed = () => {
    if (currentStep === 1 && !selectedDecision) return false;
    if (currentStep === 1 && selectedDecision === 'waive' && !feeWaiverReason.trim()) return false;
    if (currentStep === 2 && selectedScripts.length === 0) return false;
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Missed Appointment
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Why This Was Flagged
                </h4>
                <p className="text-sm text-muted-foreground">
                  Patient missed appointment. AI attempted 3 calls + 1 SMS, no confirmation received.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Outreach Log
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Call Attempt #1</p>
                        <p className="text-xs text-muted-foreground">Today, 9:00 AM</p>
                      </div>
                    </div>
                    <XCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Call Attempt #2</p>
                        <p className="text-xs text-muted-foreground">Today, 11:00 AM</p>
                      </div>
                    </div>
                    <XCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">SMS Sent</p>
                        <p className="text-xs text-muted-foreground">Today, 1:00 PM</p>
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Call Attempt #3</p>
                        <p className="text-xs text-muted-foreground">Today, 3:00 PM</p>
                      </div>
                    </div>
                    <XCircle className="w-4 h-4 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-2">Evidence</h4>
                <div className="p-3 bg-accent rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Call #2 - Voicemail</p>
                  <p className="text-sm text-foreground italic">"I couldn't get a ride. Can I reschedule?"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 1: // Policy Check
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Decision Panel
                </h4>
                <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="charge" id="charge" />
                      <Label htmlFor="charge" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">Charge Fee</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Apply standard no-show fee</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="waive" id="waive" />
                      <Label htmlFor="waive" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium">Waive Fee</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Waive fee with documented reason</p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {selectedDecision === 'waive' && (
                  <div className="mt-4">
                    <Label htmlFor="reason" className="text-sm font-medium">Reason for Waiver</Label>
                    <Textarea
                      id="reason"
                      placeholder="Document reason for fee waiver..."
                      value={feeWaiverReason}
                      onChange={(e) => setFeeWaiverReason(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Reschedule
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Verify Contact
              </Button>
            </div>
          </div>
        );

      case 2: // Outreach Options
        return (
          <div className="space-y-4">
            <ScriptBuilder
              scripts={SCRIPT_TEMPLATES}
              combinations={SCRIPT_COMBINATIONS}
              selectedScripts={selectedScripts}
              onScriptToggle={handleScriptToggle}
              preview={
                selectedScripts.length > 0 ? (
                  <div className="text-sm text-foreground">
                    <p className="mb-2">Selected scripts will be sent to patient:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedScripts.map(id => {
                        const script = SCRIPT_TEMPLATES.find(s => s.id === id);
                        return <li key={id}>{script?.title}</li>;
                      })}
                    </ul>
                  </div>
                ) : null
              }
            />

            <Card>
              <CardContent className="p-4">
                <Label htmlFor="appointment-date" className="text-sm font-medium">Proposed Appointment Date</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="appointment-date"
                    type="datetime-local"
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3: // Finalize
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3">Review & Approve</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Decision:</span>
                    <Badge className={selectedDecision === 'charge' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}>
                      {selectedDecision === 'charge' ? 'Fee Charged' : 'Fee Waived'}
                    </Badge>
                  </div>
                  {selectedDecision === 'waive' && feeWaiverReason && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Waiver Reason:</p>
                      <p className="text-sm text-foreground p-2 bg-muted rounded">{feeWaiverReason}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Outreach Scripts:</span>
                    <span className="text-sm font-medium text-foreground">{selectedScripts.length} selected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TaskOutcomeActions outcome={outcome} onChange={setOutcome} />

            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="font-medium">Ready to Finalize</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  This will lock the result and update the patient record.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
          <Badge className="bg-violet-50 text-violet-700 border-violet-200">
            Coordination
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Patient:</span>{' '}
            <span className="font-medium text-foreground">{task.patientName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Due:</span>{' '}
            <span className="font-medium text-foreground">{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Step Progress */}
        <div className="mt-4 flex items-center gap-2">
          {STEPS.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`flex-1 flex items-center gap-2 ${index <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index < currentStep ? 'bg-primary text-primary-foreground' :
                  index === currentStep ? 'bg-primary text-primary-foreground ring-2 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`text-xs font-medium hidden md:inline ${
                  index === currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-px w-4 ${index < currentStep ? 'bg-primary' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-6 py-4">
        {renderStepContent()}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4 flex gap-2">
        {currentStep > 0 && (
          <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
        )}
        {currentStep < STEPS.length - 1 ? (
          <Button 
            className="flex-1" 
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!canProceed()}
          >
            Next: {STEPS[currentStep + 1]}
          </Button>
        ) : (
          <Button
            className="flex-1"
            onClick={onClose}
          >
            {outcome.countsForBilling ? 'Approve, Finalize & Add to Billing' : 'Approve & Finalize'}
          </Button>
        )}
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
