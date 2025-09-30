import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, XCircle, Calendar, Phone, AlertTriangle } from 'lucide-react';
import { ScriptBuilder } from './ScriptBuilder';

interface OutreachOptionsStepProps {
  onDecisionChange: (decision: any) => void;
}

export const OutreachOptionsStep: React.FC<OutreachOptionsStepProps> = ({ onDecisionChange }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [feeWaiverReason, setFeeWaiverReason] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customScript, setCustomScript] = useState('');

  const scriptTemplates = [
    {
      id: 'reschedule',
      name: 'Reschedule Outreach',
      type: 'call' as const,
      content: 'Hi [Patient], this is [Practice Name]. We noticed you missed your appointment today. We\'d love to help you reschedule. Please call us back at your earliest convenience.'
    },
    {
      id: 'payment',
      name: 'Payment Request',
      type: 'sms' as const,
      content: 'Hi [Patient], our records show a $50 no-show fee for your missed appointment on [Date]. Please contact us to discuss payment options.'
    },
    {
      id: 'engagement',
      name: 'Engagement Nudge',
      type: 'email' as const,
      content: 'Dear [Patient], we care about your health and noticed you missed your recent appointment. Let\'s work together to find a better time that fits your schedule.'
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
    onDecisionChange({ action, feeWaiverReason, customScript });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">Decision Panel</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={selectedAction === 'charge-fee' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('charge-fee')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Charge Fee
          </Button>
          <Button
            variant={selectedAction === 'waive-fee' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('waive-fee')}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Waive Fee
          </Button>
          <Button
            variant={selectedAction === 'reschedule' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('reschedule')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Reschedule
          </Button>
          <Button
            variant={selectedAction === 'verify-contact' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => handleActionSelect('verify-contact')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Verify Contact
          </Button>
          <Button
            variant={selectedAction === 'escalate' ? 'destructive' : 'outline'}
            className="justify-start col-span-2"
            onClick={() => handleActionSelect('escalate')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Escalate
          </Button>
        </div>

        {selectedAction === 'waive-fee' && (
          <div className="mt-4">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Reason for Fee Waiver
            </Label>
            <Textarea
              value={feeWaiverReason}
              onChange={(e) => {
                setFeeWaiverReason(e.target.value);
                onDecisionChange({ action: selectedAction, feeWaiverReason: e.target.value, customScript });
              }}
              placeholder="Enter reason..."
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
          onDecisionChange({ action: selectedAction, feeWaiverReason, customScript: script });
        }}
      />
    </div>
  );
};
