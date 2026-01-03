import i18n from '@/utils/i18n/i18n';
import { useLangStore } from '@/utils/store/langStore';
import { useEffect } from 'react';

export function SyncLanguage() {
  const lang = useLangStore((state) => state.lang);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return null;
}
