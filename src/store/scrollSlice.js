import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    showStickyNavbar: false,
  },
  reducers: {
    setStickyVisibility: (state, action) => {
      state.showStickyNavbar = action.payload;
    },
  },
});

export const { setStickyVisibility } = scrollSlice.actions;
export default scrollSlice.reducer;
