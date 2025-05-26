
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface CarePlanStepProps {
  task: any;
  selectedActions: string[];
  manualAction: string;
  summary: string;
  onActionToggle: (actionId: string, checked: boolean) => void;
  onManualActionChange: (value: string) => void;
  onAddManualAction: () => void;
  onSummaryChange: (value: string) => void;
  soapNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  onSoapNoteChange: (section: string, value: string) => void;
}

export const CarePlanStep: React.FC<CarePlanStepProps> = ({
  task,
  soapNote,
  onSoapNoteChange
}) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          <FileText className="mr-2 text-blue-500" size={20} />
          SOAP Note
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 text-blue-600">Subjective</h3>
          <p className="text-sm text-gray-500 mb-2">Patient's reported symptoms, feelings, and concerns</p>
          <Textarea 
            className="min-h-[100px] border-gray-200 focus:border-blue-300 focus:ring-blue-200"
            placeholder="Document what the patient reported during the call..."
            value={soapNote.subjective}
            onChange={(e) => onSoapNoteChange('subjective', e.target.value)}
          />
        </div>
        
        <Separator className="bg-gray-200" />
        
        <div>
          <h3 className="font-medium mb-2 text-green-600">Objective</h3>
          <p className="text-sm text-gray-500 mb-2">Observable, measurable findings and data</p>
          <Textarea 
            className="min-h-[100px] border-gray-200 focus:border-green-300 focus:ring-green-200"
            placeholder="Record objective findings, measurements, and observations..."
            value={soapNote.objective}
            onChange={(e) => onSoapNoteChange('objective', e.target.value)}
          />
        </div>
        
        <Separator className="bg-gray-200" />
        
        <div>
          <h3 className="font-medium mb-2 text-orange-600">Assessment</h3>
          <p className="text-sm text-gray-500 mb-2">Clinical judgment and diagnosis</p>
          <Textarea 
            className="min-h-[100px] border-gray-200 focus:border-orange-300 focus:ring-orange-200"
            placeholder="Provide clinical assessment and diagnosis..."
            value={soapNote.assessment}
            onChange={(e) => onSoapNoteChange('assessment', e.target.value)}
          />
        </div>
        
        <Separator className="bg-gray-200" />
        
        <div>
          <h3 className="font-medium mb-2 text-purple-600">Plan</h3>
          <p className="text-sm text-gray-500 mb-2">Treatment plan and next steps</p>
          <Textarea 
            className="min-h-[120px] border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            placeholder="Outline treatment plan, interventions, and follow-up..."
            value={soapNote.plan}
            onChange={(e) => onSoapNoteChange('plan', e.target.value)}
          />
        </div>
        
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            This SOAP note will be added to the patient's medical record and used for billing documentation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
