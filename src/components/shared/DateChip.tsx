import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DateChipProps {
  date: string;
  format?: string;
  className?: string;
}

/** Small date chip with calendar icon for inline date display */
export const DateChip = ({ date, format: fmt = 'MMM dd, yyyy', className }: DateChipProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-text-secondary font-mono',
        className
      )}
    >
      <Calendar size={12} className="text-text-tertiary" />
      {formatDate(date, fmt)}
    </span>
  );
};
