import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/pizzaModalSlice";
import PizzaOptionsPanel from "./PizzaOptionsPanel";
import { useTranslation } from "react-i18next";


const ModalLayout = () => {
  const dispatch = useDispatch();
  const selectedPizza = useSelector((state) => state.pizzaModal.selectedPizza);
  const { i18n } = useTranslation();
  const lang = i18n.language || "az";

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (selectedPizza) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPizza]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!selectedPizza) return null;

  const image =
    selectedPizza.mediaDetail?.[lang] ||
    selectedPizza.mediaDetail?.az ||
    selectedPizza.mediaDetail?.default ||
    "/images/default-pizza.jpg";

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-lg p-4 sm:p-6 w-[80%] lg:w-full sm:max-w-5xl max-h-[85vh] overflow-y-auto md:overflow-hidden relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-auto md:pl-4">
            <img
              src={image}
              alt={selectedPizza.name || "Pizza"}
              loading="lazy"
              className="rounded py-4 md:py-30 px-2"
            />
          </div>
          <div className="flex-1 md:overflow-y-auto md:max-h-[calc(85vh-3rem)]">
            <PizzaOptionsPanel
              pizza={selectedPizza}
              lang={lang}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
