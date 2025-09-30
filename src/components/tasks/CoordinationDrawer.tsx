import React from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { Calendar, Clock, UserPlus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AuditLogTimeline } from './AuditLogTimeline';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CoordinationDrawerProps {
  task: EnhancedPopulationTask;
  onClose: () => void;
}

export const CoordinationDrawer: React.FC<CoordinationDrawerProps> = ({ task, onClose }) => {
  const getAppointmentStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return variants[status as keyof typeof variants] || '';
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
              <Badge className="bg-violet-50 text-violet-700 border-violet-200">
                Coordination
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

          {/* Appointment Timeline */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointment Timeline
            </h4>
            <div className="space-y-3">
              {task.coordinationAppointments?.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm text-foreground">{appointment.type}</p>
                          <Badge className={getAppointmentStatusBadge(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Provider: {appointment.provider}
                        </p>
                        {appointment.scheduledDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(appointment.scheduledDate).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded-md">
                        {appointment.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {(!task.coordinationAppointments || task.coordinationAppointments.length === 0) && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No appointments scheduled</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Rebook Appointment
              </Button>
              <Button variant="outline" className="gap-2">
                <Clock className="w-4 h-4" />
                Add to Waitlist
              </Button>
              <Button variant="outline" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Referral
              </Button>
              <Button variant="outline" className="gap-2 text-amber-600 border-amber-300 hover:bg-amber-50">
                <AlertTriangle className="w-4 h-4" />
                Escalate
              </Button>
            </div>
          </div>

          {/* Provider Communication */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-3">Care Team Notes</h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Today, 10:30 AM - Dr. Smith</p>
                  <p className="text-sm text-foreground">Patient requires specialist referral for ongoing symptoms.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <AuditLogTimeline auditLog={task.auditLog} />
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="border-t border-border p-4 flex gap-2">
        <Button className="flex-1" onClick={onClose}>
          Complete Task
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
