import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";
import { t } from "i18next";
import { path } from "../../App";

const Selectors = ({
  selectedSize,
  onSizeSelect,
  selectedCut,
  onCutSelect,
  sizes,
  ing,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  

  const sizeOptions = [
    {
      key: "small",
      label: "SMALL",
      image: `${path}small.webp`,
      activeImage: `${path}smallBlue.webp`,
      sizeClass: "w-10 h-10",
    },
    {
      key: "medium",
      label: "MEDIUM",
      image: `${path}medium.webp`,
      activeImage: `${path}mediumBlue.webp`,
      sizeClass: "w-12 h-12",
    },
    {
      key: "large",
      label: "LARGE",
      image: `${path}large.webp`,
      activeImage: `${path}largeBlue.webp`,
      sizeClass: "w-14 h-14",
    },
  ];

  const cutOptionsBySize = {
    small: [
      {
        key: "regular",
        label: "NORMAL",
        image: `${path}small.webp`,
        activeImage: `${path}smallRegularBlue.webp`,
      },
      {
        key: "doublecut",
        label: "DOUBLE",
        image: `${path}smallDoublecut.webp`,
        activeImage: `${path}smallDoublecutBlue.webp`,
      },
      {
        key: "squarecut",
        label: "SQUARE",
        image: `${path}smallSquarecut.webp`,
        activeImage: `${path}smallSquarecutBlue.webp`,
      },
    ],
    medium: [
      {
        key: "regular",
        label: "NORMAL",
        image: `${path}medium.webp`,
        activeImage: `${path}mediumRegularBlue.webp`,
      },
      {
        key: "doublecut",
        label: "DOUBLE",
        image: `${path}mediumDoublecut.webp`,
        activeImage: `${path}mediumDoublecutBlue.webp`,
      },
      {
        key: "squarecut",
        label: "SQUARE",
        image: `${path}mediumSquarecut.webp`,
        activeImage: `${path}mediumSquarecutBlue.webp`,
      },
    ],
    large: [
      {
        key: "regular",
        label: "NORMAL",
        image: `${path}large.webp`,
        activeImage: `${path}largeRegularBlue.webp`,
      },
      {
        key: "doublecut",
        label: "DOUBLE",
        image: `${path}largeDoublecut.webp`,
        activeImage: `${path}largeDoublecutBlue.webp`,
      },
      {
        key: "squarecut",
        label: "SQUARE",
        image: `${path}largeSquarecut.webp`,
        activeImage: `${path}largeSquarecutBlue.webp`,
      },
    ],
  };

  const price =
    typeof ing?.price?.[selectedSize] === "number"
      ? ing.price[selectedSize].toFixed(2)
      : "0.00";

  const currentCutOptions = cutOptionsBySize[selectedSize] || [];

  const cutImageSizeClass =
    selectedSize === "small"
      ? "w-10 h-10"
      : selectedSize === "medium"
      ? "w-12 h-12"
      : "w-14 h-14";

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-lg font-bold mb-2">
          {getLocalizedText(t("Size", lang))}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {sizeOptions.map(({ key, label, image, activeImage, sizeClass }) => (
            <button
              key={key}
              onClick={() => onSizeSelect(key)}
              className={`flex flex-col items-center p-2 border rounded ${
                selectedSize === key ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img
                src={selectedSize === key ? activeImage : image}
                alt={label}
                className={`object-contain mb-1 ${sizeClass}`}
              />
              <span className="text-sm font-semibold">
                {getLocalizedText(t(label, lang))}
              </span>
              <span className="text-sm text-red-600 font-bold">
                {sizes?.[key]?.toFixed(2)} ₼
              </span>
            </button>
          ))}
        </div>
      </div>

      
      <div>
        <h3 className="text-lg font-bold mb-2">
          {getLocalizedText(t("Cut", lang))}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {currentCutOptions.map(({ key, label, image, activeImage }) => (
            <button
              key={key}
              onClick={() => onCutSelect(key)}
              className={`flex flex-col items-center p-2 border rounded ${
                selectedCut === key ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img
                src={selectedCut === key ? activeImage : image}
                alt={label}
                className={`object-contain mb-1 transition-all duration-300 ease-in-out ${cutImageSizeClass}`}
              />
              <span className="text-sm font-semibold">
                {getLocalizedText(t(label, lang))}
              </span>
              {ing?.cutCounts?.[selectedSize]?.[key] && (
                <span className="text-xs text-gray-500">
                  {getLocalizedText(t("pieces", lang)).replace(
                    "{{count}}",
                    ing.cutCounts[selectedSize][key]
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Selectors;
