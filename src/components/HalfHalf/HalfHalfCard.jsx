import { useTranslation } from "react-i18next";
import { path } from "../../App";

const HalfHalfCard = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br text-black w-full h-full max-w-sm rounded-xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
    >
      <div className="relative flex justify-center items-center h-48 overflow-hidden">
        <img src={`${path}halfHalf.png`} alt="" />
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded shadow">
          {t("customizable")}
        </div>
      </div>

      <div className="px-5 py-4 sm:px-6 sm:py-5 min-h-[160px] flex flex-col justify-between">
        <div>
          <h3 className="uppercase font-bold text-[clamp(1rem,2vw,1.2rem)] text-gray-800 leading-tight">
            {t("HalfHalfPizza")}
          </h3>
          <p className="text-gray-600 text-sm mt-2 leading-snug">
            {t("ChooseTwoSides")}
          </p>
        </div>
        <p className="text-red-600 font-bold mt-4 text-base">
          {t("priceFrom")} ~8.99 ₼
        </p>
      </div>
    </div>
  );
};

export default HalfHalfCard;
