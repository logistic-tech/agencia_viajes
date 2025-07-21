// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones generales (navegación, login, etc.)
import translationEN from './src/locales/en/translationen.json';
import translationES from './src/locales/es/translationes.json';
//Traducciones generales para Tickets
import ticketsEN from './src/locales/en/ticketsen.json';
import ticketsES from './src/locales/es/ticketses.json';
// Traducciones específicas para la página About Us
import aboutEN from './src/locales/en/abouten.json';
import aboutES from './src/locales/es/aboutes.json';
// Traducciones específicas para la página Tours
import toursEN from './src/locales/en/toursen.json';
import toursES from './src/locales/es/tourses.json';

import contactEN from './src/locales/en/contacten.json';
import contactES from './src/locales/es/contactes.json';

import homeEN from './src/locales/en/homeen.json';
import homeES from './src/locales/es/homees.json';

import faqsEN from './src/locales/en/fqsen.json';
import faqsES from './src/locales/es/fqses.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
        faqs: faqsEN,
        about: aboutEN,
        tickets: ticketsEN,
          tours: toursEN,
           contact: contactEN,
              home: homeEN,
      },
      es: {
        translation: translationES,
        about: aboutES,
         tickets: ticketsES,
           tours: toursES,
            contact: contactES,
               home: homeES,
        faqs: faqsES,
      }
    },
    lng: 'es', // o automático con detector
    fallbackLng: 'en',
    defaultNS: 'translation',  // <-- para usar sin especificar namespace
    ns: ['translation', 'about'], // <-- todos los namespaces que usarás
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
