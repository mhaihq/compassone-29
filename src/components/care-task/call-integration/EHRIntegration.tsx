
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, FileText, Send, CheckCircle, AlertTriangle, Clock, Shield } from 'lucide-react';
import { AICallSummary } from '@/services/aiCallService';

interface EHRIntegrationProps {
  callSummary: AICallSummary;
  taskId: string;
  onEHRSubmit: (ehrData: EHRSubmissionData) => void;
}

interface EHRSubmissionData {
  encounterType: string;
  primaryDiagnosis: string;
  cptCodes: string[];
  documentation: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  followUpRequired: boolean;
  nextAppointment?: string;
}

export const EHRIntegration: React.FC<EHRIntegrationProps> = ({
  callSummary,
  taskId,
  onEHRSubmit
}) => {
  const [encounterType, setEncounterType] = useState('telehealth_followup');
  const [selectedCptCodes, setSelectedCptCodes] = useState<string[]>(['99213']);
  const [includeTranscript, setIncludeTranscript] = useState(true);
  const [includeCitations, setIncludeCitations] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCptCodes = [
    { code: '99213', description: 'Office/outpatient visit, established patient, moderate complexity' },
    { code: '99214', description: 'Office/outpatient visit, established patient, high complexity' },
    { code: '90834', description: 'Psychotherapy, 45 minutes' },
    { code: '90837', description: 'Psychotherapy, 60 minutes' },
    { code: '99401', description: 'Preventive counseling, 15 minutes' },
    { code: '96116', description: 'Neurobehavioral status exam' }
  ];

  const handleCptCodeToggle = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedCptCodes(prev => [...prev, code]);
    } else {
      setSelectedCptCodes(prev => prev.filter(c => c !== code));
    }
  };

  const generateSOAPNote = () => {
    return {
      subjective: `Patient reports ${callSummary.keyFindings.join(', ')}. ${callSummary.outcome}`,
      objective: `Telehealth encounter completed. Duration: ${callSummary.duration}. Patient appeared engaged and responsive.`,
      assessment: `${callSummary.riskAssessment.overall} risk level. ${callSummary.riskAssessment.factors.join(', ')}.`,
      plan: callSummary.nextSteps.join('. ') + '.'
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const ehrData: EHRSubmissionData = {
      encounterType,
      primaryDiagnosis: 'F32.9 Major depressive disorder, single episode, unspecified',
      cptCodes: selectedCptCodes,
      documentation: generateSOAPNote(),
      followUpRequired: callSummary.actionItems.length > 0,
      nextAppointment: callSummary.actionItems.find(item => item.dueDate)?.dueDate
    };

    // Simulate API call
    setTimeout(() => {
      onEHRSubmit(ehrData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          EHR Integration & Documentation
        </CardTitle>
        <p className="text-sm text-green-700">
          Automated clinical documentation with SOAP notes and billing codes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Encounter Information */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Encounter Type</label>
            <Select value={encounterType} onValueChange={setEncounterType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telehealth_followup">Telehealth Follow-up</SelectItem>
                <SelectItem value="care_management">Care Management Call</SelectItem>
                <SelectItem value="medication_review">Medication Review</SelectItem>
                <SelectItem value="crisis_intervention">Crisis Intervention</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">CPT Codes</label>
            <div className="space-y-2">
              {availableCptCodes.map((cpt) => (
                <div key={cpt.code} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={cpt.code}
                    checked={selectedCptCodes.includes(cpt.code)}
                    onCheckedChange={(checked) => handleCptCodeToggle(cpt.code, checked === true)}
                  />
                  <div className="flex-1">
                    <label htmlFor={cpt.code} className="text-sm font-medium cursor-pointer block">
                      {cpt.code}
                    </label>
                    <p className="text-xs text-gray-600">{cpt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SOAP Note Preview */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Auto-Generated SOAP Note
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-blue-800">Subjective:</span>
              <p className="text-blue-700 mt-1">{generateSOAPNote().subjective}</p>
            </div>
            <div>
              <span className="font-medium text-blue-800">Objective:</span>
              <p className="text-blue-700 mt-1">{generateSOAPNote().objective}</p>
            </div>
            <div>
              <span className="font-medium text-blue-800">Assessment:</span>
              <p className="text-blue-700 mt-1">{generateSOAPNote().assessment}</p>
            </div>
            <div>
              <span className="font-medium text-blue-800">Plan:</span>
              <p className="text-blue-700 mt-1">{generateSOAPNote().plan}</p>
            </div>
          </div>
        </div>

        {/* Integration Options */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Integration Options</h4>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="include-transcript"
                checked={includeTranscript}
                onCheckedChange={(checked) => setIncludeTranscript(checked === true)}
              />
              <label htmlFor="include-transcript" className="text-sm">
                Include call transcript as supporting documentation
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="include-citations"
                checked={includeCitations}
                onCheckedChange={(checked) => setIncludeCitations(checked === true)}
              />
              <label htmlFor="include-citations" className="text-sm">
                Include source citations and evidence
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="include-metrics"
                checked={includeMetrics}
                onCheckedChange={(checked) => setIncludeMetrics(checked === true)}
              />
              <label htmlFor="include-metrics" className="text-sm">
                Include call quality metrics and AI insights
              </label>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security & Compliance
          </h4>
          <div className="space-y-1 text-sm text-purple-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>HIPAA compliant data transmission</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>End-to-end encryption enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Audit trail automatically logged</span>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedCptCodes.length === 0}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Submitting to EHR...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit to EHR System
              </>
            )}
          </Button>
          <Button variant="outline" className="px-6">
            Save Draft
          </Button>
        </div>

        {/* Status Messages */}
        {selectedCptCodes.length === 0 && (
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Please select at least one CPT code to continue</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
