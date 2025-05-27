
import React, { useState } from 'react';
import { Play, Check, X, AudioWaveform } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AudioPlayer } from './AudioPlayer';

interface EvidenceCardProps {
  evidence: {
    text: string;
    timestamp: string;
    importance: string;
    audioUrl?: string;
    duration?: number;
  };
  onSaveToLog: () => void;
  onReject: () => void;
  status: 'pending' | 'saved' | 'rejected';
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onSaveToLog,
  onReject,
  status
}) => {
  const [showAudioDialog, setShowAudioDialog] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'saved': return 'bg-green-50 border-green-200';
      case 'rejected': return 'bg-red-50 border-red-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'saved': return <Check size={16} className="text-green-600" />;
      case 'rejected': return <X size={16} className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <>
      <Card className={`${getStatusColor()} transition-colors h-full shadow-sm hover:shadow-md`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="shrink-0 text-xs bg-gray-50 text-gray-700 border-gray-200">
                {evidence.timestamp}
              </Badge>
              <Badge 
                className={`text-xs ${
                  evidence.importance === 'high' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}
              >
                {evidence.importance}
              </Badge>
            </div>
            
            {status !== 'pending' && (
              <div className="flex items-center gap-1">
                {getStatusIcon()}
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="text-gray-700 italic text-sm line-clamp-3">"{evidence.text}"</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAudioDialog(true)}
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <AudioWaveform size={14} className="mr-2" />
              View Audio & Transcript
            </Button>

            {status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  onClick={onSaveToLog}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Check size={14} className="mr-1" />
                  Save
                </Button>
                <Button
                  onClick={onReject}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  size="sm"
                >
                  <X size={14} className="mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audio & Transcript Dialog */}
      <Dialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Evidence Review - {evidence.timestamp}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-900">Key Moment</h4>
              <p className="text-blue-800 italic">"{evidence.text}"</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AudioWaveform size={16} />
                Audio Recording
              </h4>
              <AudioPlayer 
                audioUrl={evidence.audioUrl || '#'}
                duration={evidence.duration || 25}
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-gray-900">Full Conversation Transcript</h4>
              <div className="bg-white p-4 rounded-md border border-gray-200 max-h-64 overflow-y-auto">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">0:15</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">How have you been feeling lately?</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-purple-600 font-medium min-w-16">{evidence.timestamp}</span>
                    <span className="text-purple-600 font-medium">Patient:</span>
                    <span className="text-gray-700">{evidence.text}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-600 font-medium min-w-16">0:45</span>
                    <span className="text-blue-600 font-medium">Hana:</span>
                    <span className="text-gray-700">Can you tell me more about what's been going on?</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={onSaveToLog}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check size={16} className="mr-2" />
                Save to Patient Log
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
