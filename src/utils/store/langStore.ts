import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Languages = 'en' | 'cn';

type LangState = {
  lang: Languages;
  setLang: (lang: Languages) => void;
};

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'lang-storage',
    },
  ),
);
