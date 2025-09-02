import { useEffect, useState } from "react";
import { path } from "../../App";
import { useDispatch } from "react-redux";
import { addToCart, updateItem } from "../../store/cartSlice";
import { toast } from "react-hot-toast";
import { getLocalizedText } from "../../utils/getLocalizedText";
import { useTranslation } from "react-i18next";
import { normalizeLang } from "../../utils/normalizeLang";


const OfferModal = ({
  offer,
  onClose,
  loading,
  initialSelections,
  editIndex,
}) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [activeList, setActiveList] = useState(null);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const normalizedLang = normalizeLang(lang);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);

    if (initialSelections) setSelectedItems(initialSelections);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, initialSelections]);

  const handleSelect = (index, item) => {
    setSelectedItems((prev) => ({ ...prev, [index]: item }));
    setActiveList(null);
    toast.success(
      getLocalizedText("selectionAdded", i18n).replace(
        "{{name}}",
        getLocalizedText(item.name, i18n)
      )
    );
  };

  const handleAddCampaignToCart = () => {
    if (Object.keys(selectedItems).length < offer.dealItems.length) {
      toast.error(getLocalizedText("selectAllRequired", i18n));
      return;
    }

    const campaignItem = {
      id: offer._id,
      name: getLocalizedText(offer.name, i18n),
      image:
        offer.mediaDetail?.[normalizedLang] ||
        offer.mediaDetail?.az ||
        offer.mediaDetail,
      type: "campaign",
      selections: selectedItems,
      quantity: 1,
      price: parseFloat(offer.discountValue || offer.minimumPrice || 0),
    };

    if (typeof editIndex === "number") {
      dispatch(updateItem({ index: editIndex, item: campaignItem }));
      toast.success(
        getLocalizedText("campaignUpdated", i18n).replace(
          "{{name}}",
          campaignItem.name
        )
      );
    } else {
      dispatch(addToCart(campaignItem));
      toast.success(
        getLocalizedText("campaignAdded", i18n).replace(
          "{{name}}",
          campaignItem.name
        )
      );
    }

    onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[20] bg-white">
        <img
          src={`${path}loader.gif`}
          alt={getLocalizedText("loading", i18n)}
          className="w-32 h-32 object-contain"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-full sm:max-w-[1000px] rounded-xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto">
        <div className="p-4 sm:p-6 border-b relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl sm:text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-sm sm:text-2xl font-bold text-center pr-10">
            {getLocalizedText(offer.name, i18n)}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row max-h-[450px]">
            <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center relative overflow-y-auto">
              {typeof activeList !== "number" ? (
                offer.mediaDetail?.[normalizedLang] ||
                offer.mediaDetail?.az ||
                offer.mediaDetail ? (
                  <img
                    src={
                      offer.mediaDetail?.[normalizedLang] ||
                      offer.mediaDetail?.az ||
                      offer.mediaDetail
                    }
                    alt={getLocalizedText(offer.name, i18n)}
                    className="object-cover w-full h-full z-0"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="text-gray-700 text-center p-6 sm:p-8">
                    <div className="text-5xl sm:text-6xl mb-4">🍕</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {getLocalizedText(offer.name, i18n)}
                    </h3>
                    <p className="text-base sm:text-lg opacity-90">
                      {getLocalizedText(offer.description, i18n)}
                    </p>
                  </div>
                )
              ) : (
                <div className="w-full p-4 space-y-3 pt-4 sm:pt-6">
                  {offer.dealItems[activeList]?.allowedItems?.map((item, i) => {
                    const itemName = getLocalizedText(item.name, i18n);
                    const selectedName = getLocalizedText(
                      selectedItems[activeList]?.name,
                      i18n
                    );

                    return (
                      <label
                        key={i}
                        className={`flex items-center px-6 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                          selectedName === itemName
                            ? "bg-red-50 border border-red-200"
                            : "border border-transparent"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`deal-item-${activeList}`}
                          checked={selectedName === itemName}
                          onChange={() => handleSelect(activeList, item)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {item.mediaDetail?.[normalizedLang] && (
                            <img
                              src={item.mediaDetail[normalizedLang]}
                              alt={itemName}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-base sm:text-lg font-medium truncate">
                              {itemName}
                            </p>
                            {item.description && (
                              <p className="text-sm sm:text-base text-gray-500 line-clamp-2 sm:line-clamp-none">
                                {getLocalizedText(item.description, i18n)}
                              </p>
                            )}
                          </div>
                          <span className="text-sm sm:text-base text-gray-600">
                            {(item.price10 || item.price20 || 0).toFixed(2)} ₼
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="w-full sm:w-1/2 p-4 sm:p-6 bg-white overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                {offer.dealItems.map((dealItem, idx) => {
                  const selected = selectedItems[idx];
                  const categoryKey =
                    dealItem.defaultCategoryCode?.toLowerCase();

                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                          {categoryKey
                            ? getLocalizedText(categoryKey, i18n)
                            : getLocalizedText("product", i18n)}
                        </h4>
                      </div>
                      <button
                        onClick={() =>
                          setActiveList(activeList === idx ? null : idx)
                        }
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg hover:border-red-400 transition text-sm sm:text-base"
                      >
                        {getLocalizedText(selected?.name || "select", i18n)}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="text-base sm:text-lg">
              <span className="text-gray-600">
                {getLocalizedText("price", i18n)}:{" "}
              </span>
              <span className="font-bold text-red-600 text-lg sm:text-xl">
                {(offer.discountValue || offer.minimumPrice || 0).toFixed(2)} ₼
              </span>
            </div>
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-md text-sm sm:text-base"
              onClick={handleAddCampaignToCart}
            >
              {getLocalizedText("addToCart", i18n)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
