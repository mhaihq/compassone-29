import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Bot, User } from 'lucide-react';
import { TaskModule, TaskChannel } from '@/types/enhancedTask';

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onClose, onSubmit }) => {
  const [module, setModule] = useState<TaskModule>('Monitoring');
  const [channel, setChannel] = useState<TaskChannel>('Call');
  const [assignToAI, setAssignToAI] = useState(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const taskTypesByModule = {
    Intake: ['Document Collection', 'Insurance Verification', 'Consent Forms', 'Initial Assessment'],
    Coordination: ['Schedule Appointment', 'Referral Management', 'Follow-up Scheduling', 'Provider Coordination'],
    Monitoring: ['Wellness Check', 'Medication Adherence', 'Symptom Assessment', 'Care Plan Review']
  };

  const scriptLibrary = [
    { id: '1', name: 'Wellness Check - Standard', preview: 'Hi, this is a routine wellness check...' },
    { id: '2', name: 'Appointment Reminder', preview: 'Calling to remind you of your upcoming...' },
    { id: '3', name: 'Document Follow-up', preview: 'We need to collect some additional...' },
    { id: '4', name: 'Custom Script', preview: '' }
  ];

  const handleSubmit = () => {
    const taskData = {
      module,
      channel,
      assignToAI,
      dueDate: dueDate.toISOString(),
    };
    onSubmit(taskData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Search for patient..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p-001">Emily Carter</SelectItem>
                <SelectItem value="p-002">James Rodriguez</SelectItem>
                <SelectItem value="p-003">Sarah Mitchell</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Module Selection */}
          <div className="space-y-2">
            <Label>Module</Label>
            <RadioGroup value={module} onValueChange={(v) => setModule(v as TaskModule)}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intake" id="intake" />
                  <Label htmlFor="intake" className="font-normal cursor-pointer">Intake</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Coordination" id="coordination" />
                  <Label htmlFor="coordination" className="font-normal cursor-pointer">Coordination</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Monitoring" id="monitoring" />
                  <Label htmlFor="monitoring" className="font-normal cursor-pointer">Monitoring</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Task Type */}
          <div className="space-y-2">
            <Label htmlFor="taskType">Task Type</Label>
            <Select>
              <SelectTrigger id="taskType">
                <SelectValue placeholder="Select task type..." />
              </SelectTrigger>
              <SelectContent>
                {taskTypesByModule[module].map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Channel Selection */}
          <div className="space-y-2">
            <Label>Channel</Label>
            <RadioGroup value={channel} onValueChange={(v) => setChannel(v as TaskChannel)}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Call" id="call" />
                  <Label htmlFor="call" className="font-normal cursor-pointer">Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SMS" id="sms" />
                  <Label htmlFor="sms" className="font-normal cursor-pointer">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Email" id="email" />
                  <Label htmlFor="email" className="font-normal cursor-pointer">Email</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Script Selection */}
          <div className="space-y-2">
            <Label htmlFor="script">Script</Label>
            <Select>
              <SelectTrigger id="script">
                <SelectValue placeholder="Choose from library..." />
              </SelectTrigger>
              <SelectContent>
                {scriptLibrary.map((script) => (
                  <SelectItem key={script.id} value={script.id}>{script.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Script */}
          <div className="space-y-2">
            <Label htmlFor="customScript">Custom Instructions (Optional)</Label>
            <Textarea 
              id="customScript"
              placeholder="Add any specific instructions or custom script..."
              rows={4}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? dueDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover z-50">
                <Calendar mode="single" selected={dueDate} onSelect={(date) => date && setDueDate(date)} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Assignment */}
          <div className="space-y-3">
            <Label>Assign To</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={!assignToAI ? "default" : "outline"}
                onClick={() => setAssignToAI(false)}
                className="gap-2 h-auto py-4"
              >
                <User className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Staff</div>
                  <div className="text-xs opacity-80">Manual handling</div>
                </div>
              </Button>
              <Button
                type="button"
                variant={assignToAI ? "default" : "outline"}
                onClick={() => setAssignToAI(true)}
                className="gap-2 h-auto py-4"
              >
                <Bot className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">AI Agent</div>
                  <div className="text-xs opacity-80">Automated</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
