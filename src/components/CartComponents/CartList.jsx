import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { getAssetUrl } from "../../App";
import { useTranslation } from "react-i18next";

const CartList = ({ onEdit, handleQuantityChange = () => {} }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const { t } = useTranslation();

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <img src={getAssetUrl("empty-cart.webp")} alt="Empty Cart" />
        <p className="mt-4 font-semibold text-lg text-gray-700">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <h2 className="text-lg font-bold mb-4">{t("cartTitle")}</h2>
      {cartItems.map((item, idx) => (
        <CartItem
          key={idx}
          item={item}
          index={idx}
          onEdit={onEdit}
          handleQuantityChange={(newQty) => handleQuantityChange(idx, newQty)}
        />
      ))}
    </div>
  );
};

export default CartList;
  