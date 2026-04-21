
import React from 'react';
import { AlertTriangle, Play, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EvidenceCard } from './EvidenceCard';
import type { CareTaskViewModel, EvidenceFromCall } from './types';

interface RiskAssessmentStepProps {
  task: CareTaskViewModel;
  riskApproved: boolean | null;
  onRiskDecision: (approved: boolean) => void;
  onShowAudio: () => void;
  evidenceStatuses: Record<string, 'pending' | 'saved' | 'rejected'>;
  onEvidenceAction: (evidenceIndex: number, action: 'save' | 'reject') => void;
}

export const RiskAssessmentStep: React.FC<RiskAssessmentStepProps> = ({
  task,
  riskApproved,
  onRiskDecision,
  onShowAudio,
  evidenceStatuses,
  onEvidenceAction
}) => {
  const savedEvidenceCount = Object.values(evidenceStatuses).filter(status => status === 'saved').length;
  const totalEvidenceCount = task.evidenceFromCall?.length ?? 0;
  const allEvidenceReviewed = Object.keys(evidenceStatuses).length === totalEvidenceCount;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          <AlertTriangle className="mr-2 text-amber-500" size={20} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-amber-900">Why this was flagged:</h3>
          <p className="text-amber-800">{task.flagReason}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Evidence from patient call:</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {savedEvidenceCount}/{totalEvidenceCount} Evidence Reviewed
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onShowAudio}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Play size={16} className="mr-1" /> Full Audio & Transcript
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {task.evidenceFromCall?.map((evidence: EvidenceFromCall, index: number) => (
              <EvidenceCard
                key={index}
                evidence={{
                  ...evidence,
                  audioUrl: `#audio-${index}`,
                  duration: 25 + Math.random() * 10
                }}
                status={evidenceStatuses[index] || 'pending'}
                onSaveToLog={() => onEvidenceAction(index, 'save')}
                onReject={() => onEvidenceAction(index, 'reject')}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-gray-900">CPT Code:</h3>
          <Badge className="bg-purple-50 text-purple-800 border-purple-200 font-mono">
            {task.cptCode}
          </Badge>
          <span className="text-sm text-gray-600">{task.cptDescription}</span>
        </div>
        
        {/* Risk Decision Section */}
        {allEvidenceReviewed && savedEvidenceCount > 0 && riskApproved === null ? (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-900">Evidence Review Complete</h4>
            <p className="text-sm text-blue-800 mb-3">
              {savedEvidenceCount} piece(s) of evidence saved to log. Ready for risk assessment decision.
            </p>
            <div className="flex gap-3">
              <Button 
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => onRiskDecision(true)}
              >
                <Check size={16} className="mr-2" /> Approve Risk
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50 flex-1"
                onClick={() => onRiskDecision(false)}
              >
                <X size={16} className="mr-2" /> Deny Risk
              </Button>
            </div>
          </div>
        ) : allEvidenceReviewed && savedEvidenceCount === 0 ? (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-amber-900">No Evidence Approved</h4>
            <p className="text-sm text-amber-800 mb-3">
              All evidence has been rejected. Consider denying the risk assessment.
            </p>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 w-full"
              onClick={() => onRiskDecision(false)}
            >
              <X size={16} className="mr-2" /> Deny Risk
            </Button>
          </div>
        ) : !allEvidenceReviewed ? (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Please review all evidence pieces before making a risk assessment decision.
            </p>
          </div>
        ) : null}

        {riskApproved !== null && (
          <div className={`p-3 rounded-md flex items-center gap-2 ${
            riskApproved 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {riskApproved ? (
              <>
                <Check size={16} className="text-green-600" />
                Risk assessment approved ({savedEvidenceCount} evidence pieces saved)
              </>
            ) : (
              <>
                <X size={16} className="text-red-600" />
                Risk assessment denied
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
