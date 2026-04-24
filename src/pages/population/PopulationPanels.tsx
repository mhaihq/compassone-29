import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { patientsCcmData } from '@/data/patientsCcmData';
import type { Patient } from '@/types/patient';
import { toast } from 'sonner';
import { CallButton } from '@/pages/patient/call/CallButton';
import { ListChecks, AlertTriangle, Search } from 'lucide-react';

const priorityDot: Record<string, string> = {
  High: 'bg-red-500',
  Medium: 'bg-amber-400',
  Low: 'bg-green-500',
};

const trajectoryLabel: Record<string, { label: string; className: string }> = {
  'improving': { label: 'Improving', className: 'text-green-700 bg-green-50 border-green-300' },
  'stable': { label: 'Stable', className: 'text-muted-foreground bg-muted border-border' },
  'not-improving': { label: 'Not Improving', className: 'text-red-700 bg-red-50 border-red-300' },
};

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}`;
}

function formatDob(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

type ProgramFilter = 'all' | 'CCM' | 'APCM' | 'RPM' | 'RTM';
type PriorityFilter = 'all' | 'High' | 'Medium' | 'Low';
type TrajectoryFilter = 'all' | 'improving' | 'stable' | 'not-improving';

interface FilterState {
  program: ProgramFilter;
  priority: PriorityFilter;
  trajectory: TrajectoryFilter;
  search: string;
}

function filterPatients(all: Patient[], f: FilterState): Patient[] {
  return all.filter(p => {
    if (f.program !== 'all' && !(p.activePrograms ?? []).includes(f.program as any)) return false;
    if (f.priority !== 'all' && p.priority !== f.priority) return false;
    if (f.trajectory !== 'all' && p.trajectory !== f.trajectory) return false;
    if (f.search && !`${p.name} ${p.id} ${p.diagnosisCode}`.toLowerCase().includes(f.search.toLowerCase())) return false;
    return true;
  });
}

// ─── Unified patient table ──────────────────────────────────────────────────
export function PatientTable() {
  const [filters, setFilters] = useState<FilterState>({
    program: 'all',
    priority: 'all',
    trajectory: 'all',
    search: '',
  });

  const enrolled = patientsCcmData.filter(p => p.enrolledInCCM || p.enrolledInAPCM);
  const rows = filterPatients(enrolled, filters);

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            placeholder="Search name, ID, condition…"
            className="h-9 text-sm pl-8"
          />
        </div>
        <FilterSelect
          label="Program"
          value={filters.program}
          onChange={v => setFilters(f => ({ ...f, program: v as ProgramFilter }))}
          options={[
            { value: 'all', label: 'All programs' },
            { value: 'CCM', label: 'CCM' },
            { value: 'APCM', label: 'APCM' },
            { value: 'RPM', label: 'RPM' },
            { value: 'RTM', label: 'RTM' },
          ]}
        />
        <FilterSelect
          label="Priority"
          value={filters.priority}
          onChange={v => setFilters(f => ({ ...f, priority: v as PriorityFilter }))}
          options={[
            { value: 'all', label: 'All priority' },
            { value: 'High', label: 'High' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Low', label: 'Low' },
          ]}
        />
        <FilterSelect
          label="Status"
          value={filters.trajectory}
          onChange={v => setFilters(f => ({ ...f, trajectory: v as TrajectoryFilter }))}
          options={[
            { value: 'all', label: 'All status' },
            { value: 'improving', label: 'Improving' },
            { value: 'stable', label: 'Stable' },
            { value: 'not-improving', label: 'Not Improving' },
          ]}
        />
      </div>

      {/* Table — desktop */}
      <div className="hidden lg:block border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <Th>Patient</Th>
                <Th>DOB</Th>
                <Th>PCP</Th>
                <Th>Care Coordinator</Th>
                <Th>Programs</Th>
                <Th>Conditions</Th>
                <Th>Priority</Th>
                <Th>Last Contact</Th>
                <Th>Alerts</Th>
                <Th>Time This Month</Th>
                <Th>Next Task</Th>
                <Th>Status</Th>
                <Th>{''}</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => <PatientTableRow key={p.id} p={p} />)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card list — mobile/tablet */}
      <div className="lg:hidden space-y-2">
        {rows.map(p => <PatientCard key={p.id} p={p} />)}
      </div>

      {rows.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No patients match these filters.</p>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] h-9 text-sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5 whitespace-nowrap">{children}</th>;
}

function PatientTableRow({ p }: { p: Patient }) {
  const traj = p.trajectory ? trajectoryLabel[p.trajectory] : null;
  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="px-3 py-2.5">
        <p className="text-sm font-medium text-foreground">{p.name}</p>
        <p className="text-xs text-muted-foreground font-mono">{p.id}</p>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono whitespace-nowrap">{formatDob(p.dateOfBirth)}</td>
      <td className="px-3 py-2.5 text-xs text-foreground">{p.pcp ?? '—'}</td>
      <td className="px-3 py-2.5 text-xs text-foreground">{p.careCoordinator ?? '—'}</td>
      <td className="px-3 py-2.5">
        <div className="flex flex-wrap gap-1">
          {(p.activePrograms ?? []).map(prog => (
            <Badge key={prog} variant="outline" className="text-xs px-1.5 py-0">{prog}</Badge>
          ))}
          {(p.activePrograms ?? []).length === 0 && <span className="text-xs text-muted-foreground">—</span>}
        </div>
      </td>
      <td className="px-3 py-2.5 text-xs text-foreground max-w-[180px] truncate" title={p.primaryDiagnosis}>{p.primaryDiagnosis}</td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        {p.priority ? (
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className={`h-2.5 w-2.5 rounded-full ${priorityDot[p.priority]}`} />
            {p.priority}
          </span>
        ) : '—'}
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono whitespace-nowrap">{formatDate(p.lastContact)}</td>
      <td className="px-3 py-2.5 text-xs max-w-[180px]">
        {p.escalatedToProvider ? (
          <span className="inline-flex items-center gap-1 text-red-700">
            <AlertTriangle className="h-3 w-3" />
            <span className="truncate" title={p.escalatedToProvider.reason}>Escalated — {p.escalatedToProvider.reason}</span>
          </span>
        ) : p.priorityReason ? (
          <span className="text-foreground truncate block" title={p.priorityReason}>{p.priorityReason}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className="px-3 py-2.5 text-xs text-foreground whitespace-nowrap">
        {p.minutesTarget > 0 ? `${p.minutesThisMonth} / ${p.minutesTarget} min` : '—'}
      </td>
      <td className="px-3 py-2.5 text-xs text-foreground max-w-[160px] truncate" title={p.nextTask}>{p.nextTask ?? '—'}</td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        {traj ? (
          <Badge variant="outline" className={`text-xs ${traj.className}`}>{traj.label}</Badge>
        ) : '—'}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <CallButton patientName={p.name} />
          {p.nextTask && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={() => toast.info(`Opening ${p.name}'s task`, { description: p.nextTask! })}
            >
              <ListChecks className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

