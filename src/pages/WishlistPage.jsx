import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DominoAPI from "../services/DominoAPI";
import ProductCard from "../components/ProductCard";
import PizzaCard from "../components/PizzaCard";
import { path } from "../App";
import { useTranslation } from "react-i18next";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";

const api = new DominoAPI();

const WishlistPage = () => {
  const { t, i18n } = useTranslation();
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const types = [
          "bread",
          "chicken",
          "pizza",
          "salad",
          "sides",
          "dessert",
          "drink",
        ];

        const endpoints = types.map((type) => api.getMenuByType(type));
        const responses = await Promise.allSettled(endpoints);

        const allProducts = responses
          .filter((res) => res.status === "fulfilled")
          .flatMap((res) => res.value?.data || []);

        const favoriteProducts = allProducts.filter((p) =>
          wishlist.includes(p._id)
        );

        setProducts(favoriteProducts);
      } catch (err) {
        console.error("Wishlist loading failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, [wishlist]);

  const handleAddToCart = (product, variant) => {
    const lang = i18n.language;

    const name = product.name?.[lang] ?? product.name?.en ?? "Product";

    const image =
      variant?.mediaGlobal?.[lang] ??
      variant?.mediaDetail?.[lang] ??
      product.mediaGlobal?.[lang] ??
      product.mediaDetail?.[lang] ??
      `${path}placeholder.png`;

    const price =
      variant?.price10 ??
      product.price?.[lang] ??
      product.price?.en ??
      product.sizes?.defaultSize ??
      0;

    dispatch(
      addToCart({
        id: product._id,
        name,
        image,
        price,
        quantity: 1,
      })
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
        <img
          src={`${path}loader.gif`}
          alt="Loading..."
          className="w-32 h-32 object-contain"
        />
      </div>
    );
  }

  return (
    <section className="px-4 py-6 mt-16 mb-20">
      <h2 className="text-2xl font-bold text-[#003752] mb-6 text-center">
        {t("wishlist")}
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          {t("wishlistEmpty")}
        </div>
      ) : (
        <div className="grid justify-items-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => {
            const isPizza = product.categoryCode === "Pizza";
            const variantMode =
              product.categoryCode === "Drinks" ? "drink" : "default";

            return isPizza ? (
              <PizzaCard
                key={product._id}
                item={product}
                lang={i18n.language}
              />
            ) : (
              <ProductCard
                key={product._id}
                product={product}
                variantMode={variantMode}
                onAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
