// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones generales (navegación, login, etc.)
import translationEN from '../locales/en/translationen.json';
import translationES from '../locales/es/translationes.json';
//Traducciones generales para Tickets
import ticketsEN from '../locales/en/ticketsen.json';
import ticketsES from '../locales/es/ticketses.json';
// Traducciones específicas para la página About Us
import aboutEN from '../locales/en/abouten.json';
import aboutES from '../locales/es/aboutes.json';
// Traducciones específicas para la página Tours
import toursEN from '../locales/en/toursen.json';
import toursES from '../locales/es/tourses.json';

import contactEN from '../locales/en/contacten.json';
import contactES from '../locales/es/contactes.json';

import homeEN from '../locales/en/homeen.json';
import homeES from '../locales/es/homees.json';

import faqsEN from '../locales/en/fqsen.json';
import faqsES from '../locales/es/fqses.json';
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
