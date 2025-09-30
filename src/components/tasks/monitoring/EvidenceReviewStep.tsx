import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';

interface EvidenceReviewStepProps {
  task: EnhancedPopulationTask;
  onNext: () => void;
  onBack: () => void;
}

export const EvidenceReviewStep: React.FC<EvidenceReviewStepProps> = ({
  task,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-emerald-600" />
            Clinical Evidence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Analysis */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Analysis Summary
            </h4>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-sm text-emerald-900">
                Multiple risk indicators detected requiring clinical review and intervention planning.
              </p>
            </div>
          </div>

          {/* Audit Log Timeline */}
          {task.auditLog && task.auditLog.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Activity Timeline
              </h4>
              <div className="space-y-2">
                {task.auditLog.map((log, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded-lg border-l-2 border-emerald-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-emerald-700">{log.actor}</span>
                      <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm">{log.action}</p>
                    {log.details && (
                      <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence from Call if available */}
          {task.evidenceFromCall && task.evidenceFromCall.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Patient Communication</h4>
              <div className="space-y-2">
                {task.evidenceFromCall.map((evidence, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{evidence.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {evidence.importance}
                      </Badge>
                    </div>
                    <p className="text-sm">{evidence.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700">
          Make Decision →
        </Button>
      </div>
    </div>
  );
};
