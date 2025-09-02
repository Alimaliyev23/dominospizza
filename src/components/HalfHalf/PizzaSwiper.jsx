import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";

const PizzaSwiper = ({ pizzas, side, onSelect, onClose }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const title = side === "left" ? t("selectLeftPizza") : t("selectRightPizza");

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full sm:w-96 h-full bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect(pizza);
              }}
              className="border border-gray-200 rounded-lg p-3 hover:border-red-400 hover:bg-red-50 cursor-pointer transition-colors flex items-center space-x-3"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={pizza.mediaDetail?.[lang] || pizza.mediaDetail?.az}
                  alt={getLocalizedText(pizza.name, i18n)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {getLocalizedText(pizza.name, i18n)}
                </h4>
                {pizza.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {getLocalizedText(pizza.description, i18n)}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-red-600">
                    {pizza.sizes?.small?.toFixed(2)} ₼ -{" "}
                    {pizza.sizes?.large?.toFixed(2)} ₼
                  </span>
                  <span className="text-xs text-blue-600 font-medium">
                    {t("select")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default PizzaSwiper;
