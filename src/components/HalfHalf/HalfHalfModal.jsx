import { useSelector } from "react-redux";
import HalfHalfModalMain from "./HalfHalfModalMain";
import HalfHalfModalSwipers from "./HalfHalfModalSwipers";

const HalfHalfModal = ({ pizzas }) => {
  const { isOpen } = useSelector((state) => state.halfHalf);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <HalfHalfModalMain pizzas={pizzas} />
      <HalfHalfModalSwipers pizzas={pizzas} />
    </div>
  );
};

export default HalfHalfModal;
