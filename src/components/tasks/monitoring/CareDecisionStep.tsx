import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface CareDecisionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const CareDecisionStep: React.FC<CareDecisionStepProps> = ({
  onNext,
  onBack
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [showScriptBuilder, setShowScriptBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customScript, setCustomScript] = useState('');

  const scriptTemplates = [
    {
      id: 'follow-up-call',
      name: 'Follow-up Call Script',
      type: 'call' as const,
      content: 'Hi [Patient Name], this is [Your Name] from the care team. I wanted to check in about your recent assessment...'
    },
    {
      id: 'medication-reminder',
      name: 'Medication Reminder',
      type: 'sms' as const,
      content: 'Hi [Patient Name], this is a reminder about your medication schedule. Please contact us if you have any questions.'
    },
    {
      id: 'appointment-scheduling',
      name: 'Appointment Request',
      type: 'email' as const,
      content: 'Dear [Patient Name], We would like to schedule a follow-up appointment to discuss your care plan...'
    }
  ];

  const decisionOptions = [
    {
      id: 'approve-risk',
      label: 'Approve Risk Level',
      description: 'Confirm risk assessment and proceed with care plan',
      icon: CheckCircle2,
      color: 'emerald',
      requiresNotes: true
    },
    {
      id: 'modify-plan',
      label: 'Modify Care Plan',
      description: 'Adjust treatment or monitoring frequency',
      icon: AlertTriangle,
      color: 'amber',
      requiresNotes: true
    },
    {
      id: 'escalate',
      label: 'Escalate to QHP',
      description: 'Requires qualified healthcare provider review',
      icon: AlertTriangle,
      color: 'red',
      requiresNotes: true
    },
    {
      id: 'schedule-call',
      label: 'Schedule Follow-up Call',
      description: 'Direct patient outreach needed',
      icon: Phone,
      color: 'blue',
      requiresNotes: false,
      hasScript: true
    },
    {
      id: 'send-message',
      label: 'Send Patient Message',
      description: 'Automated or manual message via preferred channel',
      icon: MessageSquare,
      color: 'violet',
      requiresNotes: false,
      hasScript: true
    }
  ];

  const selectedOption = decisionOptions.find(opt => opt.id === selectedAction);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Decision Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {decisionOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedAction === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedAction(option.id);
                    setShowScriptBuilder(false);
                  }}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 text-${option.color}-600`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {option.hasScript && (
                          <Badge variant="outline" className="text-xs">
                            Script Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedOption?.requiresNotes && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Clinical Notes (Required)</label>
              <Textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Document your clinical decision and rationale..."
                className="min-h-[100px]"
              />
            </div>
          )}

          {selectedOption?.hasScript && !showScriptBuilder && (
            <Button
              variant="outline"
              onClick={() => setShowScriptBuilder(true)}
              className="w-full"
            >
              Build Communication Script →
            </Button>
          )}

          {showScriptBuilder && selectedOption?.hasScript && (
            <Card className="p-4 mt-4 bg-violet-50">
              <h4 className="text-sm font-medium mb-3">Script Builder</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {scriptTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className="justify-start text-left"
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setCustomScript(template.content);
                      }}
                    >
                      <span className="truncate">{template.name}</span>
                    </Button>
                  ))}
                </div>
                {selectedTemplate && (
                  <Textarea
                    value={customScript}
                    onChange={(e) => setCustomScript(e.target.value)}
                    placeholder="Customize your message..."
                    className="min-h-[120px]"
                  />
                )}
              </div>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedAction || (selectedOption?.requiresNotes && !clinicalNotes.trim())}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Continue to Review →
        </Button>
      </div>
    </div>
  );
};
