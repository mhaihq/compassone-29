import React from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeChips } from '../coordination/OutcomeChips';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface IntakeFinalizeStepProps {
  decision: any;
}

export const IntakeFinalizeStep: React.FC<IntakeFinalizeStepProps> = ({ decision }) => {
  const getOutcomes = () => {
    const outcomes = [];
    
    switch (decision?.action) {
      case 'approve-push':
        outcomes.push({ type: 'pushed' as const, label: 'Pushed to EHR' });
        break;
      case 'request-reask':
        outcomes.push({ type: 'fixed' as const, label: 'Re-ask Requested' });
        break;
      case 'call-patient':
        outcomes.push({ type: 'rescheduled' as const, label: 'Call Scheduled' });
        break;
      case 'override':
        outcomes.push({ type: 'override' as const, label: 'Override Applied' });
        break;
    }
    
    return outcomes;
  };

  return (
    <div className="space-y-4">
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          Review your decisions before finalizing. Once approved, the outcome will be recorded and the intake process will continue.
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Outcome Summary</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Selected Actions</p>
            <OutcomeChips outcomes={getOutcomes()} />
          </div>

          {decision?.overrideReason && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Override Reason</p>
              <p className="text-sm p-3 bg-muted/50 rounded-lg">{decision.overrideReason}</p>
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
              {decision?.action === 'approve-push' && (
                <>
                  <li className="list-disc">Patient data pushed to EHR system</li>
                  <li className="list-disc">Intake marked as complete</li>
                  <li className="list-disc">Welcome email sent to patient</li>
                </>
              )}
              {decision?.action === 'request-reask' && (
                <>
                  <li className="list-disc">Re-ask script sent to AI agent</li>
                  <li className="list-disc">Patient will be contacted within 24 hours</li>
                  <li className="list-disc">Task remains open until resolved</li>
                </>
              )}
              {decision?.action === 'call-patient' && (
                <>
                  <li className="list-disc">Call scheduled with care coordinator</li>
                  <li className="list-disc">Patient notified of callback time</li>
                </>
              )}
              {decision?.action === 'override' && (
                <>
                  <li className="list-disc">Override recorded in audit log</li>
                  <li className="list-disc">Intake pushed with manual approval</li>
                  <li className="list-disc">Supervisor notified of override</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
