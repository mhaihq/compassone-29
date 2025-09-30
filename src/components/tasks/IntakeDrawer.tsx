import React, { useState } from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { FileText, Image as ImageIcon, CheckCircle, XCircle, Phone, AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScriptBuilder } from './ScriptBuilder';

interface IntakeDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

const STEPS = [
  'Form Review',
  'Evidence Check',
  'Resolution Action',
  'Finalize'
];

const SCRIPT_TEMPLATES = [
  { id: 'insurance-reask', title: 'Insurance Re-ask', description: 'Request updated insurance information' },
  { id: 'consent', title: 'Consent Capture', description: 'Obtain required consents' },
  { id: 'demographics', title: 'Demographics Fix', description: 'Update patient information' },
  { id: 'document', title: 'Document Request', description: 'Request specific documents' }
];

const SCRIPT_COMBINATIONS = [
  { id: 'insurance-fix', label: 'Insurance Fix', scripts: ['insurance-reask'], description: 'Quick insurance update' },
  { id: 'full-intake', label: 'Full Re-intake', scripts: ['insurance-reask', 'consent', 'demographics'], description: 'Complete intake redo' },
  { id: 'documents', label: 'Document Collection', scripts: ['document', 'consent'], description: 'Focus on missing docs' }
];

export const IntakeDrawer: React.FC<IntakeDrawerProps> = ({ task, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState('');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);

  const handleScriptToggle = (scriptId: string, checked: boolean) => {
    setSelectedScripts(prev => 
      checked ? [...prev, scriptId] : prev.filter(id => id !== scriptId)
    );
  };

  const canProceed = () => {
    if (currentStep === 1 && !selectedDecision) return false;
    if (currentStep === 1 && selectedDecision === 'override' && !overrideReason.trim()) return false;
    if (currentStep === 2 && selectedDecision === 'reask' && selectedScripts.length === 0) return false;
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Form Review
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Why This Was Flagged
                </h4>
                <p className="text-sm text-muted-foreground">
                  Insurance verification failed – card image unreadable. Patient uploaded blurry photo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3">Form Completion Status</h4>
                <div className="space-y-3">
                  {task.intakeDocuments?.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      {doc.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 1: // Evidence Check
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Evidence
                </h4>
                
                <div className="space-y-3">
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Transcript Quote</p>
                    <p className="text-sm text-foreground italic">"I uploaded my card but it's kind of blurry. Is that okay?"</p>
                  </div>

                  <div className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Uploaded Insurance Card</p>
                      <Badge variant="outline" className="text-destructive border-destructive">
                        Low Quality
                      </Badge>
                    </div>
                    <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Image quality too low for verification</p>
                  </div>

                  <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">Eligibility Check Failed</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Unable to verify insurance details from submitted image</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Decision Panel
                </h4>
                <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="approve" id="approve" />
                      <Label htmlFor="approve" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium">Approve & Push to EHR</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Verification successful, proceed with enrollment</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="reask" id="reask" />
                      <Label htmlFor="reask" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Request Re-submission</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">AI agent will retry with clearer instructions</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="call" id="call" />
                      <Label htmlFor="call" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-violet-600" />
                          <span className="font-medium">Call Patient</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Manual intervention needed</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="override" id="override" />
                      <Label htmlFor="override" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">Override Requirements</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Requires documented justification</p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {selectedDecision === 'override' && (
                  <div className="mt-4">
                    <Label htmlFor="override-reason" className="text-sm font-medium">Override Justification</Label>
                    <Textarea
                      id="override-reason"
                      placeholder="Document reason for override..."
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 2: // Resolution Action
        return (
          <div className="space-y-4">
            {selectedDecision === 'reask' && (
              <ScriptBuilder
                scripts={SCRIPT_TEMPLATES}
                combinations={SCRIPT_COMBINATIONS}
                selectedScripts={selectedScripts}
                onScriptToggle={handleScriptToggle}
                preview={
                  selectedScripts.length > 0 ? (
                    <div className="text-sm text-foreground">
                      <p className="mb-2">Patient will receive:</p>
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
            )}

            {selectedDecision === 'call' && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Patient Now
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Initiate call to collect insurance information manually
                  </p>
                  <Button className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    Start Call
                  </Button>
                </CardContent>
              </Card>
            )}

            {selectedDecision === 'approve' && (
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-emerald-700 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <h4 className="font-medium">Ready to Approve</h4>
                  </div>
                  <p className="text-sm text-emerald-600">
                    Patient information will be pushed to EHR system
                  </p>
                </CardContent>
              </Card>
            )}

            {selectedDecision === 'override' && overrideReason && (
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="font-medium">Override Active</h4>
                  </div>
                  <p className="text-sm text-amber-600 mb-2">
                    Requirements will be bypassed with documented reason
                  </p>
                  <div className="p-2 bg-white rounded text-sm text-foreground">
                    {overrideReason}
                  </div>
                </CardContent>
              </Card>
            )}
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
                    <Badge className={
                      selectedDecision === 'approve' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      selectedDecision === 'reask' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      selectedDecision === 'call' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }>
                      {selectedDecision === 'approve' ? 'Approved' :
                       selectedDecision === 'reask' ? 'Re-submission Requested' :
                       selectedDecision === 'call' ? 'Manual Call' :
                       'Override Applied'}
                    </Badge>
                  </div>
                  
                  {selectedDecision === 'override' && overrideReason && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Override Reason:</p>
                      <p className="text-sm text-foreground p-2 bg-muted rounded">{overrideReason}</p>
                    </div>
                  )}
                  
                  {selectedDecision === 'reask' && selectedScripts.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Scripts Selected:</span>
                      <span className="text-sm font-medium text-foreground">{selectedScripts.length} scripts</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="font-medium">Ready to Finalize</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedDecision === 'approve' 
                    ? 'Patient record will be updated in EHR system'
                    : 'This action will be logged and task will be updated'}
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
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Intake
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
            Approve & Finalize
          </Button>
        )}
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
