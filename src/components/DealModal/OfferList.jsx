import { useState } from "react";
import { useTranslation } from "react-i18next";
import OfferModal from "../DealModal/OfferModal";
import { getLocalizedText } from "../../utils/getLocalizedText";

const OfferList = ({ offers }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { i18n } = useTranslation(); 

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {offers.map((offer) => (
        <div
          key={offer.id || offer._id}
          className="border rounded-lg shadow hover:shadow-lg p-4 cursor-pointer transition"
          onClick={() => setSelectedOffer(offer)}
        >
          <img
            src={
              offer.mediaDetail?.[i18n.language] ||
              offer.mediaDetail?.az ||
              offer.mediaDetail
            }
            alt={getLocalizedText(offer.name, i18n)}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="text-lg font-bold">
            {getLocalizedText(offer.name, i18n)}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {getLocalizedText(offer.description, i18n)}
          </p>
          <p className="text-red-600 font-semibold mt-2">
            {(offer.discountValue || offer.minimumPrice || 0).toFixed(2)} ₼
          </p>
        </div>
      ))}

      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default OfferList;
