import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserId, getStorage, setStorage } from "../utils/localStorage";

const currentUserId = getCurrentUserId();
const initialItems = currentUserId
  ? getStorage(`favorites_${currentUserId}`)
  : [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: initialItems },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        setStorage(`favorites_${currentUserId}`, state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
      setStorage(`favorites_${currentUserId}`, state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    loadFavorites: (state, action) => {
      const userId = action.payload;
      state.items = getStorage(`favorites_${userId}`);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, loadFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
