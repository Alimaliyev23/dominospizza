import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationAZ from "./locals/az.json";
import translationEN from "./locals/en.json";
import translationRU from "./locals/ru.json";

const resources = {
  az: { translation: translationAZ },
  en: { translation: translationEN },
  ru: { translation: translationRU },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "az",
    interpolation: { escapeValue: false },
  });

export default i18n;
