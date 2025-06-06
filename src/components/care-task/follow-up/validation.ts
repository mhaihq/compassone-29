
import { z } from 'zod';

// Validation schemas
export const followUpDateSchema = z.string()
  .min(1, 'Follow-up date is required')
  .refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
  }, 'Follow-up date must be a valid future date');

export const escalationReasonSchema = z.string()
  .min(10, 'Escalation reason must be at least 10 characters')
  .max(500, 'Escalation reason must not exceed 500 characters');

export const customScriptSchema = z.string()
  .min(5, 'Custom script must be at least 5 characters')
  .max(200, 'Custom script must not exceed 200 characters');

export const selectedScriptsSchema = z.array(z.string())
  .min(1, 'At least one script must be selected for AI follow-up');

// Complete form validation schema
export const followUpFormSchema = z.object({
  followUpType: z.enum(['ai', 'manual', 'escalate']),
  followUpDate: followUpDateSchema.optional(),
  selectedScripts: z.array(z.string()).optional(),
  customScript: z.string().optional(),
  escalationReason: z.string().optional(),
  manualInstructions: z.string().optional(),
}).superRefine((data, ctx) => {
  // Conditional validation based on follow-up type
  if (data.followUpType === 'ai') {
    if (!data.followUpDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Follow-up date is required for AI follow-up',
        path: ['followUpDate']
      });
    }
    if (!data.selectedScripts || data.selectedScripts.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one script must be selected for AI follow-up',
        path: ['selectedScripts']
      });
    }
  }
  
  if (data.followUpType === 'manual') {
    if (!data.followUpDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Follow-up date is required for manual follow-up',
        path: ['followUpDate']
      });
    }
    if (!data.manualInstructions || data.manualInstructions.trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Manual instructions must be at least 10 characters',
        path: ['manualInstructions']
      });
    }
  }
  
  if (data.followUpType === 'escalate') {
    if (!data.escalationReason || data.escalationReason.trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Escalation reason must be at least 10 characters',
        path: ['escalationReason']
      });
    }
  }
});

export type FollowUpFormData = z.infer<typeof followUpFormSchema>;

// Validation helper functions
export const validateField = <T>(schema: z.ZodSchema<T>, value: T): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validateFollowUpForm = (data: Partial<FollowUpFormData>): { isValid: boolean; errors: Record<string, string> } => {
  try {
    followUpFormSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
