import { createSlice } from "@reduxjs/toolkit";
import { getWishlist, setWishlist, removeWishlist } from "../utils/localStorage";

const initialState = { items: getWishlist() };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistUser: (state, action) => {
      const userId = action.payload;
      state.items = getWishlist(userId);
    },
    toggleWishlist: (state, action) => {
      const { id, userId } = action.payload;
      if (state.items.includes(id))
        state.items = state.items.filter((i) => i !== id);
      else state.items.push(id);
      setWishlist(userId, state.items);
    },
    clearWishlist: (state, action) => {
      const userId = action.payload;
      state.items = [];
      removeWishlist(userId);
    },
  },
});

export const { setWishlistUser, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
