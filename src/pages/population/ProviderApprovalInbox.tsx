import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { patientsCcmData } from '@/data/patientsCcmData';
import { Stethoscope, ThumbsUp, MessageSquareWarning, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Provider approval inbox — a single place where providers review all care
// plans pending their sign-off. Clinician noted: "provider is not going to
// do all these things, they just approve." This avoids hunting through
// patient panels one by one.

// TODO: pull real pending-approval data from care plan store. For now,
// seed a small list so the view isn't empty in the demo.
interface PendingApproval {
  patientId: string;
  patientName: string;
  dateOfBirth: string;
  submittedBy: string;
  submittedAt: string;
  summary: string;
  fieldsChanged: string[];
  chronicConditions: string[];
  planType: 'CCM' | 'APCM';
}

const pendingApprovals: PendingApproval[] = [
  {
    patientId: 'P100593',
    patientName: 'Dorothy Hayes',
    dateOfBirth: '1948-03-22',
    submittedBy: 'Linda Torres, RN',
    submittedAt: '2026-04-22T16:10:00Z',
    summary: 'Updated planned interventions and medication list after CHF weight gain flag.',
    fieldsChanged: ['Planned Interventions', 'Medication List', 'Expected Outcomes'],
    chronicConditions: ['CHF', 'Hypertension', 'Dyslipidemia'],
    planType: 'CCM',
  },
  {
    patientId: 'P100594',
    patientName: 'Harold Simmons',
    dateOfBirth: '1945-11-08',
    submittedBy: 'Patricia Nguyen, NP',
    submittedAt: '2026-04-23T09:22:00Z',
    summary: 'Revised crisis plan after eGFR drop. Added nephrology coordination note.',
    fieldsChanged: ['Crisis & Emergency Plan', 'Coordination of Care'],
    chronicConditions: ['CKD Stage 3', 'Hypertension', 'Type 2 Diabetes'],
    planType: 'CCM',
  },
  {
    patientId: 'P100600',
    patientName: 'Walter Brooks',
    dateOfBirth: '1943-04-11',
    submittedBy: 'Linda Torres, RN',
    submittedAt: '2026-04-23T11:05:00Z',
    summary: 'Initial care plan ready for approval — complex CCM (60 min target).',
    fieldsChanged: ['All fields — initial plan'],
    chronicConditions: ['CKD Stage 4', 'Anemia in CKD', 'Hypertension'],
    planType: 'CCM',
  },
];

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ProviderApprovalInbox() {
  const queueSize = pendingApprovals.length;

  function approve(p: PendingApproval) {
    toast.success(`Approved ${p.patientName}'s care plan`, {
      description: 'Care coordinator has been notified.',
    });
  }

  function requestChanges(p: PendingApproval) {
    toast.info(`Sent back to ${p.submittedBy}`, {
      description: `${p.patientName}'s plan flagged for revision.`,
    });
  }

  function ccmPatient(id: string) {
    return patientsCcmData.find(p => p.id === id);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Pending your approval
            <Badge variant="secondary" className="text-xs">{queueSize}</Badge>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Care plans submitted by coordinators that need your sign-off before activation.
          </p>
        </div>
      </div>

      {queueSize === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No care plans awaiting approval.
        </div>
      )}

      <div className="space-y-3">
        {pendingApprovals.map(p => {
          const patient = ccmPatient(p.patientId);
          return (
            <Card key={p.patientId} className="shadow-none border-border">
              <CardContent className="p-4 space-y-3">
                {/* Top row */}
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{p.patientName}</p>
                      <span className="text-xs text-muted-foreground font-mono">{p.patientId}</span>
                      <Badge variant="outline" className="text-xs">{p.planType}</Badge>
                      <span className="text-xs text-muted-foreground">DOB {p.dateOfBirth}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Submitted by <span className="font-medium text-foreground">{p.submittedBy}</span> · {timeAgo(p.submittedAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => requestChanges(p)}>
                      <MessageSquareWarning className="h-3.5 w-3.5 mr-1.5" />Request changes
                    </Button>
                    <Button size="sm" onClick={() => approve(p)}>
                      <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />Approve
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-md bg-muted/40 border border-border p-3 space-y-2">
                  <p className="text-sm text-foreground">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-muted-foreground">Fields changed:</span>
                    {p.fieldsChanged.map(f => (
                      <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>

                {/* Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Chronic conditions</p>
                    <div className="flex flex-wrap gap-1">
                      {p.chronicConditions.map(c => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                  </div>
                  {patient && (
                    <div>
                      <p className="text-muted-foreground mb-1">Care team</p>
                      <p className="text-foreground">{patient.pcp ?? '—'} · {patient.careCoordinator ?? '—'}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
