import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../store/langSlice";
import i18n from "i18next";
import toast from "react-hot-toast";
import { AZ, GB, RU } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.lang.lang);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleChangeLang = (newLang) => {
    dispatch(setLang(newLang));
    i18n.changeLanguage(newLang);
    toast.success(t("languageChanged"));
    setOpen(false);
  };

  const options = [
    {
      code: "az",
      label: "AZE",
      icon: <AZ className="w-5 h-4 rounded shadow" />,
    },
    {
      code: "en",
      label: "ENG",
      icon: <GB className="w-5 h-4 rounded shadow" />,
    },
    {
      code: "ru",
      label: "RUS",
      icon: <RU className="w-5 h-4 rounded shadow" />,
    },
  ];

  const current = options.find((opt) => opt.code === currentLang);

  return (
    <div className="relative w-32">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 border rounded bg-white shadow hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          {current?.icon}
          <span className="text-sm font-semibold text-gray-700">
            {current?.label}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
          {options.map(({ code, label, icon }) => (
            <li
              key={code}
              onClick={() => handleChangeLang(code)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {icon}
              <span className="text-sm text-gray-700 font-medium">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
