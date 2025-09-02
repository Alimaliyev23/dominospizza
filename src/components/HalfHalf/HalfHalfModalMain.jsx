import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeHalfHalfModal,
  showLeftSwiper,
  showRightSwiper,
  setSelectedSize,
  setSelectedCut,
  setQuantity,
} from "../../store/halfHalfSlice";
import { addToCart } from "../../store/cartSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { getLocalizedText } from "../../utils/getLocalizedText";
import PizzaSideSelector from "./PizzaSideSelector";
import Selectors from "../PizzaModal/Selectors";

const HalfHalfModalMain = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const { leftPizza, rightPizza, selectedSize, selectedCut, quantity, isOpen } =
    useSelector((state) => state.halfHalf);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleEscape = (e) =>
      e.key === "Escape" && dispatch(closeHalfHalfModal());
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, dispatch]);

  const sizes = {
    small:
      leftPizza && rightPizza
        ? ((leftPizza.sizes?.small || 0) + (rightPizza.sizes?.small || 0)) / 2
        : 0,
    medium:
      leftPizza && rightPizza
        ? ((leftPizza.sizes?.medium || 0) + (rightPizza.sizes?.medium || 0)) / 2
        : 0,
    large:
      leftPizza && rightPizza
        ? ((leftPizza.sizes?.large || 0) + (rightPizza.sizes?.large || 0)) / 2
        : 0,
  };

  const calculatePrice = () => {
    if (!leftPizza || !rightPizza || !selectedSize) return 0;
    return (
      (((leftPizza.sizes?.[selectedSize] || 0) +
        (rightPizza.sizes?.[selectedSize] || 0)) /
        2) *
      quantity
    );
  };

  const handleAddToCart = () => {
    if (!leftPizza || !rightPizza) {
      toast.error(t("selectBothSides"));
      return;
    }
    if (!selectedSize) {
      toast.error(t("selectSize"));
      return;
    }
    if (!selectedCut) {
      toast.error(t("selectCut"));
      return;
    }

    dispatch(
      addToCart({
        id: `halfhalf-${leftPizza._id}-${rightPizza._id}-${Date.now()}`,
        name: `${getLocalizedText(leftPizza.name, i18n)} + ${getLocalizedText(
          rightPizza.name,
          i18n
        )}`,
        type: "halfhalf",
        size: selectedSize,
        cut: selectedCut,
        quantity,
        price: calculatePrice(),
        leftPizza: {
          id: leftPizza._id,
          name: getLocalizedText(leftPizza.name, i18n),
          image: leftPizza.mediaDetail?.[lang] || leftPizza.mediaDetail?.az,
        },
        rightPizza: {
          id: rightPizza._id,
          name: getLocalizedText(rightPizza.name, i18n),
          image: rightPizza.mediaDetail?.[lang] || rightPizza.mediaDetail?.az,
        },
      })
    );
    toast.success(
      `${getLocalizedText(leftPizza.name, i18n)} + ${getLocalizedText(
        rightPizza.name,
        i18n
      )} ${t("addedToCart")}`
    );
    dispatch(closeHalfHalfModal());
  };

  return (
    <div className="bg-white w-full max-w-full sm:max-w-[1000px] rounded-xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto">
      <div className="p-4 sm:p-6 border-b relative">
        <button
          onClick={() => dispatch(closeHalfHalfModal())}
          className="absolute top-4 right-4 text-xl sm:text-2xl text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-sm sm:text-2xl font-bold text-center pr-10">
          {t("HalfHalfPizza")}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto lg:flex">
        <div className="w-full lg:w-1/2 bg-gray-100 flex flex-col p-6">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-64 h-64 relative">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 bg-white flex items-center justify-center">
                {leftPizza || rightPizza ? (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div className="w-1/2 h-full overflow-hidden">
                      {leftPizza ? (
                        <img
                          src={
                            leftPizza.mediaDetail?.[lang] ||
                            leftPizza.mediaDetail?.az
                          }
                          alt={getLocalizedText(leftPizza.name, i18n)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">?</span>
                        </div>
                      )}
                    </div>

                    <div className="w-1/2 h-full overflow-hidden">
                      {rightPizza ? (
                        <img
                          src={
                            rightPizza.mediaDetail?.[lang] ||
                            rightPizza.mediaDetail?.az
                          }
                          alt={getLocalizedText(rightPizza.name, i18n)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">?</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white transform -translate-x-1/2 z-10"></div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🍕</div>
                    <p className="text-sm">{t("selectPizzas")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <PizzaSideSelector
              side="left"
              selectedPizza={leftPizza}
              onSelect={() => dispatch(showLeftSwiper())}
            />
            <PizzaSideSelector
              side="right"
              selectedPizza={rightPizza}
              onSelect={() => dispatch(showRightSwiper())}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-white overflow-y-auto">
          <Selectors
            selectedSize={selectedSize}
            onSizeSelect={(size) => dispatch(setSelectedSize(size))}
            selectedCut={selectedCut}
            onCutSelect={(cut) => dispatch(setSelectedCut(cut))}
            sizes={sizes}
            ing={{ price: sizes }}
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => dispatch(setQuantity(quantity - 1))}
              className="w-10 h-10 border rounded flex items-center justify-center"
            >
              -
            </button>
            <span className="text-lg font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => dispatch(setQuantity(quantity + 1))}
              className="w-10 h-10 border rounded flex items-center justify-center"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!leftPizza || !rightPizza}
            className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HalfHalfModalMain;
