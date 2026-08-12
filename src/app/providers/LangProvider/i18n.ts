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
      authFormTitle: 'Вход / регистрация',
      profileFormTitle: 'Профиль',
      productFormTitle: 'Добавление / редактирование товара',
      productFormSubmit: 'Сохранить товар',
      openAuthForm: 'Войти',
      openProfileForm: 'Профиль',
      openProductForm: 'Добавить товар',
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
      authFormTitle: 'Sign in / Sign up',
      profileFormTitle: 'Profile',
      productFormTitle: 'Add / edit product',
      productFormSubmit: 'Save product',
      openAuthForm: 'Sign in',
      openProfileForm: 'Profile',
      openProductForm: 'Add product',
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
