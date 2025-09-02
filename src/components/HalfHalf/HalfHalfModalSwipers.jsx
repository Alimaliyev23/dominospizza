import { useSelector, useDispatch } from "react-redux";
import {
  hideSwiper,
  setLeftPizza,
  setRightPizza,
} from "../../store/halfHalfSlice";
import PizzaSwiper from "./PizzaSwiper";

const HalfHalfModalSwipers = ({ pizzas }) => {
  const dispatch = useDispatch();
  const { showLeftSwiper, showRightSwiper } = useSelector(
    (state) => state.halfHalf
  );

  const handleSelect = (side, pizza) => {
    if (side === "left") dispatch(setLeftPizza(pizza));
    else dispatch(setRightPizza(pizza));
    dispatch(hideSwiper());
  };

  return (
    <>
      {showLeftSwiper && (
        <PizzaSwiper
          pizzas={pizzas}
          side="left"
          onSelect={(pizza) => handleSelect("left", pizza)}
          onClose={() => dispatch(hideSwiper())}
        />
      )}
      {showRightSwiper && (
        <PizzaSwiper
          pizzas={pizzas}
          side="right"
          onSelect={(pizza) => handleSelect("right", pizza)}
          onClose={() => dispatch(hideSwiper())}
        />
      )}
    </>
  );
};

export default HalfHalfModalSwipers;