function PatientCard({ p }: { p: Patient }) {
  const traj = p.trajectory ? trajectoryLabel[p.trajectory] : null;
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{p.name}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">{p.id}</span> · DOB {formatDob(p.dateOfBirth)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {p.priority && (
            <span className="inline-flex items-center gap-1 text-xs">
              <span className={`h-2 w-2 rounded-full ${priorityDot[p.priority]}`} />
              {p.priority}
            </span>
          )}
          {traj && <Badge variant="outline" className={`text-xs ${traj.className}`}>{traj.label}</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div>
          <span className="text-muted-foreground">PCP: </span>
          <span className="text-foreground">{p.pcp ?? '—'}</span>
        </div>
        <div>
          <span className="text-muted-foreground">CC: </span>
          <span className="text-foreground">{p.careCoordinator ?? '—'}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Last contact: </span>
          <span className="text-foreground font-mono">{formatDate(p.lastContact)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Time: </span>
          <span className="text-foreground">
            {p.minutesTarget > 0 ? `${p.minutesThisMonth}/${p.minutesTarget} min` : '—'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {(p.activePrograms ?? []).map(prog => (
          <Badge key={prog} variant="outline" className="text-xs px-1.5 py-0">{prog}</Badge>
        ))}
        <Badge variant="outline" className="text-xs px-1.5 py-0">{p.primaryDiagnosis}</Badge>
      </div>

      {(p.escalatedToProvider || p.priorityReason) && (
        <p className="text-xs text-muted-foreground italic truncate">
          {p.escalatedToProvider ? `⚠ ${p.escalatedToProvider.reason}` : p.priorityReason}
        </p>
      )}

      {p.nextTask && (
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border">
          <span className="text-xs text-foreground truncate">{p.nextTask}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <CallButton patientName={p.name} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Consent queue (unchanged structure) ────────────────────────────────────
export function ConsentQueue() {
  const pending = patientsCcmData.filter(p => !p.consent.obtained);

  return (
    <div className="flex flex-col gap-3">
      {pending.map(p => (
        <div key={p.id} className="rounded-lg border border-border bg-card px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-mono">{p.id}</span> · DOB {formatDob(p.dateOfBirth)} · {p.diagnosisCode}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
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
