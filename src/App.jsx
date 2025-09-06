export const path = "./src/assets/img/";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import "./i18n";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Layout from "./layouts/MainLayout";
import Offers from "./pages/Offers";
import NotFound from "./pages/NotFound";
import BreadMenu from "./pages/BreadMenu";
import ChickenMenu from "./pages/ChickenMenu";
import SaladMenu from "./pages/SaladMenu";
import SidesMenu from "./pages/SidesMenu";
import DessertMenu from "./pages/DessertMenu";
import DrinkMenu from "./pages/DrinkMenu";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import MyBranches from "./pages/MyBranches";
import TrackingPage from "./pages/TrackingPage";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
        <img
          src={`${path}loader.gif`}
          alt="Loading..."
          className="w-32 h-32 object-contain"
        />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#003752",
            color: "#fff",
            fontWeight: "500",
            zIndex: 9999,
          },
          className: "isolate",
          duration: 1000,
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/breadmenu" element={<BreadMenu />} />
          <Route path="/chickenmenu" element={<ChickenMenu />} />
          <Route path="/saladmenu" element={<SaladMenu />} />
          <Route path="/sidesMenu" element={<SidesMenu />} />
          <Route path="/dessertMenu" element={<DessertMenu />} />
          <Route path="/drinkMenu" element={<DrinkMenu />} />
          <Route path="/wishlistPage" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mybranches" element={<MyBranches />} />
          <Route path="/trackingPage" element={<TrackingPage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="hidden md:block fixed bottom-0 left-0 z-50 p-3">
        <a href="tel:6600">
          <img
            src={`${path}6600.png`}
            alt="Call 6600"
            className="w-36 h-20 object-contain cursor-pointer"
          />
        </a>
      </div>
    </>
  );
}

export default App;
