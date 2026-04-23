import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileText, Pencil, CheckCircle2, Save } from 'lucide-react';

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
  revisionHistory?: { date: string; by: string; summary: string }[];
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

export function CarePlanPanel({ plan, onSave }: CarePlanPanelProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CarePlanData>(plan);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const today = new Date().toISOString().slice(0, 10);
    const newRevision = { date: today, by: 'Care Team', summary: 'Plan updated' };
    onSave({
      ...draft,
      lastUpdated: today,
      updatedBy: 'Care Team',
      revisionHistory: [...(plan.revisionHistory ?? []), newRevision],
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
          <span className="text-sm font-semibold text-foreground">Electronic Care Plan</span>
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

      {/* Revision history */}
      {(plan.revisionHistory ?? []).length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Revision History</p>
            <div className="space-y-1">
              {[...(plan.revisionHistory ?? [])].reverse().map((r, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString()} — {r.by}: {r.summary}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
