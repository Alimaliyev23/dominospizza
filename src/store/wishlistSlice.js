import { createSlice } from "@reduxjs/toolkit";
import { getWishlist, setWishlist, removeWishlist } from "../utils/localStorage";

const initialState = { items: getWishlist() };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistUser: (state, action) => {
      const userId = action.payload;
      
      // Əvvəlcə user wishlist-ini yoxla
      let userWishlist = getWishlist(userId);
      
      // Əgər user wishlist-i boşdursa və guest wishlist-i varsa, onu köçür
      if (userWishlist.length === 0) {
        const guestWishlist = getWishlist();
        if (guestWishlist.length > 0) {
          userWishlist = guestWishlist;
          setWishlist(userId, guestWishlist);
          // Guest wishlist-i təmizləmək lazım deyil, çünki o da eyni key istifadə edir
        }
      }
      
      state.items = userWishlist;
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
