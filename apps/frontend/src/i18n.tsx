import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslation from './locales/pl/translation.json'
import enTranslation from './locales/en/translation.json'


const resources = {
  en: {
    en: enTranslation
  },
  pl: {
    pl: plTranslation
  }
}as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
  });

export default i18n;
