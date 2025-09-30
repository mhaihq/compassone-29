import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, RefreshCw, Phone, AlertTriangle } from 'lucide-react';
import { ScriptBuilder } from '../coordination/ScriptBuilder';

interface ResolutionActionStepProps {
  onDecisionChange: (decision: any) => void;
}

export const ResolutionActionStep: React.FC<ResolutionActionStepProps> = ({ onDecisionChange }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customScript, setCustomScript] = useState('');

  const scriptTemplates = [
    {
      id: 'insurance-reask',
      name: 'Insurance Re-ask',
      type: 'call' as const,
      content: 'Hi [Patient], we need a clearer photo of your insurance card. Could you please take a new photo in good lighting and upload it through our patient portal?'
    },
    {
      id: 'consent-capture',
      name: 'Consent Capture',
      type: 'sms' as const,
      content: 'Hi [Patient], we need your digital signature on the consent form. Please click this link to complete: [LINK]'
    },
    {
      id: 'demographics-fix',
      name: 'Demographics Fix',
      type: 'email' as const,
      content: 'Dear [Patient], we noticed some information is missing from your intake form. Please log in to your patient portal to complete the required fields.'
    }
  ];

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    const template = scriptTemplates.find(t => t.id === id);
    if (template) {
      setCustomScript(template.content);
    }
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    onDecisionChange({ action, overrideReason, customScript });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">Decision Panel</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={selectedAction === 'approve-push' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('approve-push')}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve & Push to EHR
          </Button>
          <Button
            variant={selectedAction === 'request-reask' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('request-reask')}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Request Re-ask
          </Button>
          <Button
            variant={selectedAction === 'call-patient' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('call-patient')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Patient
          </Button>
          <Button
            variant={selectedAction === 'override' ? 'destructive' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('override')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Override
          </Button>
        </div>

        {selectedAction === 'override' && (
          <div className="mt-4">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Reason for Override
            </Label>
            <Textarea
              value={overrideReason}
              onChange={(e) => {
                setOverrideReason(e.target.value);
                onDecisionChange({ action: selectedAction, overrideReason: e.target.value, customScript });
              }}
              placeholder="Enter reason for override..."
              className="min-h-[80px]"
            />
          </div>
        )}
      </Card>

      <ScriptBuilder
        templates={scriptTemplates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleTemplateSelect}
        customScript={customScript}
        onScriptChange={(script) => {
          setCustomScript(script);
          onDecisionChange({ action: selectedAction, overrideReason, customScript: script });
        }}
      />
    </div>
  );
};
