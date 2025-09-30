import React from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { FileText, Upload, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AuditLogTimeline } from './AuditLogTimeline';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IntakeDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

export const IntakeDrawer: React.FC<IntakeDrawerProps> = ({ task, onClose }) => {
  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'missing':
      case 'expired':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      missing: 'bg-red-50 text-red-700 border-red-200',
      expired: 'bg-red-50 text-red-700 border-red-200'
    };
    return variants[status as keyof typeof variants] || '';
  };

  const completedDocs = task.intakeDocuments?.filter(d => d.status === 'completed').length || 0;
  const totalDocs = task.intakeDocuments?.length || 0;
  const completionPercentage = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                Intake
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Patient:</span>{' '}
                <span className="font-medium text-foreground">{task.patientName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Due:</span>{' '}
                <span className="font-medium text-foreground">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">Form Completion</h4>
                <span className="text-sm font-medium text-foreground">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {completedDocs} of {totalDocs} documents completed
              </p>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Required Documents
            </h4>
            <div className="space-y-2">
              {task.intakeDocuments?.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {getDocumentStatusIcon(doc.status)}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{doc.name}</p>
                          {doc.uploadedDate && (
                            <p className="text-xs text-muted-foreground">
                              Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge className={getDocumentStatusBadge(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Resend Form
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Call Patient
              </Button>
              <Button variant="outline" className="gap-2 text-amber-600 border-amber-300 hover:bg-amber-50">
                Override Requirements
              </Button>
            </div>
          </div>

          {/* Audit Log */}
          <AuditLogTimeline auditLog={task.auditLog} />
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="border-t border-border p-4 flex gap-2">
        <Button className="flex-1" onClick={onClose}>
          Mark Complete
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
