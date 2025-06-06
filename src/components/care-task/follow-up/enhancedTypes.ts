
import { z } from 'zod';
import { followUpFormSchema } from './validation';

// Enhanced type definitions with strict validation
export type FollowUpType = 'ai' | 'manual' | 'escalate' | 'call';

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export interface AsyncOperation {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface FollowUpFormData extends z.infer<typeof followUpFormSchema> {
  // Additional computed fields
  estimatedDuration?: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
}

export interface FollowUpActionResult {
  success: boolean;
  taskId?: string;
  message: string;
  error?: string;
  timestamp: Date;
}

export interface CallSession {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  transcriptUrl?: string;
  recordingUrl?: string;
}

export interface PreCallIntelligence {
  patientInsights: Array<{
    type: 'medication' | 'behavior' | 'risk' | 'preference';
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    source: string;
  }>;
  recommendedApproach: string;
  keyTopics: string[];
  contraindications: string[];
}

export interface TaskContext {
  taskId: string;
  patientId: string;
  taskType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date;
  assignedProvider: string;
  relatedTasks: string[];
  prerequisites: string[];
}

// Event handlers with enhanced type safety
export interface FollowUpHandlers {
  onValidateField: (field: string, value: any) => ValidationError | null;
  onFieldChange: (field: string, value: any) => void;
  onFieldBlur: (field: string) => void;
  onSubmit: (data: FollowUpFormData) => Promise<FollowUpActionResult>;
  onCancel: () => void;
  onReset: () => void;
}

export interface CallHandlers {
  onStartPreCallIntel: () => Promise<void>;
  onStartCall: () => Promise<void>;
  onEndCall: (summary?: string) => Promise<void>;
  onCallError: (error: string) => void;
}

// Configuration types
export interface FollowUpConfig {
  enableValidation: boolean;
  enableAccessibility: boolean;
  enableAutoSave: boolean;
  autoSaveInterval: number;
  maxRetries: number;
  timeoutDuration: number;
}

export interface PerformanceMetrics {
  formLoadTime: number;
  validationTime: number;
  submissionTime: number;
  errorRate: number;
  userSatisfaction: number;
}

// State management types
export interface FollowUpState {
  form: FormState;
  operation: AsyncOperation;
  config: FollowUpConfig;
  metrics: PerformanceMetrics;
  session?: CallSession;
  preCallIntel?: PreCallIntelligence;
  taskContext?: TaskContext;
}

// Action types for state management
export type FollowUpAction =
  | { type: 'SET_FIELD_VALUE'; field: string; value: any }
  | { type: 'SET_FIELD_ERROR'; field: string; error: string }
  | { type: 'CLEAR_FIELD_ERROR'; field: string }
  | { type: 'SET_FIELD_TOUCHED'; field: string }
  | { type: 'SET_FORM_VALIDITY'; isValid: boolean }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_SUCCESS'; success: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'UPDATE_METRICS'; metrics: Partial<PerformanceMetrics> };
