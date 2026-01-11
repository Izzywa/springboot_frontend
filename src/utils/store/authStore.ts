import type { AuthStore } from '@/models/auth/Auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      auth: null,
      setAuth: (auth) => set({ auth }),
      clearAuth: () => set({ auth: null }),
      getUser: () => get().auth
    }),
    {
      name: 'auth-storage',
    },
  ),
);
