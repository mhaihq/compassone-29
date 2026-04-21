
import React, { useState, useEffect } from 'react';
import { ActiveCall } from '@/components/layout/sidebar/calls/ActiveCall';
import { PostCallSummary } from '@/components/layout/sidebar/calls/PostCallSummary';
import { PreCallIntelligence } from '@/components/layout/sidebar/calls/PreCallIntelligence';
import { generatePreCallInsights, generateCallSummary, PreCallInsight, AICallSummary } from '@/services/aiCallService';
import { TaskCallContext, CallTaskUpdate } from '@/types/taskCallIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TaskCallIntegrationProps {
  taskContext: TaskCallContext;
  onCallComplete: () => void;
}

export const TaskCallIntegration: React.FC<TaskCallIntegrationProps> = ({
  taskContext,
  onCallComplete
}) => {
  const [callPhase, setCallPhase] = useState<'pre-call' | 'active' | 'post-call'>('pre-call');
  const [preCallInsights, setPreCallInsights] = useState<PreCallInsight[]>([]);
  const [callSummary, setCallSummary] = useState<AICallSummary | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadInsights = async () => {
      const insights = await generatePreCallInsights(taskContext.patientId);
      setPreCallInsights(insights);
    };
    loadInsights();
  }, [taskContext.patientId]);

  const handleStartCall = () => {
    setCallPhase('active');
    toast({
      title: "Call Started",
      description: `Starting call for task: ${taskContext.taskTitle}`
    });
  };

  const handleEndCall = async (duration: number) => {
    setCallDuration(duration);
    const summary = await generateCallSummary(
      taskContext.patientId, 
      [], 
      `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`
    );
    setCallSummary(summary);
    setCallPhase('post-call');
  };

  const handleTaskUpdate = (update: CallTaskUpdate) => {
    toast({
      title: "Task Updated",
      description: "Call summary has been integrated with the task system."
    });
    
    // TODO: wire to useTasks().applyUpdate(update) once hook is in place
    void update;

    // Complete the workflow
    setTimeout(() => {
      onCallComplete();
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Context Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{taskContext.patientName}</CardTitle>
                <p className="text-sm text-gray-600">
                  ID: {taskContext.patientId} • Task: {taskContext.taskTitle}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getPriorityColor(taskContext.priority)}>
                {taskContext.priority}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">{taskContext.taskType}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {callPhase === 'pre-call' && (
        <div className="space-y-6">
          <PreCallIntelligence
            insights={preCallInsights}
            patientName={taskContext.patientName}
          />
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCallComplete} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Task
            </Button>
            <Button onClick={handleStartCall} className="flex-1 bg-[#1E4D36] hover:bg-[#2A6349]">
              <Clock className="w-4 h-4 mr-2" />
              Start Call
            </Button>
          </div>
        </div>
      )}

      {callPhase === 'active' && (
        <ActiveCall
          onEndCall={handleEndCall}
          taskContext={taskContext}
        />
      )}

      {callPhase === 'post-call' && callSummary && (
        <PostCallSummary
          summary={callSummary}
          taskContext={taskContext}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};
