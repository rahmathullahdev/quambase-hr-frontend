import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children?: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#4F46E5',
    color: '#ffffff',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(79,70,229,0.20)',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#0F172A',
    border: '1px solid #E2E8F0',
    boxShadow: '0 1px 2px rgba(15,23,42,0.05)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#475569',
    border: '1px solid transparent',
  },
  danger: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    border: '1px solid #FECACA',
  },
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '12px', borderRadius: '8px' },
  md: { padding: '9px 16px', fontSize: '14px', borderRadius: '10px' },
  lg: { padding: '12px 20px', fontSize: '15px', borderRadius: '12px' },
};

/** Premium button component — white theme */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, style, ...props }, ref) => {
    const variantStyle = VARIANT_STYLES[variant];
    const sizeStyle = SIZE_STYLES[size];
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontWeight: 600,
          fontFamily: 'Inter, system-ui, sans-serif',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
          opacity: isDisabled ? 0.6 : 1,
          ...variantStyle,
          ...sizeStyle,
          ...style,
        }}
        onMouseEnter={e => {
          if (isDisabled) return;
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = '#6366F1';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(79,70,229,0.30)';
          } else if (variant === 'secondary') {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.10)';
          } else if (variant === 'ghost') {
            e.currentTarget.style.backgroundColor = '#F1F5F9';
          } else if (variant === 'danger') {
            e.currentTarget.style.backgroundColor = '#FEE2E2';
          }
        }}
        onMouseLeave={e => {
          if (isDisabled) return;
          e.currentTarget.style.backgroundColor = variantStyle.backgroundColor as string;
          e.currentTarget.style.boxShadow = (variantStyle.boxShadow as string) || '';
        }}
        onMouseDown={e => {
          if (!isDisabled) e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        {...props}
      >
        {isLoading ? <Spinner size="sm" /> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
