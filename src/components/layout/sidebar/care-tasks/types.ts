
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
}

export type CptCodeData = Record<string, CareTask[]>;
