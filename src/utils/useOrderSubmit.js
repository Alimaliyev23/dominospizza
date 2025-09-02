import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../store/ordersSlice";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useOrderSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  const submitOrder = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      id: Math.floor(10000000 + Math.random() * 90000000),
      date: new Date().toISOString(),
      items: cartItems,
      total,
      status: "Hazırlanır",
      user: user?.name || "Qonaq",
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    toast.success(t("orderCreated", { id: order.id }));
    navigate("/trackingPage");
  };

  return submitOrder;
};

export default useOrderSubmit;
