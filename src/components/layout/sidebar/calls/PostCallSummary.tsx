import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Brain, CheckCircle, AlertTriangle, Clock, Save, Send, Plus } from 'lucide-react';
import { AICallSummary } from '@/services/aiCallService';
import { TaskCallContext, CallTaskUpdate } from '@/types/taskCallIntegration';

interface PostCallSummaryProps {
  summary: AICallSummary;
  taskContext?: TaskCallContext;
  onSave?: () => void;
  onSendToEHR?: () => void;
  onTaskUpdate?: (update: CallTaskUpdate) => void;
}

export const PostCallSummary: React.FC<PostCallSummaryProps> = ({
  summary,
  taskContext,
  onSave,
  onSendToEHR,
  onTaskUpdate
}) => {
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [taskStatus, setTaskStatus] = useState<'completed' | 'needs-follow-up' | 'escalated'>('completed');
  const [newTasks, setNewTasks] = useState<Array<{
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
  }>>([]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleTaskUpdate = () => {
    if (!taskContext || !onTaskUpdate) return;

    const update: CallTaskUpdate = {
      taskId: taskContext.taskId,
      callSummary: summary.outcome,
      outcome: summary.outcome,
      nextSteps: summary.nextSteps,
      newTasksCreated: newTasks,
      taskStatus
    };

    onTaskUpdate(update);
  };

  const addNewTask = () => {
    setNewTasks(prev => [...prev, {
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }]);
  };

  const updateNewTask = (index: number, field: string, value: string) => {
    setNewTasks(prev => prev.map((task, i) => 
      i === index ? { ...task, [field]: value } : task
    ));
  };

  const removeNewTask = (index: number) => {
    setNewTasks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-600" />
            AI-Generated Call Summary
            {taskContext && (
              <Badge variant="outline" className="ml-2">Task-Integrated</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-green-700">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Duration: {summary.duration}
            </span>
            <span>Call ID: {summary.callId}</span>
            {taskContext && (
              <span>Task: {taskContext.taskTitle}</span>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Task Status Update Section */}
      {taskContext && (
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              Task Status Update
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Task Outcome</label>
              <Select value={taskStatus} onValueChange={(value: 'completed' | 'needs-follow-up' | 'escalated') => setTaskStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Task Completed Successfully</SelectItem>
                  <SelectItem value="needs-follow-up">Needs Additional Follow-up</SelectItem>
                  <SelectItem value="escalated">Escalate to Clinician</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* New Tasks Creation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Create Follow-up Tasks</label>
                <Button onClick={addNewTask} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </Button>
              </div>
              {newTasks.map((task, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2 mb-2">
                  <div className="flex gap-2">
                    <input
                      placeholder="Task title..."
                      value={task.title}
                      onChange={(e) => updateNewTask(index, 'title', e.target.value)}
                      className="flex-1 text-sm border rounded px-2 py-1"
                    />
                    <Select value={task.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => updateNewTask(index, 'priority', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => removeNewTask(index)} size="sm" variant="outline">×</Button>
                  </div>
                  <textarea
                    placeholder="Task description..."
                    value={task.description}
                    onChange={(e) => updateNewTask(index, 'description', e.target.value)}
                    className="w-full text-sm border rounded px-2 py-1"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Outcome & Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Call Outcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{summary.outcome}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={getRiskColor(summary.riskAssessment.overall)}>
                {summary.riskAssessment.overall.toUpperCase()} RISK
              </Badge>
              <div className="text-sm space-y-1">
                {summary.riskAssessment.factors.map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Key Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {summary.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {finding}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.actionItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium">{item.text}</p>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                {item.dueDate && (
                  <p className="text-xs text-gray-600">Due: {item.dueDate}</p>
                )}
                {item.assignedTo && (
                  <p className="text-xs text-gray-600">Assigned to: {item.assignedTo}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Citations & Evidence */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Citations & Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.citations.map((citation) => (
              <div key={citation.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium">{citation.context}</p>
                  <Badge variant="outline" className="text-xs">
                    {citation.timestamp}
                  </Badge>
                </div>
                <blockquote className="text-sm italic text-gray-700 border-l-2 border-gray-300 pl-3">
                  "{citation.text}"
                </blockquote>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {summary.nextSteps.map((step, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any additional notes or observations..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="min-h-20"
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        {onSave && (
          <Button onClick={onSave} className="flex-1" variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Summary
          </Button>
        )}
        {taskContext && onTaskUpdate ? (
          <Button onClick={handleTaskUpdate} className="flex-1 bg-[#1E4D36] hover:bg-[#2A6349]">
            <CheckCircle className="w-4 h-4 mr-2" />
            Update Task & Complete
          </Button>
        ) : onSendToEHR && (
          <Button onClick={onSendToEHR} className="flex-1 bg-[#1E4D36] hover:bg-[#2A6349]">
            <Send className="w-4 h-4 mr-2" />
            Send to EHR
          </Button>
        )}
      </div>
    </div>
  );
};
