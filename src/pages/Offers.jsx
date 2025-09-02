import { useEffect, useState } from "react";
import Card from "../components/Card";
import OfferModal from "../components/DealModal/OfferModal";
import DominoAPI from "../services/DominoAPI";
import { filterValidOffers } from "../utils/filterValidOffers";
import { path } from "../App";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const lang = "az";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDlkNjQzZjJmZWVjYTQxMGE4YTBhZWMiLCJlbWFpbCI6ImFsaW1hbGl5ZXYwQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijc3MzE5OTM4NyIsInNlY3VyaXR5X2tleSI6IkBkMG0hbjAkLUB6M3JiQCFqQG4iLCJpYXQiOjE3NTUyNjk3ODJ9.0I6EBdlVCdK42PfuiI82yqkObMJzCC4cfewadAPxXfE";
  const userId = "649d643f2feeca410a8a0aec";

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        const api = new DominoAPI();
        const response = await api.getDealsActive(userId, token);

        if (response && Array.isArray(response.data)) {
          setOffers(response.data);
        } else if (Array.isArray(response)) {
          setOffers(response);
        } else {
          setError("Məlumatlar düzgün formatda deyil");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleOfferClick = async (offerId) => {
    setLoadingOffer(true);
    setSelectedOffer({ _id: offerId });

    try {
      const api = new DominoAPI();
      const response = await api.getDealById(offerId);
      const offerData = response.data || response;

      if (!offerData) {
        alert("Təklif məlumatları tapılmadı");
        return;
      }

      setSelectedOffer(offerData);
    } catch (err) {
      alert("Təklif məlumatları yüklənmədi.");
    } finally {
      setLoadingOffer(false);
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
        <img
          src={`${path}loader.gif`}
          alt="Loading..."
          className="w-32 h-32 object-contain"
        />
      </div>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterValidOffers(offers).map((item, idx) => (
          <Card
            key={item._id || idx}
            {...item}
            image={item.mediaDetail}
            lang={lang}
            onClick={() => handleOfferClick(item._id)}
            disabled={loadingOffer}
          />
        ))}
      </div>

      {selectedOffer && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 animate-modal">
          <OfferModal
            offer={selectedOffer}
            loading={loadingOffer}
            onClose={() => setSelectedOffer(null)}
          />
        </div>
      )}
    </section>
  );
};

export default Offers;
