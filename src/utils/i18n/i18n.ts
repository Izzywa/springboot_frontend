import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translation/en';
import { cn } from './translation/cn';
import { bm } from './translation/bm';

const resources = {
  en,
  cn,
  bm,
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng:
      typeof window !== 'undefined'
        ? localStorage.getItem('lang') || 'en'
        : 'en', // fallback on SSR
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
