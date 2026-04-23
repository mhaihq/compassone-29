import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileText, Pencil, CheckCircle2, Save, Send, ThumbsUp, MessageSquareWarning } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export interface FieldChange {
  field: string;
  label: string;
  before: string;
  after: string;
}

export interface CarePlanRevision {
  // ISO timestamp — precise to the second for audit
  timestamp: string;
  by: string;
  role: string;
  summary: string;
  // Per-field changes so auditors can see exactly what moved
  changes: FieldChange[];
}

// A working note = per-session scratch entry. Lives alongside the master plan.
// Clinically this is the "moving" note (call on X date, discussed Y) — the
// master plan is the "chart"; these are the "notes".
export interface WorkingNote {
  id: string;
  timestamp: string;
  by: string;
  role: string;
  text: string;
  // If this note has been folded into the master plan, track which field
  promotedToField?: string;
}

// Provider sign-off state — every care plan needs approval before activation
export type SignOffStatus = 'draft' | 'pending-approval' | 'approved' | 'changes-requested';

export interface SignOffAction {
  timestamp: string;
  by: string;
  role: string;
  action: 'submitted' | 'approved' | 'changes-requested' | 'edited';
  note?: string;
}

export interface CarePlanData {
  patientGoals: string;
  chronicConditions: string;
  medicationList: string;
  allergiesAndInteractions: string;
  plannedInterventions: string;
  expectedOutcomes: string;
  // Structured CCM billing provider field (CMS audit requirement)
  billingProvider: string;
  coordinationOfCare: string;
  communityResources: string;
  crisisAndEmergency: string;
  sharedWithPatient: boolean;
  lastUpdated?: string;
  updatedBy?: string;
  revisionHistory?: CarePlanRevision[];
  workingNotes?: WorkingNote[];
  // Provider sign-off
  signOffStatus?: SignOffStatus;
  signOffHistory?: SignOffAction[];
}

interface CarePlanPanelProps {
  patientId: string;
  plan: CarePlanData;
  onSave: (plan: CarePlanData) => void;
}

const TEXT_FIELDS: { key: keyof CarePlanData; label: string; placeholder: string }[] = [
  { key: 'patientGoals', label: '1. Patient Goals & Preferences', placeholder: 'What matters most to the patient; functional goals for the care period…' },
  { key: 'chronicConditions', label: '2. Chronic Conditions & Problem List', placeholder: 'Active diagnoses, ICD-10 codes, onset dates, monitoring targets (e.g. BP <130/80)…' },
  { key: 'medicationList', label: '3. Medication List', placeholder: 'Drug name, dose, frequency, prescribing provider…' },
  { key: 'allergiesAndInteractions', label: '4. Allergies & Drug Interactions', placeholder: 'Known allergies, adverse reactions, flagged interactions…' },
  { key: 'plannedInterventions', label: '5. Planned Interventions', placeholder: 'What the care team will do: medication adjustments, education sessions, referrals, monitoring schedule…' },
  { key: 'expectedOutcomes', label: '6. Expected Outcomes & Prognosis', placeholder: 'Clinical goals and expected trajectory: BP controlled within 3 months, HbA1c <7% by Q3…' },
  { key: 'billingProvider', label: '7. Principal CCM Billing Provider', placeholder: 'Name, credential, and NPI of the practitioner assuming the CCM care management role this month (e.g. Dr. Sandra Kim, MD — NPI 1234567890)…' },
  { key: 'coordinationOfCare', label: '8. Coordination of Care', placeholder: 'All treating providers and their roles, specialist contacts, how the team communicates (EHR notes, care conference, secure message)…' },
  { key: 'communityResources', label: '9. Community & Social Resources', placeholder: 'Resources tied to an active care plan condition — Meals on Wheels (diabetes weight mgmt), transportation for appts, medication affordability assistance…' },
  { key: 'crisisAndEmergency', label: '10. Crisis & Emergency Plan', placeholder: '911 for chest pain or BP >180/120. Emergency contact: [name/number]. After-hours line…' },
];

