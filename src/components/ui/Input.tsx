import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/** Styled text input — white theme */
export const Input = forwardRef<HTMLInputElement, InputProps>(
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
        <input
          ref={ref}
          id={id}
          className={cn(className)}
          style={{
            width: '100%',
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
Input.displayName = 'Input';
