import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import type { AttendanceRecord, ApiResponse } from '@/types';


/** Hook for today's check-in/check-out logic */
export const useCheckIn = () => {
  const queryClient = useQueryClient();

  const todayQuery = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<AttendanceRecord | null>>('/attendance/today');
      return res.data.data;
    },
  });

  const checkInMutation = useMutation({
    mutationFn: async (remarks?: string) => {
      const res = await api.post<ApiResponse<AttendanceRecord>>('/attendance/checkin', { remarks });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Successfully checked in');
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['attendance', 'calendar'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Check-in failed');
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async (remarks?: string) => {
      const res = await api.patch<ApiResponse<AttendanceRecord>>('/attendance/checkout', { remarks });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Successfully checked out');
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['attendance', 'calendar'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Check-out failed');
    },
  });

  return {
    todayRecord: todayQuery.data,
    isLoading: todayQuery.isPending,
    isRefetching: todayQuery.isRefetching,
    checkIn: checkInMutation.mutate,
    isCheckingIn: checkInMutation.isPending,
    checkOut: checkOutMutation.mutate,
    isCheckingOut: checkOutMutation.isPending,
  };
};
