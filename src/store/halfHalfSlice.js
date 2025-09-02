import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  leftPizza: null,
  rightPizza: null,
  selectedSize: "medium",
  selectedCut: "regular",
  quantity: 1,
  showLeftSwiper: false,
  showRightSwiper: false,
};

const halfHalfSlice = createSlice({
  name: "halfHalf",
  initialState,
  reducers: {
    openHalfHalfModal: (state) => {
      state.isOpen = true;
    },
    closeHalfHalfModal: (state) => {
      state.isOpen = false;
      state.leftPizza = null;
      state.rightPizza = null;
      state.selectedSize = "medium";
      state.selectedCut = "regular";
      state.quantity = 1;
      state.showLeftSwiper = false;
      state.showRightSwiper = false;
    },
    setLeftPizza: (state, action) => {
      state.leftPizza = action.payload;
      state.showLeftSwiper = false;
    },
    setRightPizza: (state, action) => {
      state.rightPizza = action.payload;
      state.showRightSwiper = false;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setSelectedCut: (state, action) => {
      state.selectedCut = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = Math.max(1, action.payload);
    },
    showLeftSwiper: (state) => {
      state.showLeftSwiper = true;
      state.showRightSwiper = false;
    },
    showRightSwiper: (state) => {
      state.showRightSwiper = true;
      state.showLeftSwiper = false;
    },
    hideSwiper: (state) => {
      state.showLeftSwiper = false;
      state.showRightSwiper = false;
    },
  },
});

export const {
  openHalfHalfModal,
  closeHalfHalfModal,
  setLeftPizza,
  setRightPizza,
  setSelectedSize,
  setSelectedCut,
  setQuantity,
  showLeftSwiper,
  showRightSwiper,
  hideSwiper,
} = halfHalfSlice.actions;
export default halfHalfSlice.reducer;
