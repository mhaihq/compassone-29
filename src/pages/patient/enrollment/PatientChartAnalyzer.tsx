import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, FileText, Loader2, CheckCircle2, Settings2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ── Types ──────────────────────────────────────────────────────────────────────

type PlanType = 'CCM' | 'APCM' | 'PCM' | 'TCM';

interface AnalysisResult {
  planType: PlanType;
  patientName: string;
  dob: string;
  patientSummary: string;
  rationale: string;
  medicalNecessity: string;
  chronicConditions: { icd10: string; label: string; status: string }[];
  goals: string[];
  plannedActions: { action: string; owner: string; frequency: string }[];
  nextTestPlan: string;
  guidelinesReferenced: string[];
}

// ── Admin-editable prompts (TODO: persist via admin settings API) ──────────────

const DEFAULT_SYSTEM_PROMPT = `You are a CCM/APCM/PCM/TCM care model assignment engine.

Given an unstructured patient chart paste, analyze and output:
1. Plan type — one of: CCM, APCM, PCM, TCM — based on patient condition, NOT billing.
2. Step-by-step rationale for why this model was selected.
3. Medical necessity grounded in the patient's condition.
4. Goals based on American Diabetes Association / AHA / evidence-based guidelines.
5. Planned actions with owner (AI, Care Coordinator, Provider) and frequency.

Decision rules:
- Recently discharged from hospital → TCM
- 2+ chronic conditions, high touchpoint needs → CCM
- 2+ chronic conditions, stable, low touchpoint → APCM
- 1 chronic condition uncontrolled, high touchpoint (e.g. HbA1c >10) → PCM

Every decision must be defensible to an auditor. Reference the guideline by name.`;

const DEFAULT_USER_PROMPT_TEMPLATE = `Patient chart:
{{CHART_TEXT}}

Analyze and return the care model assignment in the structured output format.`;

// ── Mock AI output (TODO: replace with real AI call) ───────────────────────────

const mockAnalysis: AnalysisResult = {
  planType: 'CCM',
  patientName: 'Matteo Grassi',
  dob: '1992-03-14',
  patientSummary: '45 y/o male with 3 chronic conditions (essential hypertension, type 2 diabetes, major depression). BP inconsistently controlled (recent avg 138/88, target <130/80). HbA1c 7.4 last draw. Depression moderate per PHQ-9. Engaged but reports adherence gaps.',
  rationale: 'Selected CCM model: patient has 3 chronic conditions (CMS CCM requires ≥2), care requires frequent touchpoints across medication management, BP monitoring, mental health coordination, and adherence support. Patient is NOT recently discharged (rules out TCM). Condition complexity and coordination needs exceed APCM low-touch threshold. Single-condition PCM also ruled out.',
  medicalNecessity: 'BP above target with documented adherence gap drives need for regular monitoring and coaching. Comorbid depression requires coordinated mental health follow-up. Complex medication regimen across 3 conditions warrants monthly reconciliation and coordination with prescribing provider.',
  chronicConditions: [
    { icd10: 'I10', label: 'Essential Hypertension', status: 'Uncontrolled — above target' },
    { icd10: 'E11.9', label: 'Type 2 Diabetes Mellitus', status: 'Stable — HbA1c at target edge' },
    { icd10: 'F32.1', label: 'Major Depression, Moderate', status: 'Active — PHQ-9 11' },
  ],
  goals: [
    'BP <130/80 within 3 months (AHA/ACC 2017 hypertension guideline)',
    'HbA1c <7% sustained (ADA 2024 Standards of Care)',
    'PHQ-9 ≤9 within 6 months (APA 2019 MDD guideline)',
    'Medication adherence >90% measured by refill rates',
  ],
  plannedActions: [
    { action: 'BP monitoring reminders via SMS', owner: 'Hana AI', frequency: 'Daily' },
    { action: 'Medication adherence check-in', owner: 'Hana AI', frequency: 'Weekly' },
    { action: 'Monthly care coordination call', owner: 'Linda Torres, RN', frequency: 'Monthly' },
    { action: 'PHQ-9 reassessment', owner: 'Linda Torres, RN', frequency: 'Every 2 weeks' },
    { action: 'Medication reconciliation + provider coordination', owner: 'Dr. Sandra Kim', frequency: 'Quarterly' },
  ],
  nextTestPlan: 'Repeat BP home log in 2 weeks. HbA1c in 3 months. PHQ-9 in 2 weeks. If BP remains >135/85 despite adherence, escalate to provider for medication adjustment.',
  guidelinesReferenced: [
    'AHA/ACC 2017 Hypertension Guidelines',
    'ADA 2024 Standards of Medical Care in Diabetes',
    'APA 2019 Major Depressive Disorder Guideline',
  ],
};

// ── Component ──────────────────────────────────────────────────────────────────

interface PatientChartAnalyzerProps {
  onAccept?: (analysis: AnalysisResult) => void;
}

