import { Link } from "react-router-dom";
import { path } from "../App";
import { useSelector } from "react-redux";
import { getLocalizedText } from "../utils/getLocalizedText";

const MobileBottomMenu = () => {
  const lang = useSelector((state) => state.lang.lang);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-2 sm:hidden z-55">
      <Link
        to="/menu"
        className="flex flex-col items-center text-xs font-medium text-gray-700"
      >
        <img
          src={`${path}menu.png`}
          alt={getLocalizedText("menu", lang)}
          className="h-8 w-8"
        />
        <span>{getLocalizedText("menu", lang)}</span>
      </Link>

      <Link
        to="/trackingPage"
        className="flex flex-col items-center text-xs font-medium text-gray-700"
      >
        <img
          src={`${path}scooter.png`}
          alt={getLocalizedText("tracking", lang)}
          className="h-8 w-8"
        />
        <span>{getLocalizedText("tracking", lang)}</span>
      </Link>

      <Link
        to="/mybranches"
        className="flex flex-col items-center text-xs font-medium text-gray-700"
      >
        <img
          src={`${path}dominoHome.png`}
          alt={getLocalizedText("branches", lang)}
          className="h-8 w-8"
        />
        <span>{getLocalizedText("branches", lang)}</span>
      </Link>

      <Link
        to="/offers"
        className="flex flex-col items-center text-xs font-medium text-gray-700"
      >
        <img
          src={`${path}faizRed.webp`}
          alt={getLocalizedText("offers", lang)}
          className="h-8 w-8"
        />
        <span>{getLocalizedText("offers", lang)}</span>
      </Link>
    </div>
  );
};

export default MobileBottomMenu;
