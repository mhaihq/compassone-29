import React, { useState } from 'react';
import { Calendar, Clock, Phone, Video, MessageCircle, FileText, CheckCircle2, ShieldCheck, User, Bot } from 'lucide-react';
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
  // Who conducted the call (CMS requires name + role of service provider)
  conductedBy: string;
  conductedByRole: string;
  participant: string;
  summary: string;
  // Specific CMS-qualifying coordination activity (required for audit)
  coordinationActivity: string;
  transcript?: string;
  minutesLogged: number;
  countedForBilling: boolean;
  cptCode?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

interface UpcomingCall {
  id: string;
  title: string;
  channel: CallChannel;
  date: string;
  time: string;
  participant: string;
  agenda: string[];
}

// TODO: Replace with real API call
const mockUpcomingCalls: UpcomingCall[] = [
  {
    id: 'up-001',
    title: 'Weekly CCM Check-in',
    channel: 'phone',
    date: '2026-04-29',
    time: '14:30',
    participant: 'Hana AI Coach',
    agenda: [
      'Review BP readings since last call',
      'Medication adherence check — lisinopril',
      'PHQ-2 screening',
    ],
  },
  {
    id: 'up-002',
    title: 'Monthly Care Plan Review',
    channel: 'video',
    date: '2026-05-05',
    time: '10:00',
    participant: 'Dr. Wilson',
    agenda: [
      'Review monthly care plan',
      'Discuss BP trend and medication adjustment',
      'Update goals for next month',
    ],
  },
];

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
    conductedBy: 'Linda Torres',
    conductedByRole: 'RN — Care Coordinator',
    participant: 'Matteo Grassi',
    coordinationActivity: 'Monthly chronic condition monitoring: PHQ-9 administered (score 11↓ from 15), BP reading reviewed (138/88 — above target), medication adherence assessed — patient reports 2–3 missed lisinopril doses/week. Escalation note sent to Dr. Kim re: BP and depression worsening.',
    summary: 'Depression symptoms discussed. PHQ-9 score 11, down from 15. BP elevated at 138/88. Lisinopril adherence gap identified. Escalation note sent to Dr. Kim.',
    transcript: 'Linda: How have you been feeling since our last call?\nMatteo: The medication seems to be helping with the low mood, but I still have bad days.\nLinda: Can we talk about those days? When do they usually happen?\nMatteo: Usually mid-afternoon. I feel exhausted and hopeless for a few hours.\nLinda: That sounds difficult. I\'m going to flag this for Dr. Kim to review before your next appointment.',
    minutesLogged: 14,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Dr. Sandra Kim, MD',
    reviewedAt: '2026-04-22',
  },
  {
    id: 'call-002',
    title: 'Medication Adherence Follow-up',
    channel: 'sms',
    status: 'completed',
    date: '2026-04-20',
    time: '11:30',
    durationMin: 4,
    conductedBy: 'Hana AI',
    conductedByRole: 'AI Care Coach (supervised by Linda Torres, RN)',
    participant: 'Matteo Grassi',
    coordinationActivity: 'Medication management follow-up: confirmed 2 missed lisinopril doses this week. Patient education provided on consistent dosing and its direct effect on BP control. Reminder setup discussed.',
    summary: 'SMS follow-up on lisinopril adherence. Patient confirmed 2 missed doses this week. Education on consistent dosing provided. Reminder setup recommended.',
    minutesLogged: 4,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Linda Torres, RN',
    reviewedAt: '2026-04-20',
  },
  {
    id: 'call-003',
    title: 'Physician CCM Review',
    channel: 'video',
    status: 'completed',
    date: '2026-04-18',
    time: '10:00',
    durationMin: 18,
    conductedBy: 'Dr. Sandra Kim',
    conductedByRole: 'MD — Principal CCM Billing Provider',
    participant: 'Matteo Grassi',
    coordinationActivity: 'Physician-direct CCM review (99491): care plan updated — lisinopril increased to 20mg, sertraline maintained at 100mg. Referral to nephrology placed for CKD risk monitoring. Coordination note sent to Dr. Rodriguez (psychiatry) re: depression stability. Follow-up BP recheck scheduled in 1 week.',
    summary: 'Physician-led care plan review. Lisinopril dose increased. Nephrology referral placed. Coordination note to psychiatry. BP recheck scheduled.',
    minutesLogged: 18,
    countedForBilling: true,
    cptCode: '99491',
    reviewedBy: 'Dr. Sandra Kim, MD',
    reviewedAt: '2026-04-18',
  },
  {
    id: 'call-004',
    title: 'Weekly Monitoring Check-in',
    channel: 'phone',
    status: 'completed',
    date: '2026-04-15',
    time: '15:00',
    durationMin: 8,
    conductedBy: 'Linda Torres',
    conductedByRole: 'RN — Care Coordinator',
    participant: 'Matteo Grassi',
    coordinationActivity: 'Chronic condition monitoring: patient reports improved mood stability, sleep better. No SI. BP home readings averaging 136/86 — still above target. Exercise below goal (90/150 min). Lifestyle coaching provided. No care changes needed this call.',
    summary: 'Patient reports improved mood and sleep. No SI. BP still above target. Exercise below goal at 90/150 min. Lifestyle coaching provided.',
    minutesLogged: 8,
    countedForBilling: true,
    cptCode: '99490',
    reviewedBy: 'Linda Torres, RN',
    reviewedAt: '2026-04-15',
  },
  {
    id: 'call-005',
    title: 'Weekly Monitoring Check-in',
    channel: 'phone',
    status: 'missed',
    date: '2026-04-08',
    time: '15:00',
    durationMin: null,
    conductedBy: 'Linda Torres',
    conductedByRole: 'RN — Care Coordinator',
    participant: 'Matteo Grassi',
    coordinationActivity: 'Attempted patient contact for weekly monitoring. No answer. Voicemail left. Call rescheduled for following week. 2 min documented for outreach attempt.',
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
      {/* Upcoming AI Calls */}
      {mockUpcomingCalls.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Upcoming Calls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockUpcomingCalls.map(call => {
                const ChannelIcon = CHANNEL_ICON[call.channel];
                const isAI = call.participant.toLowerCase().includes('hana') || call.participant.toLowerCase().includes('ai');
                return (
                  <div key={call.id} className="flex items-start gap-3 px-4 py-3">
                    <div className="flex-shrink-0 p-1.5 rounded-md bg-muted">
                      <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{call.title}</span>
                        <Badge variant="outline" className="text-xs">Scheduled</Badge>
                        {isAI && (
                          <Badge variant="outline" className="text-xs text-violet-700 border-violet-200">
                            <Bot className="h-2.5 w-2.5 mr-0.5" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(call.date).toLocaleDateString()} · {call.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {call.participant}
                        </span>
                      </div>
                      {call.agenda.length > 0 && (
                        <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5 mt-1">
                          {call.agenda.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past Calls */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Past Calls
              </CardTitle>
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
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Date & time</span>
              <span className="font-medium text-right">{new Date(call.date).toLocaleDateString()} · {call.time}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Channel</span>
              <span className="font-medium capitalize">{call.channel}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Duration</span>
              <span className="font-medium">{call.durationMin ? `${call.durationMin} min` : '—'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Conducted by</span>
              <span className="font-medium text-right">{call.conductedBy}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Role</span>
              <span className="font-medium text-right text-xs">{call.conductedByRole}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Patient</span>
              <span className="font-medium">{call.participant}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground shrink-0">Minutes logged</span>
              <span className="font-medium">{call.minutesLogged} min</span>
            </div>
          </div>

          {/* CMS coordination activity — required for billing audit */}
          <div className="rounded-lg bg-muted/50 border border-border p-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
              Coordination Activity <span className="normal-case text-muted-foreground/70">(CMS billing documentation)</span>
            </p>
            <p className="text-sm text-foreground leading-relaxed">{call.coordinationActivity}</p>
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
