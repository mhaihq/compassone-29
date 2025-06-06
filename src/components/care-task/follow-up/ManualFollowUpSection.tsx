
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { DatePicker } from './DatePicker';

interface ManualFollowUpSectionProps {
  followUpDate: Date | undefined;
  followUpNotes: string;
  assignedTo: string;
  onFollowUpDateChange: (date: Date | undefined) => void;
  onFollowUpNotesChange: (notes: string) => void;
  onAssignedToChange: (assignee: string) => void;
  onScheduleFollowUp: () => void;
  isLoading?: boolean;
}

export const ManualFollowUpSection: React.FC<ManualFollowUpSectionProps> = ({
  followUpDate,
  followUpNotes,
  assignedTo,
  onFollowUpDateChange,
  onFollowUpNotesChange,
  onAssignedToChange,
  onScheduleFollowUp,
  isLoading = false
}) => {
  const isValidForm = followUpDate && followUpNotes.trim() && assignedTo.trim();

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <User className="mr-2 text-blue-600" size={16} />
            <h4 className="font-medium">Manual Follow-up</h4>
          </div>
          <Badge variant="outline" className="text-blue-600">
            Staff Assigned
          </Badge>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Follow-up Date *
          </label>
          <DatePicker
            selected={followUpDate}
            onSelect={onFollowUpDateChange}
            placeholder="Select follow-up date"
            className="w-full"
          />
          {!followUpDate && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Please select a follow-up date
            </p>
          )}
        </div>

        {/* Assigned To */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Assigned To *
          </label>
          <select
            value={assignedTo}
            onChange={(e) => onAssignedToChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select staff member</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Nurse Johnson">Nurse Johnson</option>
            <option value="Care Manager Davis">Care Manager Davis</option>
            <option value="Current User">Assign to me</option>
          </select>
          {!assignedTo && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Please assign to a staff member
            </p>
          )}
        </div>

        {/* Follow-up Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Follow-up Notes *
          </label>
          <Textarea
            placeholder="Enter specific instructions for the follow-up..."
            value={followUpNotes}
            onChange={(e) => onFollowUpNotesChange(e.target.value)}
            className="min-h-[100px]"
          />
          {!followUpNotes.trim() && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Please provide follow-up instructions
            </p>
          )}
        </div>

        {/* Schedule Button */}
        <Button
          onClick={onScheduleFollowUp}
          disabled={!isValidForm || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Clock className="mr-2 animate-spin" size={16} />
              Scheduling...
            </>
          ) : (
            <>
              <Calendar className="mr-2" size={16} />
              Schedule Manual Follow-up
            </>
          )}
        </Button>

        {!isValidForm && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            Please fill in all required fields to schedule the follow-up
          </p>
        )}
      </div>
    </div>
  );
};
