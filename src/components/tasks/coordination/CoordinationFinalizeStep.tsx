import React from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeChips } from './OutcomeChips';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface CoordinationFinalizeStepProps {
  decision: any;
}

export const CoordinationFinalizeStep: React.FC<CoordinationFinalizeStepProps> = ({ decision }) => {
  const getOutcomes = () => {
    const outcomes = [];
    
    switch (decision?.action) {
      case 'charge-fee':
        outcomes.push({ type: 'fee-charged' as const, label: 'Fee Charged: $50' });
        break;
      case 'waive-fee':
        outcomes.push({ type: 'fee-waived' as const, label: 'Fee Waived' });
        break;
      case 'reschedule':
        outcomes.push({ type: 'rescheduled' as const, label: 'Rescheduled' });
        break;
      case 'escalate':
        outcomes.push({ type: 'escalated' as const, label: 'Escalated to Manager' });
        break;
    }
    
    return outcomes;
  };

  return (
    <div className="space-y-4">
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          Review your decisions before finalizing. Once approved, the outcome will be recorded and appropriate actions will be triggered.
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Outcome Summary</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Selected Actions</p>
            <OutcomeChips outcomes={getOutcomes()} />
          </div>

          {decision?.feeWaiverReason && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Waiver Reason</p>
              <p className="text-sm p-3 bg-muted/50 rounded-lg">{decision.feeWaiverReason}</p>
            </div>
          )}

          {decision?.customScript && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Outreach Script</p>
              <p className="text-sm p-3 bg-muted/50 rounded-lg whitespace-pre-wrap">{decision.customScript}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground mb-2">Next Steps</p>
            <ul className="text-sm space-y-1 pl-4">
              {decision?.action === 'charge-fee' && (
                <>
                  <li className="list-disc">Invoice will be generated and sent to patient</li>
                  <li className="list-disc">Payment reminder scheduled for 3 days</li>
                </>
              )}
              {decision?.action === 'waive-fee' && (
                <>
                  <li className="list-disc">Fee waiver recorded in patient account</li>
                  <li className="list-disc">Notification sent to billing department</li>
                </>
              )}
              {decision?.action === 'reschedule' && (
                <>
                  <li className="list-disc">Patient will receive scheduling link</li>
                  <li className="list-disc">Follow-up reminder 24 hours before new appointment</li>
                </>
              )}
              {decision?.action === 'escalate' && (
                <>
                  <li className="list-disc">Case escalated to care manager</li>
                  <li className="list-disc">Manager will be notified within 1 hour</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
