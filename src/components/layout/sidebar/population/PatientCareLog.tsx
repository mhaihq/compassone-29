import React, { useState } from 'react';
import { Calendar, Clock, Phone, Video, MessageCircle, FileText, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type CallChannel = 'video' | 'phone' | 'sms';
type CallStatus = 'completed' | 'missed' | 'scheduled';

interface CallEntry {
  id: string;
  title: string;
  channel: CallChannel;
  status: CallStatus;
  date: string;
  time: string;
  durationMin: number | null;
  participant: string;
  summary: string;
  transcript?: string;
  minutesLogged: number;
  countedForBilling: boolean;
  cptCode?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// TODO: Replace with real API call
const mockCallLog: CallEntry[] = [
  {
    id: 'call-001',
    title: 'Monthly CCM Review',
    channel: 'phone',
    status: 'completed',
    date: '2026-04-22',
    time: '14:32',
    durationMin: 14,
    participant: 'Hana AI Coach',
    summary: 'Depression symptoms discussed. PHQ-9 administered (score 11, down from 15). BP reading elevated at 138/88. Medication adherence discussed — patient reports occasional missed lisinopril doses.',
    transcript: 'Hana: How have you been feeling since our last call?\nPatient: The medication seems to be helping with the low mood, but I still have bad days.\nHana: Can we talk about those days? When do they usually happen?\nPatient: Usually mid-afternoon. I feel exhausted and hopeless for a few hours.\nHana: That sounds difficult. Let\'s note that and talk to Dr. Wilson at your next appointment.',
    minutesLogged: 14,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Sarah M. (RN)',
    reviewedAt: '2026-04-22',
  },
  {
    id: 'call-002',
    title: 'Medication Adherence Check',
    channel: 'sms',
    status: 'completed',
    date: '2026-04-20',
    time: '11:30',
    durationMin: 4,
    participant: 'Hana AI Coach',
    summary: 'SMS follow-up on lisinopril adherence. Patient confirmed 2 missed doses this week. Education provided on importance of consistent dosing.',
    minutesLogged: 4,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Sarah M. (RN)',
    reviewedAt: '2026-04-20',
  },
  {
    id: 'call-003',
    title: 'Care Plan Review',
    channel: 'video',
    status: 'completed',
    date: '2026-04-18',
    time: '10:00',
    durationMin: 18,
    participant: 'Dr. Wilson',
    summary: 'Comprehensive care plan review. Updated medication plan. Scheduled follow-up for BP recheck in 1 week.',
    minutesLogged: 18,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Dr. Wilson',
    reviewedAt: '2026-04-18',
  },
  {
    id: 'call-004',
    title: 'Weekly Check-in',
    channel: 'phone',
    status: 'completed',
    date: '2026-04-15',
    time: '15:00',
    durationMin: 8,
    participant: 'Hana AI Coach',
    summary: 'Patient reports feeling more stable. Sleep improved. No SI. Exercise minutes below target (90/150 min this week).',
    minutesLogged: 8,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Sarah M. (RN)',
    reviewedAt: '2026-04-15',
  },
  {
    id: 'call-005',
    title: 'Weekly Check-in',
    channel: 'phone',
    status: 'missed',
    date: '2026-04-08',
    time: '15:00',
    durationMin: null,
    participant: 'Hana AI Coach',
    summary: 'Patient did not answer. Voicemail left. Rescheduled for following week.',
    minutesLogged: 2,
    countedForBilling: false,
  },
];

const CHANNEL_ICON: Record<CallChannel, React.ElementType> = {
  video: Video,
  phone: Phone,
  sms: MessageCircle,
};

const STATUS_BADGE: Record<CallStatus, { label: string; className: string }> = {
  completed: { label: 'Completed', className: 'bg-green-100 text-green-700 border-green-200' },
  missed:    { label: 'Missed',    className: 'bg-red-100 text-red-700 border-red-200' },
  scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700 border-blue-200' },
};

export const PatientCareLog: React.FC = () => {
  const [selected, setSelected] = useState<CallEntry | null>(null);
  const [search, setSearch] = useState('');

  const filtered = mockCallLog.filter(
    c => c.title.toLowerCase().includes(search.toLowerCase()) ||
         c.summary.toLowerCase().includes(search.toLowerCase()),
  );

  const totalMinutes = mockCallLog.reduce((sum, c) => sum + (c.countedForBilling ? c.minutesLogged : 0), 0);

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Care Log</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {totalMinutes} min logged for billing this cycle
              </p>
            </div>
            <Input
              placeholder="Search log..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-9 text-sm sm:w-56"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map(call => {
              const ChannelIcon = CHANNEL_ICON[call.channel];
              const statusCfg = STATUS_BADGE[call.status];
              return (
                <button
                  key={call.id}
                  onClick={() => setSelected(call)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
                >
                  <div className="flex-shrink-0 p-1.5 rounded-md bg-muted">
                    <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{call.title}</span>
                      <Badge className={`text-xs ${statusCfg.className}`}>{statusCfg.label}</Badge>
                      {call.countedForBilling && (
                        <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                          <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />
                          Billed
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(call.date).toLocaleDateString()} · {call.time}
                      </span>
                      {call.durationMin && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {call.durationMin} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {call.participant}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">No log entries match your search.</div>
          )}
        </CardContent>
      </Card>

      <CallDetailDrawer call={selected} onClose={() => setSelected(null)} />
    </>
  );
};

function CallDetailDrawer({ call, onClose }: { call: CallEntry | null; onClose: () => void }) {
  if (!call) return null;
  const statusCfg = STATUS_BADGE[call.status];
  return (
    <Sheet open={!!call} onOpenChange={o => { if (!o) onClose(); }}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-base">{call.title}</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          {/* Status row */}
          <div className="flex flex-wrap gap-2">
            <Badge className={`text-xs ${statusCfg.className}`}>{statusCfg.label}</Badge>
            {call.countedForBilling && (
              <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Counts for billing
              </Badge>
            )}
            {call.cptCode && <Badge variant="outline" className="text-xs">{call.cptCode}</Badge>}
          </div>

          {/* Call metadata */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & time</span>
              <span className="font-medium">{new Date(call.date).toLocaleDateString()} · {call.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Channel</span>
              <span className="font-medium capitalize">{call.channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{call.durationMin ? `${call.durationMin} min` : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Participant</span>
              <span className="font-medium">{call.participant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minutes logged</span>
              <span className="font-medium">{call.minutesLogged} min</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Summary</p>
            <p className="text-sm text-foreground leading-relaxed">{call.summary}</p>
          </div>

          {/* Transcript */}
          {call.transcript && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                Transcript excerpt
              </p>
              <pre className="text-xs text-foreground bg-muted rounded-md p-3 whitespace-pre-wrap font-sans leading-relaxed">
                {call.transcript}
              </pre>
            </div>
          )}

          {/* Audit trail */}
          {call.reviewedBy && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Audit</p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Reviewed by <span className="font-medium">{call.reviewedBy}</span></span>
                {call.reviewedAt && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(call.reviewedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
