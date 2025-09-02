import { getLocalizedText } from "./getLocalizedText";
import { normalizeLang } from "./normalizeLang";
import { path } from "../App";

export const getCartItemImageSrc = (item, langOrI18n) => {
  const lang = normalizeLang(
    typeof langOrI18n === "string" ? langOrI18n : langOrI18n?.language || "az"
  );

  const defaultHalfHalfImage = `${path}halfHalf.png`;
  const defaultImage = `${path}default.png`;

  if (item.type === "halfhalf") return defaultHalfHalfImage;

  const localizedImage = getLocalizedText(item.mediaDetail, lang, [
    `${lang}Mobile`,
    `${lang}CC`,
    lang,
    "en",
    "az",
    "ru",
  ]);

  if (typeof localizedImage === "string" && localizedImage.trim()) {
    return localizedImage;
  }

  if (typeof item.image === "string" && item.image.trim()) {
    return item.image;
  }

  return defaultImage;
};
