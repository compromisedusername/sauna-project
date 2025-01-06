import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslation from './locales/pl/translation.json'
import enTranslation from './locales/en/translation.json'


const resources = {
  en: {
    translation: enTranslation
  },
  pl: {
    translation: plTranslation
  }
}as const;

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
  });

export default i18next;
