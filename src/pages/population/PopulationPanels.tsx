import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusPill } from '@/components/ui/status-dot';
import { patientsCcmData } from '@/data/patientsCcmData';
import type { Patient } from '@/types/patient';
import { toast } from 'sonner';

function minuteStatus(p: Patient): { label: string; tone: 'green' | 'orange' | 'red' } {
  if (p.minutesTarget === 0) return { label: 'N/A', tone: 'orange' };
  if (p.minutesThisMonth >= p.minutesTarget) return { label: 'Complete', tone: 'green' };
  if (p.minutesThisMonth < 10) return { label: 'Needs Outreach', tone: 'red' };
  return { label: 'On Track', tone: 'orange' };
}

export function CcmPanel() {
  const ccm = patientsCcmData.filter(p => p.enrolledInCCM);

  return (
    <div className="flex flex-col gap-3">
      {ccm.map(p => {
        const pct = p.minutesTarget > 0 ? Math.min(100, Math.round((p.minutesThisMonth / p.minutesTarget) * 100)) : 0;
        const ms = minuteStatus(p);
        return (
          <div key={p.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground truncate">{p.diagnosisCode}</p>
            </div>
            <div className="flex-1 min-w-0 md:max-w-48">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{p.minutesThisMonth} min</span>
                <span>{p.minutesTarget} min target</span>
              </div>
              <Progress value={pct} className="h-1.5" />
            </div>
            <StatusPill tone={ms.tone}>{ms.label}</StatusPill>
          </div>
        );
      })}
      {ccm.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No CCM patients enrolled.</p>}
    </div>
  );
}

export function ApcmPanel() {
  const apcm = patientsCcmData.filter(p => p.enrolledInAPCM);

  const levelColor: Record<string, 'green' | 'blue' | 'violet'> = { I: 'green', II: 'blue', III: 'violet' };

  return (
    <div className="flex flex-col gap-3">
      {apcm.map(p => (
        <div key={p.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 rounded-lg border border-border bg-card px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground truncate">{p.diagnosisCode}</p>
          </div>
          {p.apcmLevel && (
            <Badge variant="secondary" className="w-fit">
              APCM Level {p.apcmLevel}
            </Badge>
          )}
          <StatusPill tone={levelColor[p.apcmLevel ?? 'I'] ?? 'muted'}>
            {p.monthBillingMode ?? 'Unset'}
          </StatusPill>
          <span className="text-xs text-muted-foreground hidden md:block">
            Last visit: {p.lastVisit}
          </span>
        </div>
      ))}
      {apcm.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No APCM patients enrolled.</p>}
    </div>
  );
}

export function ConsentQueue() {
  const pending = patientsCcmData.filter(p => !p.consent.obtained);

  return (
    <div className="flex flex-col gap-3">
      {pending.map(p => (
        <div key={p.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 rounded-lg border border-border bg-card px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground truncate">{p.diagnosisCode}</p>
          </div>
          <StatusPill tone="muted">{p.status}</StatusPill>
          <Button
            size="sm"
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => toast.success(`Contacted ${p.name}`, { description: 'Consent outreach logged.' })}
          >
            Contact
          </Button>
        </div>
      ))}
      {pending.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No patients pending consent.</p>}
    </div>
  );
}
