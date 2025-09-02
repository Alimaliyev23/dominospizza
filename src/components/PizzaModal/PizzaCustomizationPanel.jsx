import React from "react";
import { getLocalizedText } from "../../utils/getLocalizedText";
import { t } from "i18next";

const PizzaCustomizationPanel = ({
  lang,
  selectedSize,
  doughOptions,
  selectedDough,
  setSelectedDough,
  setDoughPrice,
  standardIngredients,
  selectedExtras,
  setSelectedExtras,
}) => {
  return (
    <div className="space-y-6">
      {doughOptions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">
            {getLocalizedText(t("ChooseCrust", lang))}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {doughOptions
              .filter((dough) => dough?.price?.[selectedSize] !== -1)
              .map((dough) => {
                const name = getLocalizedText(dough.name, lang);
                const price = dough?.price?.[selectedSize] ?? 0;
                const normalizedLang = lang.split("-")[0]
                const image = dough?.mediaGlobal?.[normalizedLang] || dough?.mediaGlobal?.az;
                console.log("lang:", lang);
                console.log("available keys:", Object.keys(dough.mediaGlobal));
                console.log("image URL:", dough?.mediaGlobal?.[lang]);

                return (
                  <button
                    key={dough._id}
                    onClick={() => {
                      setSelectedDough(name);
                      setDoughPrice(price);
                    }}
                    className={`relative p-4 border rounded flex flex-col items-center h-16 justify-end text-white  bg-center bg-cover ${
                      selectedDough === name
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundImage: `url(${image} )` }}
                  >
                    <div className="flex flex-col text-left absolute top-1 left-2 ">
                      <span className="text-sm  font-bold ">{name}</span>
                      <div className="text-xs text-white font-bold">
                        +{price.toFixed(2)} ₼
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {standardIngredients.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">
            {getLocalizedText(t("StandardIngredients", lang))}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {standardIngredients.map((ing) => {
              const name = getLocalizedText(ing.name, lang);
              const isIncluded = !selectedExtras.includes(ing._id);
              return (
                <label
                  key={ing._id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={isIncluded}
                    onChange={() =>
                      setSelectedExtras((prev) =>
                        isIncluded
                          ? [...prev, ing._id]
                          : prev.filter((id) => id !== ing._id)
                      )
                    }
                  />
                  {name}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaCustomizationPanel;
