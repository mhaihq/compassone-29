import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ApcmLevel, MonthBillingMode } from '@/types/patient';

interface ApcmTierPanelProps {
  patientId: string;
  patientName: string;
  enrolledInCCM: boolean;
  enrolledInAPCM: boolean;
  apcmLevel?: ApcmLevel;
  monthBillingMode: MonthBillingMode;
  onEnrollmentChange: (update: {
    enrolledInCCM: boolean;
    enrolledInAPCM: boolean;
    apcmLevel?: ApcmLevel;
    monthBillingMode: MonthBillingMode;
  }) => void;
}

type ProgramChoice = 'CCM' | 'APCM';

const TIER_CONFIG: { level: ApcmLevel; code: string; label: string; description: string; price: string }[] = [
  { level: 'I', code: 'G0556', label: 'Level I', description: 'Low complexity. 1 chronic condition.', price: '~$15/month' },
  { level: 'II', code: 'G0557', label: 'Level II', description: 'Moderate complexity. 2+ chronic conditions.', price: '~$50/month' },
  { level: 'III', code: 'G0558', label: 'Level III', description: 'High complexity. Multiple chronic conditions, high utilization risk.', price: '~$110/month' },
];

export function ApcmTierPanel({
  patientName,
  enrolledInCCM,
  enrolledInAPCM,
  apcmLevel,
  monthBillingMode,
  onEnrollmentChange,
}: ApcmTierPanelProps) {
  const initialProgram: ProgramChoice = enrolledInAPCM ? 'APCM' : 'CCM';
  const [selectedProgram, setSelectedProgram] = useState<ProgramChoice>(initialProgram);
  const [selectedTier, setSelectedTier] = useState<ApcmLevel>(apcmLevel ?? 'II');
  const [confirmSwitch, setConfirmSwitch] = useState(false);

  const switchingMode =
    monthBillingMode !== null &&
    ((selectedProgram === 'APCM' && monthBillingMode === 'CCM') ||
      (selectedProgram === 'CCM' && monthBillingMode === 'APCM'));

  function handleProgramChange(value: ProgramChoice) {
    setSelectedProgram(value);
    setConfirmSwitch(false);
  }

  function handleSave() {
    if (switchingMode && !confirmSwitch) {
      setConfirmSwitch(true);
      return;
    }
    onEnrollmentChange({
      enrolledInCCM: selectedProgram === 'CCM',
      enrolledInAPCM: selectedProgram === 'APCM',
      apcmLevel: selectedProgram === 'APCM' ? selectedTier : undefined,
      monthBillingMode: selectedProgram,
    });
    setConfirmSwitch(false);
  }

  // Status strip
  const enrollmentBadge = enrolledInAPCM
    ? <Badge className="bg-purple-100 text-purple-800 border-purple-200">{`APCM — Level ${apcmLevel ?? '?'}`}</Badge>
    : enrolledInCCM
    ? <Badge className="bg-blue-100 text-blue-800 border-blue-200">CCM</Badge>
    : <Badge variant="secondary">Not enrolled</Badge>;

  return (
    <div className="space-y-4 p-4 max-w-[600px]">
      {/* Status strip */}
      <div className="flex flex-wrap items-center gap-2">
        <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium text-muted-foreground">{patientName}</span>
        {enrollmentBadge}
        {monthBillingMode && (
          <Badge variant="outline" className="text-xs">
            Billing: {monthBillingMode} this month
          </Badge>
        )}
      </div>

      <Separator />

      {/* Mutual-exclusion warning */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-xs leading-relaxed">
          CMS requires a patient to be billed under only <strong>ONE program</strong> per calendar month.
          Switching from CCM to APCM (or vice versa) will clear the current month's billing mode.
          APCM and CCM cannot be billed together in the same month.
        </AlertDescription>
      </Alert>

      {/* Program selector */}
      <div>
        <p className="text-sm font-semibold mb-2">Program</p>
        <RadioGroup
          value={selectedProgram}
          onValueChange={(v) => handleProgramChange(v as ProgramChoice)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {(['CCM', 'APCM'] as const).map((prog) => {
            const isCcm = prog === 'CCM';
            return (
              <Label key={prog} htmlFor={`prog-${prog}`} className="cursor-pointer">
                <Card className={`transition-colors ${selectedProgram === prog ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <CardContent className="p-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={prog} id={`prog-${prog}`} />
                      <span className="font-semibold text-sm">{prog}</span>
                      <span className="text-xs text-muted-foreground">
                        {isCcm ? '(99490/99439/99491/99487)' : '(G0556/G0557/G0558)'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      {isCcm
                        ? 'Time-based monthly billing. Requires ≥20 min/month of non-physician care coordination. Physician oversight required.'
                        : 'Complexity-based. No minimum time required. Three tiers based on patient complexity.'}
                    </p>
                  </CardContent>
                </Card>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      {/* APCM Tier selector */}
      {selectedProgram === 'APCM' && (
        <div>
          <p className="text-sm font-semibold mb-2">APCM Tier</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TIER_CONFIG.map(({ level, code, label, description, price }) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedTier(level)}
                className={`text-left rounded-lg border p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  selectedTier === level
                    ? 'border-purple-500 ring-1 ring-purple-500 bg-purple-50'
                    : 'border-border hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selectedTier === level
                    ? <CheckCircle className="h-4 w-4 text-purple-600 shrink-0" />
                    : <Info className="h-4 w-4 text-muted-foreground shrink-0" />}
                  <span className="font-semibold text-sm">{label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{code}</p>
                <p className="text-xs mt-1">{description}</p>
                <p className="text-xs font-medium text-purple-700 mt-1">{price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm switch inline prompt */}
      {confirmSwitch && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Switching programs will clear this month's {monthBillingMode} billing. Click "Save Enrollment" again to confirm.
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSave} className="w-full md:w-auto">
        Save Enrollment
      </Button>
    </div>
  );
}
