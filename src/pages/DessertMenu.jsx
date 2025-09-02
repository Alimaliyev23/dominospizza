import DominoAPI from "../services/DominoAPI";
import ProductMenu from "../components/ProductMenu";
const api = new DominoAPI();
const DessertMenu = () => {
  return <ProductMenu fetchFunction={() => api.getMenuByType("dessert")} />;
};
export default DessertMenu;
