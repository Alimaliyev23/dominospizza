import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage, removeStorage } from "../utils/localStorage";

const initialState = { items: getStorage("wishlist") };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id))
        state.items = state.items.filter((i) => i !== id);
      else state.items.push(id);
      setStorage("wishlist", state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      removeStorage("wishlist");
      
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
