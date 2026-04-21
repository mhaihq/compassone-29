import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FileText, Pencil, CheckCircle2, Save } from 'lucide-react';

export interface CarePlanData {
  patientGoals: string;
  chronicConditions: string;
  medicationList: string;
  allergiesAndInteractions: string;
  symptomMonitoring: string;
  preventiveServices: string;
  specialistCoordination: string;
  communityResources: string;
  crisisAndEmergency: string;
  lastUpdated?: string;
  updatedBy?: string;
}

interface CarePlanPanelProps {
  patientId: string;
  plan: CarePlanData;
  onSave: (plan: CarePlanData) => void;
}

const FIELDS: { key: keyof CarePlanData; label: string; placeholder: string }[] = [
  { key: 'patientGoals', label: '1. Patient Goals & Preferences', placeholder: 'What matters most to the patient; functional goals for the care period…' },
  { key: 'chronicConditions', label: '2. Chronic Conditions & Problem List', placeholder: 'Active diagnoses, ICD-10 codes, onset dates, current status…' },
  { key: 'medicationList', label: '3. Medication List', placeholder: 'Drug name, dose, frequency, prescribing provider…' },
  { key: 'allergiesAndInteractions', label: '4. Allergies & Drug Interactions', placeholder: 'Known allergies, adverse reactions, flagged interactions…' },
  { key: 'symptomMonitoring', label: '5. Symptom Monitoring & Targets', placeholder: 'BP target <130/80, HbA1c <7%, weight check weekly…' },
  { key: 'preventiveServices', label: '6. Preventive Services Due', placeholder: 'Annual flu shot, mammogram, colonoscopy, A1c lab — due dates…' },
  { key: 'specialistCoordination', label: '7. Specialist Coordination', placeholder: 'Cardiology f/u May 2026, nephrology referral pending…' },
  { key: 'communityResources', label: '8. Community Resources', placeholder: 'Meals on Wheels, transportation assistance, local diabetes support group…' },
  { key: 'crisisAndEmergency', label: '9. Crisis & Emergency Plan', placeholder: '911 for chest pain or BP >180/120. Emergency contact: [name/number]. After-hours line…' },
];

export function CarePlanPanel({ plan, onSave }: CarePlanPanelProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CarePlanData>(plan);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave({ ...draft, lastUpdated: new Date().toISOString().slice(0, 10), updatedBy: 'Care Team' });
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Electronic Care Plan</span>
          {plan.lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {new Date(plan.lastUpdated).toLocaleDateString()} {plan.updatedBy ? `by ${plan.updatedBy}` : ''}
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

      <Separator />

      <div className="grid grid-cols-1 gap-4">
        {FIELDS.map(({ key, label, placeholder }) => (
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
    </div>
  );
}
