import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { toast } from "react-hot-toast";
import { getLocalizedText } from "../../utils/getLocalizedText";
import { useTranslation } from "react-i18next";
import { normalizeLang } from "../../utils/normalizeLang";
import { getCartItemImageSrc } from "../../utils/getCartItemImageSrc";

const CartItem = ({ item, index, onEdit, handleQuantityChange = () => {} }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const lang = normalizeLang(i18n.language);

  const price =
    typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
  const quantity =
    typeof item.quantity === "number"
      ? item.quantity
      : parseInt(item.quantity) || 1;

  const handleRemove = () => {
    const itemName = getLocalizedText(item.name, lang);
    dispatch(removeFromCart(index));
    toast(getLocalizedText("itemRemoved", lang).replace("{{name}}", itemName), {
      icon: "🗑️",
      style: { backgroundColor: "#003752", color: "#fff" },
    });
  };

  const imgSrc = getCartItemImageSrc(item, lang);

  const renderText = (value) => {
    const localized = getLocalizedText(value, lang);
    return typeof localized === "string" ? localized : "";
  };

  const renderVariant = () => {
    const variant =
      item.selectedVariant?.sizeName || item.selectedVariant?.flavourName;
    return renderText(variant);
  };

  const renderSizeAndCut = () => {
    const details = [];
    
    // Size məlumatı
    if (item.size) {
      details.push(`${t("size")}: ${renderText(item.size)}`);
    }
    
    // Cut məlumatı
    if (item.cut) {
      details.push(`${t("cut")}: ${renderText(item.cut)}`);
    }
    
    // Dough məlumatı
    if (item.dough) {
      details.push(`${t("dough")}: ${renderText(item.dough)}`);
    }
    
    return details.join(" • ");
  };

  const renderSelections = () =>
    Object.values(item.selections || {}).map((sel, i) => (
      <li key={i}>• {renderText(sel.name)}</li>
    ));

  const renderName = () => renderText(item.name);

  const quantityControls = (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        −
      </button>
      <span className="px-2">{quantity}</span>
      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );

  if (item.type === "campaign") {
    return (
      <div className="flex justify-between items-start border-b py-3 gap-4">
        <div className="flex items-start gap-3">
          <img
            src={imgSrc}
            alt={renderName()}
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <p className="font-semibold text-[#003752] text-sm sm:text-base">
              {renderName()}
            </p>
            {renderSizeAndCut() && (
              <p className="text-sm text-blue-600 font-medium mt-1">
                {renderSizeAndCut()}
              </p>
            )}
            <ul className="text-sm text-gray-500 mt-1 space-y-1">
              {renderSelections()}
            </ul>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => onEdit(item, index)}
                className="text-blue-800 hover:underline text-sm"
              >
                {getLocalizedText("edit", lang)}
              </button>
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
        <p className="font-bold text-sm sm:text-base whitespace-nowrap">
          {price.toFixed(2)} ₼
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div className="flex items-center gap-3">
        <img
          src={imgSrc}
          alt={renderName()}
          className="w-16 h-16 rounded object-cover"
        />
        <div>
          <p className="font-semibold text-[#003752]">{renderName()}</p>
          {item.selectedVariant && (
            <p className="text-sm text-gray-500">{renderVariant()}</p>
          )}
          {renderSizeAndCut() && (
            <p className="text-sm text-blue-600 font-medium mt-1">
              {renderSizeAndCut()}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <label className="text-sm">{t("quantity")}:</label>
            {quantityControls}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-bold">{(price * quantity).toFixed(2)} ₼</p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default CartItem;
