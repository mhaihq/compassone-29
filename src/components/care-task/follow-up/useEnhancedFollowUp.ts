
import { useCallback, useReducer, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { 
  FollowUpState, 
  FollowUpAction, 
  FollowUpFormData, 
  FollowUpActionResult,
  ValidationError,
  FollowUpHandlers,
  CallHandlers
} from './enhancedTypes';
import { validateField, validateFollowUpForm } from './validation';

const initialState: FollowUpState = {
  form: {
    isValid: false,
    isDirty: false,
    errors: {},
    touched: {}
  },
  operation: {
    isLoading: false,
    error: null,
    success: false
  },
  config: {
    enableValidation: true,
    enableAccessibility: true,
    enableAutoSave: false,
    autoSaveInterval: 30000,
    maxRetries: 3,
    timeoutDuration: 10000
  },
  metrics: {
    formLoadTime: 0,
    validationTime: 0,
    submissionTime: 0,
    errorRate: 0,
    userSatisfaction: 0
  }
};

function followUpReducer(state: FollowUpState, action: FollowUpAction): FollowUpState {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        form: {
          ...state.form,
          isDirty: true
        }
      };
    
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        form: {
          ...state.form,
          errors: {
            ...state.form.errors,
            [action.field]: action.error
          },
          isValid: false
        }
      };
    
    case 'CLEAR_FIELD_ERROR':
      const { [action.field]: _, ...remainingErrors } = state.form.errors;
      return {
        ...state,
        form: {
          ...state.form,
          errors: remainingErrors,
          isValid: Object.keys(remainingErrors).length === 0
        }
      };
    
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        form: {
          ...state.form,
          touched: {
            ...state.form.touched,
            [action.field]: true
          }
        }
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        operation: {
          ...state.operation,
          isLoading: action.isLoading
        }
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        operation: {
          ...state.operation,
          error: action.error,
          isLoading: false,
          success: false
        }
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        operation: {
          ...state.operation,
          error: null
        }
      };
    
    case 'SET_SUCCESS':
      return {
        ...state,
        operation: {
          ...state.operation,
          success: action.success,
          isLoading: false,
          error: null
        }
      };
    
    case 'RESET_FORM':
      return {
        ...state,
        form: initialState.form,
        operation: {
          ...state.operation,
          success: false,
          error: null
        }
      };
    
    case 'UPDATE_METRICS':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          ...action.metrics
        }
      };
    
    default:
      return state;
  }
}

export const useEnhancedFollowUp = () => {
  const [state, dispatch] = useReducer(followUpReducer, initialState);

  // Performance tracking
  const startTime = useMemo(() => Date.now(), []);
  
  useEffect(() => {
    const loadTime = Date.now() - startTime;
    dispatch({ 
      type: 'UPDATE_METRICS', 
      metrics: { formLoadTime: loadTime } 
    });
  }, [startTime]);

  // Debounced validation for performance
  const debouncedValidation = useMemo(
    () => debounce((formData: Partial<FollowUpFormData>) => {
      const validationStart = Date.now();
      const validation = validateFollowUpForm(formData);
      const validationTime = Date.now() - validationStart;
      
      dispatch({ 
        type: 'UPDATE_METRICS', 
        metrics: { validationTime } 
      });
      
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([field, error]) => {
          dispatch({ type: 'SET_FIELD_ERROR', field, error });
        });
      }
    }, 300),
    []
  );

  // Enhanced handlers with performance tracking
  const handlers: FollowUpHandlers = {
    onValidateField: useCallback((field: string, value: any): ValidationError | null => {
      if (!state.config.enableValidation) return null;
      
      // Validation logic would go here
      return null;
    }, [state.config.enableValidation]),

    onFieldChange: useCallback((field: string, value: any) => {
      dispatch({ type: 'SET_FIELD_VALUE', field, value });
      dispatch({ type: 'CLEAR_FIELD_ERROR', field });
    }, []),

    onFieldBlur: useCallback((field: string) => {
      dispatch({ type: 'SET_FIELD_TOUCHED', field });
    }, []),

    onSubmit: useCallback(async (data: FollowUpFormData): Promise<FollowUpActionResult> => {
      const submissionStart = Date.now();
      dispatch({ type: 'SET_LOADING', isLoading: true });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const submissionTime = Date.now() - submissionStart;
        dispatch({ 
          type: 'UPDATE_METRICS', 
          metrics: { submissionTime } 
        });
        
        dispatch({ type: 'SET_SUCCESS', success: true });
        
        return {
          success: true,
          taskId: `task-${Date.now()}`,
          message: 'Follow-up action created successfully',
          timestamp: new Date()
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        dispatch({ type: 'SET_ERROR', error: errorMessage });
        
        return {
          success: false,
          message: 'Failed to create follow-up action',
          error: errorMessage,
          timestamp: new Date()
        };
      }
    }, []),

    onCancel: useCallback(() => {
      dispatch({ type: 'RESET_FORM' });
    }, []),

    onReset: useCallback(() => {
      dispatch({ type: 'RESET_FORM' });
    }, [])
  };

  const callHandlers: CallHandlers = {
    onStartPreCallIntel: useCallback(async () => {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      try {
        // Simulate pre-call intelligence loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch({ type: 'SET_SUCCESS', success: true });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to load pre-call intelligence' });
      }
    }, []),

    onStartCall: useCallback(async () => {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      try {
        // Simulate call initiation
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_SUCCESS', success: true });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to start call' });
      }
    }, []),

    onEndCall: useCallback(async (summary?: string) => {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      try {
        // Simulate call ending and summary processing
        await new Promise(resolve => setTimeout(resolve, 800));
        dispatch({ type: 'SET_SUCCESS', success: true });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', error: 'Failed to end call properly' });
      }
    }, []),

    onCallError: useCallback((error: string) => {
      dispatch({ type: 'SET_ERROR', error });
    }, [])
  };

  return {
    state,
    handlers,
    callHandlers,
    dispatch
  };
};
