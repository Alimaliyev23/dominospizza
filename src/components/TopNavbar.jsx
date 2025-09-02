import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../App";
import SideDrawer from "./SideDrawer";
import LoginOverlay from "./LoginOverlay";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const TopNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const items = useMemo(() => {
    const baseItems = [
      { to: "/mybranches", img: "dominoHome.png", label: t("branches") },
      { to: "/trackingPage", img: "scooter.png", label: t("tracking") },
      isLoggedIn
        ? { to: "/profile", img: "avatar.png", label: user?.name }
        : {
            to: "#login",
            img: "avatar.png",
            label: t("login"),
            isButton: true,
          },
      {
        to: "/cart",
        img: "cart.svg",
        label: t("cart"),
        count: cart.length > 0 ? cart.length : null,
      },
    ];

    if (isLoggedIn) {
      baseItems.unshift({
        to: "/wishlistPage",
        img: "like.png",
        label: t("wishlist"),
        count: wishlist.length > 0 ? wishlist.length : null,
      });
    }

    return baseItems;
  }, [t, isLoggedIn, user?.name, cart.length, wishlist.length]);

  return (
    <>
      <div className="bg-white sticky top-0 z-[60] sm:static pb-5 mb-3 pt-5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="md:hidden">
            <SideDrawer />
          </div>

          <Link to="/" className="flex-1 flex justify-center md:justify-start">
            <img
              src={`${path}logo.png`}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2 mx-5">
            <LanguageSwitcher />

            <Link
              to="/cart"
              className="md:hidden flex flex-col items-center ml-4 relative"
            >
              <img src={`${path}cart.svg`} alt="Cart" className="h-8 w-8" />
              {cart.length > 0 && (
                <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
              <span className="text-xs">{t("cart")}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <ul className="flex gap-6 text-sm font-medium text-gray-700">
              {items.map((item, i) => (
                <li key={i} className="flex flex-col items-center gap-2">
                  {item.isButton ? (
                    <button onClick={() => setShowLogin(true)}>
                      <div className="relative">
                        <img
                          src={`${path}${item.img}`}
                          alt={item.label}
                          className="h-10 w-10"
                        />
                        {item.count && (
                          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {item.count > 99 ? "99+" : item.count}
                          </span>
                        )}
                      </div>
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link to={item.to}>
                      <div className="relative">
                        <img
                          src={`${path}${item.img}`}
                          alt={item.label}
                          className="h-10 w-10 m-auto"
                        />
                        {item.count && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {item.count > 99 ? "99+" : item.count}
                          </span>
                        )}
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default TopNavbar;
