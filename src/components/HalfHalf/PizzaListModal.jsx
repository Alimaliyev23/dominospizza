import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";

const PizzaListModal = ({ pizzas, onSelect }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{t("ChoosePizza")}</h2>
        <div className="grid grid-cols-2 gap-4">
          {pizzas.map((pizza) => (
            <button
              key={pizza._id}
              onClick={() => onSelect(pizza)}
              className="border rounded p-2 hover:border-blue-500"
            >
              <img
                src={pizza.mediaDetail?.[lang]}
                className="w-full h-24 object-cover"
                alt={getLocalizedText(pizza.name, lang)}
              />
              <p className="mt-2 text-sm font-semibold">
                {getLocalizedText(pizza.name, lang)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaListModal;
