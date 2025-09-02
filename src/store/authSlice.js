import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserId,
  setCurrentUserId,
  removeCurrentUserId,
  getUserData,
  setUserData,
} from "../utils/localStorage";

const currentUserId = getCurrentUserId();

const initialState = {
  user: currentUserId ? getUserData(currentUserId) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.user = user;
      setUserData(user.id, user);
      setCurrentUserId(user.id);
    },
    logout: (state) => {
      removeCurrentUserId();
      state.user = null;
    },
    updateAddress: (state, action) => {
      if (state.user) {
        state.user.address = action.payload;
        setUserData(state.user.id, state.user);
      }
    },
  },
});

export const { login, logout, updateAddress } = authSlice.actions;
export default authSlice.reducer;
