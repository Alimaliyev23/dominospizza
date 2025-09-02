import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { path } from "../App";
import { removeOrder } from "../store/ordersSlice";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const TrackingPage = () => {
  const orders = useSelector((state) => state.orders.list);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedOrder =
    orders.length === 1
      ? orders[0]
      : orders.find((order) => order.id === selectedOrderId);

  const handleCancel = (id) => {
    dispatch(removeOrder(id));
    toast.error(t("orderCancelled", { id }));
    if (selectedOrderId === id) setSelectedOrderId(null);
  };

  const renderSafeText = (value) =>
    typeof value === "string"
      ? value
      : typeof value === "object"
      ? ""
      : `${value}`;

  const renderSafePrice = (price, quantity = 1) => {
    const p = typeof price === "number" ? price : parseFloat(price) || 0;
    const q = typeof quantity === "number" ? quantity : parseInt(quantity) || 1;
    return (p * q).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <img src={`${path}izleme.png`} alt="" className="mb-10" />

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <img
            src={`${path}no-tracking-orders.png`}
            alt="No orders"
            className="w-40 h-40 object-contain mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">{t("noOrders")}</p>
        </div>
      ) : orders.length === 1 || selectedOrder ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
          <button
            onClick={() => handleCancel(selectedOrder.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
            title={t("cancel")}
          >
            ❌
          </button>
          <img
            src={`${path}scooter.png`}
            alt="Scooter"
            className="w-32 h-32 object-contain mb-4 mx-auto"
          />
          <p className="text-lg font-semibold text-gray-700 mb-2">
            {t("orderNumber")}: {selectedOrder.id}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {t("status")}: {renderSafeText(selectedOrder.status)}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {t("total")}: {renderSafePrice(selectedOrder.total)} ₼
          </p>

          <ul className="text-sm text-gray-700 mt-4 space-y-3">
            {selectedOrder.items.map((item, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="font-semibold">
                  {renderSafeText(item.name)} × {item.quantity} —{" "}
                  {renderSafePrice(item.price, item.quantity)} ₼
                </div>
                {item.extras?.length > 0 && (
                  <ul className="ml-4 list-disc text-xs text-gray-500 mt-1">
                    <h4 className="font-bold text-md">İçindəkilər</h4>
                    {item.extras.map((extra, i) => (
                      <li key={i}>{renderSafeText(extra.name)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {orders.length > 1 && (
            <button
              onClick={() => setSelectedOrderId(null)}
              className="mt-6 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
            >
              🔙 {t("back")}
            </button>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="relative bg-white p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedOrderId(order.id)}
            >
              <p className="font-semibold text-[#D2112C]">
                {t("orderNumber")}: {order.id}
              </p>
              <p className="text-sm text-gray-600">
                {t("total")}: {renderSafePrice(order.total)} ₼
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(order.id);
                }}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
                title={t("cancel")}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
