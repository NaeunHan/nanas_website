import { createSlice } from "@reduxjs/toolkit";

const initialUserInfoState = {
  uId: "",
  uName: "",
  uEmail: "",
  uPhone: "",
  uZipcode: "",
  uAddress: "",
  uAdditionalAddr: "",
  uMile: "",
  uAuth: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialUserInfoState,
  reducers: {
    setUserInfo(state, action) {
      state.uId = action.payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
