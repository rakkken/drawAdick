import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    preload: ['pl-PL', 'pl'],
    fallbackLng: 'en',
    debug: true,
    backend: {
        loadPath: 'static/dist/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded'
      }
  });

export default i18n;