import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

/** Merges Tailwind classes with conflict resolution */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/** Formats an ISO date string to human-readable format */
export const formatDate = (dateStr: string, fmt: string = 'MMM dd, yyyy'): string => {
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
};

/** Formats a time string (ISO) to HH:mm AM/PM */
export const formatTime = (isoStr: string): string => {
  try {
    return format(parseISO(isoStr), 'hh:mm a');
  } catch {
    return '--:--';
  }
};

/** Formats a date to relative time (e.g., "2 hours ago") */
export const timeAgo = (isoStr: string): string => {
  try {
    return formatDistanceToNow(parseISO(isoStr), { addSuffix: true });
  } catch {
    return '';
  }
};

/** Formats duration in minutes to "Xh Ym" */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/** Returns initials from a full name (e.g. "John Doe" → "JD") */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/** Converts a YYYY-MM-DD string to a Date object at noon (avoids TZ issues) */
export const dateFromString = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
};

/** Formats a number as percentage string */
export const formatPercent = (value: number): string => {
  return `${Math.round(value)}%`;
};
