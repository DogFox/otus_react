import { createContext, useContext } from 'react';

export type Language = 'ru' | 'en';

export interface LangContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LangContext = createContext<LangContextValue | null>(null);

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within LangProvider');
  }

  return context;
}
