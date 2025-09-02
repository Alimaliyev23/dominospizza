import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openHalfHalfModal } from "../store/halfHalfSlice";
import DominoAPI from "../services/DominoAPI";
import SubNav from "../components/SubNav";
import CategorySection from "../components/CategorySection";
import PizzaModal from "../components/PizzaModal/ModalLayout";
import HalfHalfModal from "../components/HalfHalf/HalfHalfModal";
import { path } from "../App";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const api = new DominoAPI();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("premium");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  const isHalfHalfOpen = useSelector((state) => state.halfHalf.isOpen);

  const categoryKeys = ["premium", "special", "favorites", "half_half"];

  useEffect(() => {
    async function fetchData() {
      try {
        const pizzas = await api.getMenuByType("pizza");
        setProducts(pizzas.data || []);
      } catch (error) {
        console.error("Məlumat yüklənmədi", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-category]");
      let current = selectedCategory;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.dataset.category;
        }
      });

      setSelectedCategory(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, selectedCategory]);

  const handleHalfHalfClick = () => {
    dispatch(openHalfHalfModal());
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
    <>
      <SubNav
        categories={categoryKeys}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="px-2 sm:px-4 md:px-6 py-6 mt-16 uppercase">
        {categoryKeys.map((category) => (
          <CategorySection
            key={category}
            category={category}
            products={products}
            lang={lang}
            onInView={setSelectedCategory}
            isMobile={isMobile}
            onHalfHalfClick={handleHalfHalfClick}
          />
        ))}
      </section>
      <PizzaModal />
      {isHalfHalfOpen && <HalfHalfModal pizzas={products} />}
    </>
  );
};

export default Menu;
