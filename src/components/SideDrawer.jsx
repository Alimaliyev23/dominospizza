import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { path } from "../App";
import LoginOverlay from "./LoginOverlay";
import { getLocalizedText } from "../utils/getLocalizedText";
import LanguageSwitcher from "./LanguageSwitcher";

const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black opacity-30 z-40"
          />

          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="h-full flex flex-col justify-between">
              <div className="p-4 justify-center flex items-center flex-col border-b h-60">
                <div className="flex flex-col items-center gap-5">
                  <img
                    src={`${path}profilPic.jpg`}
                    alt={getLocalizedText("avatar", lang)}
                    className="w-20 h-20 rounded-full shadow-2xl"
                  />
                  <div className="flex items-center flex-col gap-2">
                    {isLoggedIn ? (
                      <>
                        <p className="text-sm text-gray-800 font-semibold">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 text-center">
                          {getLocalizedText("loginPrompt", lang)}
                        </p>
                        <button
                          onClick={() => setShowLogin(true)}
                          className="mt-1 bg-[#3F99C0] text-white text-sm font-bold px-4 py-1 rounded w-1/2"
                        >
                          {getLocalizedText("login", lang)}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <FaUser />
                    <span>{getLocalizedText("profile", lang)}</span>
                  </Link>
                  <Link
                    to="/wishlistPage"
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <FaHeart />
                    <span>{getLocalizedText("wishlist", lang)}</span>
                  </Link>

                  <div
                    className="mt-2 "
                    style={{
                      borderBottom: "2px solid #ccc",
                      paddingBottom: "15px",
                    }}
                  >
                    <LanguageSwitcher />
                  </div>

                  <li className="text-gray-700">
                    {getLocalizedText("aboutDomino", lang)}
                  </li>
                  <li className="text-gray-700">
                    {getLocalizedText("offersComplaints", lang)}
                  </li>
                  <li className="text-gray-700">
                    {getLocalizedText("terms", lang)}
                  </li>
                  <li className="text-gray-700">
                    {getLocalizedText("privacy", lang)}
                  </li>
                  <li className="text-gray-700">
                    {getLocalizedText("contact", lang)}
                  </li>
                  <li className="text-gray-700">
                    {getLocalizedText("joinUs", lang)}
                  </li>
                </ul>
              </div>

              <div className="border-t px-4 py-3 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xl text-gray-700">
                    <FaFacebook className="w-8 h-8" />
                    <FaInstagram className="w-8 h-8" />
                    <FaYoutube className="w-8 h-8" />
                  </div>
                  <img
                    src={`${path}6600.png`}
                    alt="6600"
                    className="w-18 h-12"
                  />
                </div>

                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 font-semibold text-sm mt-2 self-start"
                  >
                    <FaSignOutAlt />
                    <span>{getLocalizedText("logout", lang)}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default SideDrawer;
