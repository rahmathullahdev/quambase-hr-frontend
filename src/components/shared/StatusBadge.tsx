import { cn } from '@/lib/utils';
import { STATUS_MAP } from '@/lib/constants';
import type { LateType } from '@/types';

interface StatusBadgeProps {
  status: LateType | 'absent';
  className?: string;
}

/** Status-specific badge for attendance types with color-coded theme colors */
export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = STATUS_MAP[status] || STATUS_MAP.absent;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all',
        className
      )}
      style={{
        backgroundColor: `${config.color}15`,
        color: config.color,
        borderColor: `${config.color}30`,
      }}
    >
      {config.label}
    </span>
  );
};
