import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

export const allThemeList: Array<Theme> = ['light', 'dark'];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
