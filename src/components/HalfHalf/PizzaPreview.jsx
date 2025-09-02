const PizzaPreview = ({ pizza, lang, title }) => {
  const image =
    pizza.mediaDetail?.[lang] ||
    pizza.mediaDetail?.az ||
    "/images/default-pizza.jpg";

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <img
        src={image}
        alt={pizza.name?.[lang]}
        className="w-full max-w-xs rounded shadow"
      />
      <p className="text-sm text-gray-600 mt-2">{pizza.description?.[lang]}</p>
    </div>
  );
};

export default PizzaPreview
