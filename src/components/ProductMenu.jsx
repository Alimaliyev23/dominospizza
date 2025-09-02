import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { path } from "../App";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductMenu = ({ fetchFunction, lang = "az", variantMode }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFunction();
        setProducts(response?.data || []);
      } catch (error) {
        console.error("Məhsullar yüklənmədi", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction]);

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
    <section className="px-2 sm:px-4 md:px-6 py-6 mt-16 flex justify-center mb-20">
      <div className="grid min-h-[390px] min-w-[325px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((item, idx) => (
          <ProductCard
            key={item.id || idx}
            product={item}
            lang={lang}
            variantMode={variantMode}
            onAddToCart={(product, selectedVariant) => {
              dispatch(
                addToCart({
                  id: product._id,
                  name: product.name?.[lang] || product.name?.en || "Məhsul",
                  image:
                    selectedVariant?.mediaGlobal?.[lang] ||
                    selectedVariant?.mediaDetail?.[lang] ||
                    product.mediaGlobal?.[lang] ||
                    product.mediaDetail?.[lang] ||
                    `${path}placeholder.png`,
                  price:
                    variantMode === "drink"
                      ? selectedVariant?.price10 ?? 0
                      : product.sizes?.defaultSize ?? 0,
                  selectedVariant: selectedVariant || null,
                  quantity: 1,
                })
              );
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductMenu;
