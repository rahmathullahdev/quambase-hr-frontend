import type { LateType, RequestStatus } from '@/types';

/** 10:00 AM cutoff in minutes from midnight */
export const LATE_CUTOFF = 600;

/** Status display configuration mapping */
export const STATUS_MAP: Record<
  LateType | 'absent',
  { label: string; color: string; bgClass: string; textClass: string; borderClass: string }
> = {
  on_time: {
    label: 'Present',
    color: '#16A34A',
    bgClass: 'bg-status-on-time-bg',
    textClass: 'text-status-on-time-text',
    borderClass: 'border-status-on-time-border',
  },
  permission: {
    label: 'Permission',
    color: '#4F46E5',
    bgClass: 'bg-status-permission-bg',
    textClass: 'text-status-permission-text',
    borderClass: 'border-status-permission-border',
  },
  late: {
    label: 'Late',
    color: '#EA580C',
    bgClass: 'bg-status-late-bg',
    textClass: 'text-status-late-text',
    borderClass: 'border-status-late-border',
  },
  half_day: {
    label: 'Half Day',
    color: '#F97316',
    bgClass: 'bg-status-half-day-bg',
    textClass: 'text-status-half-day-text',
    borderClass: 'border-status-half-day-border',
  },
  absent: {
    label: 'Absent',
    color: '#DC2626',
    bgClass: 'bg-status-absent-bg',
    textClass: 'text-status-absent-text',
    borderClass: 'border-status-absent-border',
  },
};

/** Request status display mapping */
export const REQUEST_STATUS_MAP: Record<
  RequestStatus,
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  pending: {
    label: 'Pending',
    bgClass: 'bg-status-pending-bg',
    textClass: 'text-status-pending-text',
    borderClass: 'border-status-pending-border',
  },
  approved: {
    label: 'Approved',
    bgClass: 'bg-status-on-time-bg',
    textClass: 'text-status-on-time-text',
    borderClass: 'border-status-on-time-border',
  },
  rejected: {
    label: 'Rejected',
    bgClass: 'bg-status-absent-bg',
    textClass: 'text-status-absent-text',
    borderClass: 'border-status-absent-border',
  },
  modified: {
    label: 'Modified',
    bgClass: 'bg-status-permission-bg',
    textClass: 'text-status-permission-text',
    borderClass: 'border-status-permission-border',
  },
};

/** Navigation items for the sidebar */
export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
  { path: '/requests', label: 'Requests', icon: 'FileText' },
] as const;

/** Admin-only navigation items */
export const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: 'Admin Panel', icon: 'Shield' },
  { path: '/admin/approvals', label: 'Request Approvals', icon: 'ClipboardCheck' },
  { path: '/admin/reports', label: 'Reports', icon: 'BarChart3' },
] as const;

/** Departments list for filters */
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Management',
  'HR',
  'Finance',
  'Sales',
] as const;
