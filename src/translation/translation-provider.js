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
        languageChange: "English",
        mainHeading: "Glucose",
        inRange: "In Range",
        dayGraphTitle: "24 Hours",
      },
    },
    de: {
      translation: {
        average: "Durchschnitt",
        languageChange: "Deutsch",
        mainHeading: "Glukose",
        inRange: "Im Ziel",
        dayGraphTitle: "24 Stunden",
      },
    },
  },
});

function TranslationProvider({ children }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default TranslationProvider;
