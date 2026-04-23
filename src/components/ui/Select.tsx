import { forwardRef, useState, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

/** Styled select input — white theme with robust focus handling */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, placeholder, id, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

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
        <div style={{ position: 'relative' }}>
          <select
            ref={ref}
            id={id}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: `1px solid ${error ? '#FECACA' : isFocused ? '#4F46E5' : '#E2E8F0'}`,
              borderRadius: '10px',
              padding: '10px 36px 10px 14px',
              fontSize: '14px',
              color: '#0F172A',
              outline: 'none',
              appearance: 'none',
              transition: 'all 0.15s',
              boxShadow: isFocused ? '0 0 0 3px rgba(79,70,229,0.12)' : '0 1px 2px rgba(15,23,42,0.04)',
              fontFamily: 'Inter, system-ui, sans-serif',
              cursor: 'pointer',
              ...style,
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: isFocused ? '#4F46E5' : '#94A3B8' }}>
            <ChevronDown size={16} />
          </div>
        </div>
        {error && (
          <p style={{ marginTop: '4px', fontSize: '12px', color: '#DC2626' }}>{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
