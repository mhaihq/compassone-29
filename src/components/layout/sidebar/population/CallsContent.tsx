
import React, { useState } from 'react';
import { Phone, Clock, Search, Filter, PhoneCall, Users, Calendar } from 'lucide-react';
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
      {/* Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <Phone size={24} className="text-[#1E4D36]" />
          <h2 className="text-xl font-semibold text-gray-900">Patient Calls</h2>
        </div>
        <p className="text-sm text-gray-600">
          Intelligent calling system with pre-call insights and real-time support
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Queue</p>
              <p className="text-lg font-semibold">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-lg font-semibold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Avg/Day</p>
              <p className="text-lg font-semibold">18</p>
            </div>
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
          Call Queue
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
              placeholder="Search patients..."
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
