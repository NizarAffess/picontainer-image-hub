import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import imageSlice from "../features/images/imageSlice";
import profileSlice from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageSlice,
    profile: profileSlice,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});
