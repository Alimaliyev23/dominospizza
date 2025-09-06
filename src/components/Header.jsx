import TopNavbar from "./TopNavbar";
import StickyNavbar from "./StickyNavbar";
import ScrollWatcher from "./ScrollWatcher";
import MobileBottomMenu from "./MobileBottomMenu";
import MySlider from "./MySlider";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      <ScrollWatcher threshold={72} />
      <TopNavbar />
      {isHome && <MySlider />}
      <StickyNavbar />
      <MobileBottomMenu />
    </>
  );
};

export default Header;
