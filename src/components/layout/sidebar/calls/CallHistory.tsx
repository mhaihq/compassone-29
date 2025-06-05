
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Clock, User, FileText, Calendar } from 'lucide-react';

interface CallHistoryProps {
  searchTerm: string;
}

interface CallRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  duration: string;
  outcome: string;
  type: 'scheduled' | 'follow-up' | 'emergency';
  notes: string;
  nextAction: string;
}

const callHistory: CallRecord[] = [
  {
    id: 'hist-001',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    date: '2025-05-28 2:15 PM',
    duration: '18:32',
    outcome: 'Completed successfully',
    type: 'scheduled',
    notes: 'Patient reports significant improvement since medication increase. Sleep quality better, appetite normalized. BP readings within target range.',
    nextAction: 'Continue current dosage, follow-up in 4 weeks'
  },
  {
    id: 'hist-002',
    patientName: 'Sarah Johnson',
    patientId: 'P100596',
    date: '2025-05-27 11:30 AM',
    duration: '12:45',
    outcome: 'Follow-up scheduled',
    type: 'follow-up',
    notes: 'Patient missed therapy session. Anxiety levels elevated due to work stress. Discussed coping strategies.',
    nextAction: 'Emergency therapy session scheduled for tomorrow'
  },
  {
    id: 'hist-003',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    date: '2025-05-26 4:00 PM',
    duration: '25:18',
    outcome: 'Medication adjustment required',
    type: 'scheduled',
    notes: 'PTSD symptoms improving with current therapy. Sleep still disrupted. Patient ready to reduce medication gradually.',
    nextAction: 'Consult with psychiatrist for medication tapering plan'
  }
];

export const CallHistory: React.FC<CallHistoryProps> = ({ searchTerm }) => {
  const filteredHistory = callHistory.filter(call =>
    call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.outcome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {filteredHistory.map((call) => (
        <Card key={call.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{call.patientName}</h3>
                  <p className="text-sm text-gray-600">ID: {call.patientId}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getTypeColor(call.type)}>
                  {call.type.toUpperCase()}
                </Badge>
                <p className="text-xs text-gray-600 mt-1">{call.date}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {call.duration}
                </span>
                <span className="text-green-600 font-medium">{call.outcome}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Call Notes
                </h5>
                <p className="text-sm text-gray-700">{call.notes}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-blue-900 mb-1">Next Action</h5>
                <p className="text-sm text-blue-800">{call.nextAction}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-1" />
                Call Again
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredHistory.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No call history found</h3>
          <p className="text-gray-600">No calls match your search criteria.</p>
        </div>
      )}
    </div>
  );
};
