import { createSlice } from "@reduxjs/toolkit";

const initialIsLoginState = { isLogin: false };

const isLoginSlice = createSlice({
  name: "isLogin",
  initialState: initialIsLoginState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const isLoginAction = isLoginSlice.actions;

export default isLoginSlice.reducer;
