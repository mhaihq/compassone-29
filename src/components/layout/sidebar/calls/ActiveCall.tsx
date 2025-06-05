
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Phone, PhoneOff, Mic, MicOff, User, Clock, AlertTriangle, FileText, Save } from 'lucide-react';

interface ActiveCallProps {
  onEndCall: () => void;
}

export const ActiveCall: React.FC<ActiveCallProps> = ({ onEndCall }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callNotes, setCallNotes] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const callOutcomes = [
    'Completed successfully',
    'Patient needs follow-up',
    'Medication adjustment required',
    'Appointment scheduled',
    'Patient did not answer',
    'Call back requested'
  ];

  const handleEndCall = () => {
    // Here you would typically save the call data
    onEndCall();
  };

  return (
    <div className="space-y-6">
      {/* Active Call Header */}
      <Card className="border-green-500 border-2">
        <CardHeader className="bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Matteo Grassi</h3>
                <p className="text-sm text-gray-600">ID: P100592 • Monthly Stability Check</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(callDuration)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Call Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant={isMuted ? "destructive" : "outline"}
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full w-14 h-14"
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={handleEndCall}
          className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="w-6 h-6" />
        </Button>
      </div>

      {/* Patient Context */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Patient Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-blue-900 mb-2">Current Treatment</h5>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Sertraline 100mg (recently increased from 50mg)</li>
              <li>• Weekly therapy sessions</li>
              <li>• Blood pressure monitoring</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-orange-900 mb-2 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Key Points for Discussion
            </h5>
            <ul className="text-xs text-orange-800 space-y-1">
              <li>• How are you feeling since the medication increase?</li>
              <li>• Any side effects from the new dosage?</li>
              <li>• Blood pressure readings at home?</li>
              <li>• Sleep quality and appetite changes?</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Call Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Call Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Document key points from the conversation..."
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/* Call Outcome */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Call Outcome</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {callOutcomes.map((outcome) => (
              <label key={outcome} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="outcome"
                  value={outcome}
                  checked={selectedOutcome === outcome}
                  onChange={(e) => setSelectedOutcome(e.target.value)}
                  className="text-[#1E4D36]"
                />
                <span className="text-sm">{outcome}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save & End Call */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Notes
        </Button>
        <Button 
          onClick={handleEndCall}
          className="flex-1 bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="w-4 h-4 mr-2" />
          End & Save Call
        </Button>
      </div>
    </div>
  );
};
