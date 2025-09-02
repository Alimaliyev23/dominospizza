import React from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../../utils/getLocalizedText";
import { toast } from "react-hot-toast";
import { t } from "i18next";

const QuantityAndActions = ({
  quantity,
  onQuantityChange,
  totalPrice,
  onAddToCart,
  productName,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handleQuantityChange = (newQty) => {
    onQuantityChange(newQty);
    toast.success(
      getLocalizedText(t("quantityUpdated", lang))
        .replace("{{name}}", productName)
        .replace("{{qty}}", newQty)
    );
  };

  const handleAddToCart = () => {
    onAddToCart();
    toast.success(
      getLocalizedText(t("addedToCart", lang)).replace("{{name}}", productName)
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label={getLocalizedText("Decrease", lang)}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label={getLocalizedText("Increase", lang)}
          >
            +
          </button>
        </div>
        <div className="text-xl font-bold text-red-600">
          {totalPrice.toFixed(2)} ₼
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        {getLocalizedText(t("AddToCart", lang))}
      </button>
    </div>
  );
};

export default QuantityAndActions;
