import React from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bot, Calendar, Clock, User, FileText, History } from 'lucide-react';
import { IntakeDrawer } from './IntakeDrawer';
import { CoordinationDrawer } from './CoordinationDrawer';
import { MonthlyStabilityReview } from '@/components/care-task/MonthlyStabilityReview';
import { AuditLogTimeline } from './AuditLogTimeline';

interface TaskDetailDrawerProps {
  task: EnhancedPopulationTask | null;
  open: boolean;
  onClose: () => void;
  onUpdate?: (taskId: string, updates: Partial<EnhancedPopulationTask>) => void;
}

export const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({ 
  task, 
  open, 
  onClose,
  onUpdate 
}) => {
  const [showIntakeDrawer, setShowIntakeDrawer] = React.useState(false);
  const [showCoordinationDrawer, setShowCoordinationDrawer] = React.useState(false);
  const [showMonitoringDrawer, setShowMonitoringDrawer] = React.useState(false);
  const [showAuditLog, setShowAuditLog] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  // Timer for monitoring tasks
  React.useEffect(() => {
    if (showMonitoringDrawer) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [showMonitoringDrawer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!task) return null;

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'Intake': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Coordination': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'Monitoring': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-severity-high';
      case 'Medium': return 'bg-severity-medium';
      case 'Low': return 'bg-severity-low';
      default: return 'bg-muted-foreground';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (onUpdate) {
      onUpdate(task.id, { status: newStatus as any });
    }
  };

  const handlePriorityChange = (newPriority: string) => {
    if (onUpdate) {
      onUpdate(task.id, { priority: newPriority as any });
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-2xl p-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              <SheetHeader className="mb-6">
                <div className="flex items-start gap-3">
                  <div className={`w-1 h-16 rounded-full ${getPriorityColor(task.priority)}`} />
                  <div className="flex-1">
                    <SheetTitle className="text-xl mb-2">{task.title}</SheetTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${getModuleColor(task.module)} text-xs`}>
                        {task.module}
                      </Badge>
                      <Badge className={`${getPriorityColor(task.priority)} text-white border-0 text-xs`}>
                        {task.priority} Priority
                      </Badge>
                      {task.assignedToAI && (
                        <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1 text-xs">
                          <Bot className="w-3 h-3" />
                          AI Assigned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {/* Quick Properties */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Status</label>
                    <Select value={task.status} onValueChange={handleStatusChange}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needs-review">Needs Review</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="needs-qhp">Needs QHP</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Priority</label>
                    <Select value={task.priority} onValueChange={handlePriorityChange}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Patient:</span>
                    <span className="font-medium">{task.patientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-medium">{task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{task.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="my-6">
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <Textarea 
                  value={task.description} 
                  className="min-h-[100px] resize-none"
                  placeholder="Add task description..."
                  readOnly
                />
              </div>

              <Separator />

              {/* Module-specific Actions */}
              <div className="my-6">
                <h3 className="text-sm font-medium mb-3">Module Actions</h3>
                <div className="flex gap-2">
                  {task.module === 'Intake' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowIntakeDrawer(true)}
                    >
                      View Intake Documents
                    </Button>
                  )}
                  {task.module === 'Coordination' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowCoordinationDrawer(true)}
                    >
                      View Appointments
                    </Button>
                  )}
                  {task.module === 'Monitoring' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowMonitoringDrawer(true)}
                    >
                      Start Review
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAuditLog(true)}
                  >
                    <History className="w-4 h-4 mr-2" />
                    View Activity Log
                  </Button>
                </div>
              </div>

              {/* Evidence from Call */}
              {task.evidenceFromCall && task.evidenceFromCall.length > 0 && (
                <>
                  <Separator />
                  <div className="my-6">
                    <h3 className="text-sm font-medium mb-3">Evidence from Call</h3>
                    <div className="space-y-2">
                      {task.evidenceFromCall.map((evidence, idx) => (
                        <div key={idx} className="bg-muted p-3 rounded-lg text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{evidence.timestamp}</span>
                            <Badge variant="outline" className="text-xs">
                              {evidence.importance}
                            </Badge>
                          </div>
                          <p>{evidence.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <Button className="flex-1">Mark Complete</Button>
                <Button variant="outline">Reassign</Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Nested Drawers */}
      {task.module === 'Intake' && showIntakeDrawer && (
        <Sheet open={showIntakeDrawer} onOpenChange={setShowIntakeDrawer}>
          <SheetContent className="w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>Intake Documents</SheetTitle>
            </SheetHeader>
            <IntakeDrawer
              task={task}
              open={showIntakeDrawer}
              onClose={() => setShowIntakeDrawer(false)}
            />
          </SheetContent>
        </Sheet>
      )}

      {task.module === 'Coordination' && showCoordinationDrawer && (
        <Sheet open={showCoordinationDrawer} onOpenChange={setShowCoordinationDrawer}>
          <SheetContent className="w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>Care Coordination</SheetTitle>
            </SheetHeader>
            <CoordinationDrawer
              task={task}
              open={showCoordinationDrawer}
              onClose={() => setShowCoordinationDrawer(false)}
            />
          </SheetContent>
        </Sheet>
      )}

      {task.module === 'Monitoring' && showMonitoringDrawer && (
        <Sheet open={showMonitoringDrawer} onOpenChange={setShowMonitoringDrawer}>
          <SheetContent className="w-full sm:max-w-4xl">
            <SheetHeader>
              <SheetTitle>Monthly Stability Review</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full mt-4">
              <MonthlyStabilityReview
                task={task}
                onComplete={() => {
                  setShowMonitoringDrawer(false);
                  if (onUpdate) {
                    onUpdate(task.id, { status: 'completed' });
                  }
                }}
                timer={timer}
                formatTime={formatTime}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}

      <Sheet open={showAuditLog} onOpenChange={setShowAuditLog}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Activity Log</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full mt-4">
            <AuditLogTimeline auditLog={task.auditLog} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
