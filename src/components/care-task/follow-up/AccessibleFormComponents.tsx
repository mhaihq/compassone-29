
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface AccessibleInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'date' | 'email' | 'tel';
  placeholder?: string;
  'aria-describedby'?: string;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  type = 'text',
  placeholder,
  'aria-describedby': ariaDescribedBy
}) => {
  const errorId = `${id}-error`;
  const describedBy = error ? `${errorId} ${ariaDescribedBy || ''}`.trim() : ariaDescribedBy;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        aria-required={required}
        className={error ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {error && (
        <div 
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

interface AccessibleTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: string;
  maxLength?: number;
  'aria-describedby'?: string;
}

export const AccessibleTextarea: React.FC<AccessibleTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  minHeight = '100px',
  maxLength,
  'aria-describedby': ariaDescribedBy
}) => {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy = [
    error ? errorId : null,
    maxLength ? helpId : null,
    ariaDescribedBy
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        aria-required={required}
        className={`${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        style={{ minHeight }}
        maxLength={maxLength}
      />
      {maxLength && (
        <div 
          id={helpId}
          className="text-xs text-gray-500"
          aria-live="polite"
        >
          {value.length}/{maxLength} characters
        </div>
      )}
      {error && (
        <div 
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  error
}) => {
  return (
    <fieldset className="space-y-4 border rounded-lg p-4">
      <legend className="text-lg font-medium px-2">{title}</legend>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      {error && (
        <div role="alert" className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      {children}
    </fieldset>
  );
};
