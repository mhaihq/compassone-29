
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Sparkles } from 'lucide-react';
import { ClinicalNote } from '@/types/billingBreakdown';

interface DocumentationStepProps {
  clinicalNotes: ClinicalNote;
  onNoteChange: (field: keyof ClinicalNote, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentationStep: React.FC<DocumentationStepProps> = ({
  clinicalNotes,
  onNoteChange,
  onNext,
  onBack
}) => {
  const fields = [
    { key: 'stabilityAssessment', label: 'Overall Assessment', placeholder: 'Summary of patient stability...' },
    { key: 'functionalStatus', label: 'Functional Status', placeholder: 'Daily functioning and activities...' },
    { key: 'followUpPlan', label: 'Follow-Up Plan', placeholder: 'Next steps and monitoring...' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-blue-600" size={20} />
          Step 2: Review Documentation
          <Badge className="ml-auto bg-green-100 text-green-800">
            <Sparkles size={12} className="mr-1" />
            Auto-Generated
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Smart defaults have been generated based on your assessment. Review and customize as needed.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <Textarea
              value={clinicalNotes[key as keyof ClinicalNote]}
              onChange={(e) => onNoteChange(key as keyof ClinicalNote, e.target.value)}
              placeholder={placeholder}
              className="min-h-20"
            />
          </div>
        ))}
        
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            Back to Assessment
          </Button>
          <Button 
            onClick={onNext}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Review & Finalize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
