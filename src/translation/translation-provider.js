import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  supportedLngs: ["en", "de"],
  resources: {
    en: {
      translation: {
        average: "Average",
        languageChange: "Switch to English",
        mainHeading: "Glucose",
      },
    },
    de: {
      translation: {
        average: "Durchschnitt",
        languageChange: "Zu Deutsch wechseln",
        mainHeading: "Glukose",
      },
    },
  },
});

function TranslationProvider({ children }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default TranslationProvider;
