import type { BillingOpportunity } from '@/types/billingOpportunity';

export interface EvidenceFromCall {
  text: string;
  timestamp: string;
  importance: string;
}

export interface SuggestedAction {
  id: string;
  text: string;
  default: boolean;
}

export interface IntakeDocument {
  id: string;
  name: string;
  type: 'consent' | 'insurance' | 'medical-history' | 'other';
  status: 'missing' | 'pending' | 'completed' | 'expired';
  uploadedDate?: string;
  expiryDate?: string;
  url?: string;
}

export interface CareTaskViewModel {
  id: string;
  title: string;
  description: string;
  category?: string;
  categoryColor?: string;
  minutes?: number;
  insight?: string;
  status?: string;
  cptCode?: string;
  cptDescription?: string;
  patientId: string;
  patientName: string;
  taskType?: string;
  type?: string;
  subtype?: string;
  flagReason?: string;
  evidenceFromCall?: EvidenceFromCall[];
  audioUrl?: string;
  transcript?: string;
  suggestedActions?: SuggestedAction[];
  billingOpportunities?: BillingOpportunity[];
  intakeDocuments?: IntakeDocument[];
}
