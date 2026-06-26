import React, { useCallback, useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { LangContext, Language } from './LangContext';

interface LangProviderProps {
  children: React.ReactNode;
}

export function LangProvider({ children }: LangProviderProps) {
  const [language, setLanguageState] = useState<Language>('ru');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LangContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LangContext.Provider>
  );
}
