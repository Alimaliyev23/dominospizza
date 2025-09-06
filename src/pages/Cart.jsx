import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateAddress } from "../store/authSlice";
import { updateItemQuantity } from "../store/cartSlice";
import DominoAPI from "../services/DominoAPI";
import { CartAccordion } from "../components/CartComponents/CartAccordionComponents.jsx";
import useOrderSubmit from "../utils/useOrderSubmit";
import OfferModal from "../components/DealModal/OfferModal";
import CartList from "../components/CartComponents/CartList";

const api = new DominoAPI();

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(user?.address || "");
  const [serviceType, setServiceType] = useState("delivery");
  const [openIndex, setOpenIndex] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [editingOffer, setEditingOffer] = useState(null);
  const [loadingOffer, setLoadingOffer] = useState(false);

  const toggleAccordion = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleAddressChange = (value) => {
    setAddress(value);
    dispatch(updateAddress(value));
  };

  const submitOrder = useOrderSubmit();

  const openOfferModal = async (item, index) => {
    setLoadingOffer(true);
    try {
      const response = await api.getDealById(item.id);
      const offerData = response.data || response;

      if (offerData) {
        setEditingOffer({
          offer: offerData,
          selections: item.selections,
          index,
        });
      }
    } catch (err) {
      console.error("Kampaniya məlumatı alınmadı:", err);
    } finally {
      setLoadingOffer(false);
    }
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    dispatch(updateItemQuantity({ index, quantity: newQty }));
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await api.getStores();
        setBranches(data.data);
      } catch (error) {
        console.error("Mağaza məlumatları alınmadı:", error);
      }
    };
    fetchBranches();
  }, []);

  const formatHour = (value) => {
    const str = value.toString().padStart(4, "0");
    const hours = str.slice(0, 2);
    const minutes = str.slice(2);
    return `${hours}:${minutes}`;
  };

  const isCartEmpty = cartItems.length === 0;
  const isReadyToOrder = paymentMethod && !isCartEmpty;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <CartList
        onEdit={openOfferModal}
        handleQuantityChange={handleQuantityChange}
      />

      {editingOffer && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 animate-modal">
          <OfferModal
            offer={editingOffer.offer}
            onClose={() => setEditingOffer(null)}
            initialSelections={editingOffer.selections}
            editIndex={editingOffer.index}
            loading={loadingOffer}
          />
        </div>
      )}

      <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <CartAccordion
          serviceType={serviceType}
          setServiceType={setServiceType}
          openIndex={openIndex}
          toggleAccordion={toggleAccordion}
          address={address}
          handleAddressChange={handleAddressChange}
          branches={branches}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          formatHour={formatHour}
          setPaymentMethod={setPaymentMethod}
        />

        {isReadyToOrder ? (
          <button
            onClick={submitOrder}
            className="w-full py-3 rounded-lg bg-red-600 text-white hover:shadow-lg my-5 transition"
          >
            Sifarişi tamamla
          </button>
        ) : (
          <Link to="/menu">
            <button
              className={`w-full py-3 rounded-lg my-5 transition ${isCartEmpty
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#0078BC] text-white hover:shadow-lg"
                }`}
              disabled={isCartEmpty}
            >
              {isCartEmpty ? "Səbət boşdur" : "Menyuya bax"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
