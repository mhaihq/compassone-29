import { useState } from 'react';
import { AlertTriangle, FileText, Receipt, Pencil } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { TaskOutcome, CarePlanAction, CarePlanUpdate } from '@/types/taskOutcome';

interface TaskOutcomeActionsProps {
  outcome: TaskOutcome;
  onChange: (outcome: TaskOutcome) => void;
  // TODO: Replace with real user from auth
  currentUser?: string;
}

export function TaskOutcomeActions({
  outcome,
  onChange,
  currentUser = 'Dr. Matteo Grassi',
}: TaskOutcomeActionsProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [draftSummary, setDraftSummary] = useState(outcome.carePlanUpdate?.summary ?? '');
  const [draftAction, setDraftAction] = useState<CarePlanAction>(
    outcome.carePlanUpdate?.action ?? 'revised'
  );

  const toggleEscalate = (checked: boolean) =>
    onChange({ ...outcome, escalate: checked });

  const toggleBilling = (checked: boolean) =>
    onChange({ ...outcome, countsForBilling: checked });

  const toggleCarePlan = (checked: boolean) => {
    if (checked) {
      setEditorOpen(true);
    } else {
      onChange({ ...outcome, updateCarePlan: false, carePlanUpdate: null });
    }
  };

  const saveCarePlan = () => {
    if (!draftSummary.trim()) return;
    const update: CarePlanUpdate = {
      summary: draftSummary.trim(),
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser,
      action: draftAction,
    };
    onChange({ ...outcome, updateCarePlan: true, carePlanUpdate: update });
    setEditorOpen(false);
  };

  const cancelCarePlan = () => {
    setDraftSummary(outcome.carePlanUpdate?.summary ?? '');
    setDraftAction(outcome.carePlanUpdate?.action ?? 'revised');
    setEditorOpen(false);
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Outcome</h4>
          <p className="text-xs text-muted-foreground">
            Select all that apply before completing.
          </p>
        </div>

        <OutcomeCheckbox
          id="outcome-escalate"
          checked={outcome.escalate}
          onCheckedChange={toggleEscalate}
          icon={<AlertTriangle size={16} className="text-amber-600" />}
          label="Escalate"
          hint="Flag for QHP or provider review."
        />

        <OutcomeCheckbox
          id="outcome-care-plan"
          checked={outcome.updateCarePlan}
          onCheckedChange={toggleCarePlan}
          icon={<FileText size={16} className="text-blue-600" />}
          label="Update care plan"
          hint={
            outcome.carePlanUpdate
              ? `${labelForAction(outcome.carePlanUpdate.action)} · ${outcome.carePlanUpdate.summary.slice(0, 60)}${outcome.carePlanUpdate.summary.length > 60 ? '…' : ''}`
              : 'Revise the electronic care plan.'
          }
          actionSlot={
            outcome.updateCarePlan && outcome.carePlanUpdate ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setEditorOpen(true)}
              >
                <Pencil size={12} className="mr-1" />
                Edit
              </Button>
            ) : null
          }
        />

        <OutcomeCheckbox
          id="outcome-billing"
          checked={outcome.countsForBilling}
          onCheckedChange={toggleBilling}
          icon={<Receipt size={16} className="text-emerald-600" />}
          label="Counts for billing"
          hint="Include this task in monthly billing readiness."
        />
      </div>

      <Dialog open={editorOpen} onOpenChange={(open) => !open && cancelCarePlan()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Update care plan</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Action</Label>
              <RadioGroup
                value={draftAction}
                onValueChange={(v) => setDraftAction(v as CarePlanAction)}
                className="flex gap-4"
              >
                <RadioOption value="created" label="Created" active={draftAction === 'created'} />
                <RadioOption value="revised" label="Revised" active={draftAction === 'revised'} />
                <RadioOption value="reviewed" label="Reviewed" active={draftAction === 'reviewed'} />
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="care-plan-summary" className="text-xs font-medium">
                Summary
              </Label>
              <Textarea
                id="care-plan-summary"
                value={draftSummary}
                onChange={(e) => setDraftSummary(e.target.value)}
                placeholder="Describe the change to the care plan…"
                className="min-h-[140px] text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Updated by {currentUser}</span>
              <Badge variant="outline" className="text-[10px]">Electronic record</Badge>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={cancelCarePlan}>Cancel</Button>
            <Button onClick={saveCarePlan} disabled={!draftSummary.trim()}>
              Save care plan update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface OutcomeCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
  actionSlot?: React.ReactNode;
}

function OutcomeCheckbox({
  id, checked, onCheckedChange, icon, label, hint, actionSlot,
}: OutcomeCheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          {icon}
          {label}
        </Label>
        <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
      </div>
      {actionSlot}
    </div>
  );
}

function RadioOption({
  value, label, active,
}: { value: string; label: string; active: boolean }) {
  return (
    <Label
      htmlFor={`cp-action-${value}`}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border cursor-pointer text-xs font-medium transition-colors ${
        active ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:bg-accent'
      }`}
    >
      <RadioGroupItem value={value} id={`cp-action-${value}`} className="sr-only" />
      {label}
    </Label>
  );
}

function labelForAction(action: CarePlanAction): string {
  switch (action) {
    case 'created': return 'Created';
    case 'revised': return 'Revised';
    case 'reviewed': return 'Reviewed';
  }
}
