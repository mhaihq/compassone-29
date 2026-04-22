import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Play, Pause, ExternalLink, Calendar, User, ListChecks } from 'lucide-react';
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

interface CallSummary {
  duration: string;
  overallTone: 'positive' | 'neutral' | 'concerned' | 'distressed';
  summary: string;
  topicsCovered: string[];
  aiObservations: string;
  nextStepSuggested?: string;
}

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
  callSummary?: CallSummary;
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
      callSummary: t.callSummary,
      triggeredBy: t.triggeredBy,
      callDate: t.callDate,
    };
  });
  return lookup;
};

const taskLookup = buildTaskLookup();

interface CarePlanFields {
  // S — Subjective
  subjective: string;
  // O — Objective
  objective: string;
  // A — Assessment
  assessment: string;
  // P — Plan
  interventionsPerformed: string;
  coordinationActionTaken: string;
  planNextPeriod: string;
  // Attribution (CMS audit requirement)
  conductedBy: string;
  conductedByRole: string;
  cptCode: string;
}

const emptyCarePlan: CarePlanFields = {
  subjective: '',
  objective: '',
  assessment: '',
  interventionsPerformed: '',
  coordinationActionTaken: '',
  planNextPeriod: '',
  conductedBy: '',
  conductedByRole: '',
  cptCode: '99490',
};

