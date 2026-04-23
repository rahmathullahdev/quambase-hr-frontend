import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import type { AttendanceRecord, PaginatedResponse, ApiResponse, LeaveRequest } from '@/types';

/** Hook for fetching calendar records, history, and leave requests */
export const useAttendance = () => {
  const queryClient = useQueryClient();

  const useCalendar = (year: number, month: number) => {
    return useQuery({
      queryKey: ['attendance', 'calendar', year, month],
      queryFn: async () => {
        const res = await api.get<ApiResponse<AttendanceRecord[]>>(`/attendance/calendar/${year}/${month}`);
        return res.data.data!;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useHistory = (page: number, limit: number, month?: string) => {
    return useQuery({
      queryKey: ['attendance', 'history', page, limit, month],
      queryFn: async () => {
        const res = await api.get<ApiResponse<PaginatedResponse<AttendanceRecord>>>('/attendance/history', {
          params: { page, limit, month },
        });
        return res.data;
      },
    });
  };

  const useRequests = (page: number, limit: number, status?: string) => {
    return useQuery({
      queryKey: ['attendance', 'requests', page, limit, status],
      queryFn: async () => {
        const res = await api.get<ApiResponse<PaginatedResponse<LeaveRequest>>>('/attendance/requests', {
          params: { page, limit, status },
        });
        return res.data;
      },
    });
  };

  const submitRequest = useMutation({
    mutationFn: async (data: { date: string; type: string; reason: string }) => {
      const res = await api.post<ApiResponse<LeaveRequest>>('/attendance/requests', data);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Leave request submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['attendance', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }); // optimistic cache invalidation for admin side if applicable
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    },
  });

  const cancelRequest = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/attendance/requests/${id}`);
    },
    onSuccess: () => {
      toast.success('Request cancelled');
      queryClient.invalidateQueries({ queryKey: ['attendance', 'requests'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel request');
    },
  });

  return {
    useCalendar,
    useHistory,
    useRequests,
    submitRequest,
    cancelRequest,
  };
};
