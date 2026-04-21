import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertTriangle, Info, Pencil } from 'lucide-react';
import type { CcmConsent } from '@/types/patient';

interface ConsentCaptureProps {
  patientId: string;
  patientName: string;
  consent: CcmConsent;
  onConsentUpdate: (update: { obtained: boolean; date: string; method: 'written' | 'verbal' | 'electronic' }) => void;
}

type ConsentMethod = 'written' | 'verbal' | 'electronic';

export function ConsentCapture({ patientName, consent, onConsentUpdate }: ConsentCaptureProps) {
  const [showForm, setShowForm] = useState(!consent.obtained);
  const [date, setDate] = useState(consent.date ?? '');
  const [method, setMethod] = useState<ConsentMethod | ''>(consent.method ?? '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!date || !method) {
      setError('Date and method are required.');
      return;
    }
    setError('');
    onConsentUpdate({ obtained: true, date, method });
    setSubmitted(true);
    setShowForm(false);
  }

  const formattedDate = consent.date
    ? new Date(consent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="space-y-4">
      {/* Status banner */}
      {consent.obtained ? (
        <div className="flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-green-800">Consent on file</p>
            {formattedDate && consent.method && (
              <p className="text-xs text-green-700 mt-0.5">
                {formattedDate} &middot; <span className="capitalize">{consent.method}</span>
              </p>
            )}
          </div>
          {!showForm && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto shrink-0 h-7 px-2 text-green-700 hover:text-green-900 hover:bg-green-100"
              onClick={() => { setShowForm(true); setSubmitted(false); }}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Consent required</p>
            <p className="text-xs text-amber-700 mt-0.5">
              CMS requires written or verbal consent before CCM services begin. {patientName} cannot be billed until consent is captured.
            </p>
          </div>
        </div>
      )}

      {/* Success inline message */}
      {submitted && (
        <p className="text-sm text-green-700 font-medium flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4" /> Consent recorded
        </p>
      )}

      {/* CMS requirement callout */}
      <div className="flex items-start gap-3 rounded-lg bg-muted/50 border border-border p-3">
        <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">CMS Requirements</p>
          <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
            <li>Must be obtained before CCM services begin</li>
            <li>Patient must be informed of their right to stop CCM at any time</li>
            <li>Patient must be informed of monthly billing and cost-sharing</li>
            <li>Patient must be informed of care coordination between providers</li>
            <li>Acceptable methods: written, verbal (documented), or electronic</li>
          </ul>
        </div>
      </div>

      {/* Capture / edit form */}
      {showForm && (
        <>
          <Separator />
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                {consent.obtained ? 'Update Consent Record' : 'Record Consent'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground" htmlFor="consent-date">
                  Date of consent
                </label>
                <input
                  id="consent-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Method</label>
                <Select value={method} onValueChange={(v) => setMethod(v as ConsentMethod)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select method..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="written">Written</SelectItem>
                    <SelectItem value="verbal">Verbal</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground" htmlFor="consent-notes">
                  Notes <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Textarea
                  id="consent-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Verbal consent — patient confirmed via phone"
                  rows={2}
                  className="text-sm resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <div className="flex gap-2 pt-1">
                <Button size="sm" onClick={handleSubmit}>Record Consent</Button>
                {consent.obtained && (
                  <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
