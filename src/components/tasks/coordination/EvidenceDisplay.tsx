import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageSquare, Check, X, Clock } from 'lucide-react';

interface OutreachAttempt {
  type: 'call' | 'sms' | 'email';
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  note?: string;
}

interface TranscriptSnippet {
  speaker: string;
  text: string;
  timestamp: string;
}

interface EvidenceDisplayProps {
  outreachLog?: OutreachAttempt[];
  transcripts?: TranscriptSnippet[];
  documents?: Array<{
    name: string;
    url?: string;
    status: 'valid' | 'invalid' | 'pending';
  }>;
}

export const EvidenceDisplay: React.FC<EvidenceDisplayProps> = ({
  outreachLog,
  transcripts,
  documents
}) => {
  const getOutreachIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check className="h-4 w-4 text-green-600" />;
      case 'failed': return <X className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Evidence</h3>
      
      {outreachLog && outreachLog.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Outreach Log</p>
          <div className="space-y-2">
            {outreachLog.map((attempt, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getOutreachIcon(attempt.type)}
                  {getStatusIcon(attempt.status)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium capitalize">{attempt.type}</p>
                  <p className="text-xs text-muted-foreground">{attempt.timestamp}</p>
                </div>
                {attempt.note && (
                  <Badge variant="outline" className="text-xs">{attempt.note}</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {transcripts && transcripts.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Transcript Snippets</p>
          <div className="space-y-2">
            {transcripts.map((snippet, idx) => (
              <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium">{snippet.speaker}</p>
                <p className="text-sm mt-1 italic">"{snippet.text}"</p>
                <p className="text-xs text-muted-foreground mt-1">{snippet.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {documents && documents.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Documents</p>
          <div className="space-y-2">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <span className="text-xs">{doc.name}</span>
                <Badge variant={doc.status === 'valid' ? 'default' : 'destructive'}>
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
