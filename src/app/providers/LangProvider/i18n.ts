import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      welcome: 'Ознакомиться с React.',
      theme: 'Тема',
      language: 'Язык',
      appTitle: 'OTUS React',
      openModal: 'Открыть модальное окно',
      modalTitle: 'Модальное окно',
      modalPlaceholder: 'Введите текст...',
      close: 'Закрыть',
      switchToEn: 'EN',
      switchToRu: 'RU',
    },
  },
  en: {
    translation: {
      welcome: 'Learn React.',
      theme: 'Theme',
      language: 'Language',
      appTitle: 'OTUS React',
      openModal: 'Open modal',
      modalTitle: 'Modal window',
      modalPlaceholder: 'Enter text...',
      close: 'Close',
      switchToEn: 'EN',
      switchToRu: 'RU',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
