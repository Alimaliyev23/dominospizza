import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const SubNav = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [topValue, setTopValue] = useState(190);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setTopValue(isMobile ? 150 : 95);
      } else {
        setTopValue(isMobile ? 140 : 190);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const formatCategoryKey = (cat) => {
    const camel = cat
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return `categories${camel}`;
  };

  return (
    <div
      id="SubNav"
      className="fixed left-0 w-full bg-white z-40 transition-all duration-200"
      style={{ top: `${topValue}px` }}
    >
      <ul className="flex gap-2 sm:gap-5 flex-wrap justify-center uppercase font-bold text-[9px] sm:text-sm md:text-lg my-5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <li
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const el = document.getElementById(cat);
                if (el) {
                  const yOffset = -(isMobile ? 150 : 95);
                  const y =
                    el.getBoundingClientRect().top + window.scrollY + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className={`cursor-pointer select-none transition-colors duration-200 ${
                isSelected
                  ? isMobile
                    ? "text-red-600"
                    : "text-red-500"
                  : "text-gray-700"
              }`}
            >
              {t(formatCategoryKey(cat))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubNav;
