export type CarePlanAction = 'created' | 'revised' | 'reviewed';

export interface CarePlanUpdate {
  summary: string;
  updatedAt: string;
  updatedBy: string;
  action: CarePlanAction;
}

export interface TaskOutcome {
  escalate: boolean;
  updateCarePlan: boolean;
  countsForBilling: boolean;
  carePlanUpdate: CarePlanUpdate | null;
}

export const emptyTaskOutcome: TaskOutcome = {
  escalate: false,
  updateCarePlan: false,
  countsForBilling: false,
  carePlanUpdate: null,
};
