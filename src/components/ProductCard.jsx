import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { path } from "../App";
import toast from "react-hot-toast";
import { getLocalizedText } from "../utils/getLocalizedText";
import { t } from "i18next";

const ProductCard = ({ product, variantMode, onAddToCart }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const lang = useSelector((state) => state.lang.lang);
  const isFavorite = wishlist.includes(product._id);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const prevWishlistRef = useRef(wishlist);

  useEffect(() => {
    if (variantMode === "drink" && product.variants?.length) {
      const defaultVariant =
        product.variants.find((v) => v.defaultDrink) || product.variants[0];
      setSelectedVariant(defaultVariant);
    } else {
      setSelectedVariant(null);
    }
  }, [product._id, variantMode]);

  useEffect(() => {
    const prevWishlist = prevWishlistRef.current;
    const wasFavorite = prevWishlist.includes(product._id);
    const isNowFavorite = wishlist.includes(product._id);

    if (wasFavorite !== isNowFavorite) {
      const msgKey = isNowFavorite ? "wishlistAdded" : "wishlistRemoved";
      const msg = getLocalizedText(t(msgKey, lang));

      if (isNowFavorite) {
        toast.success(msg, { icon: "❤️" });
      } else {
        toast(msg);
      }
    }

    prevWishlistRef.current = wishlist;
  }, [wishlist, product._id]);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({ id: product._id, userId: user?.id }));
  };

  const getVariantLabel = (variant) => {
    return (
      variant.sizeName?.[lang] ||
      variant.flavourName?.[lang] ||
      variant.sizeName?.en ||
      variant.flavourName?.en ||
      "Variant"
    );
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant);

    const msg = getLocalizedText("cartAdded", lang);
    toast.success(t(msg, { icon: "🛒" }));
  };

  const imageUrl =
    selectedVariant?.mediaGlobal?.[lang] ||
    selectedVariant?.mediaDetail?.[lang] ||
    product.mediaGlobal?.[lang] ||
    product.mediaDetail?.[lang] ||
    `${path}placeholder.png`;

  const name = product.name?.[lang] || product.name?.en || "Məhsul";

  const description =
    product.description?.[lang] || product.description?.en || null;

  const price =
    variantMode === "drink"
      ? selectedVariant?.price10 ?? null
      : product.sizes?.defaultSize ?? null;

  const hasVariants = variantMode === "drink" && product.variants?.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm h-full flex flex-col items-center relative hover:scale-105 duration-300">
      <button
        onClick={handleToggleWishlist}
        aria-label="Sevimlilərə əlavə et"
        className={`absolute top-3 right-3 transition ${
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

      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 object-contain mb-3"
      />

      <h3 className="text-lg font-semibold text-center mb-1 text-[#003752]">
        {name}
      </h3>

      {description && (
        <p className="text-sm text-gray-600 text-center mb-3">{description}</p>
      )}

      {hasVariants && (
        <div className="w-full mb-3">
          <div className="flex justify-center flex-wrap gap-2">
            {product.variants.map((variant) => {
              const label = getVariantLabel(variant);
              return (
                <button
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-1 rounded-full border transition ${
                    selectedVariant?._id === variant._id
                      ? "bg-[#0078AC] text-white border-[#091f25]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full flex justify-between items-center gap-5 mt-auto pt-4">
        <div className="text-lg font-bold text-[#08789E]">
          {price !== null ? `${price.toFixed(2)} ₼` : "—"}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={price === null}
          className={`px-5 py-2 rounded-md font-semibold transition-all duration-150
    ${
      price !== null
        ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 active:translate-y-0.5 active:scale-95 shadow-md active:shadow-inner"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
        >
          {lang === "az"
            ? "SƏBƏTƏ ƏLAVƏ ET"
            : lang === "en"
            ? "ADD TO CART"
            : "ДОБАВИТЬ В КОРЗИНУ"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
