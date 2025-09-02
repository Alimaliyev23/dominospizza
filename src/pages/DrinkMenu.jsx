import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const DrinkMenu = () => {
  return <ProductMenu  fetchFunction={() => api.getMenuByType("drink")}
  variantMode="drink" />;
};
export default DrinkMenu;
