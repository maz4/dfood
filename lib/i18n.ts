import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import jaTranslations from "@/locales/ja.json";
import enTranslations from "@/locales/en.json";

const resources = {
  ja: {
    translation: jaTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

// Only initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng:
        typeof window !== "undefined"
          ? localStorage.getItem("i18nextLng") || "ja"
          : "ja",
      fallbackLng: "ja",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
      },
    });

  // Listen for language changes and save to localStorage
  i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", lng);
    }
  });
}

export default i18n;
