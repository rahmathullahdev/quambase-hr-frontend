export type Role = 'employee' | 'admin';

export type LateType = 'on_time' | 'permission' | 'half_day' | 'late';

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'modified';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  employeeId: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  _id: string;
  userId: string;
  user?: Pick<User, 'name' | 'email' | 'employeeId' | 'department'>;
  date: string;
  checkIn?: string;
  checkOut?: string;
  lateType: LateType;
  durationMinutes?: number;
  remarks?: string;
  status: RequestStatus;
  adminNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  _id: string;
  userId: string;
  user?: Pick<User, 'name' | 'email' | 'employeeId' | 'department'>;
  date: string;
  type: LateType;
  reason: string;
  status: RequestStatus;
  reviewedBy?: string;
  reviewNote?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  accessToken: string;
  user: User;
}

export interface DashboardStats {
  presentToday: number;
  absentToday: number;
  lateToday: number;
  pendingRequests: number;
  attendanceRate: number;
  totalEmployees: number;
}

export interface MonthlyReport {
  employee: Pick<User, 'name' | 'email' | 'employeeId' | 'department'> & { _id: string };
  present: number;
  late: number;
  halfDay: number;
  permission: number;
  absent: number;
  rate: number;
}