export function PatientChartAnalyzer({ onAccept }: PatientChartAnalyzerProps) {
  const [open, setOpen] = useState(false);
  const [chartText, setChartText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [userPromptTemplate, setUserPromptTemplate] = useState(DEFAULT_USER_PROMPT_TEMPLATE);

  function handleAnalyze() {
    if (!chartText.trim()) return;
    setAnalyzing(true);
    setResult(null);
    // TODO: Replace with real AI call — system/user prompts sent to backend
    setTimeout(() => {
      setResult(mockAnalysis);
      setAnalyzing(false);
    }, 2200);
  }

  function handleReset() {
    setChartText('');
    setResult(null);
  }

  function handleAccept() {
    if (result && onAccept) onAccept(result);
    setOpen(false);
    setChartText('');
    setResult(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Analyze Patient Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Care Model Assignment Engine
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyze" className="text-xs">
              <FileText className="h-3.5 w-3.5 mr-1.5" />Analyze
            </TabsTrigger>
            <TabsTrigger value="prompts" className="text-xs">
              <Settings2 className="h-3.5 w-3.5 mr-1.5" />Prompts (Admin)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-4 mt-4">
            {!result && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Paste patient chart
                    <span className="ml-1 text-muted-foreground/70">
                      (from ECW, Epic, or any EHR — name, DOB, problem list, meds, labs, recent visits)
                    </span>
                  </Label>
                  <Textarea
                    value={chartText}
                    onChange={e => setChartText(e.target.value)}
                    placeholder="Paste the entire chart here — the AI will extract what it needs…"
                    rows={14}
                    className="text-sm font-mono"
                    disabled={analyzing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {chartText.length} characters · AI uses guideline-based rules (ADA, AHA/ACC, APA)
                  </span>
                  <Button onClick={handleAnalyze} disabled={!chartText.trim() || analyzing}>
                    {analyzing ? (
                      <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Analyzing…</>
                    ) : (
                      <><Sparkles className="h-3.5 w-3.5 mr-1.5" />Run Analysis</>
                    )}
                  </Button>
                </div>
              </>
            )}

            {result && (
              <div className="space-y-4">
                {/* Plan type + identity */}
                <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Recommended Plan</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="text-base px-3 py-1 font-bold">{result.planType}</Badge>
                        <span className="text-sm text-foreground">{result.patientName}</span>
                        <span className="text-xs text-muted-foreground">DOB {result.dob}</span>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Patient summary */}
                <Section title="Patient Summary">
                  <p className="text-sm text-foreground leading-relaxed">{result.patientSummary}</p>
                </Section>

                {/* Rationale */}
                <Section title="Rationale — Why this model?">
                  <p className="text-sm text-foreground leading-relaxed">{result.rationale}</p>
                </Section>

                {/* Medical necessity */}
                <Section title="Medical Necessity">
                  <p className="text-sm text-foreground leading-relaxed">{result.medicalNecessity}</p>
                </Section>

                {/* Chronic conditions */}
                <Section title="Chronic Conditions">
                  <div className="space-y-1.5">
                    {result.chronicConditions.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs font-mono">{c.icd10}</Badge>
                        <span className="text-foreground">{c.label}</span>
                        <span className="text-muted-foreground">— {c.status}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Goals */}
                <Section title="Goals (Guideline-Based)">
                  <ul className="space-y-1.5">
                    {result.goals.map((g, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground flex-shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </Section>

                {/* Planned actions */}
                <Section title="Planned Actions — Who does what?">
                  <div className="space-y-1.5">
                    {result.plannedActions.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm border-l-2 border-border pl-3 py-1">
                        <span className="text-foreground flex-1">{a.action}</span>
                        <Badge variant="outline" className="text-xs">{a.owner}</Badge>
                        <span className="text-xs text-muted-foreground">{a.frequency}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Next test plan */}
                <Section title="Next Test Plan">
                  <p className="text-sm text-foreground leading-relaxed">{result.nextTestPlan}</p>
                </Section>

                {/* Guidelines */}
                <Section title="Guidelines Referenced">
                  <div className="flex flex-wrap gap-1.5">
                    {result.guidelinesReferenced.map((g, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{g}</Badge>
                    ))}
                  </div>
                </Section>

                {/* Audit note */}
                <div className="rounded-md bg-muted/50 border border-border p-3">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Provider sign-off required.</strong> This recommendation is generated from
                    guideline-based rules and is not a clinical decision. The assigned provider must review and approve before
                    the patient is enrolled.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    Analyze Another Chart
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAccept}>
                      Send for Provider Sign-off
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="prompts" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">
              Edit the system and user prompts used by the care model assignment engine. Changes apply to all future analyses
              for this workspace. Version history is kept in the backend for audit.
            </p>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">System prompt</Label>
              <Textarea
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                rows={12}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">User prompt template</Label>
              <p className="text-xs text-muted-foreground">
                Use <code className="bg-muted px-1 rounded">{'{{CHART_TEXT}}'}</code> as the placeholder for pasted chart text.
              </p>
              <Textarea
                value={userPromptTemplate}
                onChange={e => setUserPromptTemplate(e.target.value)}
                rows={5}
                className="text-xs font-mono"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
                setUserPromptTemplate(DEFAULT_USER_PROMPT_TEMPLATE);
              }}>
                Reset to defaults
              </Button>
              <Button>Save prompts</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
      {children}
    </div>
  );
}
