import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "./isLoginSlice";
import userInfoSlice from "./userInfoSlice";

const store = configureStore({
  reducer: { userInfo: userInfoSlice, isLogin: isLoginSlice },
});

export default store;
