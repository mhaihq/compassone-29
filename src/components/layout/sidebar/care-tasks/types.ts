
export interface CptCodeInfo {
  description: string;
  requirements: string;
  rateInfo: string;
}

export interface CareTask {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  minutes: number;
  insight: string;
  status: string;
  // Optional properties for detailed tasks
  taskType?: string;
  cptCode?: string;
  cptDescription?: string;
  patientId?: string;
  patientName?: string;
  flagReason?: string;
  type?: string;
  subtype?: string;
  evidenceFromCall?: Array<{
    text: string;
    timestamp: string;
    importance: string;
  }>;
  audioUrl?: string;
  transcript?: string;
  suggestedActions?: Array<{
    id: string;
    text: string;
    default: boolean;
  }>;
  intakeDocuments?: Array<{
    id: string;
    name: string;
    type: 'consent' | 'insurance' | 'medical-history' | 'other';
    status: 'missing' | 'pending' | 'completed' | 'expired';
    uploadedDate?: string;
    expiryDate?: string;
    url?: string;
  }>;
  billingOpportunities?: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    estimatedRevenue: number;
    pricingModel: string;
    conversionLikelihood: string;
    reasoning: string;
    suggestedActions: string[];
  }>;
}

export type CptCodeData = Record<string, CareTask[]>;
