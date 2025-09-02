import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserId,
  setStorage,
  getStorage,
  removeStorage,
  setCurrentUserId,
  removeCurrentUserId,
} from "../utils/localStorage";

const getKey = (userId) => `cart_${userId}`;
const currentUserId = getCurrentUserId();
const initialItems = currentUserId ? getStorage(getKey(currentUserId)) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems,
    userId: currentUserId,
  },
  reducers: {
    setCartUser: (state, action) => {
      const id = action.payload;
      state.userId = id;
      state.items = getStorage(getKey(id));
      setCurrentUserId(id);
    },
    resetCartUser: (state) => {
      removeStorage(getKey(state.userId));
      removeCurrentUserId();
      state.items = [];
      state.userId = null;
    },
    addToCart: (state, action) => {
      const sanitizeItem = (item) => ({
        ...item,
        price: typeof item.price === "number" ? item.price : 0,
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
      });

      const newItem = sanitizeItem(action.payload);

      if (newItem.type === "campaign") {
        state.items.push(newItem);
      } else {
        const normalizeExtras = (arr) =>
          Array.isArray(arr) ? arr.slice().sort().join(",") : "";

        const existing = state.items.find(
          (i) =>
            i.id === newItem.id &&
            i.size === newItem.size &&
            i.cut === newItem.cut &&
            i.dough === newItem.dough &&
            normalizeExtras(i.extras) === normalizeExtras(newItem.extras)
        );

        if (existing) {
          existing.quantity += newItem.quantity;
          existing.price += newItem.price;
        } else {
          state.items.push(newItem);
        }
      }

      setStorage(getKey(state.userId), state.items);
    },
    removeFromCart: (state, action) => {
      state.items.splice(action.payload, 1);
      setStorage(getKey(state.userId), state.items);
    },
    updateItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity > 0) {
        state.items[index].quantity = quantity;
        setStorage(getKey(state.userId), state.items);
      }
    },
    updateItem: (state, action) => {
      const { index, item } = action.payload;
      state.items[index] = item;
      setStorage(getKey(state.userId), state.items);
    },
    clearCart: (state) => {
      state.items = [];
      removeStorage(getKey(state.userId));
    },
  },
});

export const {
  setCartUser,
  resetCartUser,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  updateItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
