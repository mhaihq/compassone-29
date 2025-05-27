
import React, { useState } from 'react';
import { populationTasksData } from '@/data/populationTasksData';
import { RiskAssessmentStep } from './RiskAssessmentStep';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Volume2 } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

interface MentalHealthAlertContentProps {
  taskId: string;
  onComplete: () => void;
}

export const MentalHealthAlertContent: React.FC<MentalHealthAlertContentProps> = ({ taskId, onComplete }) => {
  const [evidenceStatuses, setEvidenceStatuses] = useState<Record<string, 'pending' | 'saved' | 'rejected'>>({});
  const [riskApproved, setRiskApproved] = useState<boolean | null>(null);
  const [showFullAudio, setShowFullAudio] = useState(false);

  const task = populationTasksData.find(t => t.id === taskId);
  
  if (!task || !task.evidenceFromCall) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Task or evidence data not found</p>
        </div>
      </div>
    );
  }

  const handleEvidenceAction = (evidenceIndex: number, action: 'save' | 'reject') => {
    setEvidenceStatuses(prev => ({
      ...prev,
      [evidenceIndex]: action === 'save' ? 'saved' : 'rejected'
    }));
  };

  const handleRiskDecision = (approved: boolean) => {
    setRiskApproved(approved);
    if (approved) {
      // Auto-complete the task after risk approval
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-900">{task.title}</h2>
        <p className="text-sm text-red-700">{task.description}</p>
        <div className="mt-2 text-xs text-red-600">
          Patient: {task.patientName} | Call Date: {task.callDate} | Priority: {task.priority}
        </div>
      </div>

      <RiskAssessmentStep
        task={task}
        riskApproved={riskApproved}
        onRiskDecision={handleRiskDecision}
        onShowAudio={() => setShowFullAudio(true)}
        evidenceStatuses={evidenceStatuses}
        onEvidenceAction={handleEvidenceAction}
      />

      {/* Full Audio Dialog */}
      <Dialog open={showFullAudio} onOpenChange={setShowFullAudio}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Full Call Recording & Transcript - {task.callDate}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Volume2 size={16} />
                Complete Call Audio ({task.patientName})
              </h4>
              <AudioPlayer 
                audioUrl="#full-call-audio"
                duration={245}
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Complete Conversation Transcript</h4>
              <div className="bg-white p-4 rounded-md border border-gray-200 max-h-96 overflow-y-auto">
                <div className="space-y-3 text-sm">
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">0:05</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">Hi {task.patientName}, this is your weekly check-in. How are you feeling today?</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-purple-600 font-medium min-w-16">0:15</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700">Not great, to be honest. I've been struggling a lot this week.</span>
                  </div>
                  <div className="flex gap-4 bg-red-50 p-2 rounded">
                    <span className="text-purple-600 font-medium min-w-16">0:32</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700 font-medium">I've been feeling really hopeless lately... like nothing I do matters anymore</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">0:45</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">I'm sorry to hear that. Can you tell me more about these feelings?</span>
                  </div>
                  <div className="flex gap-4 bg-red-50 p-2 rounded">
                    <span className="text-purple-600 font-medium min-w-16">1:15</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700 font-medium">Sometimes I think everyone would be better off without me</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">1:30</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">That sounds very difficult. Have you been taking your medications as prescribed?</span>
                  </div>
                  <div className="flex gap-4 bg-yellow-50 p-2 rounded">
                    <span className="text-purple-600 font-medium min-w-16">2:03</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700">I haven't been taking my medication consistently... maybe 3 times this week</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">2:20</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">I understand. How has therapy been going for you?</span>
                  </div>
                  <div className="flex gap-4 bg-yellow-50 p-2 rounded">
                    <span className="text-purple-600 font-medium min-w-16">2:45</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700">I stopped going to therapy last month, it just felt pointless</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">3:00</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">Thank you for sharing that with me. I think it would be good to have your care team review this...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowFullAudio(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
