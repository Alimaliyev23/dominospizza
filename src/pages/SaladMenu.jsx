import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const SaladMenu = () => {
  return <ProductMenu fetchFunction={() => api.getMenuByType("salad")} />;
};
export default SaladMenu;
