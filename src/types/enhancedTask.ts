import { BillingOpportunity } from './billingOpportunity';

export type TaskModule = 'Intake' | 'Coordination' | 'Monitoring';
export type TaskChannel = 'Call' | 'SMS' | 'Email';
export type TaskStatus = 'needs-review' | 'in-progress' | 'needs-qhp' | 'completed';
export type AIStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | null;

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'AI' | 'Staff' | 'System' | 'Patient';
  action: string;
  details?: string;
  outcome?: 'success' | 'failure';
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

export interface CoordinationAppointment {
  id: string;
  type: 'Initial Consultation' | 'Follow-up' | 'Referral' | 'Procedure';
  provider: string;
  scheduledDate?: string;
  status: 'scheduled' | 'pending' | 'cancelled' | 'completed';
  notes?: string;
}

export interface EnhancedPopulationTask {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate: string;
  taskType: string;
  triggeredBy?: string;
  callDate?: string;
  
  // Enhanced fields
  module: TaskModule;
  channel: TaskChannel;
  assignedToAI: boolean;
  aiStatus: AIStatus;
  auditLog: AuditLogEntry[];
  
  // Module-specific data
  intakeDocuments?: IntakeDocument[];
  coordinationAppointments?: CoordinationAppointment[];
  evidenceFromCall?: Array<{
    text: string;
    timestamp: string;
    importance: string;
  }>;
  
  // Billing opportunities
  billingOpportunities?: BillingOpportunity[];
}

export interface TaskFilters {
  module: TaskModule | 'All';
  priority: 'High' | 'Medium' | 'Low' | 'All';
  status: TaskStatus | 'All';
  assignee: 'AI' | 'Staff' | 'All';
  searchTerm: string;
}

export interface TaskMetrics {
  aiResolutionRate: number;
  staffResolutionRate: number;
  avgResolutionHours: number;
  tasksCompletedToday: number;
  totalTasks: number;
  pendingTasks: number;
}
