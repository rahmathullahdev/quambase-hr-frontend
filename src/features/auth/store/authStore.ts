import { create } from 'zustand';
import type { User } from '@/types';

/** Auth store state shape */
interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

/** Zustand auth store — access token stored in memory only (not localStorage) */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAuth: (token: string, user: User) =>
    set({
      accessToken: token,
      user,
      isAuthenticated: true,
    }),

  setUser: (user: User) =>
    set({ user }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }),
}));
