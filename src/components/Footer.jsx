import { path } from "../App";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const certImages = [
    "halal.png",
    "30deq-catdirilma-zemaneti-AZ-304b9dda.png",
    "sobadan.png",
    "happycost.png",
  ];

  const footerLinks = [
    { key: "aboutDomino" },
    { key: "offersComplaints" },
    { key: "terms" },
    { key: "privacy" },
    { key: "contact" },
    { key: "joinUs" },
  ];

  const icons = [
    "googlePlay.png",
    "app-store.svg",
    "app-gallery.png",
    "facebook.png",
    "instagram.png",
    "youtube.png",
    "viza.png",
    "master.png",
    "nagdOdenis.png",
    "kartOdenis.png",
  ];

  return (
    <div className="hidden md:block bg-gray-100 py-10">
      <div className="flex justify-center flex-wrap gap-6 mb-8">
        {certImages.map((img, i) => (
          <img
            key={i}
            src={`${path}${img}`}
            alt={`cert-${i}`}
            className="w-24 h-8 sm:w-28 sm:h-9 md:w-42 md:h-15 object-contain"
          />
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700 font-semibold mb-8">
        {footerLinks.map((item, i) => (
          <span
            key={item.key}
            className={`pr-4 ${
              i < footerLinks.length - 1 ? "border-r border-gray-400" : ""
            }`}
          >
            {t(item.key)}
          </span>
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {icons.map((img, i) => (
          <img
            key={i}
            src={`${path}${img}`}
            alt={`icon-${i}`}
            className="w-20 h-7 sm:w-24 sm:h-8 md:w-28 md:h-9 object-contain cursor-pointer"
          />
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        © 2019–2025 Alim TECH Prime Private Limited — {t("allRightsReserved")}
      </div>
    </div>
  );
};

export default Footer;
