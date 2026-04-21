import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Play, Pause, ExternalLink, CheckSquare, Square, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { populationTasksData } from '@/data/populationTasksData';
import type { TaskOutcome } from '@/types/taskOutcome';

interface CareTask {
  id: string;
  title: string;
  description: string;
  patientId: string;
  patientName: string;
  taskType?: string;
  evidenceFromCall?: Array<{
    text: string;
    timestamp: string;
    importance: string;
  }>;
  triggeredBy?: string;
  callDate?: string;
}

const buildTaskLookup = (): Record<string, CareTask> => {
  const lookup: Record<string, CareTask> = {};
  populationTasksData.forEach(t => {
    lookup[t.id] = {
      id: t.id,
      title: t.title,
      description: t.description,
      patientId: t.patientId,
      patientName: t.patientName,
      taskType: t.taskType,
      evidenceFromCall: t.evidenceFromCall || [],
      triggeredBy: t.triggeredBy,
      callDate: t.callDate,
    };
  });
  return lookup;
};

const taskLookup = buildTaskLookup();

interface CarePlanFields {
  statusSinceLastReview: string;
  medicationUpdate: string;
  symptomUpdate: string;
  interventions: string;
  nextReviewNote: string;
}

const emptyCarePlan: CarePlanFields = {
  statusSinceLastReview: '',
  medicationUpdate: '',
  symptomUpdate: '',
  interventions: '',
  nextReviewNote: '',
};

// TODO: Replace with real API call
const previousCarePlanByPatient: Record<string, CarePlanFields> = {
  P100592: {
    statusSinceLastReview: 'Depression symptoms stable since last review. PHQ-9 dropped from 15 to 11. Sleep improved with sertraline adjustment. BP still running high (average 138/88).',
    medicationUpdate: 'Sertraline 100mg daily — tolerating well. Lisinopril 10mg daily — occasional missed doses reported.',
    symptomUpdate: 'Mood improving. Reports occasional hopelessness but no SI. Energy still low mid-afternoon.',
    interventions: 'Weekly check-in calls with Hana. Coordinated with Dr. Wilson for lisinopril adherence. Sleep hygiene education reinforced.',
    nextReviewNote: 'Check PHQ-9 at next review. If BP remains >135/85, escalate to provider for medication adjustment.',
  },
  P100593: {
    statusSinceLastReview: 'Anxiety elevated over past 2 weeks. GAD-7 increased from 9 to 13. New work stressors reported.',
    medicationUpdate: 'Escitalopram 10mg daily — patient adherent. Discussed PRN lorazepam use for acute episodes.',
    symptomUpdate: 'Panic episodes 2-3x per week. Sleep disrupted. No avoidance behaviors yet.',
    interventions: 'Referred back to therapist for CBT booster sessions. Breathing exercises reviewed.',
    nextReviewNote: 'Reassess GAD-7 in 2 weeks. Consider medication adjustment if no improvement.',
  },
  P100594: {
    statusSinceLastReview: 'Mood stabilizer dose increased 3 weeks ago. Patient reporting dizziness and fatigue since then.',
    medicationUpdate: 'Lamotrigine increased to 200mg. Side effects reported — needs provider review.',
    symptomUpdate: 'Mood stable but physical side effects limiting daily function.',
    interventions: 'Flagged for provider review of medication tolerability.',
    nextReviewNote: 'Awaiting provider decision on dose adjustment.',
  },
  P100595: {
    statusSinceLastReview: 'PTSD symptoms well-managed until recent workplace trigger identified.',
    medicationUpdate: 'Prazosin 3mg qhs for nightmares — effective. Sertraline 150mg stable.',
    symptomUpdate: 'Sleep disrupted by new workplace trigger. Concentration affected at work.',
    interventions: 'Coordinating with Dr. Brown on trigger management. Grounding techniques reviewed.',
    nextReviewNote: 'Follow up on workplace accommodations discussion.',
  },
};

interface FollowUp {
  needed: boolean;
  date: string;
  assignee: string;
}

interface CareTaskContentProps {
  taskId: string;
  onComplete?: () => void;
}