// TODO: Replace with real API call
const previousCarePlanByPatient: Record<string, CarePlanFields> = {
  P100592: {
    subjective: 'Patient reports depression worsening over past week. Struggling to get out of bed most mornings. Reports dark thoughts but denies active SI. Inconsistently taking antidepressant, cancelled last therapy appointment. PHQ-9 estimated 14–16 this call.',
    objective: 'BP home readings 135–142/85–90 (above target <130/80). Lisinopril missed 2–3x/week. PHQ-9 estimated 14–16 (up from 11 at last review). Tone markedly flat, increased pausing.',
    assessment: 'Depression acutely worsened — PHQ-9 trending upward, safety concern present. Hypertension suboptimally controlled secondary to adherence gap. Two active clinical concerns requiring same-day escalation.',
    interventionsPerformed: 'Safety screening conducted (no active SI confirmed). Medication adherence education provided for Lisinopril. Emotion-focused supportive listening during call.',
    coordinationActionTaken: 'Escalated to Dr. Kim for same-day clinical review. Message sent via EHR noting PHQ-9 estimate, safety screening result, and BP trend.',
    planNextPeriod: 'Dr. Kim to determine medication and safety plan adjustments. Follow-up call within 48 hrs to confirm safety plan in place. Confirm Lisinopril reminder setup at next Hana check-in.',
    conductedBy: 'Linda Torres, RN',
    conductedByRole: 'Care Coordinator',
    cptCode: '99490',
  },
  P100593: {
    subjective: 'Patient reports anxiety elevated over past 2 weeks, new work stressors identified. Panic episodes 2–3x/week. Sleep disrupted. No avoidance behaviors yet.',
    objective: 'GAD-7 increased from 9 to 13. Escitalopram 10mg — adherent. Tone anxious but engaged. No red-flag safety concerns.',
    assessment: 'Moderate anxiety escalation tied to identifiable psychosocial stressor. Medication adherent — escalation likely situational. CBT booster may be sufficient before any medication change.',
    interventionsPerformed: 'GAD-7 administered. Breathing exercise technique reviewed. Discussed PRN lorazepam use for acute episodes.',
    coordinationActionTaken: 'Referral placed back to therapist for CBT booster sessions. EHR note sent to Dr. Wilson with GAD-7 score and stressor context.',
    planNextPeriod: 'Reassess GAD-7 in 2 weeks. Consider escalation to Dr. Wilson for medication review if score does not improve.',
    conductedBy: 'Linda Torres, RN',
    conductedByRole: 'Care Coordinator',
    cptCode: '99490',
  },
  P100594: {
    subjective: 'Patient reports dizziness and fatigue since Lamotrigine dose increase 3 weeks ago. Mood stable. Physical side effects limiting daily function.',
    objective: 'Lamotrigine increased to 200mg 3 weeks prior. No objective vitals captured this call. Mood described as stable per patient report.',
    assessment: 'Probable Lamotrigine tolerability issue at 200mg. Dose-dependent side effects (dizziness, fatigue) consistent with titration. Provider review needed before any further changes.',
    interventionsPerformed: 'Symptom inquiry completed. Advised patient not to adjust dose independently. Documented side effect timeline.',
    coordinationActionTaken: 'Urgent EHR flag sent to prescribing provider requesting tolerability review. Patient advised provider will follow up within 24–48 hrs.',
    planNextPeriod: 'Awaiting provider decision on dose adjustment. Follow up with patient after provider response received.',
    conductedBy: 'Linda Torres, RN',
    conductedByRole: 'Care Coordinator',
    cptCode: '99490',
  },
  P100595: {
    subjective: 'Patient reports new workplace trigger causing sleep disruption and concentration issues at work. PTSD otherwise well-managed. Nightmares increased this week.',
    objective: 'Prazosin 3mg qhs — previously effective for nightmares. Sertraline 150mg — stable. Sleep quality self-rated 4/10 this week vs 7/10 last month.',
    assessment: 'PTSD symptom flare secondary to identified workplace stressor. Medication regimen appropriate — acute worsening is psychosocial, not pharmacological. Grounding tools may be sufficient short-term.',
    interventionsPerformed: 'Grounding technique reviewed and practiced during call. Sleep hygiene reinforced. Trigger identification and coping plan discussed.',
    coordinationActionTaken: 'Coordinated with Dr. Brown — EHR note sent with trigger context and current symptom severity. Discussed possible workplace accommodation referral.',
    planNextPeriod: 'Follow up on workplace accommodations discussion. Re-assess sleep quality at next call. Escalate to Dr. Brown if nightmares worsen or PCL-5 score increases.',
    conductedBy: 'Linda Torres, RN',
    conductedByRole: 'Care Coordinator',
    cptCode: '99490',
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
  onOpenTaskQueue?: () => void;
}

export function CareTaskContent({ taskId, onComplete, onOpenTaskQueue }: CareTaskContentProps) {
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
  const evidenceToShow = [...highEvidence, ...otherEvidence].slice(0, 3);

  const toneStyle: Record<string, string> = {
    positive: 'bg-green-50 border-green-200 text-green-800',
    neutral: 'bg-muted border-border text-muted-foreground',
    concerned: 'bg-amber-50 border-amber-200 text-amber-800',
    distressed: 'bg-red-50 border-red-200 text-red-800',
  };

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
        <div className="flex items-center gap-2 flex-shrink-0">
          {onOpenTaskQueue && (
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={onOpenTaskQueue}>
              <ListChecks size={11} className="mr-1" />Task Queue
            </Button>
          )}
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={() => setIsTimerRunning(r => !r)}>
            {isTimerRunning ? <><Pause size={11} className="mr-1" />Pause</> : <><Play size={11} className="mr-1" />Resume</>}
          </Button>
        </div>
      </div>

      {/* Call Summary */}
      {task.callSummary && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Call Summary
              </CardTitle>
              <div className="flex items-center gap-2">
                {task.callDate && task.callDate !== 'N/A' && (
                  <span className="text-xs text-muted-foreground">{task.callDate}</span>
                )}
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={11} />{task.callSummary.duration}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${toneStyle[task.callSummary.overallTone]}`}>
                  {task.callSummary.overallTone}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground leading-relaxed">{task.callSummary.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Topics Covered</p>
                <ul className="space-y-1">
                  {task.callSummary.topicsCovered.map((t, i) => (
                    <li key={i} className="text-xs text-foreground flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">AI Observations</p>
                  <p className="text-xs text-foreground leading-relaxed">{task.callSummary.aiObservations}</p>
                </div>
                {task.callSummary.nextStepSuggested && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Suggested Next Step</p>
                    <p className="text-xs text-foreground leading-relaxed">{task.callSummary.nextStepSuggested}</p>
                  </div>
                )}
              </div>
            </div>

            {evidenceToShow.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Key Quotes</p>
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
          </CardContent>
        </Card>
      )}

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

          {!task.callSummary && evidenceToShow.length > 0 && (
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

      {/* Block 2: Encounter Note — SOAP format (CMS CCM documentation standard) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Encounter Note
            </CardTitle>
            {previousCarePlanByPatient[task.patientId] && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Previous note loaded — revise as needed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Attribution row (CMS audit requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg border border-border bg-muted/40 px-3 py-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Conducted by</Label>
              <Input
                className="text-sm h-8"
                placeholder="Full name"
                value={carePlan.conductedBy}
                onChange={e => setCarePlan(p => ({ ...p, conductedBy: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Role</Label>
              <Select value={carePlan.conductedByRole} onValueChange={v => setCarePlan(p => ({ ...p, conductedByRole: v }))}>
                <SelectTrigger className="text-sm h-8">
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Care Coordinator">Care Coordinator (RN/MA)</SelectItem>
                  <SelectItem value="NP">Nurse Practitioner</SelectItem>
                  <SelectItem value="PA">Physician Assistant</SelectItem>
                  <SelectItem value="MD/DO">Physician (MD/DO)</SelectItem>
                  <SelectItem value="LCSW">Social Worker (LCSW)</SelectItem>
                  <SelectItem value="Hana AI">Hana AI (supervised)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">CPT code</Label>
              <Select value={carePlan.cptCode} onValueChange={v => setCarePlan(p => ({ ...p, cptCode: v }))}>
                <SelectTrigger className="text-sm h-8">
                  <SelectValue placeholder="Select code..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="99490">99490 — CCM, non-physician, 20 min</SelectItem>
                  <SelectItem value="99439">99439 — CCM add-on, each 20 min</SelectItem>
                  <SelectItem value="99491">99491 — CCM, physician direct, 30 min</SelectItem>
                  <SelectItem value="99487">99487 — Complex CCM, 60 min</SelectItem>
                  <SelectItem value="99489">99489 — Complex CCM add-on</SelectItem>
                  <SelectItem value="G0556">G0556 — APCM Level I</SelectItem>
                  <SelectItem value="G0557">G0557 — APCM Level II</SelectItem>
                  <SelectItem value="G0558">G0558 — APCM Level III</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* S — Subjective */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">S</Badge>
              <Label className="text-xs font-medium text-foreground">Subjective — Patient-reported symptoms & status</Label>
            </div>
            <Textarea
              placeholder="What the patient reports: symptoms, concerns, mood, adherence, functional status, goals progress…"
              className="text-sm min-h-[72px] resize-none"
              value={carePlan.subjective}
              onChange={e => setCarePlan(p => ({ ...p, subjective: e.target.value }))}
            />
          </div>

          {/* O — Objective */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">O</Badge>
              <Label className="text-xs font-medium text-foreground">Objective — Measurable clinical data</Label>
            </div>
            <Textarea
              placeholder="Vitals, validated scores (PHQ-9, GAD-7, PCL-5), lab values, medication list, call tone/observations…"
              className="text-sm min-h-[60px] resize-none"
              value={carePlan.objective}
              onChange={e => setCarePlan(p => ({ ...p, objective: e.target.value }))}
            />
          </div>

          {/* A — Assessment */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">A</Badge>
              <Label className="text-xs font-medium text-foreground">Assessment — Clinical interpretation</Label>
            </div>
            <Textarea
              placeholder="Clinician interpretation: condition status (stable/worsening/improving), risk level, drivers of change, escalation rationale if applicable…"
              className="text-sm min-h-[60px] resize-none"
              value={carePlan.assessment}
              onChange={e => setCarePlan(p => ({ ...p, assessment: e.target.value }))}
            />
          </div>

          {/* P — Plan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">P</Badge>
              <Label className="text-xs font-medium text-foreground">Plan</Label>
            </div>
            <div className="space-y-1.5 ml-6">
              <Label className="text-xs text-muted-foreground">Interventions performed this session</Label>
              <Textarea
                placeholder="Education provided, safety screening, techniques practiced, medication reconciliation, referrals placed this session…"
                className="text-sm min-h-[60px] resize-none"
                value={carePlan.interventionsPerformed}
                onChange={e => setCarePlan(p => ({ ...p, interventionsPerformed: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 ml-6">
              <Label className="text-xs text-muted-foreground">Coordination action taken <span className="text-muted-foreground/70">(CMS required — who was contacted & what was communicated)</span></Label>
              <Textarea
                placeholder="e.g. EHR message sent to Dr. Kim re: PHQ-9 score and safety screen. Referral placed to nephrology. Specialist contacted by phone re: lab result…"
                className="text-sm min-h-[60px] resize-none"
                value={carePlan.coordinationActionTaken}
                onChange={e => setCarePlan(p => ({ ...p, coordinationActionTaken: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 ml-6">
              <Label className="text-xs text-muted-foreground">Plan for next period</Label>
              <Textarea
                placeholder="What the care team will do next: follow-up schedule, targets to reassess, escalation triggers, patient action items…"
                className="text-sm min-h-[60px] resize-none"
                value={carePlan.planNextPeriod}
                onChange={e => setCarePlan(p => ({ ...p, planNextPeriod: e.target.value }))}
              />
            </div>
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
