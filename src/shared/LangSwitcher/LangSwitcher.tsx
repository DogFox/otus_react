import React from 'react';
import { useLang } from '../../app/providers/LangProvider/LangContext';
import './langSwitcher.css';

export function LangSwitcher() {
  const { language, setLanguage } = useLang();

  return (
    <div className="lang-switcher">
      <button
        type="button"
        className={language === 'ru' ? 'lang-switcher__btn lang-switcher__btn--active' : 'lang-switcher__btn'}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className={language === 'en' ? 'lang-switcher__btn lang-switcher__btn--active' : 'lang-switcher__btn'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