export function CareTaskContent({ taskId, onComplete }: CareTaskContentProps) {
  const { toast } = useToast();

  const [task, setTask] = useState<CareTask | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [carePlan, setCarePlan] = useState<CarePlanFields>(emptyCarePlan);
  const [outcome, setOutcome] = useState<TaskOutcome>({
    escalate: false,
    updateCarePlan: false,
    countsForBilling: false,
    carePlanUpdate: null,
  });
  const [followUp, setFollowUp] = useState<FollowUp>({ needed: false, date: '', assignee: '' });

  useEffect(() => {
    const t = taskLookup[taskId] ?? null;
    setTask(t);
    if (t) {
      const preload = previousCarePlanByPatient[t.patientId];
      if (preload) setCarePlan(preload);
    }
  }, [taskId]);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  };

  const handleComplete = () => {
    const parts: string[] = [`Time logged: ${formatTime(timer)}`];
    if (outcome.countsForBilling) parts.push('added to billing');
    if (outcome.escalate) parts.push('escalated');
    if (followUp.needed) parts.push('follow-up scheduled');

    toast({
      title: 'Care Task Completed',
      description: parts.join(' · '),
    });

    setTimeout(() => onComplete?.(), 1200);
  };

  if (!task) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto text-amber-500" size={40} />
        <p className="mt-3 text-muted-foreground">Task not found.</p>
      </div>
    );
  }

  const highEvidence = task.evidenceFromCall?.filter(e => e.importance === 'high') ?? [];
  const otherEvidence = task.evidenceFromCall?.filter(e => e.importance !== 'high') ?? [];
  const evidenceToShow = [...highEvidence, ...otherEvidence].slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Timer bar */}
      <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-2.5 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
          <Clock size={14} className="flex-shrink-0" />
          <span className="hidden sm:inline">Session time:</span>
          <span className="font-mono font-medium text-foreground">{formatTime(timer)}</span>
          <span className="text-xs text-muted-foreground/70 hidden sm:inline">
            ({Math.round((timer / (20 * 60)) * 100)}% of 20 min)
          </span>
        </div>
        <Button variant="outline" size="sm" className="h-8 px-3 text-xs flex-shrink-0" onClick={() => setIsTimerRunning(r => !r)}>
          {isTimerRunning ? <><Pause size={11} className="mr-1" />Pause</> : <><Play size={11} className="mr-1" />Resume</>}
        </Button>
      </div>

      {/* Block 1: Why this task exists */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Why this task exists
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-base font-semibold text-foreground">{task.title}</h2>
            {task.taskType && (
              <Badge variant="outline" className="text-xs">{task.taskType}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{task.description}</p>

          {task.triggeredBy && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User size={12} />
              <span>Flagged by <span className="font-medium text-foreground">{task.triggeredBy}</span></span>
              {task.callDate && task.callDate !== 'N/A' && (
                <><span>·</span><Calendar size={12} /><span>{task.callDate}</span></>
              )}
            </div>
          )}

          {evidenceToShow.length > 0 && (
            <div className="space-y-2 mt-2">
              {evidenceToShow.map((ev, i) => (
                <div
                  key={i}
                  className={`rounded-md px-3 py-2 text-sm border-l-2 ${
                    ev.importance === 'high'
                      ? 'bg-amber-50 border-amber-400 text-amber-900'
                      : 'bg-muted border-border text-muted-foreground'
                  }`}
                >
                  <span className="font-medium">{ev.timestamp}</span> — {ev.text}
                </div>
              ))}
            </div>
          )}

          {task.callDate && task.callDate !== 'N/A' && (
            <button className="flex items-center gap-1 text-xs text-primary hover:underline mt-1">
              <ExternalLink size={11} />
              View call transcript
            </button>
          )}
        </CardContent>
      </Card>

      {/* Block 2: Care Plan Update */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Care Plan Update
            </CardTitle>
            {previousCarePlanByPatient[task.patientId] && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Previous plan loaded — revise as needed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Status since last review</Label>
            <Textarea
              placeholder="Describe patient's current status compared to last review..."
              className="text-sm min-h-[72px] resize-none"
              value={carePlan.statusSinceLastReview}
              onChange={e => setCarePlan(p => ({ ...p, statusSinceLastReview: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Medication update</Label>
              <Textarea
                placeholder="Any medication changes or adherence notes..."
                className="text-sm min-h-[60px] resize-none"
                value={carePlan.medicationUpdate}
                onChange={e => setCarePlan(p => ({ ...p, medicationUpdate: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Symptom update</Label>
              <Textarea
                placeholder="Current symptoms reported by patient..."
                className="text-sm min-h-[60px] resize-none"
                value={carePlan.symptomUpdate}
                onChange={e => setCarePlan(p => ({ ...p, symptomUpdate: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Interventions</Label>
            <Textarea
              placeholder="Actions taken or recommended during this review..."
              className="text-sm min-h-[60px] resize-none"
              value={carePlan.interventions}
              onChange={e => setCarePlan(p => ({ ...p, interventions: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Next review note</Label>
            <Textarea
              placeholder="What to focus on at the next review..."
              className="text-sm min-h-[60px] resize-none"
              value={carePlan.nextReviewNote}
              onChange={e => setCarePlan(p => ({ ...p, nextReviewNote: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Block 3: Task Outcome */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Task Outcome
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Outcome checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="escalate"
                checked={outcome.escalate}
                onCheckedChange={v => setOutcome(o => ({ ...o, escalate: !!v }))}
              />
              <Label htmlFor="escalate" className="text-sm font-medium cursor-pointer">
                Escalate to provider
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="billing"
                checked={outcome.countsForBilling}
                onCheckedChange={v => setOutcome(o => ({ ...o, countsForBilling: !!v }))}
              />
              <Label htmlFor="billing" className="text-sm font-medium cursor-pointer">
                Counts for billing
                <span className="ml-1 text-xs text-muted-foreground font-normal">(reviewer confirmed)</span>
              </Label>
            </div>
          </div>

          {/* Follow-up */}
          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-center gap-3">
              <Checkbox
                id="followup"
                checked={followUp.needed}
                onCheckedChange={v => setFollowUp(f => ({ ...f, needed: !!v }))}
              />
              <Label htmlFor="followup" className="text-sm font-medium cursor-pointer">
                Follow-up needed
              </Label>
            </div>

            {followUp.needed && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-7">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <Input
                    type="date"
                    className="text-sm h-8"
                    value={followUp.date}
                    onChange={e => setFollowUp(f => ({ ...f, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Assign to</Label>
                  <Select value={followUp.assignee} onValueChange={v => setFollowUp(f => ({ ...f, assignee: v }))}>
                    <SelectTrigger className="text-sm h-8">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hana-ai">Hana AI</SelectItem>
                      <SelectItem value="care-coordinator">Care Coordinator</SelectItem>
                      <SelectItem value="provider">Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-2"
            onClick={handleComplete}
          >
            {outcome.countsForBilling ? 'Complete and Add to Billing' : 'Complete'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
