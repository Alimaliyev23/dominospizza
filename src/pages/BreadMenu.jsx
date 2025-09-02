import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const BreadMenu = () => {
  return <ProductMenu fetchFunction={() => api.getMenuByType("bread")} />;
};
export default BreadMenu;
