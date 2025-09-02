import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { path } from "../App";
import { getLocalizedText } from "../utils/getLocalizedText";

const StickyNavbar = () => {
  const lang = useSelector((state) => state.lang.lang);
  const isVisible = useSelector((state) => state.scroll.showStickyNavbar);
  const cartItems = useSelector((state) => state.cart.items); 
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const visibilityClass = isHomePage ? "sm:block hidden" : "block";

  const menuItems = [
    {
      to: "/offers",
      img: "faizRed.webp",
      label: { az: "Kampaniyalar", en: "Offers", ru: "Акции" },
      showOnMobile: false,
    },
    {
      to: "/menu",
      img: "pizza.png",
      label: { az: "Pizza", en: "Pizza", ru: "Пицца" },
    },
    {
      to: "/breadmenu",
      img: "corek.png",
      label: { az: "Çörək", en: "Bread", ru: "Хлеб" },
    },
    {
      to: "/chickenmenu",
      img: "toyuq.png",
      label: { az: "Toyuq", en: "Chicken", ru: "Курица" },
    },
    {
      to: "/saladMenu",
      img: "salat.png",
      label: { az: "Salat", en: "Salad", ru: "Салат" },
    },
    {
      to: "/drinkMenu",
      img: "icki.png",
      label: { az: "İçki", en: "Drinks", ru: "Напитки" },
    },
    {
      to: "/sidesMenu",
      img: "sous.png",
      label: { az: "Sous", en: "Sauces", ru: "Соусы" },
    },
    {
      to: "/dessertMenu",
      img: "dondurma.png",
      label: { az: "Şirniyyat", en: "Dessert", ru: "Десерты" },
    },
  ];

  return (
    <div
      className={`${visibilityClass} top-20 sm:top-0 z-[49] bg-white sticky shadow-md transition-all overflow-hidden duration-300`}
    >
      <nav className="flex items-center justify-center sm:justify-between px-4 py-2 z-55">
        {isVisible ? (
          <Link to="/" className="hidden sm:block">
            <img
              src={`${path}Domino's_pizza_logo.svg.png`}
              className="w-15 h-15"
              alt="logo"
            />
          </Link>
        ) : (
          <div className="w-15 h-15" />
        )}

        <div className="flex justify-center items-center">
          <div className="flex lg:gap-12 gap-3 md:gap-10 overflow-hidden text-sm font-medium text-gray-700">
            {menuItems.map(({ to, img, label, showOnMobile = true }) => (
              <Link
                key={to}
                to={to}
                className={showOnMobile ? "" : "hidden sm:block"}
              >
                <img
                  src={`${path}${img}`}
                  alt={getLocalizedText(label, lang)}
                  className="h-10 w-10"
                />
                <span>{getLocalizedText(label, lang)}</span>
              </Link>
            ))}
          </div>
        </div>

        {isVisible ? (
          <Link
            to="/cart"
            className="hidden sm:flex flex-col items-center justify-center p-3 relative"
          >
            <div className="relative">
              <img
                src={`${path}cart-icon.webp`}
                className="w-10 h-10"
                alt={getLocalizedText(
                  { az: "Səbət", en: "Cart", ru: "Корзина" },
                  lang
                )}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </span>
              )}
            </div>
            <p>
              {getLocalizedText(
                { az: "Səbət", en: "Cart", ru: "Корзина" },
                lang
              )}
            </p>
          </Link>
        ) : (
          <div className="w-10 h-10" />
        )}
      </nav>
    </div>
  );
};

export default StickyNavbar;
