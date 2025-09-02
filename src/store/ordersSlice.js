import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage, removeStorage } from "../utils/localStorage";

const initialState = { list: getStorage("orders") };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.list.push(action.payload);
      setStorage("orders", state.list);
    },
    clearOrders: (state) => {
      state.list = [];
      removeStorage("orders");
    },
    removeOrder: (state, action) => {
      state.list = state.list.filter((order) => order.id !== action.payload);
      setStorage("orders", state.list);
    },
  },
});

export const { addOrder, clearOrders, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
