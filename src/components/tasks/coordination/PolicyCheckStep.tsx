import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface PolicyCheckStepProps {
  task: any;
}

export const PolicyCheckStep: React.FC<PolicyCheckStepProps> = ({ task }) => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Policy Verification</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm">No-show policy active</span>
            </div>
            <Badge variant="default">$50 fee</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Previous no-shows</span>
            </div>
            <Badge variant="outline">1 in last 6 months</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm">24-hour notice provided</span>
            </div>
            <Badge variant="secondary">Required</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Patient History</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total appointments</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completed</span>
            <span className="font-medium">10</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">No-shows</span>
            <span className="font-medium">2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Attendance rate</span>
            <span className="font-medium">83%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
