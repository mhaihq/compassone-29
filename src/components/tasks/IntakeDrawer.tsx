import React, { useState } from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface IntakeDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

export const IntakeDrawer: React.FC<IntakeDrawerProps> = ({ task, onClose }) => {
  const [selectedDecision, setSelectedDecision] = useState<string>('');

  const handleFinalize = () => {
    // Handle the finalization based on decision
    console.log('Finalizing intake with decision:', selectedDecision);
    onClose();
  };

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
                      <p className="text-sm text-foreground">"Hi! I'm here to help you complete your intake forms. Can you please provide your insurance card?"</p>
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
                      <p className="text-sm text-foreground">"Sure, I just uploaded a photo. I uploaded my card but it's kind of blurry. Is that okay?"</p>
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
                      <p className="text-sm text-foreground">"I've received your insurance card. Let me verify the information."</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <p className="text-sm font-medium text-foreground">Issue Detected</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decision Panel */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-4">Review Decision</h4>
              <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                <div className="space-y-3">
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
                      <p className="text-xs text-muted-foreground mt-1">Agent will follow up with patient for clarification</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="manual-review" id="manual-review" />
                    <Label htmlFor="manual-review" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="font-medium">Manual Review Required</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Escalate to staff for direct patient contact</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
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
          Submit Decision
        </Button>
      </div>
    </div>
  );
};
