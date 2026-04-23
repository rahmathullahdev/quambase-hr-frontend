import type { LateType } from '@/types';

/**
 * Classifies a check-in time into a lateness category on the frontend.
 * Must exactly match the server-side logic in dateUtils.ts.
 * Cutoff is 10:00 AM. Permission window 10:01–10:30.
 * Late window 10:31–12:00. After 12:00 is half_day.
 */
export const classifyLate = (checkInTime: Date): LateType => {
  const hours = checkInTime.getHours();
  const minutes = checkInTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const cutoff = 10 * 60; // 600 minutes = 10:00 AM

  if (totalMinutes <= cutoff) return 'on_time';
  if (totalMinutes <= cutoff + 30) return 'permission'; // 10:01–10:30
  if (totalMinutes <= 12 * 60) return 'late'; // 10:31–12:00
  return 'half_day'; // after 12:00
};
