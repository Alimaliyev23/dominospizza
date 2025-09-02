import { createSlice } from "@reduxjs/toolkit";

const initialLang = sessionStorage.getItem("lang") || "az";

const langSlice = createSlice({
  name: "lang",
  initialState: { lang: initialLang },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
      sessionStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
