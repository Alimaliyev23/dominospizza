import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { loadFavorites } from "../store/favoritesSlice";
import { path } from "../App";
import { useTranslation } from "react-i18next";

const LoginOverlay = ({ onClose }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleLogin = () => {
    if (!phone || phone.length < 10 || !name || !surname) return;

    const userData = {
      id: phone,
      name,
      surname,
      phone,
    };

    dispatch(login(userData));
    dispatch(loadFavorites(userData.id));
    handleClose();
  };

  const modalVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={`${path}Dominos Pizza - Sevimli pizzanizi sein Online sifari edin.mp4`}
          />

          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute bottom-0 left-0 right-0 z-50">
            <div className="bg-black/80 backdrop-blur-md text-white rounded-t-2xl p-6 h-screen overflow-y-auto">
              <button
                onClick={handleClose}
                className="absolute top-4 right-6 text-white text-3xl"
              >
                ✕
              </button>

              <Link to="/" className="flex justify-center mt-14 mb-4">
                <img
                  src={`${path}logo.png`}
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <h1 className="text-2xl font-bold mb-4 text-center">
                {t("loginPrompt")}
              </h1>

              <div className="max-w-sm mx-auto mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {t("name")}:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-500 rounded-lg focus:outline-none"
                />
              </div>

              <div className="max-w-sm mx-auto mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {t("surname")}:
                </label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-500 rounded-lg focus:outline-none"
                />
              </div>

              <div className="max-w-sm mx-auto mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {t("phone")}:
                </label>
                <PhoneInput
                  defaultCountry="az"
                  value={phone}
                  onChange={setPhone}
                  inputClassName="w-full px-3 py-2 bg-black text-white border border-gray-500 rounded-lg focus:outline-none"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "bg-black text-white border-r border-gray-600 px-2",
                  }}
                />
              </div>

              <h4 className="text-center mb-4">{t("loginDescription")}</h4>

              <div className="flex justify-center">
                <button
                  onClick={handleLogin}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold w-full max-w-sm"
                >
                  {t("continue")}
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-300 max-w-sm mx-auto text-center">
                {t("termsAgreement")}{" "}
                <a href="#" className="underline">
                  {t("terms")}
                </a>{" "}
                {t("and")}{" "}
                <a href="#" className="underline">
                  {t("privacy")}
                </a>{" "}
                {t("acceptance")}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginOverlay;
