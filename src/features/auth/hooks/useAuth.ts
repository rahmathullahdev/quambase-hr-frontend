import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { ApiResponse, AuthTokens, User } from '@/types';
import axios from 'axios';

/** Hook providing login, logout, refresh, and current user query */
export const useAuth = (options?: { fetchMe?: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth, logout: clearAuth, isAuthenticated, user } = useAuthStore();

  /** Login mutation */
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post<ApiResponse<AuthTokens>>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.data) {
        setAuth(data.data.accessToken, data.data.user);
        toast.success('Welcome back!');
        navigate(data.data.user.role === 'admin' ? '/admin' : '/dashboard');
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  /** Logout mutation */
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      clearAuth();
      toast.success('Logged out');
      navigate('/login');
    },
    onError: () => {
      queryClient.clear();
      clearAuth();
      navigate('/login');
    },
  });

  /** Query current user on app load (to restore session via refresh token) */
  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      return response.data.data;
    },
    retry: false,
    enabled: options?.fetchMe !== false,
  });

  /** Attempt to restore session via refresh token cookie */
  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post<ApiResponse<AuthTokens>>(
        `${import.meta.env.VITE_API_BASE_URL || '/api/v1'}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.data) {
        setAuth(data.data.accessToken, data.data.user);
      }
    },
    onError: () => {
      clearAuth();
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refresh: refreshMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRefreshing: refreshMutation.isPending,
    isAuthenticated,
    user,
    meQuery,
  };
};
