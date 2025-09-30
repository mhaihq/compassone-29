import React from 'react';
import { Clock, User, Bot, Settings } from 'lucide-react';
import { AuditLogEntry } from '@/types/enhancedTask';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AuditLogTimelineProps {
  auditLog: AuditLogEntry[];
}

export const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({ auditLog }) => {
  const getActorIcon = (actorType: AuditLogEntry['actorType']) => {
    switch (actorType) {
      case 'AI':
        return <Bot className="w-4 h-4 text-violet-600" />;
      case 'Staff':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'System':
        return <Settings className="w-4 h-4 text-muted-foreground" />;
      case 'Patient':
        return <User className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getOutcomeColor = (outcome?: 'success' | 'failure') => {
    if (!outcome) return '';
    return outcome === 'success' ? 'text-emerald-600' : 'text-destructive';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <h4 className="font-medium text-foreground">Activity Timeline</h4>
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {auditLog.map((entry, index) => (
            <div key={entry.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  {getActorIcon(entry.actorType)}
                </div>
                {index < auditLog.length - 1 && (
                  <div className="w-px h-full bg-border mt-2" />
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-sm text-foreground">{entry.action}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  by {entry.actor}
                </p>
                
                {entry.details && (
                  <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded-md">
                    {entry.details}
                  </p>
                )}
                
                {entry.outcome && (
                  <span className={`text-xs font-medium ${getOutcomeColor(entry.outcome)}`}>
                    {entry.outcome === 'success' ? '✓ Completed' : '✗ Failed'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
