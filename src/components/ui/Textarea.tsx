import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

/** Styled textarea — white theme */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, style, ...props }, ref) => {
    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            htmlFor={id}
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(className)}
          style={{
            width: '100%',
            minHeight: '100px',
            backgroundColor: '#ffffff',
            border: `1px solid ${error ? '#FECACA' : '#E2E8F0'}`,
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#0F172A',
            outline: 'none',
            transition: 'all 0.15s',
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
            fontFamily: 'Inter, system-ui, sans-serif',
            resize: 'vertical',
            ...style,
          }}
          onFocus={e => {
            e.target.style.borderColor = '#4F46E5';
            e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.12)';
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? '#FECACA' : '#E2E8F0';
            e.target.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04)';
          }}
          {...props}
        />
        {error && (
          <p style={{ marginTop: '4px', fontSize: '12px', color: '#DC2626' }}>{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
