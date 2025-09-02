import { createSlice } from "@reduxjs/toolkit";

const pizzaModalSlice = createSlice({
  name: "pizzaModal",
  initialState: {
    isOpen: false,
    selectedPizza: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedPizza = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedPizza = null;
    },
  },
});

export const { openModal, closeModal } = pizzaModalSlice.actions;
export default pizzaModalSlice.reducer;
