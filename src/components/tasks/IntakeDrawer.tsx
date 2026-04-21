import React, { useState } from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { FileText, CheckCircle, XCircle, AlertTriangle, Upload, Calendar, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TaskOutcomeActions } from '@/components/care-task/TaskOutcomeActions';
import { emptyTaskOutcome, type TaskOutcome } from '@/types/taskOutcome';

interface IntakeDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

export const IntakeDrawer: React.FC<IntakeDrawerProps> = ({ task, onClose }) => {
  const [selectedDecision, setSelectedDecision] = useState<string>('');
  const [outcome, setOutcome] = useState<TaskOutcome>(emptyTaskOutcome);

  const handleFinalize = () => {
    void selectedDecision;
    void outcome;
    onClose();
  };

  // Determine task category for dynamic rendering
  const isAssessmentIntake = task.subtype?.includes('assessment');
  const isDocumentation = task.taskType === 'Documentation';
  const isScheduling = task.taskType === 'Scheduling';
  const isInsurance = task.taskType === 'Insurance';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
          <Badge variant="secondary">Intake Review</Badge>
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
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-6 space-y-6">
          
          {/* Assessment Intake: Form Data + Transcript */}
          {isAssessmentIntake && (
            <>
              {/* Form Data Section */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-3">Intake Form Data</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-medium text-foreground">{task.patientName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="text-sm font-medium text-foreground">08/15/1972</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium text-foreground">(555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium text-foreground">patient@email.com</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Insurance Provider</p>
                        <p className="text-sm font-medium text-foreground">Blue Cross Blue Shield</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Member ID</p>
                        <p className="text-sm font-medium text-foreground">ABC123456789</p>
                      </div>
                    </div>
                    
                    {task.intakeDocuments && task.intakeDocuments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">Documents Status</p>
                        {task.intakeDocuments.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{doc.name}</span>
                            </div>
                            {doc.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Agent Transcript Section */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-3">Agent Conversation Transcript</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-accent rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          AI
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Agent</p>
                          <p className="text-sm text-foreground">"Hi! I'm here to help you complete your intake forms. Can you please provide your insurance information?"</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-medium">
                          P
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Patient</p>
                          <p className="text-sm text-foreground">"Sure, I have Blue Cross Blue Shield. My member ID is ABC123456789."</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-accent rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          AI
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Agent</p>
                          <p className="text-sm text-foreground">"Thank you. I've collected all necessary information for your {task.subtype?.replace('-', ' ')} intake."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Documentation Tasks: Missing Documents */}
          {isDocumentation && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-foreground">Missing Documentation</h4>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">{task.description}</p>
                    </div>
                  </div>

                  {task.intakeDocuments && task.intakeDocuments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Document Status</p>
                      {task.intakeDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{doc.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{doc.status}</p>
                            </div>
                          </div>
                          {doc.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : doc.status === 'pending' ? (
                            <Clock className="w-4 h-4 text-amber-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Agent Action Taken</p>
                    <p className="text-sm text-foreground">Email sent to patient requesting {task.title.toLowerCase()} upload. Follow-up scheduled in 2 days if not received.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scheduling Tasks: Appointment Needs */}
          {isScheduling && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-foreground">Appointment Scheduling</h4>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Patient</p>
                    <p className="text-sm font-medium text-foreground">{task.patientName}</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Appointment Type Needed</p>
                    <p className="text-sm font-medium text-foreground">{task.description}</p>
                  </div>

                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Agent Status</p>
                    <p className="text-sm text-foreground">Called patient to schedule. Patient requested callback with available times.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Insurance Tasks: Authorization */}
          {isInsurance && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-foreground">Insurance Authorization</h4>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Patient</p>
                    <p className="text-sm font-medium text-foreground">{task.patientName}</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Authorization Required</p>
                    <p className="text-sm font-medium text-foreground">{task.description}</p>
                  </div>

                  <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">Action Required</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Prior authorization must be obtained before services can begin</p>
                  </div>

                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Documents Collected</p>
                    <p className="text-sm text-foreground">Medical necessity documentation and treatment plan prepared for submission</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Decision Panel - Adapts based on task type */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-4">Review Decision</h4>
              <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                <div className="space-y-3">
                  {/* Assessment Intake Options */}
                  {isAssessmentIntake && (
                    <>
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="approve" id="approve" />
                        <Label htmlFor="approve" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">Approve & Push to EHR</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">All information verified, ready to submit</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="additional-info" id="additional-info" />
                        <Label htmlFor="additional-info" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">Request Additional Information</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Agent will follow up with patient</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="manual-review" id="manual-review" />
                        <Label htmlFor="manual-review" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-destructive" />
                            <span className="font-medium">Manual Review Required</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Escalate to staff for direct contact</p>
                        </Label>
                      </div>
                    </>
                  )}

                  {/* Documentation Options */}
                  {isDocumentation && (
                    <>
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="received" id="received" />
                        <Label htmlFor="received" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">Document Received</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Mark as complete and proceed with intake</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="follow-up" id="follow-up" />
                        <Label htmlFor="follow-up" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">Continue Follow-Up</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Agent will send another reminder</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="escalate-doc" id="escalate-doc" />
                        <Label htmlFor="escalate-doc" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <span className="font-medium">Escalate to Staff</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Staff will contact patient directly</p>
                        </Label>
                      </div>
                    </>
                  )}

                  {/* Scheduling Options */}
                  {isScheduling && (
                    <>
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="schedule" id="schedule" />
                        <Label htmlFor="schedule" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">Schedule Appointment</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Proceed with booking</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="callback" id="callback" />
                        <Label htmlFor="callback" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">Schedule Callback</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Agent will call back with options</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="defer" id="defer" />
                        <Label htmlFor="defer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Patient Declined</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Patient not ready to schedule</p>
                        </Label>
                      </div>
                    </>
                  )}

                  {/* Insurance Options */}
                  {isInsurance && (
                    <>
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="submit-auth" id="submit-auth" />
                        <Label htmlFor="submit-auth" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">Submit Authorization</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">All documents ready for submission</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="need-more-info" id="need-more-info" />
                        <Label htmlFor="need-more-info" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">Need More Documentation</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Additional clinical information required</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="escalate-billing" id="escalate-billing" />
                        <Label htmlFor="escalate-billing" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-destructive" />
                            <span className="font-medium">Escalate to Billing Team</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Complex authorization requires specialist</p>
                        </Label>
                      </div>
                    </>
                  )}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <TaskOutcomeActions outcome={outcome} onChange={setOutcome} />
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={handleFinalize}
          disabled={!selectedDecision}
        >
          {outcome.countsForBilling ? 'Submit and Add to Billing' : 'Submit Decision'}
        </Button>
      </div>
    </div>
  );
};
