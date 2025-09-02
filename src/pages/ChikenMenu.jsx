import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const ChikenMenu = () => {
  return <ProductMenu fetchFunction={() => api.getMenuByType("chicken")} />;
};
export default ChikenMenu;
