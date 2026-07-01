import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      welcome: 'Ознакомиться с React.',
      theme: 'Тема',
      language: 'Язык',
      appTitle: 'OTUS React',
      productListTitle: 'Список товаров',
      openModal: 'Открыть модальное окно',
      modalTitle: 'Модальное окно',
      modalPortalDescription: 'Модальное окно монтируется в document.body через React Portal.',
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
      productListTitle: 'Product list',
      openModal: 'Open modal',
      modalTitle: 'Modal window',
      modalPortalDescription: 'The modal is mounted into document.body via React Portal.',
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