// TODO: Replace with real auth context — current user info comes from the session
const USER_ROLES = {
  coordinator: { name: 'Linda Torres, RN', role: 'Care Coordinator' },
  provider: { name: 'Dr. Sandra Kim, MD', role: 'Provider' },
} as const;

function diffPlan(before: CarePlanData, after: CarePlanData): FieldChange[] {
  const changes: FieldChange[] = [];
  for (const f of TEXT_FIELDS) {
    const b = (before[f.key] as string) ?? '';
    const a = (after[f.key] as string) ?? '';
    if (b !== a) {
      changes.push({ field: f.key as string, label: f.label, before: b, after: a });
    }
  }
  if (before.sharedWithPatient !== after.sharedWithPatient) {
    changes.push({
      field: 'sharedWithPatient',
      label: 'Shared with patient',
      before: before.sharedWithPatient ? 'Yes' : 'No',
      after: after.sharedWithPatient ? 'Yes' : 'No',
    });
  }
  return changes;
}

export function CarePlanPanel({ plan, onSave }: CarePlanPanelProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CarePlanData>(plan);
  const [saved, setSaved] = useState(false);
  const [expandedRevision, setExpandedRevision] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  // Role toggle — demo-only, replaces auth context
  const [viewAsRole, setViewAsRole] = useState<'coordinator' | 'provider'>('coordinator');
  const currentUser = USER_ROLES[viewAsRole];
  const isProvider = viewAsRole === 'provider';
  // Sign-off dialog
  const [changesDialogOpen, setChangesDialogOpen] = useState(false);
  const [changesNote, setChangesNote] = useState('');

  const signOffStatus: SignOffStatus = plan.signOffStatus ?? 'draft';

  function handleAddNote() {
    if (!newNote.trim()) return;
    const note: WorkingNote = {
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      by: currentUser.name,
      role: currentUser.role,
      text: newNote.trim(),
    };
    onSave({
      ...plan,
      workingNotes: [...(plan.workingNotes ?? []), note],
    });
    setNewNote('');
  }

  function logSignOff(action: SignOffAction['action'], nextStatus: SignOffStatus, note?: string) {
    const entry: SignOffAction = {
      timestamp: new Date().toISOString(),
      by: currentUser.name,
      role: currentUser.role,
      action,
      note,
    };
    onSave({
      ...plan,
      signOffStatus: nextStatus,
      signOffHistory: [...(plan.signOffHistory ?? []), entry],
    });
  }

  function handleSubmitForApproval() {
    logSignOff('submitted', 'pending-approval');
  }

  function handleApprove() {
    logSignOff('approved', 'approved');
  }

  function handleRequestChanges() {
    if (!changesNote.trim()) return;
    logSignOff('changes-requested', 'changes-requested', changesNote.trim());
    setChangesNote('');
    setChangesDialogOpen(false);
  }

  function handleSave() {
    const now = new Date();
    const changes = diffPlan(plan, draft);
    if (changes.length === 0) {
      setEditing(false);
      return;
    }
    const summary = changes.length === 1
      ? `Updated ${changes[0].label}`
      : `Updated ${changes.length} fields`;
    const newRevision: CarePlanRevision = {
      timestamp: now.toISOString(),
      by: currentUser.name,
      role: currentUser.role,
      summary,
      changes,
    };
    // Editing an already-approved plan resets sign-off to pending
    const nextSignOff: SignOffStatus = plan.signOffStatus === 'approved' ? 'pending-approval' : (plan.signOffStatus ?? 'draft');
    const signOffEntry: SignOffAction | null = plan.signOffStatus === 'approved'
      ? { timestamp: now.toISOString(), by: currentUser.name, role: currentUser.role, action: 'edited', note: 'Plan edited — re-approval required' }
      : null;
    onSave({
      ...draft,
      lastUpdated: now.toISOString().slice(0, 10),
      updatedBy: currentUser.name,
      revisionHistory: [...(plan.revisionHistory ?? []), newRevision],
      signOffStatus: nextSignOff,
      signOffHistory: signOffEntry ? [...(plan.signOffHistory ?? []), signOffEntry] : plan.signOffHistory,
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleCancel() {
    setDraft(plan);
    setEditing(false);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Master Care Plan</span>
          <span className="text-xs text-muted-foreground">· the living document</span>
          <SignOffBadge status={signOffStatus} />
          {plan.lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {new Date(plan.lastUpdated).toLocaleDateString()}{plan.updatedBy ? ` by ${plan.updatedBy}` : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-green-700 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-3.5 w-3.5 mr-1.5" />Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>Cancel</Button>
            </div>
          )}
        </div>
      </div>

      {/* Role toggle (demo) + sign-off action bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Viewing as:</span>
          <Button
            size="sm"
            variant={viewAsRole === 'coordinator' ? 'default' : 'outline'}
            className="h-7 text-xs"
            onClick={() => setViewAsRole('coordinator')}
          >
            Care Coordinator
          </Button>
          <Button
            size="sm"
            variant={viewAsRole === 'provider' ? 'default' : 'outline'}
            className="h-7 text-xs"
            onClick={() => setViewAsRole('provider')}
          >
            Provider
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {!isProvider && (signOffStatus === 'draft' || signOffStatus === 'changes-requested') && (
            <Button size="sm" variant="outline" onClick={handleSubmitForApproval}>
              <Send className="h-3.5 w-3.5 mr-1.5" />Submit for approval
            </Button>
          )}
          {isProvider && signOffStatus === 'pending-approval' && (
            <>
              <Button size="sm" variant="outline" onClick={() => setChangesDialogOpen(true)}>
                <MessageSquareWarning className="h-3.5 w-3.5 mr-1.5" />Request changes
              </Button>
              <Button size="sm" onClick={handleApprove}>
                <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />Approve
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Shared with patient — CMS requires documentation of this */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <Checkbox
          id="shared-with-patient"
          checked={editing ? draft.sharedWithPatient : plan.sharedWithPatient}
          onCheckedChange={checked =>
            editing && setDraft(prev => ({ ...prev, sharedWithPatient: checked === true }))
          }
          disabled={!editing}
        />
        <Label htmlFor="shared-with-patient" className="text-xs text-foreground cursor-pointer">
          Care plan shared with patient and all treating providers
          <span className="ml-1 text-muted-foreground">(CMS requirement)</span>
        </Label>
      </div>

      <Separator />

      {/* 10 text fields */}
      <div className="grid grid-cols-1 gap-4">
        {TEXT_FIELDS.map(({ key, label, placeholder }) => (
          <Card key={key} className="shadow-none border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">{label.split('.')[0]}</Badge>
                <p className="text-xs font-semibold text-foreground">{label.split('. ')[1]}</p>
              </div>
              {editing ? (
                <Textarea
                  value={draft[key] as string}
                  onChange={e => setDraft(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  rows={3}
                  className="text-sm resize-none"
                />
              ) : (
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {(plan[key] as string) || (
                    <span className="text-muted-foreground italic">{placeholder}</span>
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Working notes — per-session scratch notes that feed the master plan */}
      <Separator />
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Working Notes</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Per-session scratch notes. Closed items fold back into the master plan above.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {[...(plan.workingNotes ?? [])].reverse().map(n => {
            const ts = new Date(n.timestamp);
            return (
              <div key={n.id} className="rounded-md border border-border bg-muted/30 px-3 py-2">
                <div className="flex items-center gap-2 flex-wrap text-xs mb-1">
                  <span className="font-mono text-muted-foreground">
                    {ts.toLocaleDateString()} {ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-foreground font-medium">{n.by}</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0">{n.role}</Badge>
                  {n.promotedToField && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      Folded into master: {n.promotedToField}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{n.text}</p>
              </div>
            );
          })}
          {(plan.workingNotes ?? []).length === 0 && (
            <p className="text-xs text-muted-foreground italic">No working notes yet.</p>
          )}
        </div>

        {/* Add note */}
        <div className="mt-3 space-y-2">
          <Textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Call patient on [date], discussed [topic]…"
            rows={2}
            className="text-sm resize-none"
          />
          <div className="flex justify-end">
            <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
              Add note
            </Button>
          </div>
        </div>
      </div>

      {/* Revision history — per-field audit log (CMS audit requirement) */}
      {(plan.revisionHistory ?? []).length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Revision History</p>
            <div className="space-y-2">
              {[...(plan.revisionHistory ?? [])].reverse().map((r, i) => {
                const key = `${r.timestamp}-${i}`;
                const isOpen = expandedRevision === key;
                const ts = new Date(r.timestamp);
                return (
                  <div key={key} className="rounded-md border border-border bg-muted/30 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/50"
                      onClick={() => setExpandedRevision(isOpen ? null : key)}
                    >
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-mono text-muted-foreground">
                          {ts.toLocaleDateString()} {ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-foreground font-medium">{r.by}</span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0">{r.role}</Badge>
                        <span className="text-muted-foreground">— {r.summary}</span>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {isOpen ? 'Hide' : `${r.changes.length} change${r.changes.length === 1 ? '' : 's'}`}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 space-y-3 border-t border-border">
                        {r.changes.map((c, ci) => (
                          <div key={ci} className="pt-3">
                            <p className="text-xs font-semibold text-foreground mb-1.5">{c.label}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="rounded border border-border bg-background p-2">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Before</p>
                                <p className="text-xs text-foreground whitespace-pre-wrap">
                                  {c.before || <span className="italic text-muted-foreground">empty</span>}
                                </p>
                              </div>
                              <div className="rounded border border-green-200 bg-green-50 p-2">
                                <p className="text-xs uppercase tracking-wide text-green-700 mb-1">After</p>
                                <p className="text-xs text-foreground whitespace-pre-wrap">
                                  {c.after || <span className="italic text-muted-foreground">empty</span>}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Sign-off history */}
      {(plan.signOffHistory ?? []).length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Sign-off History</p>
            <div className="space-y-1">
              {[...(plan.signOffHistory ?? [])].reverse().map((h, i) => {
                const ts = new Date(h.timestamp);
                return (
                  <div key={i} className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-mono text-muted-foreground">
                      {ts.toLocaleDateString()} {ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-foreground font-medium">{h.by}</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{h.role}</Badge>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">{h.action.replace('-', ' ')}</Badge>
                    {h.note && <span className="text-muted-foreground italic">— {h.note}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Request Changes dialog */}
      <Dialog open={changesDialogOpen} onOpenChange={setChangesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs">What needs to be changed?</Label>
            <Textarea
              value={changesNote}
              onChange={e => setChangesNote(e.target.value)}
              placeholder="e.g. Update expected outcomes — A1c target should be <7.5 for this patient given age and comorbidity burden."
              rows={4}
              className="text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangesDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestChanges} disabled={!changesNote.trim()}>
              Send to care coordinator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SignOffBadge({ status }: { status: SignOffStatus }) {
  const map: Record<SignOffStatus, { label: string; className: string }> = {
    'draft': { label: 'Draft', className: 'bg-muted text-muted-foreground border-border' },
    'pending-approval': { label: 'Pending provider approval', className: 'bg-amber-50 text-amber-800 border-amber-300' },
    'approved': { label: 'Approved', className: 'bg-green-50 text-green-800 border-green-300' },
    'changes-requested': { label: 'Changes requested', className: 'bg-red-50 text-red-800 border-red-300' },
  };
  const cfg = map[status];
  return (
    <Badge variant="outline" className={`text-xs ${cfg.className}`}>{cfg.label}</Badge>
  );
}
