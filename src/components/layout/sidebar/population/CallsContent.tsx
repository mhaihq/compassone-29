
import React, { useState } from 'react';
import { Phone, Clock, Search, Filter, PhoneCall, Users, Calendar, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CallQueue } from '../calls/CallQueue';
import { ActiveCall } from '../calls/ActiveCall';
import { CallHistory } from '../calls/CallHistory';

export const CallsContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'queue' | 'active' | 'history'>('queue');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInCall, setIsInCall] = useState(false);

  const handleStartCall = (patientId: string) => {
    setIsInCall(true);
    setActiveView('active');
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setActiveView('queue');
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Enhancement Badge */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <Phone size={24} className="text-[#1E4D36]" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Enhanced Patient Calls</h2>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>
        <p className="text-sm text-gray-600">
          Intelligent calling system with AI pre-call insights, real-time transcription, and automated documentation
        </p>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Queue</p>
              <p className="text-lg font-semibold">8</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI insights ready
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-lg font-semibold">12</p>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI summaries generated
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Avg Call Time</p>
              <p className="text-lg font-semibold">12 min</p>
              <p className="text-xs text-green-600">↓ 30% with AI assist</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-purple-900">AI-Powered Call Intelligence</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-purple-800">Pre-call patient insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800">Real-time transcription</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-800">Automated documentation</span>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={activeView === 'queue' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveView('queue')}
          className={activeView === 'queue' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
        >
          <Clock className="w-4 h-4 mr-1" />
          AI Call Queue
        </Button>
        {isInCall && (
          <Button
            variant={activeView === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('active')}
            className={activeView === 'active' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
          >
            <PhoneCall className="w-4 h-4 mr-1" />
            Active Call
            <Badge className="ml-2 bg-green-500">Live</Badge>
          </Button>
        )}
        <Button
          variant={activeView === 'history' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveView('history')}
          className={activeView === 'history' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}
        >
          <Calendar className="w-4 h-4 mr-1" />
          History
        </Button>
      </div>

      {/* Search and Filter */}
      {activeView !== 'active' && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search patients or AI insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      )}

      {/* Content Views */}
      {activeView === 'queue' && (
        <CallQueue searchTerm={searchTerm} onStartCall={handleStartCall} />
      )}
      {activeView === 'active' && isInCall && (
        <ActiveCall onEndCall={handleEndCall} />
      )}
      {activeView === 'history' && (
        <CallHistory searchTerm={searchTerm} />
      )}
    </div>
  );
};
