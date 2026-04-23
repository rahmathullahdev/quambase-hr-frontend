import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-background-secondary text-text-secondary border-background-border',
  success: 'bg-status-on-time-bg text-status-on-time-text border-status-on-time-border',
  warning: 'bg-status-late-bg text-status-late-text border-status-late-border',
  danger: 'bg-status-absent-bg text-status-absent-text border-status-absent-border',
  info: 'bg-status-permission-bg text-status-permission-text border-status-permission-border',
  muted: 'bg-status-pending-bg text-status-pending-text border-status-pending-border',
};

/** Small pill badge for status indicators and labels */
export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
