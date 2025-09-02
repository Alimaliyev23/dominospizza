import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { path } from "../App";
const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#007EB1] uppercase tracking-wide">
            {t("mobileAppTitle")}
          </h2>
          <h3 className="text-2xl lg:text-5xl font-bold text-red-600 leading-snug">
            {t("fastDelivery")}
          </h3>
          <img src={`${path}xett.webp`} alt="xett" className="w-32 md:w-40" />
          <p className="text-gray-500 font-semibold text-sm md:text-base leading-relaxed uppercase">
            {t("choosePizza")}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {["googlePlay.png", "app-store.svg", "app-gallery.png"].map(
              (img, i) => (
                <div
                  key={i}
                  className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 cursor-pointer"
                >
                  <img
                    src={`${path}${img}`}
                    className="w-full h-full object-cover"
                    alt={img}
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-end">
          <img
            src={`${path}dominos-banner-download-app-9f944170.webp`}
            alt="Dominos App Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#007EB1] uppercase tracking-wide">
            {t("trackingTitle")}
          </h2>
          <h3 className="text-2xl lg:text-5xl font-bold text-red-600 leading-snug">
            {t("trackingSubtitle")}
          </h3>
          <p className="text-gray-500 font-semibold text-sm md:text-base leading-relaxed uppercase">
            {t("trackingDesc")}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/TrackingPage" className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 flex items-center justify-center gap-2 rounded bg-red-500 text-white hover:bg-red-600 transition">
              <img src={`${path}konum.svg`} className="w-5 h-5" alt="icon" />
              <span className="uppercase text-sm font-bold">
                {t("trackNow")}
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-end">
          <img
            src={`${path}mobile-store-tracking-banner-2c6882d7.webp`}
            alt="Dominos App Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-10">
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-end">
          <img
            src={`${path}earn-coins-9011d4f3.webp`}
            alt="Dominos Rewards"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#007EB1] uppercase tracking-wide">
            {t("rewardsTitle")}
          </h2>
          <h3 className="text-2xl lg:text-5xl font-bold text-red-600 leading-snug">
            {t("rewardsSubtitle")}
          </h3>
          <p className="text-gray-500 font-semibold text-sm md:text-base leading-relaxed uppercase">
            {t("rewardsDesc")}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/menu" className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 flex items-center justify-center gap-2 rounded bg-red-500 text-white hover:bg-red-600 transition">
              <img src={`${path}konum.svg`} className="w-5 h-5" alt="icon" />
              <span className="uppercase text-sm font-semibold">
                {t("orderNow")}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative px-4">
        <div
          className="absolute right-0 sm:top-2/4 top-1/3
             w-[200px] sm:w-[450px] lg:w-[600px] 
             flex flex-wrap justify-end items-center"
        >
          <img
            src={`${path}make-your-own-pizza-az-85b2c4e1.webp`}
            alt="Create your pizza"
            className="w-full h-auto object-contain"
          />
          <Link to="/menu"
            className="w-28 h-9 sm:w-32 sm:h-10 md:w-36 md:h-11 lg:w-40 lg:h-12 
               flex items-center justify-center gap-2 mr-5 md:mr-10
               bg-red-500 text-white hover:bg-red-600 transition-all 
               shadow-md text-xs sm:text-sm font-semibold tracking-wide"
          >
            <img
              src={`${path}cart.svg`}
              className="w-4 h-4 sm:w-5 sm:h-5"
              alt="icon"
            />
            <span className="uppercase">{t("createNow")}</span>
          </Link>
        </div>

        <img
          src={`${path}create-your-own-banner-77d7e725.webp`}
          alt="Pizza Banner"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
