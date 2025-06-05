
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Brain, AlertTriangle, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { CallTranscriptSegment } from '@/services/aiCallService';

interface RealTimeCallAssistantProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  patientName: string;
}

export const RealTimeCallAssistant: React.FC<RealTimeCallAssistantProps> = ({
  isRecording,
  onToggleRecording,
  patientName
}) => {
  const [transcript, setTranscript] = useState<CallTranscriptSegment[]>([]);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);

  // Mock real-time transcript updates
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        // Simulate new transcript segments
        const mockSegments: CallTranscriptSegment[] = [
          {
            id: `segment-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            speaker: Math.random() > 0.5 ? 'patient' : 'clinician',
            text: Math.random() > 0.5 
              ? "I've been feeling much better since we increased my medication dose."
              : "That's great to hear. How has your sleep been?",
            sentiment: 'positive',
            keyPoints: ['medication effectiveness', 'symptom improvement'],
            citations: ['medication increase', 'feeling better']
          }
        ];

        setTranscript(prev => [...prev.slice(-10), ...mockSegments]);
        
        // Update suggestions based on conversation
        if (Math.random() > 0.7) {
          setCurrentSuggestions([
            "Ask about sleep quality and patterns",
            "Inquire about medication side effects",
            "Explore coping strategies that are working"
          ]);
        }

        // Extract key points
        if (Math.random() > 0.8) {
          setKeyPoints(prev => [...new Set([...prev, 'Patient reports mood improvement', 'Medication adherence good'])]);
        }
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'concerning': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Recording Control */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Real-Time AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={onToggleRecording}
                className={`rounded-full w-12 h-12 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <div>
                <p className="font-medium">
                  {isRecording ? 'Recording & Transcribing' : 'Ready to Record'}
                </p>
                <p className="text-sm text-gray-600">
                  AI-powered call assistance for {patientName}
                </p>
              </div>
            </div>
            {isRecording && (
              <Badge className="bg-red-100 text-red-800 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                LIVE
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Suggestions */}
      {currentSuggestions.length > 0 && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentSuggestions.map((suggestion, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded-lg text-sm text-blue-800">
                  💡 {suggestion}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Points Tracker */}
      {keyPoints.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Key Points Captured
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {point}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Transcript */}
      {transcript.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Live Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {transcript.map((segment) => (
                  <div key={segment.id} className="border-b pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {segment.speaker}
                      </Badge>
                      <span className="text-xs text-gray-500">{segment.timestamp}</span>
                      <Badge className={`text-xs ${getSentimentColor(segment.sentiment)}`}>
                        {segment.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm">{segment.text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
