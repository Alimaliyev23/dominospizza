import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { openModal } from "../store/pizzaModalSlice";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/getLocalizedText";
import { getShortDescription } from "../utils/getShortDescription";
import { path } from "../App";

const PizzaCard = ({ item }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  const isFavorite = wishlist.includes(item._id);

  const name = getLocalizedText(item.name, lang);
  const description = getLocalizedText(item.description, lang);
  const image =
    item.mediaDetail?.[lang] || item.mediaDetail?.az || `${path}default.png`;

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist({ id: item._id, userId: user?.id }));
  };

  const handleOpenModal = () => {
    dispatch(openModal(item));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(openModal(item));
  };

  return (
    <div
      onClick={handleOpenModal}
      className="bg-white text-black w-full h-full max-w-sm rounded-xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
    >
      <div className="relative flex justify-center items-center h-48 overflow-hidden bg-white">
        <div className="w-48 h-48 rounded-full overflow-hidden scale-[1.2]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {item.isNew && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded shadow">
            {t("new")}
          </div>
        )}

        {item._id && (
          <button
            onClick={handleToggleWishlist}
            aria-label={t("wishlistAdded")}
            className={`absolute top-2 right-2 transition ${
              isFavorite ? "text-red-600" : "text-gray-300 hover:text-red-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="px-5 py-4 sm:px-6 sm:py-5 min-h-[160px] flex flex-col justify-between">
        <div>
          <h3 className="uppercase font-bold text-[clamp(1rem,2vw,1.2rem)] text-gray-800 leading-tight">
            {name}
          </h3>
          {description && (
            <p className="text-gray-600 text-sm mt-2 leading-snug line-clamp-3">
              {getShortDescription(description)}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-600 font-bold text-base">
            {item.sizes?.small?.toFixed(2) ?? "0.00"} ₼{" "}
            <span className="text-gray-500 text-sm">{t("priceFrom")}</span>
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
