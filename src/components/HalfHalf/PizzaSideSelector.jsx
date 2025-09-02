import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";

const PizzaSideSelector = ({ side, selectedPizza, onSelect }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const title = side === "left" ? t("leftSide") : t("rightSide");
  const selectText = side === "left" ? t("selectLeft") : t("selectRight");

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-red-400 transition-colors bg-gray-50"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
      }}
    >
      {selectedPizza ? (
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src={
                selectedPizza.mediaDetail?.[lang] ||
                selectedPizza.mediaDetail?.az
              }
              className="w-full h-full object-cover"
              alt={getLocalizedText(selectedPizza.name, i18n)}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-600 uppercase">
              {title}
            </h4>
            <p className="text-sm font-bold text-gray-800 mt-1 line-clamp-2">
              {getLocalizedText(selectedPizza.name, i18n)}
            </p>
            <p className="text-xs text-blue-600 mt-1 hover:underline">
              {t("change")}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 py-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl text-gray-400">+</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">
              {title}
            </h4>
            <p className="text-sm text-blue-600 font-medium">{selectText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaSideSelector;
