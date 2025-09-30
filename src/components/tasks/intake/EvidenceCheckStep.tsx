import React from 'react';
import { EvidenceDisplay } from '../coordination/EvidenceDisplay';

interface EvidenceCheckStepProps {
  task: any;
}

export const EvidenceCheckStep: React.FC<EvidenceCheckStepProps> = ({ task }) => {
  const transcripts = task.evidenceFromCall?.map((evidence: any) => ({
    speaker: 'Patient',
    text: evidence.text,
    timestamp: evidence.timestamp
  })) || [];

  const documents = task.intakeDocuments?.map((doc: any) => ({
    name: doc.name,
    url: doc.url,
    status: doc.status === 'completed' ? 'valid' as const : 
            doc.status === 'missing' ? 'invalid' as const : 'pending' as const
  })) || [];

  return (
    <div className="space-y-4">
      <EvidenceDisplay 
        transcripts={transcripts}
        documents={documents}
      />
    </div>
  );
};
