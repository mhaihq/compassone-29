import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { StatusPill } from '@/components/ui/status-dot';

type Tone = 'blue' | 'orange' | 'yellow' | 'green' | 'red' | 'violet' | 'muted';
import { ArrowLeft, ChevronRight, Phone, FileText, UserCheck, AlertTriangle, Users, Clock, CheckCircle2, XCircle, Activity, Upload } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Stage = 'eligible' | 'outreach' | 'consent-pending' | 'ready' | 'enrolled' | 'declined';

type CohortKey =
  | 'high-risk'
  | 'awv-triggered'
  | 'provider-referred'
  | 'recently-discharged'
  | 'uncontrolled-chronic'
  | 'no-contact-30d';

interface EnrollmentPatient {
  id: string;
  name: string;
  pcp: string;
  age: number;
  conditions: string[];
  riskLevel: 'High' | 'Medium' | 'Low';
  stage: Stage;
  cohorts: CohortKey[];
  lastContact: string | null;
  outreachAttempts: number;
  consentDate: string | null;
  assignedTo: string | null;
  trigger: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const mockPatients: EnrollmentPatient[] = [
  { id: 'P300001', name: 'Dorothy Nguyen', pcp: 'Dr. Patel', age: 71, conditions: ['Type 2 Diabetes', 'Hypertension'], riskLevel: 'High', stage: 'eligible', cohorts: ['high-risk', 'uncontrolled-chronic'], lastContact: null, outreachAttempts: 0, consentDate: null, assignedTo: null, trigger: 'Chronic disease registry' },
  { id: 'P300002', name: 'Samuel Burke', pcp: 'Dr. Lee', age: 68, conditions: ['COPD', 'CHF'], riskLevel: 'High', stage: 'eligible', cohorts: ['high-risk', 'recently-discharged'], lastContact: null, outreachAttempts: 0, consentDate: null, assignedTo: null, trigger: 'Hospital discharge' },
  { id: 'P300003', name: 'Cynthia Park', pcp: 'Dr. Patel', age: 74, conditions: ['CKD Stage 3', 'Hypertension'], riskLevel: 'High', stage: 'eligible', cohorts: ['awv-triggered', 'uncontrolled-chronic'], lastContact: null, outreachAttempts: 0, consentDate: null, assignedTo: null, trigger: 'AWV completed' },
  { id: 'P300004', name: 'Frank Delgado', pcp: 'Dr. Wilson', age: 64, conditions: ['COPD', 'Depression'], riskLevel: 'Medium', stage: 'outreach', cohorts: ['provider-referred'], lastContact: '2026-04-18', outreachAttempts: 1, consentDate: null, assignedTo: 'Sarah M.', trigger: 'PCP referral' },
  { id: 'P300005', name: 'Agnes Kim', pcp: 'Dr. Lee', age: 79, conditions: ['Type 2 Diabetes', 'CAD'], riskLevel: 'High', stage: 'outreach', cohorts: ['high-risk', 'no-contact-30d'], lastContact: '2026-03-20', outreachAttempts: 2, consentDate: null, assignedTo: 'Sarah M.', trigger: 'Chronic disease registry' },
  { id: 'P300006', name: 'Victor Santos', pcp: 'Dr. Patel', age: 61, conditions: ['Hypertension', 'Obesity'], riskLevel: 'Medium', stage: 'outreach', cohorts: ['awv-triggered'], lastContact: '2026-04-21', outreachAttempts: 1, consentDate: null, assignedTo: null, trigger: 'AWV upcoming' },
  { id: 'P300007', name: 'Helen Morris', pcp: 'Dr. Wilson', age: 78, conditions: ['CHF', 'CKD Stage 3'], riskLevel: 'High', stage: 'consent-pending', cohorts: ['high-risk', 'recently-discharged'], lastContact: '2026-04-20', outreachAttempts: 2, consentDate: null, assignedTo: 'Tom R.', trigger: 'Hospital discharge' },
  { id: 'P300008', name: 'Lena Okafor', pcp: 'Dr. Lee', age: 66, conditions: ['Type 2 Diabetes', 'Neuropathy'], riskLevel: 'Medium', stage: 'consent-pending', cohorts: ['uncontrolled-chronic'], lastContact: '2026-04-22', outreachAttempts: 1, consentDate: null, assignedTo: 'Sarah M.', trigger: 'Chronic disease registry' },
  { id: 'P300009', name: 'Roy Henderson', pcp: 'Dr. Patel', age: 55, conditions: ['Major Depression', 'Hypertension'], riskLevel: 'Medium', stage: 'ready', cohorts: ['provider-referred'], lastContact: '2026-04-23', outreachAttempts: 1, consentDate: null, assignedTo: 'Tom R.', trigger: 'PCP referral' },
  { id: 'P300010', name: 'Matteo Grassi', pcp: 'Dr. Wilson', age: 45, conditions: ['Major Depression', 'Hypertension'], riskLevel: 'High', stage: 'enrolled', cohorts: ['high-risk', 'provider-referred'], lastContact: '2026-04-22', outreachAttempts: 1, consentDate: '2026-04-10', assignedTo: 'Sarah M.', trigger: 'PCP referral' },
  { id: 'P300011', name: 'James Thompson', pcp: 'Dr. Lee', age: 38, conditions: ['Generalized Anxiety Disorder'], riskLevel: 'Medium', stage: 'enrolled', cohorts: ['provider-referred'], lastContact: '2026-04-23', outreachAttempts: 1, consentDate: '2026-04-12', assignedTo: 'Tom R.', trigger: 'PCP referral' },
  { id: 'P300012', name: 'George Patel', pcp: 'Dr. Patel', age: 69, conditions: ['Type 2 Diabetes', 'CAD'], riskLevel: 'Medium', stage: 'declined', cohorts: ['awv-triggered'], lastContact: '2026-04-15', outreachAttempts: 3, consentDate: null, assignedTo: null, trigger: 'AWV completed' },
];

// ── Stage config ───────────────────────────────────────────────────────────────

const STAGES: { key: Stage; label: string; icon: React.ElementType; tone: Tone }[] = [
  { key: 'eligible',        label: 'Eligible',         icon: Users,        tone: 'blue' },
  { key: 'outreach',        label: 'In Outreach',      icon: Phone,        tone: 'yellow' },
  { key: 'consent-pending', label: 'Consent Pending',  icon: FileText,     tone: 'orange' },
  { key: 'ready',           label: 'Ready to Enroll',  icon: UserCheck,    tone: 'violet' },
  { key: 'enrolled',        label: 'Enrolled',         icon: CheckCircle2, tone: 'green' },
  { key: 'declined',        label: 'Declined',         icon: XCircle,      tone: 'muted' },
];

const COHORTS: { key: CohortKey; label: string; icon: React.ElementType }[] = [
  { key: 'high-risk',           label: 'High Risk',              icon: AlertTriangle },
  { key: 'awv-triggered',       label: 'AWV-Triggered',          icon: Activity },
  { key: 'provider-referred',   label: 'Provider Referred',      icon: UserCheck },
  { key: 'recently-discharged', label: 'Recently Discharged',    icon: Clock },
  { key: 'uncontrolled-chronic',label: 'Uncontrolled Chronic',   icon: AlertTriangle },
  { key: 'no-contact-30d',      label: 'No Contact 30+ Days',    icon: Phone },
];

const RISK_TONE: Record<string, Tone> = {
  High:   'red',
  Medium: 'orange',
  Low:    'green',
};

// ── Component ──────────────────────────────────────────────────────────────────

type View = 'funnel' | 'queue';

export function EnrollmentContent() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<View>('funnel');
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [activeCohort, setActiveCohort] = useState<CohortKey | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawerPatient, setDrawerPatient] = useState<EnrollmentPatient | null>(null);
  const [patients, setPatients] = useState<EnrollmentPatient[]>(mockPatients);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: Replace with real CSV parsing + API ingest
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const lines = text.split(/\r?\n/).filter(l => l.trim()).slice(1);
      const imported = Math.max(lines.length, 1);
      const newRows: EnrollmentPatient[] = Array.from({ length: imported }).map((_, i) => ({
        id: `P-IMP-${Date.now()}-${i}`,
        name: `Imported Patient ${i + 1}`,
        pcp: 'Dr. Patel',
        age: 60 + Math.floor(Math.random() * 20),
        conditions: ['Type 2 Diabetes', 'Hypertension'],
        riskLevel: 'Medium',
        stage: 'eligible',
        cohorts: ['uncontrolled-chronic'],
        lastContact: null,
        outreachAttempts: 0,
        consentDate: null,
        assignedTo: null,
        trigger: 'CSV import',
      }));
      setPatients(prev => [...newRows, ...prev]);
      toast({
        title: 'CSV imported',
        description: `${imported} eligible patient${imported === 1 ? '' : 's'} added to the Eligible queue.`,
      });
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Derived queue
  const queuePatients = patients.filter(p => {
    if (activeStage && p.stage !== activeStage) return false;
    if (activeCohort && !p.cohorts.includes(activeCohort)) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === queuePatients.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(queuePatients.map(p => p.id)));
    }
  };

  const openQueue = (stage: Stage | null, cohort: CohortKey | null) => {
    setActiveStage(stage);
    setActiveCohort(cohort);
    setSelected(new Set());
    setView('queue');
  };

  // ── Funnel view ──────────────────────────────────────────────────────────────

  if (view === 'funnel') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Enrollment</h2>
            <p className="text-sm text-muted-foreground mt-1">
              CCM enrollment pipeline — work the queue, not the roster.
            </p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleCsvUpload}
            />
            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Import CSV
            </Button>
          </div>
        </div>

        {/* Pipeline stages */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pipeline</h3>
          <div className="space-y-2">
            {STAGES.map(stage => {
              const count = patients.filter(p => p.stage === stage.key).length;
              return (
                <button
                  key={stage.key}
                  onClick={() => openQueue(stage.key, null)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left group"
                >
                  <stage.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                      stage.tone === 'red' ? 'bg-red-500' :
                      stage.tone === 'orange' ? 'bg-orange-500' :
                      stage.tone === 'yellow' ? 'bg-yellow-500' :
                      stage.tone === 'green' ? 'bg-green-500' :
                      stage.tone === 'blue' ? 'bg-blue-500' :
                      stage.tone === 'violet' ? 'bg-violet-500' :
                      'bg-muted-foreground/50'
                    }`} />
                    <span className="text-sm font-medium text-foreground">{stage.label}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground tabular-nums">{count}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Cohorts */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Cohorts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COHORTS.map(cohort => {
              const count = patients.filter(p => p.cohorts.includes(cohort.key)).length;
              return (
                <button
                  key={cohort.key}
                  onClick={() => openQueue(null, cohort.key)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left group"
                >
                  <cohort.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="flex-1 text-sm text-foreground">{cohort.label}</span>
                  <Badge variant="secondary" className="text-xs">{count}</Badge>
                  <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Queue view ───────────────────────────────────────────────────────────────

  const stageConfig = STAGES.find(s => s.key === activeStage);
  const cohortConfig = COHORTS.find(c => c.key === activeCohort);
  const queueTitle = stageConfig?.label ?? cohortConfig?.label ?? 'All';

  return (
    <div className="space-y-4">
      {/* Back + title */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="p-1.5 h-auto -ml-1.5" onClick={() => setView('funnel')}>
          <ArrowLeft size={15} />
        </Button>
        <h2 className="text-base font-semibold text-foreground">{queueTitle}</h2>
        <Badge variant="secondary" className="text-xs">{queuePatients.length}</Badge>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">{selected.size} selected</span>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button size="sm" variant="outline" className="text-xs h-8">Assign</Button>
            <Button size="sm" variant="outline" className="text-xs h-8">Send Outreach</Button>
            <Button size="sm" variant="outline" className="text-xs h-8">Mark Unreachable</Button>
            {activeStage === 'consent-pending' && (
              <Button size="sm" className="text-xs h-8">Record Consent</Button>
            )}
          </div>
        </div>
      )}

      {/* Table — desktop */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-3 py-3 w-8">
                  <Checkbox
                    checked={selected.size === queuePatients.length && queuePatients.length > 0}
                    onCheckedChange={selectAll}
                  />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Patient</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">PCP</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Conditions</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Risk</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Last Contact</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Assigned</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Status</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {queuePatients.map(patient => {
                const stageCfg = STAGES.find(s => s.key === patient.stage)!;
                return (
                  <tr
                    key={patient.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setDrawerPatient(patient)}
                  >
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.has(patient.id)}
                        onCheckedChange={() => toggleSelect(patient.id)}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-sm text-foreground">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.age}y · {patient.id}</p>
                    </td>
                    <td className="px-3 py-3 text-sm text-muted-foreground">{patient.pcp}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.slice(0, 2).map(c => (
                          <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                        {patient.conditions.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{patient.conditions.length - 2}</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={RISK_TONE[patient.riskLevel]}>{patient.riskLevel}</StatusPill>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">
                      {patient.lastContact
                        ? new Date(patient.lastContact).toLocaleDateString()
                        : <span className="text-muted-foreground/50">Never</span>}
                      {patient.outreachAttempts > 0 && (
                        <p className="text-muted-foreground/60">{patient.outreachAttempts}x attempted</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">
                      {patient.assignedTo ?? <span className="text-muted-foreground/50">Unassigned</span>}
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={stageCfg.tone}>{stageCfg.label}</StatusPill>
                    </td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <NextActionButton patient={patient} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card list — mobile */}
      <div className="space-y-2 md:hidden">
        {queuePatients.map(patient => {
          const stageCfg = STAGES.find(s => s.key === patient.stage)!;
          return (
            <Card key={patient.id} className="shadow-sm cursor-pointer" onClick={() => setDrawerPatient(patient)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="pt-0.5" onClick={e => e.stopPropagation()}>
                    <Checkbox checked={selected.has(patient.id)} onCheckedChange={() => toggleSelect(patient.id)} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-sm text-foreground">{patient.name}</span>
                      <StatusPill tone={RISK_TONE[patient.riskLevel]}>{patient.riskLevel}</StatusPill>
                      <StatusPill tone={stageCfg.tone}>{stageCfg.label}</StatusPill>
                    </div>
                    <p className="text-xs text-muted-foreground">{patient.pcp} · {patient.age}y</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.slice(0, 2).map(c => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1" onClick={e => e.stopPropagation()}>
                      <span className="text-xs text-muted-foreground">
                        {patient.lastContact ? new Date(patient.lastContact).toLocaleDateString() : 'No contact'}
                      </span>
                      <NextActionButton patient={patient} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {queuePatients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">No patients in this queue.</div>
      )}

      {/* Patient drawer */}
      <PatientDrawer patient={drawerPatient} onClose={() => setDrawerPatient(null)} />
    </div>
  );
}

// ── Next action button ─────────────────────────────────────────────────────────

function NextActionButton({ patient }: { patient: EnrollmentPatient }) {
  switch (patient.stage) {
    case 'eligible':
      return <Button size="sm" variant="outline" className="text-xs h-8"><Phone size={11} className="mr-1" />Outreach</Button>;
    case 'outreach':
      return <Button size="sm" variant="outline" className="text-xs h-8"><Phone size={11} className="mr-1" />Follow Up</Button>;
    case 'consent-pending':
      return <Button size="sm" className="text-xs h-8"><FileText size={11} className="mr-1" />Record Consent</Button>;
    case 'ready':
      return <Button size="sm" className="text-xs h-8"><UserCheck size={11} className="mr-1" />Enroll</Button>;
    default:
      return null;
  }
}

// ── Patient drawer ─────────────────────────────────────────────────────────────

function PatientDrawer({ patient, onClose }: { patient: EnrollmentPatient | null; onClose: () => void }) {
  if (!patient) return null;

  const stageCfg = STAGES.find(s => s.key === patient.stage)!;

  return (
    <Sheet open={!!patient} onOpenChange={open => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-base">{patient.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          {/* Status + risk */}
          <div className="flex flex-wrap gap-2">
            <StatusPill tone={stageCfg.tone}>{stageCfg.label}</StatusPill>
            <StatusPill tone={RISK_TONE[patient.riskLevel]}>{patient.riskLevel} Risk</StatusPill>
          </div>

          {/* Patient info */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age</span>
              <span className="font-medium">{patient.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">PCP</span>
              <span className="font-medium">{patient.pcp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trigger</span>
              <span className="font-medium">{patient.trigger}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned to</span>
              <span className="font-medium">{patient.assignedTo ?? 'Unassigned'}</span>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Qualifying Conditions</p>
            <div className="flex flex-wrap gap-1.5">
              {patient.conditions.map(c => (
                <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
              ))}
            </div>
          </div>

          {/* Outreach history */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Outreach History</p>
            {patient.outreachAttempts === 0 ? (
              <p className="text-sm text-muted-foreground">No outreach yet.</p>
            ) : (
              <div className="space-y-2">
                {Array.from({ length: patient.outreachAttempts }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Phone size={12} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Attempt {i + 1}</span>
                    {patient.lastContact && i === patient.outreachAttempts - 1 && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(patient.lastContact).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Consent */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Consent</p>
            {patient.consentDate ? (
              <p className="text-sm text-green-600 font-medium">
                Documented on {new Date(patient.consentDate).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Not yet documented</p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-border space-y-2">
            <NextActionButton patient={patient} />
            {patient.stage !== 'enrolled' && patient.stage !== 'declined' && (
              <Button variant="outline" size="sm" className="w-full text-xs h-9">
                Mark Unreachable
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
