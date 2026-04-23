import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import type { DashboardStats, LeaveRequest, PaginatedResponse, ApiResponse, MonthlyReport, AttendanceRecord } from '@/types';

/** Hooks for admin dashboard and request management */
export const useAdminData = () => {
  const queryClient = useQueryClient();

  const useStats = () => {
    return useQuery({
      queryKey: ['admin', 'dashboard'],
      queryFn: async () => {
        const res = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard');
        return res.data.data!;
      },
      staleTime: 30 * 1000,
    });
  };

  const useRequests = (page: number, limit: number, filters?: { status?: string; department?: string; date?: string }) => {
    return useQuery({
      queryKey: ['admin', 'requests', page, limit, filters],
      queryFn: async () => {
        const res = await api.get<ApiResponse<PaginatedResponse<LeaveRequest>>>('/admin/requests', {
          params: { page, limit, ...filters },
        });
        return res.data;
      },
    });
  };

  const useReports = (month: string, department?: string) => {
    return useQuery({
      queryKey: ['admin', 'reports', month, department],
      queryFn: async () => {
        const res = await api.get<ApiResponse<MonthlyReport[]>>('/admin/reports', {
          params: { month, department },
        });
        return res.data.data!;
      },
    });
  };

  const useAllAttendance = (page: number, limit: number, filters?: any) => {
    return useQuery({
      queryKey: ['admin', 'attendance', page, limit, filters],
      queryFn: async () => {
        const res = await api.get<ApiResponse<PaginatedResponse<AttendanceRecord>>>('/admin/attendance', {
          params: { page, limit, ...filters },
        });
        return res.data;
      },
    });
  };

  const useDepartments = () => {
    // Ideally fetched from API, but we use constants for now or a specific endpoint
    return ['Engineering', 'Design', 'Marketing', 'Management', 'HR', 'Finance', 'Sales'];
  };

  const approveRequest = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<LeaveRequest>>(`/admin/requests/${id}/approve`);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Request approved');
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    },
  });

  const rejectRequest = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const res = await api.patch<ApiResponse<LeaveRequest>>(`/admin/requests/${id}/reject`, { reason });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Request rejected');
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject request');
    },
  });

  const modifyRequest = useMutation({
    mutationFn: async ({ id, type, note }: { id: string; type: string; note: string }) => {
      const res = await api.patch<ApiResponse<LeaveRequest>>(`/admin/requests/${id}/modify`, { type, note });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Request modified');
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to modify request');
    },
  });

  return {
    useStats,
    useRequests,
    useReports,
    useAllAttendance,
    useDepartments,
    approveRequest,
    rejectRequest,
    modifyRequest,
  };
};
