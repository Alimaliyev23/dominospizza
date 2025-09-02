import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";

const DealItemSelector = ({ dealItem, index, onSelect }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const category = dealItem.defaultCategoryCode;
  const normalized = category?.toLowerCase();

  const hasItem = dealItem.item && dealItem.item.name;
  const products = dealItem.products || [];

  const categoryKeyMap = {
    pizza: "pizza",
    drink: "drinks",
    bread: "bread",
    simit: "bread",
  };

  const renderTitle = () => {
    if (dealItem?.name) return getLocalizedText(dealItem.name, i18n);

    switch (normalized) {
      case "pizza":
        return getLocalizedText("selectPizza", i18n);
      case "drink":
        return getLocalizedText("selectDrink", i18n);
      case "bread":
      case "simit":
        return getLocalizedText("selectBread", i18n);
      default:
        return getLocalizedText("select", i18n);
    }
  };

  const handleClick = (productOrItem) => {
    const selected = { ...dealItem, selectedProduct: productOrItem };
    onSelect(selected);
  };

  const categoryLabel = getLocalizedText(
    categoryKeyMap[normalized] || "product",
    i18n
  );

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">{renderTitle()}</h4>

      {hasItem ? (
        <button
          onClick={() => handleClick(dealItem.item)}
          className="border px-3 py-5 rounded hover:bg-gray-100 transition text-sm w-full text-left"
        >
          {getLocalizedText(dealItem.item.name, i18n)}
        </button>
      ) : products.length === 0 ? (
        <p className="text-gray-500">
          {getLocalizedText("noSelectionAvailable", i18n)}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((productId) => (
            <button
              key={productId}
              onClick={() => handleClick(productId)}
              className="border px-3 py-2 rounded hover:bg-gray-100 transition text-sm"
            >
              {categoryLabel} #{productId}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealItemSelector;
