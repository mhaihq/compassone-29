import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormReviewStepProps {
  task: any;
}

export const FormReviewStep: React.FC<FormReviewStepProps> = ({ task }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'missing': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'missing': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Why this was flagged:</strong> {task.description}
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Form Status Overview</h3>
        <div className="space-y-2">
          {task.intakeDocuments?.map((doc: any) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  {doc.uploadedDate && (
                    <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadedDate}</p>
                  )}
                </div>
              </div>
              <Badge variant={getStatusVariant(doc.status)}>
                {doc.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
