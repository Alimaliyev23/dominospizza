import { useSelector } from "react-redux";
import { getLocalizedText } from "../utils/getLocalizedText";
import { getShortDescription } from "../utils/getShortDescription";

const Card = ({ image, name, description, onClick }) => {
  const lang = useSelector((state) => state.lang.lang);

  return (
    <div
      onClick={onClick}
      className="relative text-black w-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.05] hover:shadow-lg cursor-pointer"
    >
      <div className="relative sm:h-[75%] md:h-[80%]">
        <img
          src={image?.[lang] || image?.az}
          alt={getLocalizedText(name, lang)}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-md lg:text-lg uppercase font-bold relative z-10">
        {getShortDescription(getLocalizedText(description, lang))}
      </div>
    </div>
  );
};

export default Card;
