export type OpportunityCategory = 
  | 'wellness-prevention'
  | 'convenience'
  | 'specialized-wellness'
  | 'mental-health'
  | 'chronic-care';

export type OpportunityPriority = 'high' | 'medium' | 'low';

export interface BillingOpportunity {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  priority: OpportunityPriority;
  estimatedRevenue: number;
  pricingModel: 'one-time' | 'monthly' | 'per-session' | 'package';
  conversionLikelihood: 'high' | 'medium' | 'low';
  reasoning: string; // Why this opportunity is relevant for this task
  suggestedActions?: string[];
}

export interface OpportunityConversion {
  opportunityId: string;
  taskId: string;
  convertedAt: Date;
  actualRevenue: number;
  serviceEnrolled: string;
}

export interface OpportunityMetrics {
  totalOpportunities: number;
  totalEstimatedRevenue: number;
  conversionRate: number;
  averageRevenuePerConversion: number;
  topPerformingCategories: Array<{
    category: OpportunityCategory;
    count: number;
    revenue: number;
  }>;
}
