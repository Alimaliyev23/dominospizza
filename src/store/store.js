import { configureStore } from "@reduxjs/toolkit";

import scrollReducer from "./scrollSlice";
import wishlistReducer from "./wishlistSlice";
import langReducer from "./langSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import pizzaModalReducer from "./pizzaModalSlice";
import halfHalfReducer from "./halfHalfSlice";

const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    wishlist: wishlistReducer,
    lang: langReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    pizzaModal: pizzaModalReducer,
    halfHalf: halfHalfReducer,
  },
});

export default store;
