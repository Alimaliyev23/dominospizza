import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const SidesMenu = () => {
  return <ProductMenu fetchFunction={() => api.getMenuByType("sides")} />;
};
export default SidesMenu;
