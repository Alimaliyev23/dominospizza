import { normalizeLang } from "./normalizeLang";

export const getLocalizedText = (text, langOrI18n, fallbackKeys = []) => {
  if (!text) return "";

  const lang =
    typeof langOrI18n === "string"
      ? normalizeLang(langOrI18n)
      : normalizeLang(langOrI18n?.language || "az");

  if (typeof text === "string") {
    if (langOrI18n?.t) return langOrI18n.t(text);
    return text;
  }

  if (typeof text === "object") {
    const candidates = [
      text[lang],
      ...fallbackKeys.map((key) => text[key]),
      text["en"],
      text["az"],
      text["ru"],
      Object.values(text)[0],
    ];

    const valid = candidates.find((val) => typeof val === "string");
    return valid || "";
  }

  return "";
};
