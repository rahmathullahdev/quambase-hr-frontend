import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import api from '@/lib/api';
import type { Notification, ApiResponse } from '@/types';

interface NotifStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useNotifStore = create<NotifStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { isOpen, toggle, close } = useNotifStore();

  const useList = () => {
    return useQuery({
      queryKey: ['notifications'],
      queryFn: async () => {
        const res = await api.get<ApiResponse<Notification[]>>('/notifications');
        return res.data.data!;
      },
      refetchInterval: 60000, // polling every minute for new notifs
    });
  };

  const markAllRead = useMutation({
    mutationFn: async () => {
      await api.patch('/notifications/read-all');
    },
    onMutate: async () => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previous = queryClient.getQueryData<Notification[]>(['notifications']);
      if (previous) {
        queryClient.setQueryData<Notification[]>(
          ['notifications'],
          previous.map((n) => ({ ...n, isRead: true }))
        );
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['notifications'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markOneRead = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/notifications/${id}/read`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previous = queryClient.getQueryData<Notification[]>(['notifications']);
      if (previous) {
        queryClient.setQueryData<Notification[]>(
          ['notifications'],
          previous.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['notifications'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    isOpen,
    toggle,
    close,
    useList,
    markAllRead: markAllRead.mutate,
    markOneRead: markOneRead.mutate,
  };
};
