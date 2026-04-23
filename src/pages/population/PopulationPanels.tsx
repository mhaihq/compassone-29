import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusPill } from '@/components/ui/status-dot';
import { patientsCcmData } from '@/data/patientsCcmData';
import type { Patient } from '@/types/patient';
import { toast } from 'sonner';
import { CallButton } from '@/pages/patient/call/CallButton';
import { ListChecks, AlertTriangle } from 'lucide-react';

function minuteStatus(p: Patient): { label: string; tone: 'green' | 'orange' | 'red' } {
  if (p.minutesTarget === 0) return { label: 'N/A', tone: 'orange' };
  if (p.minutesThisMonth >= p.minutesTarget) return { label: 'Complete', tone: 'green' };
  if (p.minutesThisMonth < 10) return { label: 'Needs Outreach', tone: 'red' };
  return { label: 'On Track', tone: 'orange' };
}

const priorityTone: Record<string, 'red' | 'orange' | 'muted'> = {
  High: 'red',
  Medium: 'orange',
  Low: 'muted',
};

function PatientRow({ p, extra }: { p: Patient; extra?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex flex-col md:flex-row md:items-start gap-3">
        {/* Identity */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
            <span className="text-xs text-muted-foreground font-mono">{p.id}</span>
            {p.priority && (
              <StatusPill tone={priorityTone[p.priority]}>{p.priority}</StatusPill>
            )}
            {p.escalatedToProvider && (
              <Badge variant="outline" className="text-xs text-red-700 border-red-300 bg-red-50" title={p.escalatedToProvider.reason}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Escalated to provider
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            DOB {p.dateOfBirth} · {p.diagnosisCode}
          </p>
          {p.priorityReason && (
            <p className="text-xs text-muted-foreground italic mt-1 truncate" title={p.priorityReason}>
              {p.priorityReason}
            </p>
          )}
        </div>

        {/* Care team */}
        <div className="flex-1 min-w-0 text-xs">
          <p className="text-muted-foreground">PCP</p>
          <p className="text-foreground truncate">{p.pcp ?? '—'}</p>
          <p className="text-muted-foreground mt-1">Care Coordinator</p>
          <p className="text-foreground truncate">{p.careCoordinator ?? '—'}</p>
        </div>

        {/* Programs + contact */}
        <div className="flex-1 min-w-0 text-xs">
          <p className="text-muted-foreground">Active Programs</p>
          <div className="flex gap-1 flex-wrap mt-0.5">
            {(p.activePrograms ?? []).length > 0 ? (
              p.activePrograms!.map(prog => (
                <Badge key={prog} variant="outline" className="text-xs px-1.5 py-0">{prog}</Badge>
              ))
            ) : (
              <span className="text-foreground">—</span>
            )}
          </div>
          <p className="text-muted-foreground mt-2">Last contact</p>
          <p className="text-foreground">{p.lastContact ?? '—'}</p>
        </div>

        {/* Next task */}
        <div className="flex-1 min-w-0 text-xs">
          <p className="text-muted-foreground">Next task</p>
          <p className="text-foreground truncate">{p.nextTask ?? '—'}</p>
        </div>

        {/* Inline actions — coordinator can act from the row without drilling in */}
        <div className="flex-shrink-0 flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          <CallButton patientName={p.name} />
          {p.nextTask && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.info(`Opening ${p.name}'s task`, { description: p.nextTask! })}
            >
              <ListChecks className="h-3.5 w-3.5 mr-1" />
              Task
            </Button>
          )}
        </div>

        {extra && <div className="flex-shrink-0">{extra}</div>}
      </div>
    </div>
  );
}

export function CcmPanel() {
  const ccm = patientsCcmData.filter(p => p.enrolledInCCM);

  return (
    <div className="flex flex-col gap-3">
      {ccm.map(p => {
        const pct = p.minutesTarget > 0 ? Math.min(100, Math.round((p.minutesThisMonth / p.minutesTarget) * 100)) : 0;
        const ms = minuteStatus(p);
        return (
          <PatientRow
            key={p.id}
            p={p}
            extra={
              <div className="w-full md:w-44 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.minutesThisMonth} / {p.minutesTarget} min</span>
                </div>
                <Progress value={pct} className="h-1.5" />
                <StatusPill tone={ms.tone}>{ms.label}</StatusPill>
              </div>
            }
          />
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
        <PatientRow
          key={p.id}
          p={p}
          extra={
            <div className="space-y-1">
              {p.apcmLevel && (
                <Badge variant="secondary" className="w-fit">APCM Level {p.apcmLevel}</Badge>
              )}
              <StatusPill tone={levelColor[p.apcmLevel ?? 'I'] ?? 'muted'}>
                {p.monthBillingMode ?? 'Unset'}
              </StatusPill>
            </div>
          }
        />
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
        <PatientRow
          key={p.id}
          p={p}
          extra={
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success(`Contacted ${p.name}`, { description: 'Consent outreach logged.' })}
            >
              Contact
            </Button>
          }
        />
      ))}
      {pending.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No patients pending consent.</p>}
    </div>
  );
}
