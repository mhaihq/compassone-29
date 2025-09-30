import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { EvidenceDisplay } from './EvidenceDisplay';

interface MissedAppointmentStepProps {
  task: any;
}

export const MissedAppointmentStep: React.FC<MissedAppointmentStepProps> = ({ task }) => {
  const outreachLog = [
    { type: 'call' as const, timestamp: '10:15 AM', status: 'failed' as const, note: 'No answer' },
    { type: 'call' as const, timestamp: '11:30 AM', status: 'failed' as const, note: 'Voicemail' },
    { type: 'sms' as const, timestamp: '11:35 AM', status: 'success' as const, note: 'Delivered' },
    { type: 'call' as const, timestamp: '2:00 PM', status: 'failed' as const, note: 'No answer' }
  ];

  const transcripts = task.evidenceFromCall?.map((evidence: any) => ({
    speaker: 'Patient',
    text: evidence.text,
    timestamp: evidence.timestamp
  })) || [];

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Why this was flagged:</strong> Patient missed appointment today. 
          AI attempted 3 calls + 1 SMS, no confirmation received.
        </AlertDescription>
      </Alert>

      <EvidenceDisplay 
        outreachLog={outreachLog}
        transcripts={transcripts}
      />
    </div>
  );
};
