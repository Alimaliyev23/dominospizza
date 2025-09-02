import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStickyVisibility } from "../store/scrollSlice";

const ScrollWatcher = ({ threshold = 72 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setStickyVisibility(window.scrollY > threshold));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, threshold]);

  return null;
};

export default ScrollWatcher;
