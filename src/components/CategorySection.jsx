import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import PizzaCard from "./PizzaCard";
import HalfHalfCard from "./HalfHalf/HalfHalfCard";

const CategorySection = ({
  category,
  products,
  lang,
  onInView,
  isMobile,
  onHalfHalfClick,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: "-100px 0px -200px 0px",
    triggerOnce: false,
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (!isMobile && inView) {
      onInView(category);
    }
  }, [inView, category, onInView, isMobile]);

  const filteredProducts = products.filter(
    (item) => item.subCategory?.toLowerCase() === category.toLowerCase()
  );

  return (
    <section
      id={category}
      ref={ref}
      data-category={category}
      className="mb-12 scroll-mt-[140px]"
    >
      <h2 className="text-2xl font-bold text-center mb-4 uppercase">
        {t(`categories${category.charAt(0).toUpperCase() + category.slice(1)}`)}
      </h2>
      <div className="grid place-items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {category === "half_half" ? (
          <HalfHalfCard onClick={onHalfHalfClick} />
        ) : (
          filteredProducts.map((item, idx) => (
            <PizzaCard
              key={item.id || idx}
              item={item}
              lang={lang}
              showFromText={true}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CategorySection;
