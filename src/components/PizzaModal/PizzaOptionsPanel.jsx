import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../store/cartSlice";
import Selectors from "./Selectors";
import QuantityAndActions from "./QuantityAndActions";
import PizzaCustomizationPanel from "./PizzaCustomizationPanel";
import DominoAPI from "../../services/DominoAPI";

const PizzaOptionsPanel = ({ pizza, lang, onClose }) => {
  const dispatch = useDispatch();
  const api = new DominoAPI();
  const { t } = useTranslation();

  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedCut, setSelectedCut] = useState("regular");
  const [selectedDough, setSelectedDough] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [doughOptions, setDoughOptions] = useState([]);
  const [doughPrice, setDoughPrice] = useState(0);

  const pizzaData = useMemo(
    () => ({
      name: pizza.name?.[lang] ?? "",
      description: pizza.description?.[lang] ?? "",
      image:
        pizza.mediaGlobal?.[lang] ||
        pizza.mediaDetail?.[lang] ||
        "/default-pizza.png",
      sizes: pizza.sizes ?? {},
      options: pizza.options ?? [],
    }),
    [pizza, lang]
  );

  const { extraIngredients, crustOptions } = useMemo(() => {
    const opts = pizzaData.options;
    return {
      extraIngredients: opts.filter(
        (opt) => opt.type === "topping" && opt.active
      ),
      crustOptions: opts.filter((opt) => opt.type === "crust" && opt.active),
    };
  }, [pizzaData]);

  const standardIngredients = useMemo(
    () => extraIngredients.filter((i) => i.isMasterType),
    [extraIngredients]
  );

  useEffect(() => {
    api.getDoughOptions().then((data) => {
      const options = Array.isArray(data?.data) ? data.data : [];
      const activeDoughs = options.filter((opt) => opt.active).slice(2);
      setDoughOptions(activeDoughs);
    });
  }, [lang, selectedSize]);

  const includedIngredients = useMemo(
    () =>
      standardIngredients
        .filter((ing) => !selectedExtras.includes(ing._id))
        .map((ing) => ({
          id: ing._id,
          name: ing.name?.[lang] ?? ing.name?.en ?? "Unknown",
        })),
    [standardIngredients, selectedExtras, lang]
  );

  const totalPrice = useMemo(() => {
    const basePrice = pizzaData.sizes[selectedSize] ?? 0;

    const extrasPrice = selectedExtras.reduce((sum, id) => {
      const ing = extraIngredients.find((i) => i._id === id);
      const price = ing?.price?.[selectedSize];
      return sum + (typeof price === "number" ? price : 0);
    }, 0);

    const finalDoughPrice =
      selectedDough && typeof doughPrice === "number" ? doughPrice : 0;

    return (basePrice + extrasPrice + finalDoughPrice) * quantity;
  }, [
    pizzaData,
    selectedSize,
    selectedExtras,
    extraIngredients,
    doughPrice,
    selectedDough,
    quantity,
  ]);

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        id: pizza._id,
        name: pizzaData.name,
        image: pizzaData.image,
        size: selectedSize,
        cut: selectedCut,
        dough: selectedDough,
        extras: includedIngredients,
        quantity,
        price: totalPrice,
      })
    );
    onClose?.();
  }, [
    dispatch,
    pizza._id,
    pizzaData.name,
    pizzaData.image,
    selectedSize,
    selectedCut,
    selectedDough,
    includedIngredients,
    quantity,
    totalPrice,
    onClose,
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 uppercase mb-2">
        {pizzaData.name}
      </h1>
      {pizzaData.description && (
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          {pizzaData.description}
        </p>
      )}

      <QuantityAndActions
        quantity={quantity}
        onQuantityChange={setQuantity}
        totalPrice={totalPrice}
        onAddToCart={handleAddToCart}
        productName={pizzaData.name}
      />

      <Selectors
        sizes={pizzaData.sizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
        selectedCut={selectedCut}
        onCutSelect={setSelectedCut}
        crustOptions={crustOptions}
        extraIngredients={extraIngredients}
        selectedExtras={selectedExtras}
        onExtraToggle={(id) =>
          setSelectedExtras((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          )
        }
        lang={lang}
      />

      <PizzaCustomizationPanel
        lang={lang}
        selectedSize={selectedSize}
        doughOptions={doughOptions}
        selectedDough={selectedDough}
        setSelectedDough={setSelectedDough}
        setDoughPrice={setDoughPrice}
        standardIngredients={standardIngredients}
        selectedExtras={selectedExtras}
        setSelectedExtras={setSelectedExtras}
      />

      {selectedDough && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-gray-700">
            {t("SelectedCrust")}: <strong>{selectedDough}</strong>
          </span>
          <button
            onClick={() => {
              setSelectedDough("");
              setDoughPrice(0);
            }}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            ✖ {t("Remove")}
          </button>
        </div>
      )}
    </>
  );
};

export default PizzaOptionsPanel;
